/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TripDetailComponent from '@/entities/trip/trip-details.vue';
import TripClass from '@/entities/trip/trip-details.component';
import TripService from '@/entities/trip/trip.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Trip Management Detail Component', () => {
    let wrapper: Wrapper<TripClass>;
    let comp: TripClass;
    let tripServiceStub: SinonStubbedInstance<TripService>;

    beforeEach(() => {
      tripServiceStub = sinon.createStubInstance<TripService>(TripService);

      wrapper = shallowMount<TripClass>(TripDetailComponent, { store, i18n, localVue, provide: { tripService: () => tripServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTrip = { id: 123 };
        tripServiceStub.find.resolves(foundTrip);

        // WHEN
        comp.retrieveTrip(123);
        await comp.$nextTick();

        // THEN
        expect(comp.trip).toBe(foundTrip);
      });
    });
  });
});
