import { Observable } from 'tns-core-modules/data/observable';
import { FacebookAccountKit, AccountKitResponseType, AccountKitOptions } from 'nativescript-facebook-account-kit';
import { Color } from 'tns-core-modules/color/color';

export class HelloWorldModel extends Observable {
  public authCode: string;
  private facebookAccountKit: FacebookAccountKit;

  constructor() {
    super();
    this.facebookAccountKit = new FacebookAccountKit(AccountKitResponseType.AuthorizationCode);
    this.authCode = "Authorization Code will show up after successful login";
  }

  launchAccountKit() {
    const options : AccountKitOptions = {
      prefillPhoneNumber : "9550259567", 
      prefillCountryCode : "91",
      defaultCountryCode : "IN",
      whitelistedCountryCodes : ["IN","US"],
      blacklistedCountryCodes : [],
      enableGetACall : true,
      presentAnimated : false,
      enableSendToFacebook : true,
      primaryColor : new Color("#be1e2d")
    };
    this.facebookAccountKit.loginWithPhoneNumber(options).then(authCode => {
      this.authCode = authCode;
      console.log(authCode);
    }, error => {
      this.authCode = error.message;
      console.error(error);
    });
  }
}
