import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginPage } from '../login/login.page'; // Import de la page de connexion

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage, 
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login', // Rediriger vers la connexion d'abord
    pathMatch: 'full',
  },
];
