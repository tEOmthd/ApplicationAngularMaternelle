import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText,
  IonCheckbox, ToastController, AlertController, LoadingController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { LogdataService } from '../logdata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonItem,
    IonLabel, IonInput, IonButton, FormsModule, IonText,
    IonCheckbox, CommonModule, HttpClientModule
  ]
})
export class LoginPage implements OnInit {
  public username: string = '';
  public password: string = '';
  public rememberMe: boolean = false;
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private logdataService: LogdataService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    // Vérifie si l'utilisateur est déjà connecté
    if (this.logdataService.isLoggedIn) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.loadSavedCredentials();
    }
  }

  // Charge les identifiants sauvegardés si "se souvenir de moi" était coché
  loadSavedCredentials() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe');

    if (savedUsername && savedPassword && savedRememberMe === 'true') {
      this.username = savedUsername;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }

  // Sauvegarde les identifiants si "se souvenir de moi" est coché
  saveCredentials() {
    if (this.rememberMe) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
  }

  // Méthode pour gérer la connexion
  async login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez entrer un identifiant et un mot de passe.';
      this.presentToast('Veuillez entrer un identifiant et un mot de passe.');
      return;
    }

    // Afficher un indicateur de chargement
    const loading = await this.loadingController.create({
      message: 'Connexion en cours...',
      spinner: 'circular'
    });
    await loading.present();

    const url = `https://sebastien-thon.fr/prince/index.php?connexion&login=${this.username}&mdp=${this.password}`;
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        if (response.resultat === "OK") {
          // Sauvegarder les identifiants si "se souvenir de moi" est coché
          this.saveCredentials();

          // Sauvegarder les informations de connexion dans le service
          this.logdataService.login = this.username;
          this.logdataService.mdp = this.password;

          // Récupérer les données de l'école
          this.fetchSchoolData();
        } else if (response.erreur) {
          loading.dismiss();
          // Afficher le message d'erreur dans l'interface
          this.errorMessage = response.erreur;

          // Afficher une alerte et un toast
          this.presentAlert('Erreur de connexion', response.erreur);
          this.presentToast(response.erreur);
        }
      },
      error: (error) => {
        loading.dismiss();
        console.error('Erreur HTTP:', error);
        this.errorMessage = 'Erreur de connexion au serveur.';
        this.presentAlert('Erreur de serveur', 'Impossible de se connecter au serveur.');
        this.presentToast('Erreur de connexion au serveur.');
      }
    });
  }

  // Méthode pour récupérer les données de l'école
  fetchSchoolData() {
    const dataUrl = `https://sebastien-thon.fr/prince/index.php?login=${this.username}&mdp=${this.password}`;

    this.http.get(dataUrl).subscribe({
      next: (data: any) => {
        if (data.erreur) {
          this.presentAlert('Erreur', data.erreur);
          this.presentToast(data.erreur);
        } else {
          // Stocker les données dans le service
          this.logdataService.schoolData = data;

          // Déterminer la classe à partir du login
          this.logdataService.className = this.getClassName(this.username);

          // Marquer l'utilisateur comme connecté
          this.logdataService.isLoggedIn = true;

          // Rediriger vers le premier onglet
          this.router.navigate(['/tabs/tab1']);
        }

        // Fermer l'indicateur de chargement
        this.loadingController.dismiss();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.presentAlert('Erreur', 'Impossible de récupérer les données de l\'école.');
        this.presentToast('Erreur lors de la récupération des données.');
        this.loadingController.dismiss();
      }
    });
  }

  // Méthode pour déterminer la classe à partir du login
  getClassName(login: string): string {
    switch (login) {
      case 'classe1': return 'Classe N°1';
      case 'classe2': return 'Classe N°2';
      case 'classe3': return 'Classe N°3';
      default: return '';
    }
  }

  // Méthode pour afficher un toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  // Méthode pour afficher une alerte
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}