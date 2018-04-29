import { Common } from './facebook-account-kit.common';

export declare enum AccountKitResponseType {
  AccessToken = 0,
  AuthorizationCode = 1,
}
export interface AccountKitOptions {
  enableSendToFacebook: boolean;
  enableGetACall: boolean;
  whitelistedCountryCodes: Array<string>;
  blacklistedCountryCodes: Array<string>;
  defaultCountryCode: string;
  prefillPhoneNumber: string;
  prefillCountryCode: string;
  presentAnimated: boolean;
}
export declare const AccountKitDefaultOptions: AccountKitOptions;

export declare class FacebookAccountKit extends Common {
  constructor(responseType : AccountKitResponseType);
  loginWithPhoneNumber(options: any): Promise<never>;
  loginWithEmail(): void;
  logout(): void;
}
