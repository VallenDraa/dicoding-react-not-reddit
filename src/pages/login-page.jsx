import React from 'react';
import { LoginForm } from '@/components/fragments/login-form';
import { toast } from '@/components/ui/toast';
import { authUserThunks } from '@/store/auth-user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = React.useCallback(
    async (loginFormData) => {
      try {
        await dispatch(authUserThunks.asyncLogin(loginFormData));
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      }
    },
    [dispatch, navigate],
  );

  return <LoginForm onSubmit={handleLogin} />;
}
