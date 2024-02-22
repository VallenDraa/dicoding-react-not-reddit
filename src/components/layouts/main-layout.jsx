import React from 'react';
import { Outlet } from 'react-router-dom';
import { MenuHeader } from '@/components/fragments';

export function MainLayout() {
  return (
    <section>
      <MenuHeader />
      <Outlet />
      <div className="container flex items-center justify-between py-4 font-bold text-teal-500">
        <span className="text-sm">Not Blocked, Not Reddit.</span>
        <span className="text-sm">Made by VallenDra</span>
      </div>
    </section>
  );
}
