import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Feature } from './feature';

@Component({
  selector: 'seeyond-seeyond',
  templateUrl: './seeyond.component.html',
  styleUrls: ['./seeyond.component.css'],
})
export class SeeyondComponent implements OnInit {
  private selectedFeature: string;
  private selectedFeatureId: number;

  constructor(
    private route: ActivatedRoute,
    private feature: Feature,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      this.route.params.subscribe(params => {
        console.log(event);
        if(event instanceof NavigationEnd) {
          this.selectedFeature = params['name'];
          this.selectedFeatureId = params['id'];
          console.log('==== ' + this.selectedFeature + ' ====');
          console.log('**** ' + this.selectedFeatureId + ' ****');
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

            default:
              // default to the wall
              this.feature.updateFeature(2);
              break;
          }
        }
      });
    });
  }

  ngOnInit() {
  }

}
