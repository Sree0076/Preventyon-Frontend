import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from '../../components/table/table.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CardComponent } from "../../components/card/card.component";
import { CardApiService } from '../../services/card-api.service';
import { Incident } from '../../models/incident.interface';
@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.scss',
    imports: [TableComponent, MatTabsModule, SideBarComponent, CardComponent]
})
export class UserDashboardComponent {
  details: Incident[] = [];
  selectedCategory: string="";
  getCategory(event: any) {
    var tableRef= document.getElementById("tableRef")
    if (tableRef) {
        tableRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
    }
    this.selectedCategory = event;

     console.log(event);
  }
  constructor(private dataService: CardApiService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: Incident[]) => {
      this.details = data;
    });
  }
}
