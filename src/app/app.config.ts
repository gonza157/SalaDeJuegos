import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-652db","appId":"1:578474203245:web:9c8f0abd2599479aba4764","storageBucket":"sala-de-juegos-652db.appspot.com","apiKey":"AIzaSyCaDXkI7jxgFTzNaisetKtNaSAxWKrxTWI","authDomain":"sala-de-juegos-652db.firebaseapp.com","messagingSenderId":"578474203245"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
