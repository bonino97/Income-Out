export class User {
  static FirebaseUserInstance({ uid, name, email }) {
    return new User(uid, name, email);
  }
  constructor(public uid: string, public name: string, public email: string) {}
}
