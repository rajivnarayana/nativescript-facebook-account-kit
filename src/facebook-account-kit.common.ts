import { Observable } from 'tns-core-modules/data/observable';

export enum AccountKitResponseType {
    AccessToken,
    AuthorizationCode
}

export interface AccountKitOptions {
    enableSendToFacebook : boolean,
    enableGetACall : boolean,
    whitelistedCountryCodes : Array<string>,
    blacklistedCountryCodes : Array<string>,
    defaultCountryCode : string,
    prefillPhoneNumber : string,
    prefillCountryCode : string,
    presentAnimated : boolean
}

export const AccountKitDefaultOptions : AccountKitOptions = {
    enableGetACall : true,
    enableSendToFacebook : true,
    presentAnimated : true,
    whitelistedCountryCodes : null,
    blacklistedCountryCodes : null,
    prefillCountryCode : null,
    prefillPhoneNumber : null,
    defaultCountryCode : "US"
}

export class Common extends Observable {

    constructor(responseType : AccountKitResponseType) {
        super();
    }

    loginWithPhoneNumber(options :AccountKitOptions) {
    }
}
