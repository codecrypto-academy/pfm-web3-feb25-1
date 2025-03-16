// components/UserCard.tsx
import React from 'react';
import { User } from '../lib/definition';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-medium text-gray-800">{user.address}</h3>
          <p className="text-sm text-gray-500">{user.role}</p>
          <p className="text-sm text-gray-500">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;