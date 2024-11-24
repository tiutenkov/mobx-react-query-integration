import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './BackButton.css';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => navigate(-1), [navigate]);

  return (
    <button className="back-button" onClick={handleClick}>
      <span className="arrow">➜</span>
    </button>
  );
};
