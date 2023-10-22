import {Pipe, PipeTransform} from '@angular/core';
import {WalletIconEnum} from '../models';

@Pipe({
  name: 'walletIcon',
  standalone: true,
})
/**
 * The Wallet Icon Pipe.
 */
export class WalletIconPipe implements PipeTransform {
  /**
   * Transforms a wallet icon enum value into its corresponding string representation.
   *
   * @param {string | undefined} value - The wallet icon enum value to be transformed.
   * @return {string} The string representation of the wallet icon.
   */
  transform(value?: string): string {
    switch (value) {
      case WalletIconEnum.Sui:
        return 'sui';
      case WalletIconEnum.Suiet:
        return 'suiet';
      default:
        return 'sui';
    }
  }
}
