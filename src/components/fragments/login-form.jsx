import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isSubmitDisabled = !email || !password;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({ email, password });
  }

  return (
    <form className="container flex max-w-md flex-col" onSubmit={handleSubmit}>
      <div className="mb-6 space-y-2">
        <h1>Log In</h1>
        <p>
          You know it&apos;s{' '}
          <strong className="font-bold text-teal-500">not reddit</strong>,
          because it&apos;s{' '}
          <strong className="font-bold text-teal-500">not blocked</strong>,.
          Login now!
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4">
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="johndoe@gmail.com"
        />

        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="notreddit123"
        />
      </div>

      <Button type="submit" pill disabled={isSubmitDisabled} className="mb-2">
        Login
      </Button>

      <div className="flex justify-center gap-1">
        <span className="text-sm">Don&apos;t have an account?</span>
        <Button className="p-0 text-sm" to="/register" variant="link">
          Register here.
        </Button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
