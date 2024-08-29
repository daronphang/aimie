import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '@core/services/app.service';
import { ChatModule } from './chat.module';
import { catchError, map, Observable, of } from 'rxjs';
import { PredictionResponse, Prompt } from './chat.model';

@Injectable({
  providedIn: ChatModule,
})
export class ChatService {
  constructor(
    private http: HttpClient,
    private app: AppService
  ) {}

  public makePrediction$(prompt: Prompt): Observable<string> {
    const headers = {
      Authorization: `Bearer ${this.app.config.DATAROBOT_API_KEY}`,
      'DataRobot-Key': this.app.config.DATAROBOT_KEY,
    };
    return this.http
      .post<PredictionResponse>(this.app.api.DATAROBOT_CHAT_API, [prompt], {
        headers,
      })
      .pipe(
        catchError(e => {
          console.error(e);
          const res: PredictionResponse = {
            data: [
              {
                prediction: "Sorry, I couldn't parse your response. Please try again.",
              },
            ],
          };
          return of(res);
        }),
        map(res => {
          if (res.data.length > 0) {
            return res.data[0].prediction;
          }
          return "Sorry, I couldn't parse your response. Please try again.";
        })
      );
  }
}
