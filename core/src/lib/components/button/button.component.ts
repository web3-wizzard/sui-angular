import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  standalone: true,
})
/**
 * The Button Component
 */
export class ButtonComponent {
  @Input()
  public text?: string;

  @Input()
  public type: 'primary' | 'secondary' = 'primary';

  @HostBinding('class.disabled')
  @Input()
  public disabled?: boolean;
}
