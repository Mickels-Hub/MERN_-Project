import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F5F7F5]">
      <div className="p-8 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}