export interface Prompt {
  promptText: string;
}

export interface PredictionResponse {
  data: PredictionResponseData[];
}

export interface PredictionResponseData {
  prediction: string;
}
