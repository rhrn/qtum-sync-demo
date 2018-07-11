import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly config: { [prop: string]: string };

  constructor(filePath: string) {
    let { error, parsed: env } = dotenv.config({ path: filePath });

    if (error) {
      env = {};
      if (error.code === 'ENOENT') {
        console.log(`touch ${ filePath }`);
      } else {
        console.log(error);
      }
    }

    const { parsed: defaultConf } = dotenv.config({ path: 'default.env' });

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
