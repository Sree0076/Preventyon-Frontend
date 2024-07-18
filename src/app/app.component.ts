import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

import { LoginComponent } from './models/login/login.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TableComponent, CardComponent, BarChartComponent, LoginComponent]
})



export class AppComponent {
  title = 'preventyon';
  greeting: any;

}
