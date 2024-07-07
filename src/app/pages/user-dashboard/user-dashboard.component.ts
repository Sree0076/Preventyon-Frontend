import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from '../../components/table/table.component';
@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.scss',
    imports: [TableComponent,MatTabsModule]
})
export class UserDashboardComponent {

}
