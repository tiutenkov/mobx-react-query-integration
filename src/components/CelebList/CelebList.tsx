import { observer } from 'mobx-react-lite';

import { CelebListItem } from '@components/CelebListItem';
import { LoaderContainer } from '@components/LoaderContainer';
import { useStore } from '@components/StoreProvider';

import './CelebList.css';

export const CelebList = observer(() => {
  const { celebsStore } = useStore();

  return (
    <div className="celeb-list">
      <h2>Знаменитости</h2>
      <LoaderContainer isLoading={celebsStore.isCelebsQueryPending} isError={celebsStore.isCelebsQueryError}>
        {celebsStore.items.map((celeb) => (
          <CelebListItem key={celeb.id} {...celeb} />
        ))}
      </LoaderContainer>
    </div>
  );
});
