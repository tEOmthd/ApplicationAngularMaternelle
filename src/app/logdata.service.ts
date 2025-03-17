import { Injectable } from '@angular/core';
import { Article, Galerie, Dates } from './models';

@Injectable({
  providedIn: 'root'
})
export class LogdataService {
  public login: string = '';
  public mdp: string = '';
  public isLoggedIn: boolean = false;
  public className: string = '';
  
  public schoolData: {
    articles?: any[];
    galeries?: any[];
    dates?: any[];
  } = {};
  
  public selectedArticle?: any;

  constructor() {}

  getClassName() {
    switch (this.login) {
      case 'classe1': return 'Classe N°1';
      case 'classe2': return 'Classe N°2';
      case 'classe3': return 'Classe N°3';
      default: return '';
    }
  }

  getArticles(classId?: number) {
    if (!this.schoolData.articles) return [];
    
    return this.schoolData.articles.filter(article => 
      classId !== undefined ? (article.classe === classId || article.classe === 0) : true
    );
  }

  getGaleries(classId?: number) {
    if (!this.schoolData.galeries) return [];
    
    return this.schoolData.galeries.filter(galerie => 
      classId !== undefined ? (galerie.classe === classId || galerie.classe === 0) : true
    );
  }

  getDates(classId?: number) {
    if (!this.schoolData.dates) return [];
    
    return this.schoolData.dates.filter(date => 
      classId !== undefined ? (date.classe === classId || date.classe === 0) : true
    );
  }

  checkLoggedIn() {
    return this.isLoggedIn;
  }

  logout() {
    this.login = '';
    this.mdp = '';
    this.isLoggedIn = false;
    this.className = '';
    this.schoolData = {};
    this.selectedArticle = undefined;
  }
}