import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'connect-button',
  templateUrl: './connect-button.component.html',
  styleUrls: ['./connect-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
/**
 * The Connect Button Component
 */
export class ConnectButtonComponent {
  @Input()
  public text?: string;
}
