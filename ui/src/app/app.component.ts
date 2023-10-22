import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ConnectedWalletInterface, SuiAngularCoreModule } from '@sui-angular';

@Component({
  standalone: true,
  selector: 'sui-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NxWelcomeComponent, SuiAngularCoreModule],
})
export class AppComponent {
  title = 'ui';

  public connected(event: ConnectedWalletInterface): void {
    console.log(event, 'event');
  }
}
