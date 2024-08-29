import { Injectable } from '@angular/core';
import { SurveyModule } from './survey.module';
import { HttpClient } from '@angular/common/http';
import { AppService } from '@core/services/app.service';
import { catchError, map, Observable, of } from 'rxjs';
import { SurveyResponse } from './survey.interface';
import { defaultResponses } from './questions';
import { Message } from '@progress/kendo-angular-conversational-ui';

@Injectable({
  providedIn: SurveyModule,
})
export class SurveyService {
  constructor(
    private http: HttpClient,
    private app: AppService
  ) {}

  public saveSurveyResponse$(response: SurveyResponse): Observable<Message> {
    return this.http.post(this.app.api.SURVEY_API, response).pipe(
      map(() => {
        return defaultResponses.END;
      }),
      catchError(e => {
        console.error(e);
        return of(defaultResponses.FAILED);
      })
    );
  }
}
