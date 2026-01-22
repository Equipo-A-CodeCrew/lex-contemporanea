import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ResponseTest } from './components/response-test/response-test';
import {Header} from "./components/header/header";
import {Alert} from "./components/alert/alert";
import {SearchFiltersComponent} from "./components/search-filters.component";
import {SearchComponent} from "./components/search/search";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ResponseTest,
    Header,
    Alert,
    SearchFiltersComponent,
    SearchComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'LexContemporanea';

  showAlert = false;

  onHelpClick() {
    this.showAlert = true;
  }

  onAlertClose() {
    this.showAlert = false;
  }
}
