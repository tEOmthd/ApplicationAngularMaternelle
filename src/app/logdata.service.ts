import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogdataService {
  public login: String = '';
  public mdp: String = '';
  public isLoggedIn: boolean = false;
  public className: String = '';
  

  public schoolData: {
    articles?: any[];
    galeries?: any[];
    dates?: any[];
  } = {};
  
  constructor() {}
  
 
  getClassName() {
    switch (this.login) {
      case 'classe1': return 'Classe N°1';
      case 'classe2': return 'Classe N°2';
      case 'classe3': return 'Classe N°3';
      default: return '';
    }
  }
  
  // Méthode pour obtenir les articles filtrés par classe
  getArticles(classId?: number) {
    if (!this.schoolData.articles) return [];
    
    if (classId !== undefined) {
      // Retourner les articles de la classe spécifiée ou les articles communs (classe 0)
      return this.schoolData.articles.filter(article => 
        article.classe === classId || article.classe === 0
      );
    } else {
      // Retourner tous les articles
      return this.schoolData.articles;
    }
  }
  
  // Méthode pour obtenir les galeries filtrées par classe
  getGaleries(classId?: number) {
    if (!this.schoolData.galeries) return [];
    
    if (classId !== undefined) {
      return this.schoolData.galeries.filter(galerie => 
        galerie.classe === classId || galerie.classe === 0
      );
    } else {
      return this.schoolData.galeries;
    }
  }
  
  // Méthode pour obtenir les dates filtrées par classe
  getDates(classId?: number) {
    if (!this.schoolData.dates) return [];
    
    if (classId !== undefined) {
      return this.schoolData.dates.filter(date => 
        date.classe === classId || date.classe === 0
      );
    } else {
      return this.schoolData.dates;
    }
  }
  
  // Méthode pour vérifier si l'utilisateur est connecté
  checkLoggedIn() {
    return this.isLoggedIn;
  }
  
  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.login = '';
    this.mdp = '';
    this.isLoggedIn = false;
    this.className = '';
    this.schoolData = {};
  }
}