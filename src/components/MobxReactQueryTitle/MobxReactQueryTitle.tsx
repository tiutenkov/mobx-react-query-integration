import { useLocation } from 'react-router-dom';

import { BackButton } from '@components/BackButton';
import { getStaticFile } from '@lib/utils';

import './MobXReactQueryTitle.css';

export const MobxReactQueryTitle = () => {
  const location = useLocation();

  return (
    <div className="title-container">
      {location.pathname.match('/celebs') && <BackButton />}
      <h1>Mobx&nbsp;+&nbsp;React Query</h1>
      <div className="icon-container">
        <img src={getStaticFile('mobx-icon.png')} alt="Mobx Logo" className="icon" />
        <img src={getStaticFile('react-query-icon.png')} alt="React Query Logo" className="icon icon_react-query" />
      </div>
    </div>
  );
};
