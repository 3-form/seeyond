import {Component, Input} from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Feature } from '../feature';
import { User } from "../_models/user";
import { AlertService } from "../_services/alert.service";
import { SeeyondService } from '../_services/seeyond.service';
import { ConfirmDeleteDialogComponent } from "../confirm-delete-dialog/confirm-delete-dialog.component";

@Component({
  selector: 'seeyond-load-seeyonds-dialog',
  templateUrl: 'load-seeyonds-dialog.component.html',
  styleUrls: ['load-seeyonds-dialog.component.css']
})
export class LoadSeeyondsDialogComponent {

  public seeyonds: Array<Feature>;

  constructor(
    private dialogRef: MdDialogRef<LoadSeeyondsDialogComponent>,
    private alert: AlertService,
    private seeyond: SeeyondService,
    private router: Router,
    public dialog: MdDialog,
    public feature: Feature,
    public user: User
  ) {
  }

  load(id: number) {
    console.log("loading seeyond id: " + id);
    this.router.navigate(['/feature', id]);
  }

  delete(id: number, target: any) {
    var dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, new MdDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'confirm') {
        console.log("Oh, now you've gone and really done it.");
        this.seeyond.deleteFeature(id).subscribe(response => {
          if(this.feature.id === id) {
            console.log("Deleting the feature we have loaded");
            this.router.navigate(['feature', this.feature.name]);
          }
          target.remove();
          this.alert.success('Seeyond ID: ' + id + ' has been deleted');
        },
        error => {
          if(error) {
            this.alert.apiAlert(error);
          }
        });
      }
    });
  }

}
