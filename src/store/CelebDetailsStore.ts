import { makeAutoObservable } from 'mobx';

import { Celeb, fetchCelebById } from '@lib/api';
import { MobxQuery } from '@lib/react-query';
import { QueryClient } from '@tanstack/query-core';

export class CelebDetailsStore {
  private celebQuery: MobxQuery<Celeb>;
  private celebId: string = '';

  constructor(private queryClient: QueryClient) {
    makeAutoObservable(this);

    this.celebQuery = new MobxQuery(this.queryClient, () => ({
      queryFn: ({ queryKey }) => fetchCelebById(queryKey[1]),
      queryKey: ['celeb', this.celebId],
    }));
  }

  getCelebById(id: string): Celeb | undefined {
    this.celebId = id;
    return this.celebQuery.response.data;
  }

  get isPending() {
    return this.celebQuery.response.isPending;
  }

  get isError() {
    return this.celebQuery.response.isError;
  }
}
