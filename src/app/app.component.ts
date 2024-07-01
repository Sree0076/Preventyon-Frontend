import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Incident } from './models/incident.interface';
import { CardApiService } from './services/card-api.service';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CardComponent, DashboardComponent]
})
export class AppComponent {

}
