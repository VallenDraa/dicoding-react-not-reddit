import React from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <section className="flex h-screen flex-col justify-center">
      <Outlet />
    </section>
  );
}
