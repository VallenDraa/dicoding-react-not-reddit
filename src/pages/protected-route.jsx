import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { toast } from '@/components/ui/toast';
import { tokenHandler } from '@/utils';

export function ProtectedRoute({ children }) {
  const token = tokenHandler.getAccessToken();

  if (!token) {
    toast.info('Oops, you need to login first.');
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
