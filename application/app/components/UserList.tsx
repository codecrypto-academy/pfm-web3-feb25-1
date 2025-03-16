import React from 'react';
import UserCard from './UserCard';
import { User } from '../lib/definition';

interface UserListProps {
  users: User[];
  isLoading?: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
<div className="bg-gray-100 rounded-lg p-6 shadow-inner max-h-[70vh] overflow-y-auto">
  
  
  {users.length === 0 ? (
    <p className="text-gray-500 text-center py-4">No hay usuarios registrados</p>
  ) : (
    <div className="flex flex-col space-y-3">
      {users.map(user => (
        <UserCard key={user.address} user={user} />
      ))}
    </div>
  )}
</div>
  );
};

export default UserList;