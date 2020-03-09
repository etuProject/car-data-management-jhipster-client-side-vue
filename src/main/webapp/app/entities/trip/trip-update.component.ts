import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import LocationService from '../location/location.service';
import { ILocation } from '@/shared/model/location.model';

import AlertService from '@/shared/alert/alert.service';
import { ITrip, Trip } from '@/shared/model/trip.model';
import TripService from './trip.service';

const validations: any = {
  trip: {
    startTime: {},
    endTime: {}
  }
};

@Component({
  validations
})
export default class TripUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('tripService') private tripService: () => TripService;
  public trip: ITrip = new Trip();

  @Inject('locationService') private locationService: () => LocationService;

  public locations: ILocation[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tripId) {
        vm.retrieveTrip(to.params.tripId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.trip.id) {
      this.tripService()
        .update(this.trip)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('clientApp.trip.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.tripService()
        .create(this.trip)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('clientApp.trip.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.trip[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.trip[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.trip[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.trip[field] = null;
    }
  }

  public retrieveTrip(tripId): void {
    this.tripService()
      .find(tripId)
      .then(res => {
        res.startTime = new Date(res.startTime);
        res.endTime = new Date(res.endTime);
        this.trip = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
  }
}
