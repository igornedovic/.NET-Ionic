import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from './user.model';
import { BehaviorSubject, from } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

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
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
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
          return user.userId;
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
      .pipe(
        tap((response) => {
          user = new User(
            response.userId,
            response.username,
            response.email,
            response.firstName,
            response.lastName,
            response.role,
            response.token
          );

          this.storeAuthData(
            user.userId,
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.role,
            user.token
          );

          this._user.next(user);
        })
      );
  }

  updateProfile(id: number, requestData: RequestData) {
    let userToUpdate: User;

    return this.user.pipe(
      tap((user) => {
        userToUpdate = user;
      }),
      take(1),
      switchMap(() => {
        return this.http.put(
          this.apiUrl + `user/${id}`,
          {
            firstName: requestData.firstName,
            lastName: requestData.lastName,
            email: requestData.email,
            username: requestData.username,
          },
          {
            responseType: 'text',
          }
        );
      }),
      tap((response) => {
        if (response.toLowerCase().includes('success')) {
          userToUpdate.firstName = requestData.firstName;
          userToUpdate.lastName = requestData.lastName;
          userToUpdate.email = requestData.email;
          userToUpdate.username = requestData.username;

          this.storeAuthData(
            userToUpdate.userId,
            userToUpdate.username,
            userToUpdate.email,
            userToUpdate.firstName,
            userToUpdate.lastName,
            userToUpdate.role,
            userToUpdate.token
          );

          this._user.next(userToUpdate);
        }

        return response;
      })
    );
  }

  autoLogin() {
    return from(Preferences.get({ key: 'authData' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parsedData = JSON.parse(storedData.value) as {
          userId: number;
          username: string;
          email: string;
          firstName: string;
          lastName: string;
          role: string;
          token: string;
        };

        const user = new User(
          parsedData.userId,
          parsedData.username,
          parsedData.email,
          parsedData.firstName,
          parsedData.lastName,
          parsedData.role,
          parsedData.token
        );

        return user;
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
    userId: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    token: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: role,
      token: token,
    });
    Preferences.set({ key: 'authData', value: data });
  }

  logout() {
    this._user.next(null);
    Preferences.remove({ key: 'authData' });
  }
}
