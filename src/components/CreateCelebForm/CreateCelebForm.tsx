import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import uniqid from 'uniqid';

import { Loader } from '@components/Loader';
import { createCeleb } from '@lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import './CreateCelebForm.css';

export const CreateCelebForm = observer(() => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCeleb,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['celebs'] });

      setName('');
      setDescription('');
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ id: uniqid(), name, description });

    setName('');
    setDescription('');
  };

  const handleSetName = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
  const handleSetDescription = useCallback((e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value), []);

  return (
    <div className="add-celeb">
      <h2>Добавить знаменитость</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя" value={name} onChange={handleSetName} required />
        <input
          type="text"
          placeholder="Род деятельности"
          value={description}
          onChange={handleSetDescription}
          required
        />
        <button type="submit" className="button" disabled={mutation.isPending}>
          {mutation.isPending ? <Loader size="xs" /> : 'Добавить'}
        </button>
      </form>
    </div>
  );
});
