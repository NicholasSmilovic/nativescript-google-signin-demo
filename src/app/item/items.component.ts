import { Component, OnInit } from '@angular/core'

import { Item } from './item'
import { ItemService } from './item.service'
import { GoogleSignin } from '@nativescript/google-signin';

import { registerElement } from '@nativescript/angular';
registerElement('GoogleSignInButton', () => require('@nativescript/google-signin').GoogleSignInButton);

import { firebase } from '@nativescript/firebase-core'
// import '@nativescript/firebase-messaging'; // only needs to be imported 1x
// import '@nativescript/firebase-database'; // only needs to be imported 1x
import '@nativescript/firebase-auth'; // only needs to be imported 1x

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<Item>

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems()


    firebase().initializeApp().then(() => {
      console.warn('🔥 Firebase initialized');
    }).catch(error => {
      console.error('🔥 Firebase initialization error: ', error)
    });

  }
  loginWithGoogle() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log("GoogleSignin signin success")
          // const credential = GoogleAuthProvider.credential(user.idToken, user.accessToken);

          // firebase()
          //     .auth()
          //     .signInWithCredential(credential)
          //     .then((userCredential: UserCredential) => {
          //         this.getToken(userCredential.user).then((token: string) => {
          //             console.log('FirebaseService::loginGoogle(), token: ' + JSON.stringify(token));
          //             resolve(token);
          //         });
          //     })
          //     .catch((error) => {
          //         console.log("FirebaseService::loginGoogle::signInWithCredential " + error);

          //         reject(error);
          //     });
      })
      .catch((error) => {
          // console.log("FirebaseService::loginGoogle::GoogleSignin.signIn " + error);
          // reject(error);
      });
  }
}
