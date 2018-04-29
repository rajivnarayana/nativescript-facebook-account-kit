import { Observable } from 'tns-core-modules/data/observable';
import { FacebookAccountKit, AccountKitResponseType } from 'nativescript-facebook-account-kit';

export class HelloWorldModel extends Observable {
  public authCode: string;
  private facebookAccountKit: FacebookAccountKit;

  constructor() {
    super();
    this.facebookAccountKit = new FacebookAccountKit(AccountKitResponseType.AuthorizationCode);
    this.authCode = "Authorization Code will show up after successful login";
  }

  launchAccountKit() {
    this.facebookAccountKit.loginWithPhoneNumber({
      preFillPhoneNumber : "9550259566", 
      defaultCountryCode : "IN",
      whitelistedCountryCodes : ["IN"],
      blacklistedCountryCodes : [],
      enableGetACall : true,
      presentAnimated : false,
    }).then(authCode => {
      this.authCode = authCode;
      console.log(authCode);
    }, error => {
      this.authCode = error.message;
      console.error(error);
    });
  }
}
