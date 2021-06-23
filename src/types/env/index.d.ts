declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    CNC_USR: string;
    CNC_PW: string;
    DRIVER_PATH: string;
    SENDGRID_KEY: string;
    SG_FROM: string;
    SG_TO: string;
  }
}

