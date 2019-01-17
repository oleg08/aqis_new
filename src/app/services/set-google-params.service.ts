import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetGoogleParamsService {

  constructor() { }
  setGoogleEvent (event, title) {
    const params: Object = {};
    const timeZoneOffset = (-1) * new Date().getTimezoneOffset();

    params['date'] = {
      day: event.date.day,
      month: event.date.month,
      year: event.date.year
    };

    params['time'] = {
      hour: event.start_time_hours, // + timeZoneOffset/60,
      minute: event.start_time_min,
      second: 0
    };

    params['duration'] = event.duration;

    params['summary']      = {value: title};
    params['description']  = event.description;

    params['location'] = event.address ? event.address.city_address : null;

    return params;
  }

  setParticipantsIds (event) {
    if (event.participants.length > 0) {
      const participants_ids: Array<number> = [];
      event.participants.forEach(participant => {participants_ids.push(participant.id); });
      return participants_ids;
    } else {
      return null;
    }

  }
}
