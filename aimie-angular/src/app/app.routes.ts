import { Routes } from '@angular/router';
import { RoutePath } from '@core/constants/route.constant';
import { urlJoin } from '@core/utils/formatters';
import { LandingComponent } from '@standalone/landing/landing.component';

export const routes: Routes = [
  {
    path: RoutePath.HOME,
    component: LandingComponent,
    data: { animation: 'homePage' },
  },

  // lazy loading.
  {
    path: urlJoin(RoutePath.HOME, RoutePath.CHAT).substring(1),
    loadChildren: () => import('@chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: urlJoin(RoutePath.HOME, RoutePath.QUIZ).substring(1),
    loadChildren: () => import('@quiz/quiz.module').then(m => m.QuizModule),
  },
  {
    path: urlJoin(RoutePath.HOME, RoutePath.USECASE).substring(1),
    loadChildren: () => import('@usecase/usecase.module').then(m => m.UsecaseModule),
  },
  {
    path: urlJoin(RoutePath.HOME, RoutePath.SURVEY).substring(1),
    loadChildren: () => import('@survey/survey.module').then(m => m.SurveyModule),
  },

  // Fallback.
  {
    path: '**',
    redirectTo: RoutePath.HOME,
  },
];
