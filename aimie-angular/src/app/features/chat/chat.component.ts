import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, User } from '@progress/kendo-angular-conversational-ui';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { paperPlaneIcon } from '@progress/kendo-svg-icons';
import { concatMap, from, merge, Observable, scan, Subject, Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { getViewportDevice } from '@core/utils/formatters';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messageBoxInput', { static: false })
  public messageBoxInput: TextAreaComponent;
  public paperPlaneIcon = paperPlaneIcon;
  public feed: Observable<Message[]>;
  public readonly bot: User = {
    id: 0,
  };
  public readonly user: User = {
    id: 1,
  };

  introduction: Message[] = [
    {
      author: this.bot,
      typing: true,
    },
  ];

  private local: Subject<Message> = new Subject<Message>();
  private msgQueue$ = new Subject<string>();
  private sub$: Subscription;

  constructor(
    protected route: ActivatedRoute,
    private chat: ChatService
  ) {}

  ngOnInit(): void {
    this.feed = merge(from(this.introduction), this.local).pipe(scan((acc: Message[], x: Message) => [...acc, x], []));
    setTimeout(() => {
      this.local.next({
        author: this.bot,
        text: 'Do you have any questions regarding the AI Experience Nexus event? Ask me and I can help you with it!',
      });
    }, 1000);

    this.sub$ = this.msgQueue$
      .pipe(
        concatMap(v => {
          this.local.next({
            author: this.bot,
            typing: true,
          });
          return this.chat.makePrediction$({ promptText: v });
        })
      )
      .subscribe({
        next: res => {
          this.local.next({
            author: this.bot,
            text: res,
          });
        },
      });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  public sendMessage(): void {
    const messageBox = this.messageBoxInput;
    const newMessage = messageBox.value;

    if (!newMessage) {
      return;
    }

    const timestamp = new Date();
    const message = {
      text: newMessage,
      author: this.user,
      timestamp: timestamp,
    };
    this.local.next(message);
    this.msgQueue$.next(newMessage);
    this.local.next({
      author: this.bot,
      typing: true,
    });

    messageBox.value = '';
    messageBox.focus();
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messageList = document.querySelector('.k-message-list');
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }, 10);
  }

  public onKeyDown(e: KeyboardEvent): void {
    const isEnter = e.keyCode === 13;

    if (!isEnter) {
      return;
    }

    const newLine = e.metaKey || e.ctrlKey;
    const enterOnly = !(e.shiftKey || e.metaKey || e.ctrlKey);

    if (enterOnly) {
      e.preventDefault();
      this.sendMessage();
    }
    if (newLine) {
      this.messageBoxInput.value += `\r\n`;
    }
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
        el.style.height = `calc(${window.visualViewport.height}px - 8.2rem)`;
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
