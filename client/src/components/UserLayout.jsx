import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}