import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { CelebListItem } from '@components/CelebListItem';
import { LoaderContainer } from '@components/LoaderContainer';
import { useStore } from '@components/StoreProvider';
import { fetchCelebs } from '@lib/api';
import { useQuery } from '@tanstack/react-query';

import './CelebList.css';

export const CelebList = observer(() => {
  const { celebsStore } = useStore();

  const { data, isPending, isError } = useQuery({
    queryKey: ['celebs'],
    queryFn: fetchCelebs,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    celebsStore.setCelebs(data);
  }, [data]);

  return (
    <div className="celeb-list">
      <h2>Знаменитости</h2>
      <LoaderContainer isLoading={isPending} isError={isError}>
        {celebsStore.items.map((celeb) => (
          <CelebListItem key={celeb.id} {...celeb} />
        ))}
      </LoaderContainer>
    </div>
  );
});
