import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() privacyIncidentTotalCount!: number;
  @Input() privacyIncidentPending!: number;
  @Input() privacyIncidentClosed!: number;

  @Input() securityIncidentTotalCount!: number;
  @Input() securityIncidentPending!: number;
  @Input() securityIncidentClosed!: number;

  @Input() qualityIncidentTotalCount!: number;
  @Input() qualityIncidentPending!: number;
  @Input() qualityIncidentClosed!: number;
}
