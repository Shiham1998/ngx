import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  searchitem_!: FormGroup;
  company_!: Company[];
  loading: boolean = false;
  companydata: Company[] = [];
  company: Company = {
    id: '',
    businessname: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    email: '',
    phone: '',
    panno: '',
    gstin: '',
    taxationmethod: '',
    companylogo: '',
    active: false
  };
  lists: any;
  getCompanyId_: any;
  searchitem: any;
  constructor(private honeybillService: HoneybillService,private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.searchitem_ = new FormGroup({
      search_name: new FormControl(''),
     });
    this.getcompanylists()
  }
   
  Passidfromdeletemodal = (data: any) => {
    this.getCompanyId_ = Object.assign(data);
    console.log(this.getCompanyId_);
  }
  NewCompany() {
    let currentUrl = this.router.url;
    let newUrl;
    this.router.navigateByUrl('/', {
      skipLocationChange: true,
      replaceUrl: true
    }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deletecompanylists(id: string): void {
    try {
      this.honeybillService.deleteCompany(this.getCompanyId_)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NewCompany();
    } catch (e) {
    }
     
  }
  getcompanylists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillService.getCompany()).subscribe((company: Company[]) => {
          this. companydata= [];
          
          this.companydata = company;
          console.log(this.companydata)
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }

  getCompanyId(id: string): void {
    this.honeybillService.getByCompanyId(id)
      .subscribe({
        next: (data) => {
          this.company = data;
        
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  searchName_()
  {
    this.companydata = this.companydata.filter(x => (x.businessname)==this.searchitem_.controls['search_name'].value  )
    // this.outletdata = this.outletdata.filter(x => (x.outlet_city).toUpperCase === (this.searchitem_.controls['search_name'].value ).toUpperCase )
    
  } 

  list_()
{
  if(this.searchitem_.controls['search_name'].value.length == 0)
  {
    this.getcompanylists();
    
  }
  
}
}
