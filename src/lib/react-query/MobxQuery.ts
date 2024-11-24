import { autorun, createAtom } from 'mobx';

import { DefaultError, QueryClient, QueryKey, QueryObserver, QueryObserverOptions } from '@tanstack/query-core';

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
    () => this.unsubscribe(),
  );

  private queryObserver: QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
  private unsubscribeFn: VoidFunction;

  constructor(
    private queryClient: QueryClient,
    private getOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  ) {
    this.queryObserver = new QueryObserver(this.queryClient, this.defaultQueryOptions);
    this.unsubscribeFn = EMPTY_FUNCTION;
  }

  public get response() {
    this.atom.reportObserved(); // Конкретный слушатель (Например, react-компонент) подписался на атом
    return this.queryObserver.getOptimisticResult(this.defaultQueryOptions);
  }

  private subscribe() {
    const unsubscribeReaction = autorun(() => {
      this.queryObserver.setOptions(this.defaultQueryOptions);
    });

    const unsubscribeObserver = this.queryObserver.subscribe(() => {
      this.atom.reportChanged(); // Состояние запроса изменилось => сообщаем слушателям атома, чтобы они перерендерились
    });

    this.unsubscribeFn = () => {
      unsubscribeObserver();
      unsubscribeReaction();
    };
  }

  private unsubscribe() {
    this.unsubscribeFn(); // Отписка для конкретного наблюдателя (компонента, реакции)
  }

  private get defaultQueryOptions() {
    return this.queryClient.defaultQueryOptions(this.getOptions());
  }
}
