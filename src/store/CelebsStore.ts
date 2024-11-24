import { makeAutoObservable } from 'mobx';

import { Celeb, createCeleb, fetchCelebs } from '@lib/api';
import { MobxMutation, MobxQuery } from '@lib/react-query';
import { QueryClient } from '@tanstack/query-core';

const QUERY_KEY = ['celebs'];

export class CelebsStore {
  private celebsQuery: MobxQuery<Celeb[]>;
  private createCelebMutation: MobxMutation<Celeb, Error, Celeb>;

  constructor(private queryClient: QueryClient) {
    makeAutoObservable(this);

    this.celebsQuery = new MobxQuery(this.queryClient, () => ({
      queryKey: QUERY_KEY,
      queryFn: fetchCelebs,
    }));

    this.createCelebMutation = new MobxMutation(this.queryClient, {
      mutationFn: createCeleb,
      onSuccess: () => this.queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
    });
  }

  get items(): Celeb[] {
    return this.celebsQuery.response.data ?? [];
  }

  async createCeleb(celeb: Celeb) {
    await this.createCelebMutation.mutate(celeb);
  }

  get isCelebsQueryPending() {
    return this.celebsQuery.response.isPending;
  }

  get isCelebsQueryError() {
    return this.celebsQuery.response.isError;
  }

  get isCelebCreationPending() {
    return this.createCelebMutation.isPending;
  }
}
