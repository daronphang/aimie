import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseApi } from '@core/constants/api.constant';
import { Config } from '@core/constants/config.constant';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public config: Config;
  public api: BaseApi;

  constructor() {}

  public init(config: Config, api: BaseApi): Observable<boolean> {
    this.config = config;
    this.api = api;
    return of(true);
  }
}
