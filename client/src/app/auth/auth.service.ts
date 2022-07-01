import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';

interface ResponseData {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

interface RequestData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get isUserAutheticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  get user() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  register(userForm: RequestData) {
    let user: User;

    return this.http.post<ResponseData>(this.baseUrl + 'user/register', {
      username: userForm.username,
      password: userForm.password,
      email: userForm.email,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      role: 'User',
    });
  }

  login(userForm: RequestData) {
    let user: User;

    return this.http
      .post<ResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: userForm.email,
          password: userForm.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        take(1),
        // switchMap((userData) => {
        //   const expirationTime = new Date(
        //     new Date().getTime() + +userData.expiresIn * 1000
        //   );

        //   user = new User(
        //     userData.localId,
        //     userData.email,
        //     userData.idToken,
        //     expirationTime
        //   );

        //   return this.http.get<UserData>(
        //     `https://budget-management-3ca84-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="userId"&equalTo="${user.id}"&auth=${user.token}`
        //   );
        // }),
        map((additionalUserData) => {
          for (const key in additionalUserData) {
            if (additionalUserData.hasOwnProperty(key)) {
              user.firstN = additionalUserData[key].firstName;
              user.lastN = additionalUserData[key].lastName;
            }
          }

          this._user.next(user);
        })
      );
  }

  logout() {
    this._user.next(null);
  }
}
