import { Component } from '@angular/core';
import { Incident } from '../../models/incident.interface';
import { CardApiService } from '../../services/card-api.service';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CardComponent]
})
export class DashboardComponent {
  details: Incident[] = [];

  constructor(private dataService: CardApiService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: Incident[]) => {
      this.details = data;
    });
  }
}
