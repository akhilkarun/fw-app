import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { HttpService } from './http.service';

declare const window: any;

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private internalConnectionChanged = new Subject<boolean>();
  public employee = new BehaviorSubject<any>(null);
  public language = 'en';
  public language$ = new BehaviorSubject('en');
  public mode$ = new BehaviorSubject('pos');
  public barcodeFocus$ = new BehaviorSubject('focus');
  public refreshOrder = new Subject<boolean>();
  private source = interval(5000);
  private last_previous_online_status = true;
  constructor(private http: HttpService) {
    // if(localStorage.getItem('language')) {
    //   this.language$.next(localStorage.getItem('language'));
    //   this.language = localStorage.getItem('language');
    // }
    this.source.subscribe(() => {
      this.http.ping()
        .pipe(first())
        .subscribe(
          resp => {
            if (resp.status === 200) {
              if(this.last_previous_online_status === false) {
                this.last_previous_online_status = true;
                this.internalConnectionChanged.next(true);
              }
            } else {
                if(this.last_previous_online_status === true) {
                  this.last_previous_online_status = false;
                  this.internalConnectionChanged.next(false);
                }
              }
          },
          err => {
            if(this.last_previous_online_status === true) {
              this.last_previous_online_status = false;
              this.internalConnectionChanged.next(false)
            }
          }
        );
    });
  }

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  get isOnline() {
    return !!window.navigator.onLine;
  }
  setEmployee(employee: any) {
    this.employee.next(employee);
  }

  getEmployee() {
    return this.employee.asObservable().pipe(filter(data => data),map(data => data));
  }

  private updateOnlineStatus(online = true) {
    this.internalConnectionChanged.next(online);
  }
  syncOfflineOrders(){
    return true;
  }
}
