import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  static UNKNOWN_USER = new AuthInfo(null);
  db = firebase.firestore();
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(ApisService.UNKNOWN_USER);
  constructor(
    private fireAuth: AngularFireAuth,
    private adb: AngularFirestore,
    private http: HttpClient
  ) { }

  public checkAuth() {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth.onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          localStorage.setItem('uid', user.uid);
          resolve(user);
        } else {
          // this.logout();
          const lng = localStorage.getItem('language');
          const selectedCity = localStorage.getItem('selectedCity');
          localStorage.clear();
          localStorage.setItem('language', lng);
          localStorage.setItem('selectedCity', selectedCity);
          resolve(false);
        }
      });
    });
  }
  
  

  public getVenueDetails(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').doc(id).get().subscribe((venue: any) => {
        resolve(venue.data());
      }, error => {
        reject(error);
      });
    });
  }

  public getVenueCategories(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('categories', ref => ref.where('uid', '==', id)).get().subscribe((venue) => {
        var data = venue.docs.map(element => {
          var item = element.data();
          item.id = element.id;
          return item;
        })
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getFoods(uid: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('foods').doc(uid).collection('all').get().then((data) => {
        var users = data.docs.map(doc => {
          var item = doc.data();
          item.cid.get().then(function (doc) {
            item.cid = doc.data();
            item.cid.id = doc.id;
          });
          item.id = doc.id;
          return item;
        });
        resolve(users);
      }, error => {
        reject(error);
      });
    });
  }

  httpPost(url, body) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${environment.stripe.sk}`)
    };
    const order = this.JSON_to_URLEncoded(body);
    console.log(order)
    return this.http.post(url, order, header);
  }

  httpGet(url) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${environment.stripe.sk}`)
    };

    return this.http.get(url, header);
  }

  JSON_to_URLEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element == "object") {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + "[" + idx + "]" : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + "=" + encodeURIComponent(element));
    }
    return new_list.join("&");
  }
}
