import { ILocation } from '@/shared/model/location.model';

export interface ITrip {
  id?: number;
  startTime?: Date;
  endTime?: Date;
  locations?: ILocation[];
}

export class Trip implements ITrip {
  constructor(public id?: number, public startTime?: Date, public endTime?: Date, public locations?: ILocation[]) {}
}
