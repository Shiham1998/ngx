import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Itemlist } from 'src/app/models/itemlist';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-add-itemlist',
  templateUrl: './add-itemlist.component.html',
  styleUrls: ['./add-itemlist.component.css']
})
export class AddItemlistComponent implements OnInit {
  branddata: Masters[] = [];
  loading: boolean = false;
  check!:any;
  isLinear = false;
  id_!: any;
  @Input() addMode = false;
  message!: any;
  addItemlist!: FormGroup;
  itemlist: Itemlist = {
    id: '',
    hsn_code: '',
    item_code: '',
    sku: '',
    item_name: '',
    unit: '',
    product_type: '',
    serial_no: '',
    group: '',
    brand: '',
    print_name: '',
    purchase_price: 0,
    sale_price: 0,
    min_sale_price: 0,
    mrp: 0,
    opening_stock: 0,
    opening_stock_value: 0,
    low_level_limit: 0,
    GST: 0,
    IGST: 0,
    CGST: 0,
    SGST: 0,
    cess: 0,
    hsn_name: '',
    hsn_description: '',
    bar_code: '',
    shortname: '',
    department: '',
    subgroup: '',
    supplier: '',
    maximum_qty: 0,
    barcode_status: '',
    stock_maintainance: false,
    box_qty: 0,
    customer_discount: 0,
    dealer_discount: 0,
    whole_salerate: 0,
    rack_group: '',
    rack_name: '',
    quotation_status: '',
    tax_status: '',
    productimage: '',
    allow_weighing_scale: false,
    salesman_commission: false,
    salesman_commission_amount: ''
  };

  masters: Masters = {
    id: '',
    name: '',
    active: false,
    m_type: '',
    eventdate: ''
  };

  constructor(private honeybillService: HoneybillService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,) { }

  ngOnInit() {
    this.addItemlist = new FormGroup({
      hsn_code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      group: new FormControl(''),
      brand: new FormControl(''),
      print_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      purchase_price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      sale_price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      min_sale_price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      mrp: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      opening_stock: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      opening_stock_value: new FormControl('', [Validators.required, Validators.maxLength(20)]),
     serial_no: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      product_type: new FormControl(''),
      item_code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      sku: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      item_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      unit: new FormControl(''),
      low_level_limit: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      GST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      IGST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      CGST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      SGST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      cess: new FormControl('', [Validators.required, Validators.maxLength(20)]),

      hsn_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      hsn_description: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      bar_code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      shortname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      department: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      subgroup: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      supplier: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      maximum_qty: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      barcode_status: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      stock_maintainance: new FormControl(''),
      box_qty: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      customer_discount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      dealer_discount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      whole_salerate: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      rack_group: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      rack_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      quotation_status: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      tax_status: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      productimage: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      allow_weighing_scale: new FormControl(''),
      salesman_commission: new FormControl(''),
      salesman_commission_amount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      
     
    });

    if (this.route.snapshot.params["id"] == null || this.route.snapshot.params["id"] == undefined ) {
      this.addMode = true;
    }
    if (!this.addMode) {
      this.getitemlist(this.route.snapshot.params["id"]);
    }
    // this.id_ = this.getitemlist(this.route.snapshot.params["id"]);
    this.getBrand();
  }

  public myError = (hsn_code: string, errorName: string) => {
    return this.addItemlist.controls[hsn_code].hasError(errorName);
  }


  //  ***************************************** (Add New Data to Database) ***************************************
  saveItemlist(): void {
    try {
      if (this.addItemlist.valid) {
        const data = {
          hsn_code: this.addItemlist.controls['hsn_code'].value,
          group: this.addItemlist.controls['group'].value  ? this.addItemlist.controls['group'].value : 0,
          brand: this.addItemlist.controls['brand'].value  ? this.addItemlist.controls['brand'].value : 0,
          print_name: this.addItemlist.controls['print_name'].value,
          purchase_price: this.addItemlist.controls['purchase_price'].value,
          sale_price: this.addItemlist.controls['sale_price'].value,
          min_sale_price: this.addItemlist.controls['min_sale_price'].value,
          mrp: this.addItemlist.controls['mrp'].value,
          opening_stock: this.addItemlist.controls['opening_stock'].value,
          opening_stock_value: this.addItemlist.controls['opening_stock_value'].value,
          serial_no: this.addItemlist.controls['serial_no'].value,
       
          item_code: this.addItemlist.controls['item_code'].value,
          sku: this.addItemlist.controls['item_code'].value,
          item_name: this.addItemlist.controls['item_name'].value,
          unit: this.addItemlist.controls['unit'].value ? this.addItemlist.controls['unit'].value : 0,
          product_type: this.addItemlist.controls['product_type'].value ? this.addItemlist.controls['product_type'].value : 0,
          GST: this.addItemlist.controls['GST'].value,
          IGST: this.addItemlist.controls['IGST'].value,
          CGST: this.addItemlist.controls['CGST'].value,
          SGST: this.addItemlist.controls['SGST'].value,
          low_level_limit: this.addItemlist.controls['low_level_limit'].value,
          cess: this.addItemlist.controls['cess'].value,
          
          hsn_name: this.addItemlist.controls['hsn_name'].value,
          hsn_description: this.addItemlist.controls['hsn_description'].value,
          bar_code: this.addItemlist.controls['bar_code'].value,
          shortname: this.addItemlist.controls['shortname'].value,
          department: this.addItemlist.controls['department'].value,
          subgroup: this.addItemlist.controls['subgroup'].value,
          supplier: this.addItemlist.controls['supplier'].value,
          maximum_qty: this.addItemlist.controls['maximum_qty'].value,
          barcode_status: this.addItemlist.controls['barcode_status'].value,
          stock_maintainance: this.addItemlist.controls['stock_maintainance'].value ? this.addItemlist.controls['stock_maintainance'].value : 0,
          box_qty: this.addItemlist.controls['box_qty'].value,
          customer_discount: this.addItemlist.controls['customer_discount'].value,
          dealer_discount: this.addItemlist.controls['dealer_discount'].value,
          whole_salerate: this.addItemlist.controls['whole_salerate'].value,
          rack_group: this.addItemlist.controls['rack_group'].value,
          rack_name: this.addItemlist.controls['rack_name'].value,
          quotation_status: this.addItemlist.controls['quotation_status'].value,
          tax_status: this.addItemlist.controls['tax_status'].value,
          productimage: this.addItemlist.controls['productimage'].value,
          allow_weighing_scale: this.addItemlist.controls['allow_weighing_scale'].value  ? this.addItemlist.controls['allow_weighing_scale'].value : 0,
          salesman_commission: this.addItemlist.controls['salesman_commission'].value  ? this.addItemlist.controls['salesman_commission'].value : 0,
          salesman_commission_amount: this.addItemlist.controls['salesman_commission_amount'].value,
         
        };
      
        this.honeybillService.createItemlist(data)
          .subscribe({
            next: (res) => {
              console.log(res);
            
            },
            error: (e) => console.error(e)
          });
       
        this.message = 'Itemlist added successfully..!!';

      } else {
        return;
      }
      setTimeout(() => {
        this.NewItemlist();
      }, 2000);
    }
    catch (e) {
    }
  }

  NewItemlist() {
    try {
      let currentUrl = this.router.url;
      let newUrl;
      if (currentUrl.includes('edit') || currentUrl.includes('itemlist')) {
        let UrlAry = this.router.url.split('/');
        newUrl = UrlAry[1] + "/additemlist"
        currentUrl = newUrl;
      }
      this.router.navigateByUrl('/', {
        skipLocationChange: true,
        replaceUrl: true
      }).then(() => {
        this.router.navigate([currentUrl]);
      });
    } catch (e) {
      console.log('Itemlist - NewItemlist' + e);
      alert('Itemlist - NewItemlist' + e);
    }
  }

  getitemlist(id: string): void {
    try {
      this.honeybillService.getByItemlistId(id)
        .subscribe({
          next: (data) => {
            this.itemlist = data;
            this.addItemlist.controls['hsn_code'].setValue(this.itemlist.hsn_code);
            this.addItemlist.controls['item_code'].setValue(this.itemlist.item_code);
            this.addItemlist.controls['sku'].setValue(this.itemlist.sku);
            this.addItemlist.controls['item_name'].setValue(this.itemlist.item_name);
            this.addItemlist.controls['unit'].setValue(this.itemlist.unit);
           
            this.addItemlist.controls['p1_IGST'].setValue(this.itemlist.IGST);
            this.addItemlist.controls['p1_CGST'].setValue(this.itemlist.CGST);
            this.addItemlist.controls['p1_SGST'].setValue(this.itemlist.SGST);
           
            this.addItemlist.controls['group'].setValue(this.itemlist.group);
            this.addItemlist.controls['brand'].setValue(this.itemlist.brand);
            this.addItemlist.controls['print_name'].setValue(this.itemlist.print_name);
            this.addItemlist.controls['purchase_price'].setValue(this.itemlist.purchase_price);
            this.addItemlist.controls['sale_price'].setValue(this.itemlist.sale_price);
            this.addItemlist.controls['min_sale_price'].setValue(this.itemlist.min_sale_price);
            this.addItemlist.controls['mrp'].setValue(this.itemlist.mrp);
            this.addItemlist.controls['opening_stock'].setValue(this.itemlist.opening_stock);
            this.addItemlist.controls['opening_stock_value'].setValue(this.itemlist.opening_stock_value);
           
            this.addItemlist.controls['serial_no'].setValue(this.itemlist.serial_no);
           
            this.addItemlist.controls['low_level_limit'].setValue(this.itemlist.low_level_limit);
            this.addItemlist.controls['cess'].setValue(this.itemlist.cess);
            console.log(data);
          },
          error: (e) => console.error(e)
        });

    } catch (e) {

    }
  }

  //  ***************************************** (Update Data ) *********************************************************************
  updateItemlist(): void {
    try {
      if (this.addItemlist.valid) {

        this.itemlist.hsn_code = this.addItemlist.controls['hsn_code'].value,
          this.itemlist.item_code = this.addItemlist.controls['item_code'].value,
          this.itemlist.item_name = this.addItemlist.controls['item_name'].value,
          this.itemlist.sku = this.addItemlist.controls['sku'].value,
          this.itemlist.unit = this.addItemlist.controls['unit'].value,
         
          this.itemlist.IGST = this.addItemlist.controls['IGST'].value,
          this.itemlist.CGST = this.addItemlist.controls['CGST'].value,
        
          this.itemlist.group = this.addItemlist.controls['group'].value,
          this.itemlist.brand = this.addItemlist.controls['brand'].value,
          this.itemlist.print_name = this.addItemlist.controls['print_name'].value,
          this.itemlist.purchase_price = this.addItemlist.controls['purchase_price'].value,
          this.itemlist.sale_price = this.addItemlist.controls['sale_price'].value,
          this.itemlist.min_sale_price = this.addItemlist.controls['min_sale_price'].value,
          this.itemlist.mrp = this.addItemlist.controls['mrp'].value,
          this.itemlist.opening_stock = this.addItemlist.controls['opening_stock'].value,
          this.itemlist.opening_stock_value = this.addItemlist.controls['opening_stock_value'].value,
        
          this.itemlist.serial_no = this.addItemlist.controls['serial_no'].value,
         
          this.itemlist.low_level_limit = this.addItemlist.controls['low_level_limit'].value,
          this.itemlist.cess = this.addItemlist.controls['cess'].value,

          this.honeybillService.updateItemlist(this.itemlist.id, this.itemlist)
            .subscribe({
              next: (res) => {
                console.log(res);
                this.addMode = false;
              },
              error: (e) => console.error(e)
            });
          
        this.message = 'Itemlist edited successfully..!!';
      }
      setTimeout(() => {
        this.router.navigate(['viewitem/' + this.itemlist.id]);
      }, 2000);
    } catch (e) {
    }
  }

  
  getBrand() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillService.getbrandmasterlist('B')).subscribe((brandmasterlist:Masters[])=>{
          this.branddata = [];
          this.branddata = brandmasterlist;
          this.loading = false;
          
        })
      }, 500);
    } catch (e) {
      console.log('getbrandmaster error'+e);
    }
  }



  validateForm() {
   
    this.check = document.getElementById('itemname');
   
    if (this.addItemlist.controls['item_name'].value == "" || this.addItemlist.controls['hsn_code'].value == '' || this.addItemlist.controls['mrp'].value == '') {
      alert("Required fields must be filled out");
      this.renderer.selectRootElement('#itemname').focus();
    }
  }
}
