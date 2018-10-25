import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  btn: boolean = true;
  match: boolean;
  isFValid: boolean;
  isLValid: boolean;
  message: string = null;
  searches: any[];

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

  searchFullName() {
    if (this.firstName.length === 0 || this.lastName.length === 0) {
      return;
    }

    this.dashboardService.searchFName(this.firstName).subscribe(
      (itemFirstName) => {
        this.isFValid = (itemFirstName == true ? true : false);
        console.log(`first name: ${this.firstName}-->${itemFirstName}`);

        // check if last name is valid
        this.dashboardService.searchLName(this.lastName).subscribe(
          (itemLastName) => {
            this.isLValid = (itemLastName == true ? true : false);
            console.log(`last name: ${this.lastName} -> ${itemLastName}`);
            this.dashboardService.recordSearch(this.firstName, this.lastName);
             // construct the message
            if (this.isFValid && this.isLValid) {
              this.message = `${this.firstName} ${this.lastName} is a valid name!`;
            }else {
              this.message = `${this.firstName} ${this.lastName} is not a valid name, hit "Add New Name" to add!`;
            }
            if (this.isFValid && this.isLValid) {
              this.btn = true;
            } else {
              this.btn = false;
            }
          }
        );
      }
    );
  }

  addName() {
    if (!this.match) {
      this.dashboardService.addName(this.firstName, this.lastName);
    } else {
        console.log(`${this.firstName} ${this.lastName} already exists!`);
    }
  }
  updateSearchHistory() {
    this.dashboardService.updateSearchHistory(this.firstName, this.lastName).then(
      (_) => {},
      (error) => {}
    );
  }

}
