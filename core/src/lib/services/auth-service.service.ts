import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConnectWalletComponent } from '../components/connect-wallet/connect-wallet.component';
import { SuiChain, SUI_MAINNET_CHAIN, ConnectedWalletInterface } from '../models';

export interface OnConnectDataInterface {
  connectButtonText?: string;
  network?: SuiChain;
  connectWalletText?: string;
  whatIsWalletText?: string;
  easyLoginHeaderText?: string;
  easyLoginDescriptionText?: string;
  storeHeaderText?: string;
  storeDescriptionText?: string;
  confirmConnectText?: string;
  openingText?: string;
  getStartedSuiText?: string;
  installExtensionHeaderText?: string;
  installExtensionDescriptionText?: string;
  createOrImportHeaderText?: string;
  createOrImportDescriptionText?: string;
  refreshBrowserHeaderText?: string;
  refreshBrowserDescriptionText?: string;
  installWalletExtensionText?: string;
  copyAddressText?: string;
  disconnectText?: string;
}

@Injectable()
/**
 * Todo
 */
export class AuthService {
  private readonly dialog = inject(MatDialog);

  /**
   * Opens a dialog for connecting a wallet and customizing its appearance.
   *
   * This method opens a dialog using the Angular Material Dialog component to facilitate
   * the process of connecting a wallet and provides options for customizing the dialog's
   * appearance and content.
   *
   * @param {OnConnectDataInterface} [data] - An optional object containing data to customize
   * the dialog's content. If not provided, default values will be used.
   *
   * @returns {Promise<MatDialogRef<ConnectWalletComponent, ConnectedWalletInterface>} - A promise that resolves to the reference of
   * the opened dialog.
   */
  public async onConnect(
    data?: OnConnectDataInterface
  ): Promise<MatDialogRef<ConnectWalletComponent, ConnectedWalletInterface>> {
    return this.dialog.open(ConnectWalletComponent, {
      width: '700px',
      height: '488px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      panelClass: 'connect-wallet-dialog',
      backdropClass: 'connect-wallet-dialog-backdrop',
      data: {
        network: data?.network ?? SUI_MAINNET_CHAIN,
        connectWalletText: data?.connectWalletText ?? 'Connect Wallet',
        whatIsWalletText: data?.whatIsWalletText ?? 'What is Wallet',
        easyLoginHeaderText: data?.easyLoginHeaderText ?? 'Easy Login',
        easyLoginDescriptionText:
          data?.easyLoginDescriptionText ??
          'No need to create new accounts and passwords for every website.' +
            ' Just connect your wallet and get going.',
        storeHeaderText: data?.storeHeaderText ?? 'Store your Digital Assets',
        storeDescriptionText:
          data?.storeDescriptionText ??
          'Send, receive, store, and display your digital assets like NFTs & coins.',
        confirmConnectText:
          data?.confirmConnectText ?? 'Confirm connection in the wallet...',
        openingText: data?.openingText ?? 'Opening',
        getStartedSuiText: data?.getStartedSuiText ?? 'Get Started with Sui',
        installExtensionHeaderText:
          data?.installExtensionHeaderText ?? 'Install the Sui extension',
        installExtensionDescriptionText:
          data?.installExtensionDescriptionText ??
          'We recommend pinning the Sui Wallet to your taskbar for quicker access.',
        createOrImportHeaderText:
          data?.createOrImportHeaderText ?? 'Create or Import a Wallet',
        createOrImportDescriptionText:
          data?.createOrImportDescriptionText ??
          'Be sure to back up your wallet using a secure method.' +
            ' Never share your secret phrase with anyone.',
        refreshBrowserHeaderText:
          data?.refreshBrowserHeaderText ?? 'Refresh Your Browser',
        refreshBrowserDescriptionText:
          data?.refreshBrowserDescriptionText ??
          'Once you set up your wallet, refresh this window browser to load up the extension.',
        installWalletExtensionText:
          data?.installWalletExtensionText ?? 'Install Wallet Extension',
      },
    });
  }
}
