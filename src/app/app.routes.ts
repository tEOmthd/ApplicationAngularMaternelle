import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { LoginPage } from './login/login.page'; // Importez la page de connexion

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2',
        loadComponent: () => import('./tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3',
        loadComponent: () => import('./tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage) // Route pour la page de connexion
  },
  {
    path: '',
    redirectTo: 'login', // Redirige vers la page de connexion par défaut
    pathMatch: 'full'
  }
];