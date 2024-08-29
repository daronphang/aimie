import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface QuizQuestion {
  index: number;
  question: string;
  imageUrl?: string;
  content?: string;
  audio?: string;
}

export interface QuizResponse {
  index: number;
  answer: string;
}

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss',
})
export class QuizQuestionComponent {
  @Input() data: QuizQuestion;
  @Output() response: EventEmitter<QuizResponse> = new EventEmitter();
  protected isOpen = true;

  protected selectAnswer(v: string): void {
    this.response.emit({
      index: this.data.index,
      answer: v,
    });
    this.isOpen = false;
  }
}
