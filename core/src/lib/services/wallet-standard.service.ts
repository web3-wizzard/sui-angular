import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getWallets, Wallet, Wallets } from '@wallet-standard/core';
import { isStandardWalletAdapterCompatibleWallet } from './check';
import { remove, uniqBy } from 'lodash-es';
@Injectable()
export class WalletStandardService implements OnDestroy {
  public readonly availableWalletAdapters$ = new BehaviorSubject<
    readonly Wallet[]
  >([]);

  private clearListeners: () => void;

  private wallets: Wallets | undefined;

  private getInitStandardWalletAdapters(): readonly (Wallet & {_name?: string})[] {
    return this.wallets?.get() ?? [];
  }
  constructor() {
    this.wallets = getWallets();

    this.clearListeners = this.wallets.on(
      'register',
      (...newAdapters: Wallet[]) => {
        const initWalletAdapters = this.getInitStandardWalletAdapters();

        let allAdapters = [...initWalletAdapters];

        const oneKeyWallet = remove(allAdapters, (item) => item._name === 'OneKey Wallet');
        allAdapters.push(...oneKeyWallet);
        allAdapters = uniqBy(allAdapters,'name');

        newAdapters
          .filter(isStandardWalletAdapterCompatibleWallet)
          .filter(
            (newAdapter) =>
              !allAdapters.find(
                (existAdapter) => existAdapter.name === newAdapter.name
              )
          )
          .forEach((newAdapter) => {
            allAdapters.push(newAdapter);
          });

        this.availableWalletAdapters$.next(allAdapters);
      }
    );
  }

  public ngOnDestroy(): void {
    this.clearListeners();
  }
}
