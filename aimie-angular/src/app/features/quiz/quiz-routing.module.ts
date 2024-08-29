import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { RoutePath } from '@core/constants/route.constant';
import { QuizComponent } from '@quiz/quiz.component';

const routes: Routes = [{ path: '', component: QuizComponent, data: { animation: 'quizPage' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
