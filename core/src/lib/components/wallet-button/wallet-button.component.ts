import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { WalletIconPipe } from '../../pipes';
@Component({
  selector: 'wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [WalletIconPipe, NgOptimizedImage],
})
/**
 * The Wallet Button Component.
 */
export class WalletButtonComponent {
  @Input()
  public icon?: string;

  public get _icon(): string | undefined {
    return this.icon === 'GlassWallet' ? 'Glass Wallet' : this.icon;
  }
}
