import { Observable } from 'tns-core-modules/data/observable';
import { FacebookAccountKit } from 'nativescript-facebook-account-kit';

export class HelloWorldModel extends Observable {
  public message: string;
  private facebookAccountKit: FacebookAccountKit;

  constructor() {
    super();

    this.facebookAccountKit = new FacebookAccountKit();
    this.message = this.facebookAccountKit.message;
  }
}
