import { Common, AccountKitOptions } from './facebook-account-kit.common';
export { AccountKitOptions, AccountKitDefaultOptions } from './facebook-account-kit.common';

export declare enum AccountKitResponseType {
  AccessToken = 0,
  AuthorizationCode = 1,
}

export declare class FacebookAccountKit extends Common {
  constructor(responseType : AccountKitResponseType);
  loginWithPhoneNumber(options: AccountKitOptions): Promise<never>;
  loginWithEmail(): void;
  logout(): void;
}
