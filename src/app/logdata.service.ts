import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogdataService {
  public login: String = '';
  public mdp: String = '';

  constructor() {}
}
