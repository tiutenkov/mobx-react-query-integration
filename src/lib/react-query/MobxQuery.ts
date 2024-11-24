import { autorun, createAtom, makeAutoObservable } from 'mobx';

import { DefaultError, QueryClient,QueryKey, QueryObserver, QueryObserverOptions } from '@tanstack/query-core';

const EMPTY_FUNCTION = () => {};

export class MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = Array<string>,
> {
  private atom = createAtom(
    'MobxQuery',
    () => this.subscribe(),
    () => this.unsubscribe()
  );

  private queryObserver: QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
  private unsubscribeFn: VoidFunction;

  constructor(
    private queryClient: QueryClient,
    private getOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
  ) {
    this.queryObserver = new QueryObserver(this.queryClient, this.defaultQueryOptions);
    this.unsubscribeFn = EMPTY_FUNCTION;

    makeAutoObservable(this);
  }

  get response() {
    this.atom.reportObserved(); // Сообщаем mobx, что наблюдаемый источник данных был использован.
    return this.queryObserver.getOptimisticResult(this.defaultQueryOptions);
  }

  private subscribe() {
    const unsubscribeReaction = autorun(() => {
      this.queryObserver.setOptions(this.defaultQueryOptions);
    });

    const unsubscribeObserver = this.queryObserver.subscribe(() => {
      this.atom.reportChanged(); // Сообщаем mobx, что данные изменились.
    });

    this.unsubscribeFn = () => {
      unsubscribeObserver();
      unsubscribeReaction();
    };
  }

  private unsubscribe() {
    this.unsubscribeFn(); // Отписка для конретного наблюдателя (компонента, класса)
  }

  private get defaultQueryOptions() {
    return this.queryClient.defaultQueryOptions(this.getOptions());
  }
}


// 💡queryObserver.destroy() используем, когда завершаем жизненный цикл QueryObserver,
// так как это освободит все ресурсы, связанные с ним, что полезно для предотвращения утечек памяти.

// можно реализовать suspense - https://github.com/TanStack/query/blob/74c65cc2db0fa378c108448445f38464e1acd27a/packages/react-query/src/useBaseQuery.ts#L114