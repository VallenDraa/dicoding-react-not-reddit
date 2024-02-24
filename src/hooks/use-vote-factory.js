import { toast } from '@/components/ui/toast';
import { leaderboardThunks } from '@/store/leaderboard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useVoteFactory() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const navigate = useNavigate();

  const threadVoteFactory = (voteThunk) => async (threadId) => {
    try {
      if (!authUser?.id) {
        navigate('/login');
        return;
      }

      await dispatch(voteThunk(threadId));
      await dispatch(leaderboardThunks.asyncSetLeaderboard());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return threadVoteFactory;
}
