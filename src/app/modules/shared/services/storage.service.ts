import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageNativeService } from './storage-native.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _localStorage: Storage;
  private _data$ = new BehaviorSubject<any>(null);
  public data$ = this._data$.asObservable();

  constructor(private _localStorageNative: StorageNativeService) { 
    this._localStorage = _localStorageNative.localStorage;
  }

  async setItem(data: any) {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem('user', jsonData);
    this._data$.next(data);
  }

  async getItem(key: string) {
    const data = await JSON.parse(this._localStorage.getItem(key)!);
    this._data$.next(data);
    return data;
  }

}
