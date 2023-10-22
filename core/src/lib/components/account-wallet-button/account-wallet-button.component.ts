import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { formatAddress } from '../../services';
import { MatButtonModule } from '@angular/material/button';
import { WalletIconPipe } from '../../pipes';

@Component({
  selector: 'account-wallet-button',
  templateUrl: './account-wallet-button.component.html',
  styleUrls: ['./account-wallet-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatMenuModule, WalletIconPipe, MatButtonModule],
})
/**
 * The Account Wallet Button Component.
 */
export class AccountWalletButtonComponent {
  @Input()
  public walletName?: string;

  @Input()
  public walletAccount?: string;

  @Input()
  public disconnectText?: string;

  @Output()
  public disconnect = new EventEmitter<void>();

  /**
   * Retrieves a formatted representation of the account.
   *
   * @public
   * @getter
   * @type {string}
   * @return {string} A formatted representation of the account, or an empty string if no
   * account is available.
   */
  public get account(): string {
    return formatAddress(this.walletAccount ?? '');
  }

  /**
   * Handles the disconnect event and emits it to subscribers.
   *
   * This method is responsible for emitting the disconnect event to inform
   * subscribers about the disconnection.
   *
   * @emits disconnect - An event indicating a disconnection.
   *
   * @returns {void}
   */
  public onDisconnect(): void {
    this.disconnect.emit();
  }
}
