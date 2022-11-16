import { Component, OnInit } from '@angular/core';
import { Outlet } from 'src/app/models/outlet';
import { HoneybillService } from 'src/app/services/honeybill.service';

import {
  ActivatedRoute,
  ResolveEnd,
  Router
} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {
  searchitem_!: FormGroup;
  
  outlet_!: Outlet[];
  loading: boolean = false;
  outletdata: Outlet[] = [];
  outlet: Outlet = {
    id:'',
    outlet_name:'',
    outlet_gstin:'',
    outlet_telephone:'',
    outlet_address:'',
    outlet_city:'',
    outlet_pin:'',
    outlet_state:'',
    outlet_country:''
  };
  list: any;
  getOutletId_: any;
  searchitem: any;
  constructor(private honeybillService: HoneybillService,private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
 this.searchitem_ = new FormGroup({
     search_name: new FormControl(''),
    });
    this.getoutletlists()
   
  }
  
  Passidfromdeletemodal = (data: any) => {
    this.getOutletId_ = Object.assign(data);
    console.log(this.getOutletId_);
  }
  NewMachines() {
    let currentUrl = this.router.url;
    let newUrl;
    this.router.navigateByUrl('/', {
      skipLocationChange: true,
      replaceUrl: true
    }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  //  *****************************************   delete  particular outlet detail ***************************************
  deleteoutletlists(id: string): void {
    try {
      this.honeybillService.deleteOutlet(this.getOutletId_)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NewMachines();
    } catch (e) {
    }
     
  }
  getoutletlists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillService.getOutlet()).subscribe((outlet: Outlet[]) => {
          this. outletdata= [];
          
          this.outletdata = outlet;
          console.log(this.outletdata)
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }

  getOutletId(id: string): void {
    this.honeybillService.getByOutletId(id)
      .subscribe({
        next: (data) => {
          this.outlet = data;
        
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  searchName_()
  {
    this.outletdata = this.outletdata.filter(x => (x.outlet_city)==this.searchitem_.controls['search_name'].value  )
    // this.outletdata = this.outletdata.filter(x => (x.outlet_city).toUpperCase === (this.searchitem_.controls['search_name'].value ).toUpperCase )
    
  } 

  list_()
{
  if(this.searchitem_.controls['search_name'].value.length == 0)
  {
    this.getoutletlists();
    
  }
  
}
}
