export type Environment = 'DEVELOPMENT' | 'TESTING' | 'PRODUCTION' | 'STAGING';

export interface Config {
  ENVIRONMENT: Environment;
  DATAROBOT_KEY: string;
  DATAROBOT_API_KEY: string;
  DATAROBOT_CHAT_API: string;
  SURVEY_API: string;
}
