import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  base_url = environment.baseUrl;
  deliveryPartners = [];
  cardItems = [];
  prepUsers = [];
  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(this.base_url + `api/pos/products`);
  }
  getCategories() {
    return this.http.get(this.base_url + `api/pos/categories`);
  }
  getCompanyInfo() {
    return this.http.get(this.base_url + `api/pos/company-info`);
  }
  addCustomer(data: any) {
    return this.http.post(this.base_url + `api/pos/customer`, data);
  }
  searchCutomer(term: any) {
    const param = {
      key:'phone',
      value:term
    };
    return this.http.get(this.base_url + `api/pos/customer`, {params: param});
  }
  getEmployee() {
    return this.http.get(this.base_url + `api/pos/user`);
  }
  createOrder(order: any) {
    return this.http.post(this.base_url + `api/pos/order`, order);
  }
  shipmentlist() {
    if(this.deliveryPartners.length){
      return of(this.deliveryPartners);
    }
    return this.http.get(this.base_url + `api/pos/shipmentlist`).pipe(tap((resp:any) => {
      this.deliveryPartners = resp;
    }));
  }
  cardList() {
    if(this.cardItems.length) {
      return of(this.cardItems);
    }
    return this.http.get(this.base_url + `api/pos/cards`).pipe(tap((resp:any) => {
      this.cardItems = resp;
    }));
  }
  order(param: any) {
    return this.http.get(this.base_url + `api/pos/order`, {params: param});
  }
  invoiceOrder(param: any) {
    return this.http.get(this.base_url + `api/pos/invoice-order`, {params: param});
  }
  openingBalance(data: any) {
    return this.http.post(this.base_url + `api/pos/counter-open`, data);
  }
  counterStatus() {
    return this.http.get(this.base_url + `api/pos/counter-status`);
  }
  counterClose(data: any) {
    return this.http.post(this.base_url + `api/pos/counter-close`, data);
  }
  loyaltyPoint(param: any) {
    return this.http.get(this.base_url + `api/pos/get-loyaltyPoint`, {params: param});
  }
  couponValidate(data: any) {
    return this.http.post(this.base_url + `api/pos/validate-coupon`, data);
  }
  counterIsOpen(){
    return this.http.get(this.base_url + `api/pos/counter-IsOpen`);
  }
  returnOrder(data: any) {
    return this.http.post(this.base_url + `api/pos/order-return`, data);
  }
  orderTypes(){
    return this.http.get(this.base_url + `api/pos/get-order-types`);
  }
  onlineOrderList(type: any) {
    const param = {
      order_type_id:type
    };
    return this.http.get(this.base_url + `api/pos/order`, {params: param});
  }
  getPreperationUsers() {
    // if(this.prepUsers.length){
    //   return of(this.prepUsers);
    // }
    return this.http.get(this.base_url + `api/pos/get-preperation-users?user_role_id=11`).pipe(tap((resp:any) => {
      this.prepUsers = resp;
    }));;
  }
  updateOrderStatus(order_id:any, status_id:any) {
    const data =  {
      order_id,
      status_id
    };
    return this.http.post(this.base_url + `api/pos/order-return`, data);
  }
  deliveryTimes(){
    return this.http.get(this.base_url + `api/pos/store-delivery-times`);
  }
  assignUserOrder(data:any) {
    return this.http.post(this.base_url + `api/pos/assign-order`, data);
  }
  generateInvoice(data:any) {
    return this.http.post(this.base_url + `api/pos/generate-invoice`, data);
  }
  ping() {
    return this.http.get(this.base_url + `api/pos/ping`, { observe: 'response' })
  }
  getStoreReturnUser() {
    return this.http.get(this.base_url + `api/pos/get-return-user`);
  }

  returnUserValidate(data: any) {
    return this.http.post(this.base_url + `api/pos/validate-return-user`, data);
  }

}

