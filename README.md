# Facebook Account Kit plugin for NativeScript (Unofficial)

This plugin is a wrapper in {N} around the native facebook's Account Kit's iOS and Android plugins.

Refer to facebook's [docs](https://developers.facebook.com/docs/accountkit/) to understand how Account Kit works and how to set it up on Facebook's developer portal.

## Installation

```shell
tns plugin add nativescript-facebook-account-kit
```

On `iOS`, Add the following to your `Info.plist` found under `/app/App_Resources/iOS` somewhere inside `<dict />`
```xml
    <key>FacebookAppID</key>
	<string><!--Your app id from developer portal--></string>
	<key>AccountKitClientToken</key>
	<string><!--Client token from dev portal--></string>
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>ak<!--Your app id from developer portal--></string>
			</array>
		</dict>
	</array>
```
## Usage 

Initialize the plugin with the response type you seek either `AuthorizationCode` or `AccessToken`
```typescript
import { FacebookAccountKit, AccountKitResponseType } from 'nativescript-facebook-account-kit';
const facebookAccountKit = new FacebookAccountKit(AccountKitResponseType.AuthorizationCode);
```
```typescript
try {
    const authCode =
    await facebookAccountKit.loginWithPhoneNumber({
      preFillPhoneNumber : "9XXXX12345", 
      defaultCountryCode : "IN",
      whitelistedCountryCodes : ["IN"],
      blacklistedCountryCodes : [],
      enableGetACall : true,
      presentAnimated : false,
    });
    console.log(authCode);
} catch (error) {
    console.error(error);
}
```

## API
    
| Method | Description | Return type |
| --- | --- | --- |
| loginWithPhoneNumber | Use account kit login flow with lot of options. | A promise that resolves to either authorization code or access token. |
| loginWithEmail | Use account kit email flow. | A promise that resolves to either authorization code or access token. |

## License

Apache License Version 2.0, January 2004
