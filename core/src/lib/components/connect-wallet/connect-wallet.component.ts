import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  StandardWalletAdapter,
  WalletStandardAdapterProvider,
} from '@mysten/wallet-adapter-wallet-standard';
import { RxIf } from '@rx-angular/template/if';
import { RxFor } from '@rx-angular/template/for';
import { WalletIconEnum } from '../../models';
import { WalletIconPipe } from '../../pipes';
import { ConnectButtonComponent } from '../connect-button';
import { TextCardComponent } from '../text-card';
import { TextHeaderComponent } from '../text-header';
import { WalletButtonComponent } from '../wallet-button';

@Component({
  selector: 'connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxFor,
    RxIf,
    WalletIconPipe,
    TextCardComponent,
    TextHeaderComponent,
    WalletButtonComponent,
    ConnectButtonComponent,
  ],
})
/**
 * Component for Connect Wallet Modal
 */
export class ConnectWalletComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  public adapters = signal<StandardWalletAdapter[]>([]);
  public data = inject(MAT_DIALOG_DATA);
  public error = signal('');
  public isConnecting = signal('');
  public sui = WalletIconEnum.Sui;

  /**
   * Lifecycle hook called when the component is initialized.
   *
   * @public
   * @function
   * @return {void}
   */
  public ngOnInit(): void {
    const adapters = new WalletStandardAdapterProvider().get();

    if (adapters.length) {
      this.adapters.set(adapters);
    }
  }

  /**
   * Initiates the process of connecting a wallet using the provided wallet adapter.
   *
   * @public
   * @function
   * @param {StandardWalletAdapter} adapter - The wallet adapter to use for connecting.
   * @return {void}
   */
  public connectWallet(adapter: StandardWalletAdapter): void {
    this.error.set('');
    /**
     * Sets the connecting state for the provided wallet adapter.
     *
     * @param {string} adapterName - The name of the wallet adapter being connected.
     * @returns {void}
     */
    this.isConnecting.set(adapter.name);

    if (adapter.connected) {
      /**
       * Closes the dialog and returns account information and adapter name.
       *
       * @param {object} result - Result data to be returned upon successful connection.
       * @param {Array<string>} result.accounts - Array of connected wallet accounts.
       * @param {string} result.name - Name of the connected wallet adapter.
       * @returns {void}
       */
      this.handleConnect(adapter);
    } else {
      /**
       * Connects the wallet using the provided adapter and closes the dialog upon success.
       * Dispatches an error action upon connection failure.
       *
       * @returns {void}
       */

      adapter
        .connect()
        .then(() => {
          this.handleConnect(adapter);
        })
        .catch((error) => this.error.set(error.toString()));
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
  private handleConnect(adapter: StandardWalletAdapter): void {
    const account =
      this.data?.network &&
      adapter.wallet.accounts.find((account) =>
        account.chains.includes(this.data?.network)
      );

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
