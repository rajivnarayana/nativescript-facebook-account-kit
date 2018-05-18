# Facebook Account Kit plugin for NativeScript (Unofficial)

This plugin is a wrapper in {N} around the native facebook's Account Kit's iOS and Android plugins.

Refer to facebook's [docs](https://developers.facebook.com/docs/accountkit/) to understand how Account Kit works and how to set it up on Facebook's developer portal.

## Installation

```shell
tns plugin add nativescript-facebook-account-kit
```

### iOS
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

### Android
On `Android`, Add the following to `AndroidManifest.xml` inside the `<application>` tag.
```xml
	<meta-data android:name="com.facebook.accountkit.ApplicationName"
				android:value="@string/app_name" />
		<meta-data android:name="com.facebook.sdk.ApplicationId"
				android:value="@string/FACEBOOK_APP_ID" />
		<meta-data android:name="com.facebook.accountkit.ClientToken"
				android:value="@string/ACCOUNT_KIT_CLIENT_TOKEN" />

		<activity android:name="com.facebook.accountkit.ui.AccountKitActivity" >
			<intent-filter>
					<action android:name="android.intent.action.VIEW" />
				<category android:name="android.intent.category.DEFAULT" />
				<category android:name="android.intent.category.BROWSABLE" />
				<data android:scheme="ak<Your Facebook app id>" />
			</intent-filter>
		</activity>
    
```

Add the following as your `strings.xml` file under `app/App_Resources/Android/src/main/res/values/strings.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:android="http://schemas.android.com/apk/res/android">
    <string name="app_name">Your App Name </string>
    <string name="title_activity_kimera">Your App name</string>
    <string name="FACEBOOK_APP_ID">FACEBOOK_APP_ID</string>
    <string name="ACCOUNT_KIT_CLIENT_TOKEN">ACCOUNT_KIT_CLIENT_TOKEM</string>
</resources>
```

## Usage 

Initialize the plugin with the response type you seek either `AuthorizationCode` or `AccessToken`
```typescript
import { FacebookAccountKit, AccountKitResponseType } from 'nativescript-facebook-account-kit';
const facebookAccountKit = new FacebookAccountKit(AccountKitResponseType.AuthorizationCode);
```
```typescript
const options : AccountKitOptions = {
      prefillPhoneNumber : "9XXXX12345", 
      prefillCountryCode : "91",
      defaultCountryCode : "IN",
      whitelistedCountryCodes : ["IN"],
      blacklistedCountryCodes : [],
      enableGetACall : true,
      presentAnimated : false,
      enableSendToFacebook : true
    };
    this.facebookAccountKit.loginWithPhoneNumber(options).then(authCode => {
      this.authCode = authCode;
      console.log(authCode);
    }, error => {
      this.authCode = error.message;
      console.error(error);
    });
```

## API
    
| Method | Description | Return type |
| --- | --- | --- |
| loginWithPhoneNumber | Use account kit login flow with lot of options. | A promise that resolves to either authorization code or access token. |
| loginWithEmail | Use account kit email flow. | A promise that resolves to either authorization code or access token. |

## License

Apache License Version 2.0, January 2004
