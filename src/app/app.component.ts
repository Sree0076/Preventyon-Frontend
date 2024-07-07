import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HttpClient } from '@angular/common/http';
import { TablefetchService } from './service/tablefetch.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'preventyon';
  greeting: any;

  constructor(private tablefetchService: TablefetchService){}
  ngOnInit(): void {
    this.tablefetchService.getIncidents().subscribe(data => {
      this.greeting = data;
      console.log(data);
    });
  }



}
