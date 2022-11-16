import {  Component,  OnInit,  ViewChild} from '@angular/core';
import {  FormControl,  FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {  Billingdetails} from 'src/app/models/billingdetails';
import {  Itemlist} from 'src/app/models/itemlist';
import {  HoneybillService} from 'src/app/services/honeybill.service';
import {  MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
 
@Component({
  selector: 'app-billingdetails',
  templateUrl: './billingdetails.component.html',
  styleUrls: ['./billingdetails.component.css']
})

export class BillingdetailsComponent implements OnInit {
  billing!: FormGroup;  
  itemname = new FormControl('');
  itemcode = new FormControl('');
  quantity = new FormControl('');
  amount = new FormControl('');

  selectedName!:any;
  selectedCode!:any;
  loading: boolean = false;
  
  //To show in the ItemCode/ItemName Combo depends on the key press
  aryItemName : string[] = [];
  aryItemCode : string[] = [];
  filteredNames!: Observable<string[]>;
  filteredCodes!: Observable<string[]>;
  
  //To Get the Item details from the service - Master Item List
  itemlistdata: Itemlist[] = [];
  //To get one signle item values from the itemlist for the given item code/item name
  filtereditem!:Itemlist[];
  //Billing Array
  aryBilling: Billingdetails[] = [];
  //Mat table data source
  displayedColumns = ['item_id', 'item_desc', 'quantity', 'amount'];
  dataSource = new MatTableDataSource(this.aryBilling);

  billingdetails: Billingdetails = {
    id: '',
    tran_id: 0,
    bill_no: 0,
    item_id: 0,
    item_desc: '',
    quantity: 0,
    amount: 0,
    gst_value: 0,
    gst_percentage: 0,
    actual_amount: 0,
    companyid: 0
  };

  
  constructor(private honeybillService: HoneybillService,
              private _formBuilder: FormBuilder
   ) {}

  ngOnInit(): void {
    
    this.aryBilling.push(this.billingdetails);

    this.billing = new FormGroup({
      itemname: new FormControl(''),
      itemcode: new FormControl(''),
      quantity: new FormControl(''),
      amount: new FormControl(''),
    });

    this.getItemlists();
    
    //To handle the key press event on the item name control
    this.filteredNames = this.itemname.valueChanges.pipe(
      startWith(''),
      map(name => this._filterName(name || '')),
    );
    //To handle the key press event on the item code control
    this.filteredCodes = this.itemcode.valueChanges.pipe(
      startWith(''),
      map(code => this._filterCode(code || '')),
    );
  }

  getItemlists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillService.getItemlist()).subscribe((itemlist: Itemlist[]) => {
          this.itemlistdata = [];
          this.itemlistdata = itemlist;
          this.loading = false;
          this.aryItemName = this.itemlistdata.map(x=> x.item_name);
          this.aryItemCode = this.itemlistdata.map(x=> x.item_code);
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private _filterName(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.aryItemName.filter(x => x.toLowerCase().includes(filterValue));
   
  }
  private _filterCode(code: string): string[] {
    const filterValue = code.toLowerCase();
    return this.aryItemCode.filter(x => x.toLowerCase().includes(filterValue));
  }

  bindingcode(){
    this.selectedCode = this.itemlistdata.find(x => x.item_name == this.itemname.value)?.item_code
    this.itemcode.setValue(this.selectedCode);
    this.itemcode.disable();
  }

  bindingname(){
    this.selectedName = this.itemlistdata.find(x => x.item_code == this.itemcode.value)?.item_name
    this.itemname.setValue(this.selectedName);
    this.itemname.disable();
  }

  bindingamount(qtyvalue:any){
    this.filtereditem = this.itemlistdata.filter(x => x.item_code == this.itemcode.value);
    let rate = this.filtereditem[0].mrp;
    let gst = this.filtereditem[0].GST;
    let qty = this.billing.controls['quantity'].value;
    let amount = (1 * rate)  
  //  this.itemamt.setValue( this.amount);
   this.billing.controls['amount'].setValue(amount);
   if(amount > 0)
   {
    this.billingdetails.bill_no = 1;
    this.billingdetails.item_id = 2; //this.billing.controls['item_id'].value;
    this.billingdetails.item_desc ='Tea';  //this.billing.controls['item_desc'].value;
    this.billingdetails.quantity = 2;
    this.billingdetails.amount = 10;
    this.aryBilling.push(this.billingdetails);
    this.dataSource.data = this.aryBilling;
   }
   console.log(JSON.stringify(this.aryBilling))
  }
}


