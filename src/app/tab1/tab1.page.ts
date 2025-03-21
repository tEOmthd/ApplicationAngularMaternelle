import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogdataService } from '../logdata.service';
import { Article, Galerie, Dates } from '../models';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class Tab1Page {
  articles: any[] = [];
  className: string = '';

  constructor(public logdataService: LogdataService) {
    this.loadData();
  }

  loadData() {
    this.articles = this.logdataService.getArticles();
    this.className = this.logdataService.getClassName();
  }

  doRefresh(event: any) {
    this.loadData();
    event.target.complete();
  }

  viewArticleDetails(article: any) {
    this.logdataService.selectedArticle = article;
  }

  getIconForCategory(category: string): string {
    switch (category.toLowerCase()) {
      case 'actualité': return 'newspaper-outline';
      case 'événement': return 'calendar-outline';
      case 'information': return 'information-circle-outline';
      default: return 'document-outline';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  logout() {
    console.log("Déconnexion...");
  }
}
