import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';
import { AuthStore, ConnectedWalletInterface } from '../../models';

export const WALLET = '@sui-angular/wallet';

@Injectable()
/**
 * The Connect Button Container Store
 */
export class ConnectButtonContainerStore extends ComponentStore<AuthStore> {
  public readonly selectAccount = this.selectSignal(
    (state) => state.wallet?.account
  );
  public readonly selectWalletName = this.selectSignal(
    (state) => state.wallet?.name
  );

  public updateWallet = this.updater(
    (state, wallet: ConnectedWalletInterface | undefined) => {
      localStorage.setItem(WALLET, wallet ? JSON.stringify(wallet) : '');
      return {
        ...state,
        wallet,
      };
    }
  );

  public readonly connectWallet = this.effect(
    (event$: Observable<ConnectedWalletInterface>) => {
      return event$.pipe(
        tap((event: ConnectedWalletInterface) => {
          this.updateWallet(event);
        })
      );
    }
  );

  public readonly clearWallet = this.effect((event$) => {
    return event$.pipe(
      tap(() => {
        this.updateWallet(undefined);
      })
    );
  });

  /**
   * Constructs an instance of a component.
   *
   * Initializes the component's properties, including its connection state and wallet information.
   *
   * @constructor
   */
  constructor() {
    const walletStr = localStorage.getItem(WALLET);

    super({
      connecting: false,
      connected: false,
      wallet: walletStr
        ? (JSON.parse(walletStr) as ConnectedWalletInterface)
        : undefined,
      error: undefined,
    });
  }
}
