import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFirebase } from '../contact';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apikey = 'AIzaSyC2u9oXcWygTrSesSzVAiPH8W62rdNx5nE';

  userToken: any;
  idToken: any;

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  

  // Para autenticarse
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // Para cambiar clave
  // https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]

  // Enviar correo electronico de restablecimiento de clave
  // https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]

  // Verificar codigo de restablecimiento de clave
  // https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=[API_KEY]
 
  // Confirmar el cambio de clave
  // https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=[API_KEY]
 
  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  login(usuario: UserFirebase) {
    const authData = {
      // ...usuario, 'es lo mismo que tener email: usuario.email, password: usuario.password'
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro en la mapa del RXJS');
        this.idToken = resp;
        console.log(this.idToken['idToken']);
        this.guardarToken( this.idToken['idToken'] );
        return resp;
      })
    );  
  }

  nuevoUsuario(usuario: UserFirebase) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro en la mapa del RXJS');
        this.idToken = resp;
        console.log(this.idToken['idToken']);
        this.guardarToken( this.idToken['idToken'] );
        return resp;
      })
    );
  }

  /* Funcion para resetear la clave mediante un mail de reset */
  SendPasswordResetEmail(usuario: any) {
    const authData = {
      requestType: "PASSWORD_RESET",
      email: usuario.email
    };
    console.log("autData", authData);

    return this.http.post(
      `${ this.url }sendOobCode?key=${ this.apikey }`,
      authData
    )
  }

  /* Funcion para confirmar el cambio de la clave */
  VerifyPasswordResetEmail(body: object) {
 
    return this.http.post(
      `${ this.url }resetPassword?key=${ this.apikey }`,
      body
    )

  }

  cambiaPassword(usuario: any) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    console.log("autgData", authData);
  
    return this.http.post(
      `${ this.url }update?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro en la mapa del RXJS');
        this.idToken = resp;
        console.log(this.idToken['idToken']);
        this.guardarToken( this.idToken['idToken'] );
        return resp;
      })
    );
  }


  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {

    if(this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }

    return this.userToken.length > 2;
  } 

}
