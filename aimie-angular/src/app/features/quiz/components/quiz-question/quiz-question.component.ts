import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface Option {
  value: string;
  isCorrect: boolean;
}
export interface QuizQuestion {
  index: number;
  question: string;
  imageUrl?: string;
  content?: string;
  options: Option[];
  funFact?: string;
}

export interface QuizResponse {
  index: number;
  answer: string;
}

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class QuizQuestionComponent {
  @Input() data: QuizQuestion;
  @Output() response: EventEmitter<null> = new EventEmitter();
  protected openDialog = false;
  protected isCorrect = false;
  protected dialogContent = '';
  protected checkIcon = faCircleCheck;
  protected crossIcon = faCircleXmark;

  protected selectAnswer(v: Option): void {
    if (v.isCorrect) {
      this.isCorrect = true;
      this.dialogContent = 'That is the right answer!';
    } else {
      this.dialogContent = 'That is the wrong answer!';
    }

    this.openDialog = true;
  }

  protected onNextQuestion(): void {
    this.response.emit();
  }
}
