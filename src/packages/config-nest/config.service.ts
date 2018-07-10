import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly config: { [prop: string]: string };

  constructor(filePath: string) {
    const { error, parsed: env } = dotenv.config({ path: filePath });
    const { parsed: defaultConf } = dotenv.config({ path: 'default.env' });

    if (error) {
      return console.log(error);
    }

    this.config = { ...defaultConf, ...env };

    for(const k in this.config) {
      if (process.env[k]) {
        this.config[k] = process.env[k];
      }
    }
  }

  get (key: string): string {
    return this.config[key];
  }
}
