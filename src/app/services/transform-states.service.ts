import { Injectable } from '@angular/core';
import { States } from '../interfaces/states';

@Injectable({
  providedIn: 'root'
})
export class TransformStatesService {

  constructor() { }

  // handler (object: object, all: boolean) {
  //     let array: Array<object> = [];
  //     let keys = Object.keys(object);
  //     let l = all ? keys.length : 2;
  //     for (let n = 0; n < l; n++) {
  //         let obj = {
  //             value: keys[n],
  //             label: object[keys[n]]
  //         };
  //         array.push(obj);
  //     }
  //
  //     return array;
  // }

  handler(states: States[], all) {
    const array = [];
    array.push({ value: 0, label: 'Without states', stated: 'Without States' });
    states.forEach(state => {
      const obj = {
        value: state.id,
        label: state.label,
        stated: 'With States'
      };
      array.push(obj);
    });
    return array;
  }

  customer_states (states: States[]) {
    const obj = {};
    states.forEach(state => {
      obj[state.id] = state.label;
    });
    return obj;
  }
}
