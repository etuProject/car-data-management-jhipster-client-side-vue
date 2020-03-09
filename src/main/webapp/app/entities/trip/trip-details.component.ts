import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITrip } from '@/shared/model/trip.model';
import TripService from './trip.service';

@Component
export default class TripDetails extends Vue {
  @Inject('tripService') private tripService: () => TripService;
  public trip: ITrip = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tripId) {
        vm.retrieveTrip(to.params.tripId);
      }
    });
  }

  public retrieveTrip(tripId) {
    this.tripService()
      .find(tripId)
      .then(res => {
        this.trip = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
