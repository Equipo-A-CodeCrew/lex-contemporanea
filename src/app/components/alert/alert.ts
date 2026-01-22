import {Component, output} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  closeEmitter = output({alias: "onAlertClose"});

  onCloseClick() {
    this.closeEmitter.emit();
  }
}
