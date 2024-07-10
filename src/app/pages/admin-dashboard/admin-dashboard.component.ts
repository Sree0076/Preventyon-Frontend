import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from "../../components/table/table.component";
import { Incident } from '../../models/incident.interface';
import { CardApiService } from '../../services/card-api.service';
import { CardComponent } from '../../components/card/card.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';



@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    imports: [MatTabsModule, TableComponent,CardComponent,BarChartComponent,SideBarComponent]
})
export class AdminDashboardComponent {
  details: Incident[] = [];

  constructor(private dataService: CardApiService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: Incident[]) => {
      this.details = data;
    });
  }
}
