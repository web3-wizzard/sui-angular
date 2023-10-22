import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { AccountWalletButtonComponent } from '../account-wallet-button';
import { RxIf } from '@rx-angular/template/if';
import { AuthService, OnConnectDataInterface } from '../../services';
import { WalletStandardAdapterProvider } from '@mysten/wallet-adapter-wallet-standard';
import { ConnectButtonContainerStore } from './connect-button-container.store';
import { ConnectedWalletInterface, SUI_DEVNET_CHAIN } from '../../models';
import { ButtonComponent } from '../button/button.component';


/**
 * The time required to initialize wallet extensions in a web browser.
 *
 * This constant represents the time in milliseconds that is needed for the
 * initialization of wallet extensions in a web browser.
 */
export const BROWSER_EXTENRENSIONS_LATENCY = 100;

@Component({
  selector: 'connect-button-container',
  templateUrl: './connect-button-container.component.html',
  styleUrls: ['./connect-button-container.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, AccountWalletButtonComponent, RxIf],
  providers: [ConnectButtonContainerStore],
})
/**
 * The Connect Button Container Component
 */
export class ConnectButtonContainerComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly compStore = inject(ConnectButtonContainerStore);

  public readonly walletName = this.compStore.selectWalletName;
  public readonly walletAccount = this.compStore.selectAccount;

  @Input()
  public translations?: OnConnectDataInterface;

  @Output()
  public connected = new EventEmitter<ConnectedWalletInterface>();

  /**
   * Retrieves the text for the connect button.
   *
   * This getter returns the text to be displayed on the connect button, using the
   * value from the `translations` property if available, or a default value of
   * 'Connect' if no translation is provided.
   *
   * @returns {string} The text for the connect button.
   */
  public get connectButtonText(): string {
    return this.translations?.connectButtonText ?? 'Connect';
  }

  /**
   * Retrieves the text for the disconnect button.
   *
   * This getter returns the text to be displayed on the disconnect button, using
   * the value from the `translations` property if available, or a default value of
   * 'Disconnect' if no translation is provided.
   *
   * @returns {string} The text for the disconnect button.
   */
  public get disconnectText(): string {
    return this.translations?.disconnectText ?? 'Disconnect';
  }

  /**
   * Angular lifecycle hook invoked when the component is initialized.
   *
   * This method is automatically called by Angular when the component is initialized.
   * It checks for the presence of a wallet name and account, and if they are both available,
   * it attempts to connect to the corresponding wallet using the provided adapters.
   * Upon a successful connection, it emits a 'connected' event with the account and wallet name.
   * If the connection fails, it clears the wallet information in the component's store.
   *
   * @fires connected - Event emitted upon a successful wallet connection.
   *
   * @throws {Error} If a wallet connection cannot be established.
   */
  public ngOnInit(): void {
    const walletName = this.walletName();
    const walletAccount = this.walletAccount();

    setTimeout(() => {
      if (walletName && walletAccount) {
        const adapters = new WalletStandardAdapterProvider().get();

        const wallet = adapters.find((adapter) => adapter.name === walletName);

        if (wallet) {
          wallet
            .connect()
            .then(() =>
              this.connected.emit({
                account: walletAccount,
                name: walletName,
              })
            )
            .catch(() => {
              this.compStore.clearWallet();
            });
        }
      }
    }, BROWSER_EXTENRENSIONS_LATENCY);
  }

  /**
   * Opens a modal dialog for connecting a wallet.
   *
   * This method triggers the authentication service to open a modal dialog for connecting
   * a wallet with the specified network and localization settings. Upon successful
   * completion of the modal, it emits a 'connected' event and updates the component store
   * with the connected wallet information.
   *
   * @returns {Promise<void>} A promise that resolves when the modal dialog is closed.
   *
   * @fires connected - Event emitted upon successful wallet connection.
   *
   * @param {object} [translations] - An optional object containing localized text for
   * various UI elements in the modal dialog.
   * @param {string} translations.connectWalletText - Text for the 'Connect Wallet' button.
   * @param {string} translations.whatIsWalletText - Text for explaining what a wallet is.
   * @param {string} translations.easyLoginHeaderText - Header text for easy login information.
   * @param {string} translations.easyLoginDescriptionText - Description text for easy login information.
   * @param {string} translations.storeHeaderText - Header text for explaining wallet storage.
   * @param {string} translations.storeDescriptionText - Description text for wallet storage information.
   * @param {string} translations.confirmConnectText - Text for confirming the wallet connection.
   * @param {string} translations.openingText - Text displayed while the wallet connection is being established.
   * @param {string} translations.getStartedSuiText - Text for getting started with SUI.
   * @param {string} translations.installExtensionHeaderText - Header text for installing the wallet extension.
   * @param {string} translations.installExtensionDescriptionText - Description text for installing the wallet extension.
   * @param {string} translations.createOrImportHeaderText - Header text for creating or importing a wallet.
   * @param {string} translations.createOrImportDescriptionText - Description text for creating or importing a wallet.
   * @param {string} translations.refreshBrowserHeaderText - Header text for refreshing the browser.
   * @param {string} translations.refreshBrowserDescriptionText - Description text for refreshing the browser.
   * @param {string} translations.installWalletExtensionText - Text for installing the wallet extension.
   */
  public async openConnectModal(): Promise<void> {
    const dialogRef = await this.authService.onConnect({
      network: SUI_DEVNET_CHAIN,
      connectWalletText: this.translations?.connectWalletText,
      whatIsWalletText: this.translations?.whatIsWalletText,
      easyLoginHeaderText: this.translations?.easyLoginHeaderText,
      easyLoginDescriptionText: this.translations?.easyLoginDescriptionText,
      storeHeaderText: this.translations?.storeHeaderText,
      storeDescriptionText: this.translations?.storeDescriptionText,
      confirmConnectText: this.translations?.confirmConnectText,
      openingText: this.translations?.openingText,
      getStartedSuiText: this.translations?.getStartedSuiText,
      installExtensionHeaderText: this.translations?.installExtensionHeaderText,
      installExtensionDescriptionText:
        this.translations?.installExtensionDescriptionText,
      createOrImportHeaderText: this.translations?.createOrImportHeaderText,
      createOrImportDescriptionText:
        this.translations?.createOrImportDescriptionText,
      refreshBrowserHeaderText: this.translations?.refreshBrowserHeaderText,
      refreshBrowserDescriptionText:
        this.translations?.refreshBrowserDescriptionText,
      installWalletExtensionText: this.translations?.installWalletExtensionText,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.connected.emit({
          account: data.account,
          name: data.name,
        });

        this.compStore.connectWallet(data);
      }
    });
  }

  /**
   * Clears wallet information to disconnect from the wallet.
   *
   * This method is responsible for disconnecting from the wallet by clearing
   * wallet-related information in the component store.
   *
   * @returns {void} - This method does not return a value.
   */
  public onDisconnect(): void {
    this.compStore.clearWallet();
  }
}
