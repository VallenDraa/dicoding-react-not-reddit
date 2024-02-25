import React from 'react';
import { useDispatch } from 'react-redux';
import { NewThread } from '@/components/fragments/new-thread/new-thread';
import { toast } from '@/components/ui/toast';
import { threadsThunks } from '@/store/threads';
import { useNavigate } from 'react-router-dom';
import { CategoryList, Leaderboard } from '@/components/fragments';

export function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (newThread) => {
    try {
      await dispatch(threadsThunks.asyncCreate(newThread));
      toast.info('Successfully created a new thread.');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-4 flex max-w-full flex-col items-start gap-6 md:flex-row">
      <NewThread className="w-full md:w-3/4" onSubmit={handleSubmit} />

      <hr className="w-full border-gray-300 md:hidden" />

      <div className="top-20 flex w-full flex-col gap-4 md:sticky md:w-1/4">
        <CategoryList />
        <Leaderboard />
      </div>
    </div>
  );
}
