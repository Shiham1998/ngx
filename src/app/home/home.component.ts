import { Component, OnInit } from '@angular/core';
import {
  counterdata
} from 'src/assets/_outlet-json/counter';
import {
  entrydata
} from 'src/assets/_outlet-json/entry';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  counterList!: any[];
  entryList!: any[];
  
  constructor() { }

  ngOnInit(): void {
    this.counterList = counterdata
    this.entryList = entrydata
    console.log(this.counterList)
  }

}
