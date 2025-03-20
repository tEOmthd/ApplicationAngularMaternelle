import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogdataService } from '../logdata.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class Tab2Page {
  galeries: any[] = [];

  constructor(public logdataService: LogdataService) {
    this.loadData();
  }

  loadData() {
    this.galeries = this.logdataService.getGaleries();
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

  viewGalerieDetails(galerie: any) {
    this.logdataService.selectedGalerie = galerie;
  }
}
