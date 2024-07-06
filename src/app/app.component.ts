import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ForwardFormComponent } from './components/forward-form/forward-form.component';
import { SplitterModule } from 'primeng/splitter';   
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideBarComponent,ForwardFormComponent,SplitterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'preventyon';
}
