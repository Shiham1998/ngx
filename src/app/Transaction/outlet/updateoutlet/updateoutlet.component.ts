import { Component, Input, OnInit } from '@angular/core';
import {
  statedata
} from 'src/assets/_outlet-json/state';
import {
  countrydata
} from 'src/assets/_outlet-json/country';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { Outlet } from 'src/app/models/outlet';
import {
  ActivatedRoute,
  ResolveEnd,
  Router
} from '@angular/router';

@Component({
  selector: 'app-updateoutlet',
  templateUrl: './updateoutlet.component.html',
  styleUrls: ['./updateoutlet.component.css']
})
export class UpdateoutletComponent implements OnInit {
  @Input() addMode = false;
  loading: boolean = false;
  message!: any;
  stateList!: any[];
  countryList!: any[];
  outletdata: Outlet[] = [];
  selectedMachines!: Outlet;
  outlet: Outlet = {
    id: '',
    outlet_name: '',
    outlet_gstin: '',
    outlet_telephone: '',
    outlet_address: '',
    outlet_city: '',
    outlet_pin: '',
    outlet_state: '',
    outlet_country: '',
  };
  constructor(private honeybillservice: HoneybillService, private router: Router,
    private route: ActivatedRoute,) { }
  adddata!: FormGroup;
  ngOnInit(): void {
    this.stateList = statedata
    this.countryList = countrydata
    this.adddata = new FormGroup({
      outlet_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      outlet_gstin: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      outlet_telephone: new FormControl(''),
      outlet_address: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      outlet_city: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      outlet_pin: new FormControl(''),
      outlet_state: new FormControl(''),
      outlet_country: new FormControl(''),

    });
    this.getoutletlists();

    if (this.route.snapshot.params["id"] == null) {
      this.addMode = true;
    }
    if (!this.addMode) {
      this.getOutletId(this.route.snapshot.params["id"]);
    }
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

  // editMachines(id: any) {
  //   let currentUrl = this.router.url
  //   let newUrl;
  //   if (currentUrl.includes('edit') || currentUrl.includes('adddata')) {
  //     let UrlAry = this.router.url.split('/');
  //     newUrl = UrlAry[1] + "/edit/" + id
  //     currentUrl = newUrl;
  //   } else {
  //     currentUrl = currentUrl + "/edit/" + id;
  //   }
  //   this.router.navigateByUrl('/', {
  //     skipLocationChange: true,
  //     replaceUrl: true
  //   }).then(() => {
  //     this.router.navigate([currentUrl]);
  //   });
  // }
//  ***************************************** (Add New outletData to Database) ***************************************
  savedata(): void {
    if (this.adddata.valid) {
      const data = {
        outlet_name: this.adddata.controls['outlet_name'].value,
        outlet_gstin: this.adddata.controls['outlet_gstin'].value,
        outlet_telephone: this.adddata.controls['outlet_telephone'].value,
        outlet_address: this.adddata.controls['outlet_address'].value,
        outlet_city: this.adddata.controls['outlet_city'].value,
        outlet_pin: this.adddata.controls['outlet_pin'].value,
        outlet_state: this.adddata.controls['outlet_state'].value,
        outlet_country: this.adddata.controls['outlet_country'].value,
      }

      this.honeybillservice.createOutlet(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.addMode = true;
          },
          error: (e) => console.error(e)
        });
      alert(this.message = 'Data Saved successfully..!!');
      this.NewMachines();
    } else {
      return;
    }
    this.getoutletlists();
  }
//  ***************************************** (Update Data ) *********************************************************************
  updateoutletlist(): void {
    try {
      if (this.adddata.valid) {
        this.outlet.outlet_name = this.adddata.controls['outlet_name'].value,
          this.outlet.outlet_gstin = this.adddata.controls['outlet_gstin'].value,
          this.outlet.outlet_telephone = this.adddata.controls['outlet_telephone'].value,
          this.outlet.outlet_address = this.adddata.controls['outlet_address'].value,
          this.outlet.outlet_city = this.adddata.controls['outlet_city'].value,
          this.outlet.outlet_pin = this.adddata.controls['outlet_pin'].value,
          this.outlet.outlet_state = this.adddata.controls['outlet_state'].value,
          this.outlet.outlet_country = this.adddata.controls['outlet_country'].value,
          this.honeybillservice.updateOutlet(this.outlet.id, this.outlet)
            .subscribe({
              next: (res) => {
                console.log(res);
                this.addMode = false;
              },
              error: (e) => console.error(e)
            });
        alert(this.message = 'Outletlist edited successfully..!!');
      }
    } catch (e) {
      this.NewMachines();
    }
  }

  getOutletId(id: string): void {
    this.honeybillservice.getByOutletId(id)
      .subscribe({
        next: (data) => {
          this.outlet = data;
          this.adddata.controls['outlet_name'].setValue(this.outlet.outlet_name);
          this.adddata.controls['outlet_gstin'].setValue(this.outlet.outlet_gstin);
          this.adddata.controls['outlet_telephone'].setValue(this.outlet.outlet_telephone);
          this.adddata.controls['outlet_address'].setValue(this.outlet.outlet_address);
          this.adddata.controls['outlet_city'].setValue(this.outlet.outlet_city);
          this.adddata.controls['outlet_pin'].setValue(this.outlet.outlet_pin);
          this.adddata.controls['outlet_state'].setValue(this.outlet.outlet_state);
          this.adddata.controls['outlet_country'].setValue(this.outlet.outlet_country);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getoutletlists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillservice.getOutlet()).subscribe((outlet: Outlet[]) => {
          this.outletdata = [];

          this.outletdata = outlet;
          console.log(this.outletdata)
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }
}
