import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { QuizQuestion } from './components/quiz-question/quiz-question.component';
import { getViewportDevice, preloadImages } from '@core/utils/formatters';

const slideLeftRightAnimation = trigger('slideLeftRight', [
  transition('void -> mobileEnter', [
    style({
      opacity: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      transform: 'translateX(100px)',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    }),
    animate('0.25s', style({ opacity: 1, transform: 'translateX(-1rem)' })),
  ]),
  transition('mobileEnter -> void', [
    style({
      opacity: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      transform: 'translateX(-1rem)',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    }),
    animate('0.25s', style({ opacity: 0, transform: 'translateX(-100px)' })),
  ]),

  transition('void -> tabletEnter', [
    style({
      opacity: 0,
      position: 'absolute',
      height: '100%',
      width: '100%',
      transform: 'translateX(100px)',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    }),
    animate('0.25s', style({ opacity: 1, transform: 'translateX(-1.5rem)' })),
  ]),
  transition('tabletEnter -> void', [
    style({
      opacity: 1,
      position: 'absolute',
      height: '100%',
      width: '100%',
      transform: 'translateX(-1.5rem)',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    }),
    animate('0.25s', style({ opacity: 0, transform: 'translateX(-100px)' })),
  ]),

  transition('void -> laptopEnter', [
    style({
      opacity: 0,
      position: 'absolute',
      height: '100%',
      width: '45rem',
      transform: 'translateX(100px)',
    }),
    animate('0.25s', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition('laptopEnter -> void', [
    style({
      opacity: 1,
      position: 'absolute',
      height: '100%',
      width: '45rem',
      transform: 'translateX(0)',
    }),
    animate('0.25s', style({ opacity: 0, transform: 'translateX(-100px)' })),
  ]),
]);

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  animations: [slideLeftRightAnimation],
})
export class QuizComponent implements OnInit {
  protected curIndex = -1;
  protected questions: QuizQuestion[] = [
    {
      index: 0,
      question: 'Qn 1: Is this quote written by AIMie or a human journalist?',
      content:
        'AI can enable humans to work smarter, faster, and safer. In manufacturing, AI can optimize production processes, reduce downtime, and improve product quality by predicting maintenance needs before machines break down.',
      options: [
        { isCorrect: true, value: 'AIMie' },
        { isCorrect: false, value: 'Human' },
      ],
      funFact:
        'Fun fact! The above quote was a paraphrase written by AI that reflects Andrew Ng ideas in the context of AI’s potential impact on manufacturing!',
    },
    {
      index: 1,
      question: 'Qn 2: Is this picture of a machine generated by AIMie or taken by a human?',
      imageUrl: '/assets/images/quiz-machine.png',
      options: [
        { isCorrect: false, value: 'AIMie' },
        { isCorrect: true, value: 'Human' },
      ],
      funFact: 'Fun fact! The machine above is an actual machine used in our Model Factory @ SIMTech!',
    },
    {
      index: 2,
      question: 'Qn 3: Is this art generated by AIMie or painted by a human?',
      imageUrl: '/assets/images/quiz-mona.png',
      options: [
        { isCorrect: true, value: 'AIMie' },
        { isCorrect: false, value: 'Human' },
      ],
    },
  ];

  constructor(
    protected route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const images: string[] = [
      '/assets/images/quiz-machine.png',
      '/assets/images/quiz-mona.png',
      '/assets/images/rainbox-banner.png',
    ];
    preloadImages(images);
  }

  protected onNextQuestion(): void {
    this.curIndex += 1;
  }

  protected start(): void {
    this.curIndex += 1;
  }

  protected mainMenu(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  protected getAnimationState(): string {
    let rv: string;
    const device = getViewportDevice();
    if (device === 'mobile') {
      rv = 'mobileEnter';
    } else if (device === 'tablet') {
      rv = 'tabletEnter';
    } else {
      rv = 'laptopEnter';
    }
    return rv;
  }
}
