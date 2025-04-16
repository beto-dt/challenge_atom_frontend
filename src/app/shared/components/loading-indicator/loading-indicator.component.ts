import {Component, Input, numberAttribute} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class LoadingIndicatorComponent {
  @Input({transform: numberAttribute}) diameter = 40;
  @Input() overlay = false;
  @Input() text: string | null = null;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
}
