import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Feature } from './feature';
import { User } from './_models/user';
import { SeeyondService } from './_services/seeyond.service';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'seeyond-seeyond',
  templateUrl: './seeyond.component.html',
  styleUrls: ['./seeyond.component.css'],
})
export class SeeyondComponent implements OnInit {
  private selectedFeature: any;
  private debug;
  private params: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seeyond: SeeyondService,
    private alert: AlertService,
    public feature: Feature,
    public user: User
  ) {}

  ngOnInit() {
    // setup the debug for logging
    this.debug = require( 'debug' )('seeyond-component');
    // initialize the feature based on the URL path.
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event) => {
      this.debug(event);
      this.params = this.activatedRoute.params.subscribe(params => {
        this.debug(params);
      // init the seeyond prices
      this.seeyond.getPrices().subscribe(response => {
        this.debug(response);
        this.feature.prices = response;
          // feature - default values
          this.selectedFeature = params['feature'];

          if(!Number(this.selectedFeature)) {
            switch (this.selectedFeature) {
              case "linear-partition":
                this.feature.title = 'linear-partition';
                this.feature.updateFeature(0);
                break;

              case "curved-partition":
                this.feature.updateFeature(1);
                break;

              case "wall":
                this.feature.updateFeature(2);
                break;

              case "wall-to-ceiling":
                this.feature.updateFeature(3);
                break;

              case "ceiling":
                this.feature.updateFeature(4);
                break;

              default:
                // default to the wall if they pass something we don't support.
                this.router.navigate(['/feature', 'wall']);
                break;
            }
          }else if(Number(this.selectedFeature)) {
            this.seeyond.loadFeature(this.selectedFeature).subscribe(
              feature => {
                // if feature was found and is not archived
                if(feature != null && !feature.archived) {
                  this.feature.loadFeature(feature);
                }else{
                  // redirect to default wall feature
                  this.router.navigate(['/feature', 'wall']);
                }
              },
              error => {
                if(error) {
                  this.alert.apiAlert(error);
                }
              }
            );
          }
        });
      });
        // unsubscribe params
        this.params.unsubscribe();
    });

    // Check for a logged in user.
    let seeyondUser = localStorage.getItem('seeyondUser');
    if(seeyondUser) {
      // set up the user values
      var parsedUser = JSON.parse(seeyondUser);
      this.user.uid = parsedUser.uid;
      this.user.email = parsedUser.email;
      this.user.firstname = parsedUser.firstname;
      this.user.lastname = parsedUser.lastname;
    }else{
      // create a new empty user
      this.user = new User;
    }
  }

}
