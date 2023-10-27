import { Pipe, PipeTransform } from '@angular/core';
import { WalletIconEnum } from '../models';

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
        return 'sui-angular/sui.svg';
      case WalletIconEnum.Suiet:
        return 'sui-angular/suiet.svg';
      case WalletIconEnum.Elli:
        return 'sui-angular/elli.svg';
      case WalletIconEnum.Ethos:
        return 'sui-angular/ethos.svg';
      case WalletIconEnum.Frontier:
        return 'sui-angular/frontier.svg';
      case WalletIconEnum.Glass:
        return 'sui-angular/glass.svg';
      case WalletIconEnum.Martian:
        return 'sui-angular/martian.svg';
      case WalletIconEnum.Morphis:
        return 'sui-angular/morphis.svg';
      case WalletIconEnum.Nightly:
        return 'sui-angular/nightly.svg';
      case WalletIconEnum.OneKey:
        return 'sui-angular/onekey.svg';
      case WalletIconEnum.SenSui:
        return 'sui-angular/sensui.svg';
      case WalletIconEnum.Spacecy:
        return 'sui-angular/spacecy.jpg';
      case WalletIconEnum.Surf:
        return 'sui-angular/surf.jpg';
      default:
        return 'sui-angular/sui.svg';
    }
  }
}
