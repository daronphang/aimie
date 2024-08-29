import { Message } from '@progress/kendo-angular-conversational-ui';

export interface SurveyResponse {
  [key: string]: string;
}

export interface DefaultResponses {
  START: Message;
  CONTACT: Message;
  END: Message;
  FAILED: Message;
}

export interface CustomMessage extends Message {
  questionId: string;
}
