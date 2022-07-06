import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { User } from './user.model';
import { BehaviorSubject, from } from 'rxjs';
import { Storage } from '@capacitor/storage';

interface ResponseData {
  id: number;
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
  apiUrl = environment.apiUrl;
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
    return this.http.post<ResponseData>(this.apiUrl + 'user/register', {
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
      .post<ResponseData>(this.apiUrl + 'user/login', {
        username: userForm.username,
        password: userForm.password,
      })
      .pipe(tap((response) => {
        user = new User(
          response.id,
          response.username,
          response.email,
          response.firstName,
          response.lastName,
          response.role,
          response.token
        );

        this._user.next(user);
      }));
  }

  autoLogin() {
    return from(Storage.get({ key: 'authData' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          email: string;
          token: string;
          tokenExpirationDate: string;
          firstName: string;
          lastName: string;
        };

        const expirationDate = new Date(parsedData.tokenExpirationDate);

        if (expirationDate <= new Date()) {
          return null;
        }

        // const user = new User(
        //   parsedData.userId,
        //   parsedData.email,
        //   parsedData.token,
        //   expirationDate,
        //   parsedData.firstName,
        //   parsedData.lastName
        // );
        //
        // return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  private storeAuthData(
    userId: string,
    email: string,
    token: string,
    tokenExpirationDate: string,
    firstName: string,
    lastName: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      email: email,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      firstName: firstName,
      lastName: lastName,
    });
    Storage.set({ key: 'authData', value: data });
  }

  logout() {
    this._user.next(null);
  }
}
