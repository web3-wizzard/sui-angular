import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ConnectButtonContainerComponent,
  AccountWalletButtonComponent,
  ConnectButtonComponent,
  ConnectWalletComponent,
  TextCardComponent,
  TextHeaderComponent,
  WalletButtonComponent,
} from './components';
import { AuthService } from './services';

@NgModule({
  imports: [
    ConnectButtonContainerComponent,
    AccountWalletButtonComponent,
    ConnectButtonComponent,
    ConnectWalletComponent,
    TextCardComponent,
    TextHeaderComponent,
    WalletButtonComponent,
    MatDialogModule,
  ],
  providers: [AuthService],
  exports: [
    ConnectButtonContainerComponent,
    AccountWalletButtonComponent,
    ConnectButtonComponent,
    ConnectWalletComponent,
    TextCardComponent,
    TextHeaderComponent,
    WalletButtonComponent,
  ],
})
export class SuiAngularCoreModule {}
