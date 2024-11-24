import { CelebList } from '@components/CelebList';
import { CreateCelebForm } from '@components/CreateCelebForm';
import { Divider } from '@components/Divider';

import './HomePage.css';

export const HomePage = () => {
  return (
    <div className="HomePage">
      <CelebList />
      <Divider />
      <CreateCelebForm />
    </div>
  );
};
