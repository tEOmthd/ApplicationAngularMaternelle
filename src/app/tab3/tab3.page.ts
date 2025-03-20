import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogdataService } from '../logdata.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class Tab3Page {
  dates: any[] = [];

  constructor(public logdataService: LogdataService) {
    this.loadData();
  }

  loadData() {
    this.dates = this.logdataService.getDates();
  }

  doRefresh(event: any) {
    this.loadData();
    event.target.complete();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
