import { autorun, createAtom } from 'mobx';

import {
  DefaultError,
  MutateOptions,
  MutationObserver,
  MutationObserverOptions,
  QueryClient,
} from '@tanstack/query-core';

const EMPTY_FUNCTION = () => {};

export class MobxMutation<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> {
  private atom = createAtom(
    'MobxMutation',
    () => this.subscribe(),
    () => this.unsubscribe(),
  );

  private mutationObserver: MutationObserver<TData, TError, TVariables, TContext>;
  private unsubscribeFn: VoidFunction;

  constructor(
    private queryClient: QueryClient,
    private options: MutationObserverOptions<TData, TError, TVariables, TContext>,
  ) {
    this.mutationObserver = new MutationObserver(this.queryClient, this.options);
    this.unsubscribeFn = EMPTY_FUNCTION;
  }

  mutate(variables: TVariables, mutateOptions?: MutateOptions<TData, TError, TVariables, TContext>) {
    return this.mutationObserver.mutate(variables, mutateOptions);
  }

  public get response() {
    this.atom.reportObserved();
    return this.mutationObserver.getCurrentResult();
  }

  public get isPending() {
    return this.response.isPending;
  }

  private subscribe() {
    const unsubscribeReaction = autorun(() => {
      this.mutationObserver.setOptions(this.options);
    });

    const unsubscribeObserver = this.mutationObserver.subscribe(() => {
      this.atom.reportChanged();
    });

    this.unsubscribeFn = () => {
      unsubscribeObserver();
      unsubscribeReaction();
    };
  }

  private unsubscribe() {
    this.unsubscribeFn();
  }
}
