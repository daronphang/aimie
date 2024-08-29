import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';

export const slideLeftRightAnimation1 = trigger('slideLeftRight', [
  state(
    'mobileEnter',
    style({ opacity: 0, position: 'absolute', height: '100%', width: '100vw', transform: 'translateX(100px)' })
  ),
  state(
    'mobileEnter',
    style({ opacity: 0, position: 'absolute', height: '100%', width: '100vw', transform: 'translateX(100px)' })
  ),

  transition(':enter', [
    style({ opacity: 0, position: 'absolute', height: '100%', width: '50rem', transform: 'translateX(100px)' }),
    animate('0.5s', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, position: 'absolute', height: '100%', width: '50rem', transform: 'translateX(0)' }),
    animate('0.5s', style({ opacity: 0, transform: 'translateX(-100px)' })),
  ]),
]);

export const routeAnimations = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute', height: '100%', width: '100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    query(':leave', [style({ opacity: 1, position: 'relative' }), animate('0.25s ease-out', style({ opacity: 0 }))], {
      optional: true,
    }),
    query(':leave', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(':enter', [style({ opacity: 0, position: 'relative' }), animate('0.25s', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);
