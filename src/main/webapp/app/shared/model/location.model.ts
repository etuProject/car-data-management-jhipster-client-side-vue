import { ITrip } from '@/shared/model/trip.model';

export interface ILocation {
  id?: number;
  heading?: number;
  latitude?: number;
  longitude?: number;
  speed?: number;
  trip?: ITrip;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public heading?: number,
    public latitude?: number,
    public longitude?: number,
    public speed?: number,
    public trip?: ITrip
  ) {}
}
