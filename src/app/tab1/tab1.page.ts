import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LogdataService } from '../logdata.service';
import { Article, Galerie, Dates } from '../models';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class Tab1Page {
  articles: any[] = [];
  filteredArticles: any[] = [];
  className: string = '';
  searchTerm: string = '';

  constructor(public logdataService: LogdataService) {
    this.loadData();
  }

  loadData() {
    this.articles = this.logdataService.getArticles();
    this.filteredArticles = [...this.articles]; // Copie initiale
    this.className = this.logdataService.getClassName();
  }

  doRefresh(event: any) {
    this.loadData();
    this.filterArticles(); // Réappliquer le filtre après rechargement
    event.target.complete();
  }

  filterArticles() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredArticles = [...this.articles];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredArticles = this.articles.filter(article => {
      return article.titre.toLowerCase().includes(term) || 
             article.texte.toLowerCase().includes(term);
    });
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