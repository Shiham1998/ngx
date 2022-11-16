import {  Component,  Input,  OnInit} from '@angular/core';
import {  FormControl,  FormGroup,Validators} from '@angular/forms';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  Masters} from 'src/app/models/Masters';
import {  HoneybillService} from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-addedit-designation',
  templateUrl: './addedit-designation.component.html',
  styleUrls: ['./addedit-designation.component.css']
})
export class AddeditDesignationComponent implements OnInit {

  @Input() addMode = false;
  fg_designationname!: FormGroup;
  loading: boolean = false;
  designationlistdata: Masters[] = [];
  message!: string;

  designation: Masters = {
    name: '',
    id: '',
    active: false,
    m_type: '',
    eventdate: ''
  }
  _type: string = "D";


  constructor(private honeybillservice: HoneybillService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    try {
      this.fg_designationname = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.maxLength(20)])
      });
    } catch (e) {
      console.log('designation error-ngonit' + e);
      alert('designation error-ngonit' + e);
    }
    if (this.route.snapshot.params["id"] == null) {
      this.addMode = true;
    }
    if (!this.addMode) {
      this.viewdesignationId(this.route.snapshot.params["id"]);
    }
  }

  viewdesignationId(id: string): void {
    this.honeybillservice.getBydesignationId(id)
      .subscribe({
        next: (data) => {
          this.designation = data;
          this.fg_designationname.controls['name'].setValue(this.designation.name);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  savedesignation() {
    try {
      if (this.fg_designationname.valid) {
        const data = {
          name: this.fg_designationname.controls['name'].value,
          m_type: this._type,
          active: true
        };
        this.honeybillservice.savedesignation(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        })
      }
      this.message = "Successfully Saved Designation Name !"
      this.fg_designationname.controls['name'].setValue('');
      alert('Designation saved succesfully!!')
      this.navigateToList();
    } catch (e) {
      console.log('designation name error-save' + e);
      alert('Designation Name Save Error Occurs-save' + e);
    }
  }
  navigateToList(): void {
    this.router.navigate(['/designation']);
  }

  updateDesignationlist() {
    try {
      if (this.fg_designationname.valid) {
        this.designation.name = this.fg_designationname.controls['name'].value;
        this.honeybillservice.updateDesignationid(this.designation.id, this.designation).subscribe({
          next: (res) => {
            console.log(res);
            this.addMode = false;
          },
          error: (e) => console.error(e)
        });
        alert(this.message = 'Designation Updated successfully!! ');
      }
      this.navigateToList();
    } catch (e) {

    }
  }

}
