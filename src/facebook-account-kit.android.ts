import { android as native, AndroidApplication, AndroidActivityResultEventData } from "tns-core-modules/application";
import { Common, AccountKitOptions, AccountKitResponseType } from './facebook-account-kit.common';

declare const com : any;

export class FacebookAccountKit extends Common {
    
    private _resolve;
    private _reject;
    
    constructor(public responseType : AccountKitResponseType) {
        super(responseType);
    }

    loginWithPhoneNumber(options : AccountKitOptions) {
        return new Promise((resolve, reject) => {
            const Intent = android.content.Intent;
            const Activity = android.app.Activity;
            const AccountKit = com.facebook.accountkit.AccountKit;
            const PhoneNumber = com.facebook.accountkit.PhoneNumber;
            const AccountKitActivity = com.facebook.accountkit.ui.AccountKitActivity;
            const AccountKitConfiguration = com.facebook.accountkit.ui.AccountKitConfiguration;
            const LoginType = com.facebook.accountkit.ui.LoginType;
            const SkinManager = com.facebook.accountkit.ui.SkinManager;
            const AccountKitLoginResult = com.facebook.accountkit.AccountKitLoginResult;
            const APP_REQUEST_CODE = 3121;//Som random number so we don't conflict with existing codes.
            
            const intent = new Intent(native.foregroundActivity, AccountKitActivity.class);
            const configurationBuilder = new AccountKitConfiguration.AccountKitConfigurationBuilder(
                LoginType.PHONE,
                this.responseType == AccountKitResponseType.AuthorizationCode ? AccountKitActivity.ResponseType.CODE : AccountKitActivity.ResponseType.TOKEN);
            
                // ... perform additional configuration ...

            // enableGetACall : boolean, May be not an option for Android sdk.

            configurationBuilder.setFacebookNotificationsEnabled(options.enableSendToFacebook);
            configurationBuilder.setSMSWhitelist(options.whitelistedCountryCodes);
            configurationBuilder.setSMSBlacklist(options.blacklistedCountryCodes);
            if (options.defaultCountryCode) {
                configurationBuilder.setDefaultCountryCode(options.defaultCountryCode);
            }
            if (options.prefillPhoneNumber) {
                configurationBuilder.setInitialPhoneNumber(new PhoneNumber(options.prefillCountryCode || "1", options.prefillPhoneNumber));
            }
            if (options.primaryColor) {
                configurationBuilder.setUIManager(new SkinManager(SkinManager.Skin.CLASSIC, options.primaryColor.android));
            }
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
                        const loginResult = AccountKit.loginResultWithIntent(data);

                        if (loginResult.getError() != null) {
                            reject(new Error(loginResult.getError().getErrorType().getMessage()));
                        } else if (loginResult.wasCancelled()) {
                                    reject(new Error("User cancelled login"));
                        } else {
                            const authorizationCode = loginResult.getAuthorizationCode();
                            const accessToken = loginResult.getAccessToken();
                            if (this.responseType == AccountKitResponseType.AuthorizationCode) {
                                resolve(authorizationCode);
                            } else {
                                resolve(accessToken);
                            }
                        }
            
                    }else if (resultCode == Activity.RESULT_CANCELED){
                        reject(new Error("User cancelled login"));
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