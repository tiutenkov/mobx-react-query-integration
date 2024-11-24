import { PropsWithChildren } from 'react';

import { Loader } from '@components/Loader';

import './LoaderContainer.css';

type Props = PropsWithChildren & {
  isLoading: boolean;
  isError: boolean;
};

export const LoaderContainer = ({ isLoading, isError, children }: Props) => {
  if (isLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div className="container error">Произошла ошибка при загрузке данных :(</div>;
  }

  return <>{children}</>;
};
