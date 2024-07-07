import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from "../../components/table/table.component";



@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    imports: [MatTabsModule, TableComponent]
})
export class AdminDashboardComponent {

}
