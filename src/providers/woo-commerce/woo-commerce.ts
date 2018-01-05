import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

/*
  Generated class for the WooCommerceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WooCommerceProvider {

  WooCommerce: any;

  constructor(public http: HttpClient) {

    this.WooCommerce = WC({
    url: "http://washerman.ng/order/",
    consumerKey: "ck_9cdb911e141e2b627bf8aa534b059c528652d961",
    consumerSecret: "cs_ca703587fcc41b5d575a0e99d4941d01fcf24425",
  });

  }


  initialize(){
    return this.WooCommerce;
  }

}



