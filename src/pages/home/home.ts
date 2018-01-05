import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { WooCommerceProvider } from '../../providers/woo-commerce/woo-commerce';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";


  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page =2;
  
    this.WooCommerce = WC({
    url: "http://washerman.ng/order/",
    consumerKey: "ck_9cdb911e141e2b627bf8aa534b059c528652d961",
    consumerSecret: "cs_ca703587fcc41b5d575a0e99d4941d01fcf24425",
  });
  
  
  this.loadMoreProducts(null);

  this.WooCommerce.getAsync("products").then( (data) => {
    console.log(JSON.parse(data.body));
    this.products = JSON.parse(data.body).products;
  }, (err) => {
    console.log(err)
  })

}

ionViewDidLoad(){
  setInterval(()=> {

    if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
      this.productSlides.slideTo(0);

    this.productSlides.slideNext();
  }, 3000)
}

loadMoreProducts(event){
  console.log(event);
  if(event == null)
  {
    this.page = 2;
    this.moreProducts = [];
  }
  else
    this.page++;

  this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
    console.log(JSON.parse(data.body));
    this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

    if(event != null)
    {
      event.complete();
    }

    if(JSON.parse(data.body).products.length < 10){
      event.enable(false);

      this.toastCtrl.create({
        message: "No more products!",
        duration: 5000
      }).present();

    }


  }, (err) => {
    console.log(err)
  })
}

openProductPage(product){
  this.navCtrl.push('ProductDetailsPage', {"product": product} );
}

onSearch(event){
  if(this.searchQuery.length > 0){
    this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
  }
}

}