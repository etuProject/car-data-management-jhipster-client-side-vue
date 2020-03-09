import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import TripService from '../trip/trip.service';
import { ITrip } from '@/shared/model/trip.model';

import AlertService from '@/shared/alert/alert.service';
import { ILocation, Location } from '@/shared/model/location.model';
import LocationService from './location.service';

const validations: any = {
  location: {
    heading: {},
    latitude: {},
    longitude: {},
    speed: {}
  }
};

@Component({
  validations
})
export default class LocationUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('locationService') private locationService: () => LocationService;
  public location: ILocation = new Location();

  @Inject('tripService') private tripService: () => TripService;

  public trips: ITrip[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationId) {
        vm.retrieveLocation(to.params.locationId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.location.id) {
      this.locationService()
        .update(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('clientApp.location.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.locationService()
        .create(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('clientApp.location.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveLocation(locationId): void {
    this.locationService()
      .find(locationId)
      .then(res => {
        this.location = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.tripService()
      .retrieve()
      .then(res => {
        this.trips = res.data;
      });
  }
}
