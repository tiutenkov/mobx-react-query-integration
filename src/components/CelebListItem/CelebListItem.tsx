import { Link } from 'react-router-dom';

interface Props {
  id: string;
  name: string;
}

export const CelebListItem = ({ id, name }: Props) => {
  return <Link to={`/celebs/${id}`}>{name}</Link>;
};
