import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExecuteActionEvent, Message, User } from '@progress/kendo-angular-conversational-ui';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { paperPlaneIcon } from '@progress/kendo-svg-icons';
import { delay, exhaustMap, from, merge, Observable, of, scan, Subject, Subscription, switchMap } from 'rxjs';
import { SurveyService } from './survey.service';
import { SurveyResponse } from './survey.interface';
import { surveyQuestions, bot } from './questions';
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
  private curValue: string[] = [];

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
          this.local$.next(surveyQuestions[this.curIndex]);
          return of(null);
        })
        // delay(1000),
        // switchMap(() => {
        //   this.setTypingMessage();
        //   return of(null);
        // }),
        // delay(1000),
        // switchMap(() => {
        //   this.local$.next(surveyQuestions[this.curIndex]);
        //   return of(null);
        // })
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
    let v: string = e.action.value;
    const questionId = surveyQuestions[this.curIndex].questionId;

    // Custom logic for handling the next outcome of survey workflow.
    if (questionId === 'Q1' && v.toUpperCase() === 'NO, I WOULD JUST LIKE TO CONNECT') {
      this.updateResponse(v);
      this.sendMessage(v);
      // Redirect to connect.
      const newIdx = surveyQuestions.findIndex(row => row.questionId === 'Q13');
      this.curIndex = newIdx;
      this.onNextQuestion();
    } else if (questionId === 'Q10' && v.toUpperCase() === 'NO') {
      this.updateResponse(v);
      this.sendMessage(v);
      // Redirect to connect.
      const newIdx = surveyQuestions.findIndex(row => row.questionId === 'Q12');
      this.curIndex = newIdx;
      this.onNextQuestion();
    } else if (v.toUpperCase() === 'OTHERS (PLEASE SPECIFY)') {
      // Allow users to type in custom response.
      this.sendMessage(v);
      this.isInputDisabled = false;
    } else if (questionId === 'Q13' && v.toUpperCase() === 'NO') {
      this.updateResponse(v);
      this.sendMessage(v);
      this.curIndex = surveyQuestions.length - 1;
      this.onNextQuestion();
    } else if (v.toUpperCase() === 'RETRY') {
      this.setTypingMessage();
      this.endSurvey$.next(true);
    } else if (questionId === 'Q5' || questionId === 'Q9') {
      // Allow multiple choices.
      if (this.curValue.includes(v)) {
        // Remove choice.
        const idx = this.curValue.findIndex(row => row === v);
        this.curValue.splice(idx, 1);
        this.setActionButtonInactive(v);
      } else {
        this.setActionButtonActive(v);
        this.curValue.push(v);
      }
      if (this.curValue.length == 3) {
        v = this.curValue.join(', ');
        this.curValue = [];
        this.updateResponse(v);
        this.sendMessage(v);
        this.onNextQuestion();
      }
    } else {
      // Default.
      this.updateResponse(v);
      this.sendMessage(v);
      this.onNextQuestion();
    }
  }

  private setActionButtonActive(v: string): void {
    const actions = document.querySelectorAll('.k-quick-reply');
    for (let i = 0; i < actions.length; i++) {
      const el = actions[i];
      if (el.innerHTML.includes(v)) {
        el.classList.add('action-focus');
        el.classList.remove('action-unfocus');
        return;
      }
    }
  }

  private setActionButtonInactive(v: string): void {
    const actions = document.querySelectorAll('.k-quick-reply');
    for (let i = 0; i < actions.length; i++) {
      const el = actions[i];
      if (el.innerHTML.includes(v)) {
        el.classList.remove('action-focus');
        el.classList.add('action-unfocus');
        return;
      }
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
    // When the screen is resized i.e. with keyboard, need to check maintain the scroll
    // position of the chat.
    const el = document.querySelector('.k-chat') as HTMLElement;
    const el2 = document.querySelector('.k-message-list') as HTMLElement;
    const device = getViewportDevice();
    if (!el || !window.visualViewport) return;

    if (el2) {
      // Check if scrolled to bottom.
      const isScrolledToBottom = Math.abs(el2.scrollHeight - el2.scrollTop - el2.clientHeight) < 1;
      if (isScrolledToBottom) {
        this.scrollToBottom();
      }
    }

    switch (device) {
      case 'mobile':
        el.style.height = `calc(${window.visualViewport.height}px - 6.5rem)`;
        break;
      case 'tablet':
        el.style.height = `calc(${window.visualViewport.height}px - 9.2rem)`;
        break;
      case 'laptop':
        el.style.height = `calc(${window.visualViewport.height}px - 10rem)`;
        break;
      case 'desktop':
        el.style.height = `calc(${window.visualViewport.height}px - 13rem)`;
        break;
    }
  }
}
