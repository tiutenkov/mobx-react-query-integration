import { PropsWithChildren } from 'react';

import { MobxReactQueryTitle } from '@components/MobxReactQueryTitle';

import './Layout.css';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <MobxReactQueryTitle />
      {children}
    </div>
  );
};
