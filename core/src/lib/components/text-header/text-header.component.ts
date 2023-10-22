import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'text-header',
  templateUrl: './text-header.component.html',
  styleUrls: ['./text-header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * The Text Header Component.
 */
export class TextHeaderComponent {
  @Input()
  public text?: string;
}
