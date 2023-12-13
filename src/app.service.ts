import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Index ROute
   * @returns {string}
   */
  getHello(): string {
    return 'Hello World!';
  }
}
