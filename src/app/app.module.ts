import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";

import { CartPage } from '../pages/cart/cart';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WooCommerceProvider } from '../providers/woo-commerce/woo-commerce';
import { HttpModule, Http } from '@angular/http';
import { PagesProvider } from '../providers/pages/pages';
import { WpApiModule, WpApiLoader, WpApiStaticLoader } from "wp-api-angular";

export function WpApiLoaderFactory(http) {
  return new WpApiStaticLoader(http, 'http://washerman.ng/order/wp-json/');
}


@NgModule({
  declarations: [
    MyApp,
    CartPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    WpApiModule.forRoot({
  provide: WpApiLoader,
  useFactory: (WpApiLoaderFactory),
  deps: [Http]
}),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WooCommerceProvider,
    PagesProvider
  ]
})
export class AppModule {}
