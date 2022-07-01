export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    private _token: string,
  ) {}

  get token() {
    if (!this._token) {
      return null;
    }

    return this._token;
  }

  set firstN(firstName: string) {
    this.firstName = firstName;
  }

  set lastN(lastName: string) {
    this.lastName = lastName;
  }
}
