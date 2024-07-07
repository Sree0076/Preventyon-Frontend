import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HttpClient } from '@angular/common/http';
import { TablefetchService } from './service/tablefetch.service';

import { CardComponent } from './components/card/card.component';
import { Incident } from './models/incident.interface';
import { CardApiService } from './services/card-api.service';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { BarChartComponent } from './components/bar-chart/bar-chart.component';


@Component({

  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent,CardComponent, DashboardComponent,BarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'

})



export class AppComponent {
  title = 'preventyon';
  greeting: any;

}
