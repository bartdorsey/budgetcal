declare const config: Config;

type EnvironmentConfig = {
  dialect: string,
  database_url?: string
}

type Config = {
  [environment: string]: EnvironmentConfig
}

export default config;