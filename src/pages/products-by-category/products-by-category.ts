import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
/**
 * Generated class for the ProductsByCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;
  slug: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.WooCommerce = WC({
      url: "http://washerman.ng/order/",
      consumerKey: "ck_9cdb911e141e2b627bf8aa534b059c528652d961",
      consumerSecret: "cs_ca703587fcc41b5d575a0e99d4941d01fcf24425",
    });

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event) {
    this.page++;
    console.log("Getting page " + this.page);
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
      console.log(data.body);

      this.products = this.products.concat(JSON.parse(data.body).products)
      console.log(this.products);
      event.complete();

/*       if (temp.length < 10)
        event.enable(false); */
    })
  }

  openProductPage(product){
    this.navCtrl.push('ProductDetailsPage', {"product": product} );
  }

}