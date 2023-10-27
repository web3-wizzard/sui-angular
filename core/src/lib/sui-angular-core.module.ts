import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ConnectButtonContainerComponent,
  AccountWalletButtonComponent,
  ButtonComponent,
  ConnectWalletComponent,
  TextCardComponent,
  TextHeaderComponent,
  WalletButtonComponent,
} from './components';
import { AuthService } from './services';
import { WalletStandardService } from './services/wallet-standard.service';

@NgModule({
  imports: [
    ConnectButtonContainerComponent,
    AccountWalletButtonComponent,
    ButtonComponent,
    ConnectWalletComponent,
    TextCardComponent,
    TextHeaderComponent,
    WalletButtonComponent,
    MatDialogModule,
  ],
  providers: [AuthService, WalletStandardService],
  exports: [
    ConnectButtonContainerComponent,
    AccountWalletButtonComponent,
    ButtonComponent,
    ConnectWalletComponent,
    TextCardComponent,
    TextHeaderComponent,
    WalletButtonComponent,
  ],
})
export class SuiAngularCoreModule {}
