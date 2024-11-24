import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { LoaderContainer } from '@components/LoaderContainer';
import { useStore } from '@components/StoreProvider';
import { getStaticFile } from '@lib/utils';

import './CelebPage.css';

export const CelebPage = observer(() => {
  const { id } = useParams();

  const { celebDetailsStore } = useStore();

  const celeb = celebDetailsStore.getCelebById(id!);

  return (
    <div className="CelebPage">
      <LoaderContainer isLoading={celebDetailsStore.isPending} isError={celebDetailsStore.isError}>
        {celeb && (
          <>
            <img src={getStaticFile('stub.png')} alt={`image-of-${celeb.name}`} className="avatar" />
            <div>
              {getRowTemplate('Имя', celeb.name)}
              {getRowTemplate('Род деятельности', celeb.description)}
            </div>
          </>
        )}
      </LoaderContainer>
    </div>
  );
});

function getRowTemplate(key: string, value: string | number) {
  const keyTemplate = <strong key={key}>{key}:</strong>;
  const valueTemplate = <span key={value}>{` ${value}`}</span>;

  return <div>{[keyTemplate, valueTemplate]}</div>;
}
