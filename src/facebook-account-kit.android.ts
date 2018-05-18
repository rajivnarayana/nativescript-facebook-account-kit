import { android as native, AndroidApplication, AndroidActivityResultEventData } from "tns-core-modules/application";
import { Common, AccountKitOptions, AccountKitResponseType } from './facebook-account-kit.common';

declare const com : any;

export class FacebookAccountKit extends Common {
    
    private _resolve;
    private _reject;
    
    constructor(responseType : AccountKitResponseType) {
        super(responseType);
    }
    loginWithPhoneNumber(options : AccountKitOptions) : Promise<string> {
        console.log(com.facebook.accountkit.ui);
        return Promise.resolve("fake code");
    }

    _loginWithPhoneNumber(options : AccountKitOptions) {
        return new Promise((resolve, reject) => {
            const Intent = android.content.Intent;
            const Activity = android.app.Activity;
            const AccountKit = com.facebook.accountkit.AccountKit;
            const AccountKitActivity = com.facebook.accountkit.ui.AccountKitActivity;
            const AccountKitConfiguration = com.facebook.accountkit.ui.AccountKitConfiguration;
            const LoginType = com.facebook.accountkit.ui.LoginType;
            const AccountKitLoginResult = com.facebook.accountkit.AccountKitLoginResult;
            const APP_REQUEST_CODE = 3121;
            
            const intent = new Intent(native.foregroundActivity, AccountKitActivity.class);
            const configurationBuilder = new AccountKitConfiguration.AccountKitConfigurationBuilder(
                LoginType.PHONE,
                AccountKitActivity.ResponseType.TOKEN); // or .ResponseType.TOKEN
            // ... perform additional configuration ...

            // enableSendToFacebook : boolean,
            // enableGetACall : boolean,
            // whitelistedCountryCodes : Array<string>,
            // blacklistedCountryCodes : Array<string>,
            // defaultCountryCode : string,
            // prefillPhoneNumber : string,
            // prefillCountryCode : string,
            // presentAnimated : boolean

            intent.putExtra(
            AccountKitActivity.ACCOUNT_KIT_ACTIVITY_CONFIGURATION,
            configurationBuilder.build());

            native.on(AndroidApplication.activityResultEvent, onResult, this);
            function onResult(args) {
                var requestCode = args.requestCode;
                var resultCode = args.resultCode;
                var data = args.intent;
           
                if (requestCode == APP_REQUEST_CODE) {
                    native.off(AndroidApplication.activityResultEvent, onResult, this);
                    if (resultCode == Activity.RESULT_OK){
                        const loginResult = data.getParcelableExtra(AccountKitLoginResult.RESULT_KEY);

                        if (loginResult.getError() != null) {
                            reject(new Error(loginResult.getError().getErrorType().getMessage()));
                        } else if (loginResult.wasCancelled()) {
                            resolve(new Error("User cancelled login"));
                        } else {
                            if (loginResult.getAccessToken() != null) {
                                resolve(loginResult.getAccessToken());
                            } else {
                                resolve(loginResult.getAuthorizationCode());
                                // map.putString("state", loginResult.getFinalAuthorizationState());
                            }
                        }
            
                    }else if (resultCode == Activity.RESULT_CANCELED){
                        resolve(new Error("User cancelled login"));
                    }else{
                        reject(new Error("Failed login with resultCode " + resultCode));
                    }
                }
            }
            native.foregroundActivity.startActivityForResult(intent, APP_REQUEST_CODE);
        });
    }
}

export { AccountKitResponseType, AccountKitDefaultOptions} from "./facebook-account-kit.common";