import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { QuizComponent } from './quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';

@NgModule({
  declarations: [QuizComponent, QuizQuestionComponent],
  imports: [SharedModule, QuizRoutingModule],
})
export class QuizModule {}
