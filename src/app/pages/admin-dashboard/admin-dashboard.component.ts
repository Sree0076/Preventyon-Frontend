import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from "../../components/table/table.component";
import { Incident } from '../../models/incident.interface';
import { CardApiService } from '../../services/card-api.service';
import { CardComponent } from '../../components/card/card.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    imports: [MatTabsModule, TableComponent,CardComponent,BarChartComponent,SideBarComponent,CommonModule]
})
export class AdminDashboardComponent {
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
  details: Incident[] = [];

  constructor(private dataService: CardApiService, private el: ElementRef) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: Incident[]) => {
      this.details = data;
    });
  }

}
