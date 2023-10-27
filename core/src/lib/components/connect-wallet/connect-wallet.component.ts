import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  StandardWalletAdapter,
} from '@mysten/wallet-adapter-wallet-standard';
import { RxIf } from '@rx-angular/template/if';
import { RxFor } from '@rx-angular/template/for';
import { WalletIconEnum } from '../../models';
import { WalletIconPipe } from '../../pipes';
import { ButtonComponent } from '../button';
import { TextCardComponent } from '../text-card';
import { TextHeaderComponent } from '../text-header';
import { WalletButtonComponent } from '../wallet-button';
import { SUI_MAINNET_CHAIN } from '../../models';
import { WalletStandardService } from '../../services/wallet-standard.service';
import {RxPush} from '@rx-angular/template/push';
import { StandardConnectMethod, Wallet } from '@mysten/wallet-standard';
import { of } from 'rxjs';
import has from 'lodash-es/has';
@Component({
  selector: 'connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxFor,
    RxIf,
    RxPush,
    WalletIconPipe,
    TextCardComponent,
    TextHeaderComponent,
    WalletButtonComponent,
    ButtonComponent,
  ],
})
/**
 * Component for Connect Wallet Modal
 */
export class ConnectWalletComponent {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly walletStandardService = inject(WalletStandardService);
  public adapters = this.walletStandardService.availableWalletAdapters$;
  public data = inject(MAT_DIALOG_DATA);
  public error = signal('');
  public isConnecting = signal('');
  public sui = WalletIconEnum.Sui;

  /**
   * Initiates the process of connecting a wallet using the provided wallet adapter.
   *
   * @public
   * @function
   * @param {StandardWalletAdapter} adapter - The wallet adapter to use for connecting.
   * @return {void}
   */
  public connectWallet(adapter: Wallet): void {
    this.error.set('');
   if(adapter && has(adapter?.features, 'standard:connect')) {
    this.isConnecting.set(adapter.name);

    const feature = adapter.features['standard:connect'] as {
      connect: StandardConnectMethod;
    }

    feature
        .connect()
        .then(() => {
          this.handleConnect(adapter);
        })
        .catch((error) => {
          console.log(error, 'error')
          this.error.set(error.message ?? error.data ?? error.toString())
        });
   }
  }

  /**
   * Handles the connection of a wallet adapter and returns the account details for the specified network.
   *
   * This method is responsible for handling the connection of a wallet adapter and
   * searching for the account associated with the specified network. If an account is found,
   * it closes the dialog with the account information. Otherwise, it sets an error message
   * indicating the need to switch to the specified network and reload the browser.
   *
   * @param {StandardWalletAdapter} adapter - The wallet adapter to connect.
   * @returns {void} - This method does not return a value.
   */
  private handleConnect(adapter: Wallet): void {
    let account;

    if (
      this.data?.network === SUI_MAINNET_CHAIN &&
      adapter.name === 'Frontier Wallet!'
    ) {
      account = adapter.accounts.find((account) =>
        account.chains.includes('sui' as '${string}:${string}')
      );
    } else {
      account =
        this.data?.network &&
        adapter.accounts.find((account) =>
          account.chains.includes(this.data?.network)
        );
    }

    if (account) {
      this.dialogRef.close({
        account: account.address,
        name: adapter.name,
      });
    } else {
      this.error.set(
        `You must switch to ${this.data.network} and reload the browser`
      );
    }
  }

  /**
   * Initiates the process of registering a wallet using the specified method.
   *
   * @public
   * @function
   * @return {void}
   */
  public registerWallet(): void {
    /**
     * Sets the connecting state to indicate registration is in progress.
     *
     * @param {string} connectingMethod - The method being used for wallet registration.
     * @returns {void}
     */
    this.isConnecting.set(this.sui);
  }

  /**
   * Opens a new browser window to the SUI Wallet extension download page.
   *
   * This method opens a new browser window to the Chrome Web Store page for
   * the SUI Wallet extension, allowing users to download and install it.
   *
   * @returns {void} - This method does not return a value.
   */
  public connectSui(): void {
    window.open(
      'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil',
      '_blank'
    );
  }
}
