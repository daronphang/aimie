import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExecuteActionEvent, Message, User } from '@progress/kendo-angular-conversational-ui';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { paperPlaneIcon } from '@progress/kendo-svg-icons';
import { delay, exhaustMap, from, merge, Observable, of, scan, Subject, Subscription, switchMap } from 'rxjs';
import { SurveyService } from './survey.service';
import { SurveyResponse } from './survey.interface';
import { surveyQuestions, defaultResponses, bot } from './questions';
import { getViewportDevice } from '@core/utils/formatters';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SurveyComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messageBoxInput', { static: false })
  protected messageBoxInput: TextAreaComponent;
  protected paperPlaneIcon = paperPlaneIcon;
  protected isInputDisabled = true;
  protected feed$: Observable<Message[]>;
  protected readonly user: User = {
    id: 1,
  };

  private local$ = new Subject<Message>();
  private response: SurveyResponse = {};
  private curIndex = 0;
  private endSurvey$ = new Subject<boolean>();
  private sub$: Subscription;

  constructor(
    protected route: ActivatedRoute,
    private survey: SurveyService
  ) {}

  ngOnInit(): void {
    this.feed$ = merge(
      from([
        {
          author: bot,
          typing: true,
        },
      ]),
      this.local$
    ).pipe(scan((acc: Message[], x: Message) => [...acc, x], []));

    of(null)
      .pipe(
        delay(1000),
        switchMap(() => {
          this.local$.next(defaultResponses.START);
          return of(null);
        }),
        delay(1000),
        switchMap(() => {
          this.setTypingMessage();
          return of(null);
        }),
        delay(1000),
        switchMap(() => {
          this.local$.next(surveyQuestions[this.curIndex]);
          return of(null);
        })
      )
      .subscribe();

    this.sub$ = this.endSurvey$
      .pipe(
        exhaustMap(_ => {
          return this.survey.saveSurveyResponse$(this.response);
        })
      )
      .subscribe({
        next: v => {
          this.local$.next(v);
        },
      });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  private sendMessage(v?: string): string {
    const messageBox = this.messageBoxInput;
    const newMessage = messageBox.value || (v as string);

    const timestamp = new Date();
    const message = {
      text: newMessage,
      author: this.user,
      timestamp: timestamp,
    };
    this.local$.next(message);

    messageBox.value = '';
    messageBox.focus();
    this.isInputDisabled = true;
    this.scrollToBottom();

    return newMessage;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messageList = document.querySelector('.k-message-list');
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }, 10);
  }

  protected onKeyDown(e: KeyboardEvent): void {
    const isEnter = e.keyCode === 13;

    if (!isEnter) {
      return;
    }

    const newLine = e.metaKey || e.ctrlKey;
    const enterOnly = !(e.shiftKey || e.metaKey || e.ctrlKey);

    if (enterOnly) {
      e.preventDefault();
      const v = this.sendMessage();
      this.updateResponse(v);
      this.onNextQuestion();
    }
    if (newLine) {
      this.messageBoxInput.value += `\r\n`;
    }
  }

  protected onClickSend(): void {
    const v = this.sendMessage();
    this.updateResponse(v);
    this.onNextQuestion();
  }

  protected extractTextWithoutOptions(msg: string): string {
    const idx = msg.indexOf('<options>');
    if (idx === -1) {
      return msg;
    }
    return msg.substring(0, idx).trim();
  }

  protected onAction(e: ExecuteActionEvent): void {
    const v = e.action.value;
    // Custom logic for handling the next outcome of survey workflow.
    if ((this.curIndex === 0 || this.curIndex === 9) && v.toUpperCase() === 'NO') {
      this.updateResponse(v);
      this.sendMessage(v);
      // Redirect to connect.
      this.curIndex = 11;
      this.onNextQuestion();
    } else if (v.toUpperCase() === 'OTHERS (PLEASE SPECIFY)') {
      // Allow users to type in custom response.
      this.sendMessage(v);
      this.isInputDisabled = false;
    } else if (this.curIndex === 12 && v.toUpperCase() === 'NO') {
      this.updateResponse(v);
      this.sendMessage(v);
      this.curIndex = surveyQuestions.length - 1;
      this.onNextQuestion();
    } else if (v.toUpperCase() === 'RETRY') {
      this.setTypingMessage();
      this.endSurvey$.next(true);
    } else {
      // Default.
      this.updateResponse(v);
      this.sendMessage(v);
      this.onNextQuestion();
    }
  }

  private updateResponse(v: string): void {
    if (typeof surveyQuestions[this.curIndex] === 'undefined') {
      return;
    }
    const key = surveyQuestions[this.curIndex].questionId;
    this.response[key] = v;
  }

  private setTypingMessage(): void {
    this.local$.next({
      author: bot,
      typing: true,
    });
  }

  private onNextQuestion(): void {
    this.setTypingMessage();
    this.curIndex += 1;

    // End of the survey, save response.
    if (this.curIndex >= surveyQuestions.length) {
      console.log(this.response);
      this.setTypingMessage();
      this.endSurvey$.next(true);
      return;
    }

    of(null)
      .pipe(delay(1000))
      .subscribe(() => {
        const question = surveyQuestions[this.curIndex];
        this.local$.next(question);

        // For questions that require custom text.
        if (!question.suggestedActions) {
          this.isInputDisabled = false;
        }
      });
  }

  protected onResize(): void {
    const el = document.querySelector('.k-chat') as HTMLElement;
    const device = getViewportDevice();
    if (!el || !window.visualViewport) return;

    // Check if scrolled to bottom.
    const isScrolledToBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1;
    if (isScrolledToBottom) {
      this.scrollToBottom();
    }

    switch (device) {
      case 'mobile':
        el.style.height = `calc(${window.visualViewport.height}px - 6.5rem)`;
        break;
      case 'tablet':
        el.style.height = `calc(${window.visualViewport.height}px - 8.2rem)`;
        break;
      case 'laptop':
        el.style.height = `calc(${window.visualViewport.height}px - 8.2rem)`;
        break;
      case 'desktop':
        el.style.height = `calc(${window.visualViewport.height}px - 11.5rem)`;
        break;
    }
  }
}
