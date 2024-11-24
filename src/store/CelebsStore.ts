import { makeAutoObservable } from 'mobx';

import { Celeb } from '@lib/api';

export class CelebsStore {
  public items: Celeb[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCelebs(value: Celeb[]) {
    this.items = value;
  }
}
