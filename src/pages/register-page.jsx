import React from 'react';
import { useDispatch } from 'react-redux';
import { RegisterForm } from '@/components/fragments';
import { toast } from '@/components/ui/toast';
import { authUserThunks } from '@/store/auth-user';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = React.useCallback(
    async (registerFormData) => {
      try {
        await dispatch(authUserThunks.asyncRegister(registerFormData));
        navigate('/login');
      } catch (error) {
        toast.error(error.message);
      }
    },
    [dispatch, navigate],
  );

  return <RegisterForm onSubmit={handleRegister} />;
}
