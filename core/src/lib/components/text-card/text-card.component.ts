import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'text-card',
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * The Text Card Component.
 */
export class TextCardComponent {
  @Input()
  public header?: string;

  @Input()
  public description?: string;
}
