import { Injectable } from '@angular/core';
import { Article, Galerie, Dates } from './models';

@Injectable({
  providedIn: 'root',
})
export class LogdataService {
  public isLoggedIn: boolean = false;
  public className: string = '';
  public login: string = '';
  public schoolData: [Article[], Galerie[], Dates[]] = [[], [], []];
  public selectedArticle?: any;

  constructor() {}

  getClassName() {
    switch (this.login) {
      case 'classe1':
        return 'Classe N°1';
      case 'classe2':
        return 'Classe N°2';
      case 'classe3':
        return 'Classe N°3';
      default:
        return '';
    }
  }

  public getArticle(classId?: number): Article[] {
    return this.schoolData[0].filter((article) =>
      classId !== undefined ? article.classe === classId : true
    );
  }
  // Accéder aux articles
  public getArticles(): Article[] {
    return this.schoolData[0]; // Retourne le tableau d'articles
  }

  public addArticle(article: Article): void {
    this.schoolData[0].push(article); // Ajoute l'article au tableau d'articles
  }

  getGaleries() {
    return this.schoolData[1];
  }

  getDates(classId?: number) {
    return this.schoolData[2];
  }

  checkLoggedIn() {
    return this.isLoggedIn;
  }

  logout() {
    this.login = '';
    this.isLoggedIn = false;
    this.className = '';
    this.schoolData = [[], [], []];
    this.selectedArticle = undefined;
  }
}
