import { Injectable } from '@angular/core';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;

  constructor() {

    this.pusher = new Pusher('31dc90996a8d4fbf8817', {
      cluster: 'eu',
      forceTLS: true
    });

    this.channel = this.pusher.subscribe('my-channel');
  }
}
