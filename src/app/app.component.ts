import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,BarChartComponent]
})



export class AppComponent {
  title = 'preventyon';
}
