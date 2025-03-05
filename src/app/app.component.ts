import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}

export class Article {
  id: number;
  titre: string;
  date: Date;
  categorie: string;
  important: boolean;
  classe: number;
  texte: string;
  photos: [image: string, legende: string];

  constructor(
    id: number,
    titre: string,
    date: Date,
    categorie: string,
    important: boolean,
    classe: number,
    texte: string,
    photos: [image: string, legende: string]
  ) {
    this.id = id;
    this.titre = titre;
    this.date = date;
    this.categorie = categorie;
    this.important = important;
    this.classe = classe;
    this.texte = texte;
    this.photos = photos;
  }
}
