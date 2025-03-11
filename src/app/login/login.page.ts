import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogdataService } from '../logdata.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
    IonCardHeader, IonCardTitle, IonCardContent, IonItem, 
    IonLabel, IonInput, IonButton, FormsModule
  ]
})

export class LoginPage {
  public username: string = '';
  public password: string = '';
  
  constructor(private router: Router, private logdataService: LogdataService) {}

  login() {
    this.logdataService.login = this.username;
    this.logdataService.mdp = this.password;

    console.log('login = ' + this.username);
    console.log('mdp = ' + this.password);
    
    // Ajouter ici la navigation vers les tabs après connexion
    this.router.navigate(['/tabs']);
  }
}