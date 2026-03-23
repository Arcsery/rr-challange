import { Component, signal } from '@angular/core';
import {Sidenav} from './shared/sidenav/sidenav';

@Component({
  selector: 'app-root',
  imports: [Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
