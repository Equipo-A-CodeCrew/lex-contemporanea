import {Component, output} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  onClick = output();
  onNotificationClick = output();
  onHelpClick() {
    console.log("help clicked on header");
    this.onClick.emit();
  }
}
