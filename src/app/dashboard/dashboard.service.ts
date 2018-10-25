import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  key = new BehaviorSubject<string>(null);

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
  searchFName(firstName: string) {
    return this.db.object(`firstNames/${firstName}`).valueChanges();
  }
  searchLName(lastName: string) {
    return this.db.object(`lastNames/${lastName}`).valueChanges();
  }
  addName(fName: string, lName: string) {
    this.db.list('/firstNames').set(fName, true);
    this.db.list('/lastNames').set(lName, true);
  }
  updateSearchHistory(firstName: string, lastName: string) {
    return this.searchHistoryRef.push({firstName: firstName, lastName: lastName});
  }
  recordSearch(firstName: string, lastName: string) {
    this.searchHistoryRef.push({firstName: firstName, lastName: lastName});
  }
}
