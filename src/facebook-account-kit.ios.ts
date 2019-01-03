import { Common, AccountKitResponseType, AccountKitDefaultOptions } from './facebook-account-kit.common';
import { Page } from "tns-core-modules/ui/page";
import { topmost } from "tns-core-modules/ui/frame";

export declare interface AKFViewControllerDelegate {};
declare const AKFViewControllerDelegate : any;
declare const AKFAccountKit : any;
declare const AKFPhoneNumber : any;
declare const AKFResponseTypeAuthorizationCode : any;
declare const AKFResponseTypeAccessToken : any;
declare const AKFConfiguring : any;

export class LoginViewControllerDelegate extends NSObject implements AKFViewControllerDelegate {
    public static ObjCProtocols = [ AKFViewControllerDelegate ];
    private _plugin: FacebookAccountKit;

    viewControllerDidCancel(viewController : UIViewController) {
        this._plugin.cancelled();
    }

    viewControllerDidCompleteLoginWithAccessTokenState(viewController : UIViewController, accessToken : any, state:string) {
        this._plugin.doneWithAccessToken(accessToken, state);
    }
    
    viewControllerDidCompleteLoginWithAuthorizationCodeState(viewController : UIViewController, authorizationCode : any, state:string) {
        this._plugin.doneWithAuthorizationCode(authorizationCode, state);
    }

    viewControllerDidFailWithError(viewController : UIViewController, error:any) {
        console.error(error);
    }

    public initWith(p:FacebookAccountKit): LoginViewControllerDelegate {
        this._plugin = p;
        return this;
    }
}

function setPropertyValue(object, propertyName, value) {
    // console.log(propertyName, value);
    object.performSelectorWithObject("set" + propertyName.charAt(0).toUpperCase() + propertyName.substr(1) + ":", value);
}

function setBooleanPropertyValue(object, propertyName, value) {
    const methodSignature = NSMethodSignature.signatureWithObjCTypes("v@:c");
    const invocation = NSInvocation.invocationWithMethodSignature(methodSignature);
    invocation.selector = "set" + propertyName.charAt(0).toUpperCase() + propertyName.substr(1) + ":";
    const valueReference = new interop.Reference(interop.types.bool, value);
    invocation.setArgumentAtIndex(valueReference, 2);
    invocation.invokeWithTarget(object);
}

export class FacebookAccountKit extends Common {

    private _resolve;
    private _reject;
    private _accountKit : any;
    private _viewController;
    private _delegate : LoginViewControllerDelegate;

    constructor(responseType : AccountKitResponseType) {
        super(responseType);
        this._accountKit = AKFAccountKit.alloc().initWithResponseType(responseType == AccountKitResponseType.AuthorizationCode ? AKFResponseTypeAuthorizationCode : AKFResponseTypeAccessToken);
    }

    private get currentPage():Page{
        return topmost().currentPage;
    }

    private cleanup() {
        this._reject = null;
        this._resolve = null;
        this._viewController = null;
        this._delegate = null;
    }

    public doneWithAccessToken(accessToken, state) {
        this._resolve(accessToken, state);
        this.cleanup();
    }
    
    public doneWithAuthorizationCode(authorizationCode, state) {
        console.log("Authorization code");
        this._resolve(authorizationCode, state);
        this.cleanup();
    }
    
    public cancelled() {
        this._reject(new Error("User cancelled login"));
        this.cleanup();
    }
    
    public error(error = null) {
        this.cleanup();
    }


    private prepareAndPresentLoginViewController(options) {
        options = Object.assign({}, AccountKitDefaultOptions, options);
        const akfPhoneNumber = (options.preFillPhoneNumber)? new AKFPhoneNumber().initWithCountryCodePhoneNumber(options.prefillCountryCode || "1", options.prefillPhoneNumber) : null;
        this._viewController = this._accountKit.viewControllerForPhoneLoginWithPhoneNumberState(akfPhoneNumber, null);
        this._delegate = new LoginViewControllerDelegate().initWith(this);
        this._viewController.delegate = this._delegate;
        setBooleanPropertyValue(this._viewController, "enableSendToFacebook", options.enableSendToFacebook);
        setBooleanPropertyValue(this._viewController,"enableGetACall",options.enableGetACall);
        if (options.whitelistedCountryCodes) {
            // this._viewController.performSelectorWithObject("setWhitelistedCountryCodes:", options.whitelistedCountryCodes);
            setPropertyValue(this._viewController, "whitelistedCountryCodes",options.whitelistedCountryCodes);
        }
        if (options.blacklistedCountryCodes) {
            setPropertyValue(this._viewController, "blacklistedCountryCodes", options.blacklistedCountryCodes);
        }
        if (options.defaultCountryCode && options.whitelistedCountryCodes && options.whitelistedCountryCodes.length > 1) {
            //FIXME: Cannot set this value.
            try {
                // console.log(NSClassFromString("WASetter"));
                // setPropertyValue(this._viewController, "defaultCountryCode", options.defaultCountryCode);

            } catch (e) {
                console.error(e);
            }
            // console.log(Object.getOwnPropertyNames(AKFConfiguring.prototype));
            // console.log(AKFConfiguring.prototype.defaultCountryCode.call(this._viewController, options.defaultCountryCode));
            // descriptor.value = "IN";
        }
        this.currentPage.ios.presentViewControllerAnimatedCompletion(this._viewController, options.presentAnimated, null);
    }

    loginWithPhoneNumber(options) {
        if (this._resolve || this._reject) {
            return Promise.reject(new Error("Selection is already in progress..."));
        } else {
            return new Promise<any>((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
                this.prepareAndPresentLoginViewController(options);
            });
        }
    }

    loginWithEmail() {

    }

    logout() {

    }
}

export { AccountKitResponseType, AccountKitDefaultOptions} from "./facebook-account-kit.common";
