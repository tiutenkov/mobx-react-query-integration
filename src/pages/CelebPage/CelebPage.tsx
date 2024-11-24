import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { LoaderContainer } from '@components/LoaderContainer';
import { Celeb, fetchCelebById } from '@lib/api';
import { getStaticFile } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';

import './CelebPage.css';

export const CelebPage = observer(() => {
  const { id } = useParams();
  const {
    data: celeb,
    isPending,
    isError,
  } = useQuery<Celeb>({
    queryKey: ['celeb', id],
    queryFn: () => fetchCelebById(id!),
    enabled: !!id,
  });

  return (
    <div className="CelebPage">
      <LoaderContainer isLoading={isPending} isError={isError}>
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
