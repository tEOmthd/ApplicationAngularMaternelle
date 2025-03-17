export class Article {
    id: number;
    titre: string;
    date: Date;
    categorie: string;
    important: boolean;
    classe: number;
    texte: string;
    photos: { image: string; legende: string }[];
  
    constructor(
      id: number,
      titre: string,
      date: Date,
      categorie: string,
      important: boolean,
      classe: number,
      texte: string,
      photos: { image: string; legende: string }[]
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
  
  export class Galerie {
    titre: string;
    date: Date;
    classe: number;
    texte: string;
    photos: { image: string; legende: string }[];
  
    constructor(
      titre: string,
      date: Date,
      classe: number,
      texte: string,
      photos: { image: string; legende: string }[]
    ) {
      this.titre = titre;
      this.date = date;
      this.classe = classe;
      this.texte = texte;
      this.photos = photos;
    }
  }
  
  export class Dates {
    titre: string;
    date: Date;
    classe: number;
    texte: string;
  
    constructor(titre: string, date: Date, classe: number, texte: string) {
      this.titre = titre;
      this.date = date;
      this.classe = classe;
      this.texte = texte;
    }
  }