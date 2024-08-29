import { Config, Environment } from './config.constant';

export class BaseApi {
  public DATAROBOT_CHAT_API: string;
  public SURVEY_API: string;

  constructor(config: Config) {
    this.initWithConfig(config);
  }

  private initWithConfig(config: Config) {
    this.DATAROBOT_CHAT_API = config.DATAROBOT_CHAT_API;
    this.SURVEY_API = config.SURVEY_API;
  }
}

export class TestApi extends BaseApi {
  ENVIRONMENT: Environment = 'TESTING';

  constructor(config: Config) {
    super(config);
  }
}

export class DevApi extends BaseApi {
  ENVIRONMENT: Environment = 'DEVELOPMENT';

  constructor(config: Config) {
    super(config);
  }
}

export class ProdApi extends BaseApi {
  ENVIRONMENT: Environment = 'PRODUCTION';

  constructor(config: Config) {
    super(config);
  }
}
