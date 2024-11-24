import './Loader.css';

type Props = {
  size?: 's' | 'xs';
  className?: string;
};

export const Loader = ({ size = 's', className }: Props) => {
  return (
    <div className={`loading-container ${className} size-${size}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};
