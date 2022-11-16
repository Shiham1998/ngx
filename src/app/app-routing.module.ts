import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemlistComponent } from './Transaction/itemlist/itemlist.component';
import { LayoutComponent } from './layout/layout.component';
import { OutletComponent } from './Transaction/outlet/outlet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UpdateoutletComponent } from './Transaction/outlet/updateoutlet/updateoutlet.component';
import { AddItemlistComponent } from './Transaction/itemlist/add-itemlist/add-itemlist.component';
import { ViewItemlistComponent } from './Transaction/itemlist/view-itemlist/view-itemlist.component';
import { BillingdetailsComponent } from './Transaction/billingdetails/billingdetails.component';
import { BrandListComponent } from './Masters/brand/brand-list.component';
import { AddEditBrandComponent } from './Masters/brand/addedit-brand/addedit-brand.component';
import { DepartmentComponent } from './Masters/department/department.component';
import { AddeditDepartmentComponent } from './Masters/department/addedit-department/addedit-department.component';
import { DesignationComponent } from './Masters/designation/designation.component';
import { AddeditDesignationComponent } from './Masters/designation/addedit-designation/addedit-designation.component';
import { UnitListComponent } from './Masters/unit/unit-list.component';
import { AddeditUnitComponent } from './Masters/unit/addedit-unit/addedit-unit.component';
import { CompanyDetailsComponent } from './Masters/company-details/company-details.component';
import { AddeditCompanyComponent } from './Masters/company-details/addedit-company/addedit-company.component';
import { HolidayComponent } from './Masters/holiday/holiday.component';
import { AddeditHolidayComponent } from './Masters/holiday/addedit-holiday/addedit-holiday.component';
import { GroupListComponent } from './Masters/group/group-list.component';
import { AddeditGroupComponent } from './Masters/group/addedit-group/addedit-group.component';
import { ClientinformationComponent } from './Masters/clientinformation/clientinformation.component';
import { AddeditClientComponent } from './Masters/clientinformation/addedit-client/addedit-client.component';
import { HsnListComponent } from './Masters/hsn/hsn-list.component';
import { AddeditHsnComponent } from './Masters/hsn/addedit-hsn/addedit-hsn.component';
import { SupplierComponent } from './Masters/supplier/supplier.component';
import { AddeditSupplierComponent } from './Masters/supplier/addedit-supplier/addedit-supplier.component';

const routes: Routes = [
  { path:'' , component: LoginComponent },
  { path:'layout' , component: LayoutComponent },
  { path:'outlet' , component: OutletComponent },
  { path:'itemlist' , component: ItemlistComponent },
  { path:'home' , component: HomeComponent },
  { path:'updateoutlet/:id' , component: UpdateoutletComponent },
  { path:'additem/:id' , component: AddItemlistComponent },
  { path:'additem' , component: AddItemlistComponent },
  { path:'viewitem/:id' , component: ViewItemlistComponent },
  { path:'updateoutlet' , component: UpdateoutletComponent },
  { path:'billingdetails' , component: BillingdetailsComponent },
  {path:'login',component:LoginComponent} ,
  {path:'signup',component:RegisterComponent},

  //for brand
  {path:'brand',component:BrandListComponent},
  {path:'addbrand',component:AddEditBrandComponent},
  { path:'addbrand/:id' , component: AddEditBrandComponent },

  //for department
  {path:'department',component:DepartmentComponent },
  {path:'adddepartment',component:AddeditDepartmentComponent },
  { path:'adddepartment/:id' , component:AddeditDepartmentComponent },

    //for designation
  {path:'designation', component:DesignationComponent},
  {path:'adddesignation',component:AddeditDesignationComponent},
  {path:'adddesignation/:id',component:AddeditDesignationComponent},

    //for unit
  {path:'unit',component:UnitListComponent},
  {path:'addunit',component:AddeditUnitComponent},
  {path:'addunit/:id',component:AddeditUnitComponent},

     //for Comapny
  { path:'company' , component: CompanyDetailsComponent },
  { path:'addeditcompany' , component: AddeditCompanyComponent },
  { path:'addeditcompany/:id' , component: AddeditCompanyComponent },

    //forholiday
  {path:'holiday', component:HolidayComponent},
  {path:'addholiday',component:AddeditHolidayComponent},
  {path:'addholiday/:id',component:AddeditHolidayComponent},
  {path:'addunit/:id',component:AddeditUnitComponent},

    //for group
  {path:'group',component:GroupListComponent},
  {path:'addgroup',component:AddeditGroupComponent},
  {path:'addgroup/:id',component:AddeditGroupComponent},

  //for clientinformation
  {path:'client',component:ClientinformationComponent},
  {path:'addclient',component:AddeditClientComponent},
  {path:'addclient/:id',component:AddeditClientComponent},
  {path:'addgroup/:id',component:AddeditGroupComponent},

  //for HSN
  {path:'hsn',component:HsnListComponent},
  {path:'addhsn',component:AddeditHsnComponent},
  {path:'addhsn/:id',component:AddeditHsnComponent}, 
  
  //for Supplier
 {path:'supplier',component:SupplierComponent},
 {path:'addeditsupplier',component:AddeditSupplierComponent},
 {path:'addeditsupplier/:id',component:AddeditSupplierComponent},
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
