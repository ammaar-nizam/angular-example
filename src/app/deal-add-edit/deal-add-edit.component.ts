import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { DealService } from '../services/deal.service';

@Component({
  selector: 'app-deal-add-edit',
  templateUrl: './deal-add-edit.component.html',
  styleUrls: ['./deal-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  dealForm: FormGroup;

  category: string[] = [
    'Fitness Equipments',
    'Hardware Company',
    'Software Company',
    'Food Delivering',
    'Network',
  ];

  location: string[] = [
    'Colombo 1, Sri Lanka',
    'Rajagiriya, Sri Lanka',
    'Melbourne, Australia',
  ];

  pipeline: string[] = [
    'eZuite Sales',
    'eZuite Purchase',
    'eZuite Development',
    'Quantum Pipeline',
  ];

  stage: string[] = [
    'Meeting',
    'Research',
    'Negotiation',
    'Proposal',
    'Development',
    'Deployment',
    'Testing',
    'Demo',
    'Maintenance',
  ];

  constructor(
    private _fb: FormBuilder,
    private _dealService: DealService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.dealForm = this._fb.group({
      dealSize: '',
      dealCategory: '',
      dealEmployee: '',
      dealLocation: '',
      pipeline: '',
      stage: '',
    });
  }

  ngOnInit(): void {
    this.dealForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.dealForm.valid) {
      console.log(this.dealForm.value)
      if (this.data) {
        this._dealService
          .updateDeal(this.data.id, this.dealForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Deal detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._dealService.addDeal(this.dealForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Deal added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
