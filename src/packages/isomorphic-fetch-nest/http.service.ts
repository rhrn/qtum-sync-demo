import * as fetch from 'isomorphic-fetch';

export class HttpService {
  fetch(url: string, options?): Promise<any> {
    return fetch(url, options)
  }
}
