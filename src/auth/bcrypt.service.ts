import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * Get hash
   * @param {string} data
   * @returns {string}
   */
  async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  /**
   * Compare between data and encrypted string
   * @param {string} data
   * @param {string} encrypted
   * @returns {boolean}
   */
  async compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
