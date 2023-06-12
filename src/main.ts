import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';
import { GoogleSignin } from '@nativescript/google-signin';

GoogleSignin.configure({})
.then(() => {
  console.warn('GoogleSignin configured');
}).catch(error => {
  console.error('GoogleSignin configuration error: ', error);
});
runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

