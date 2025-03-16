import React from 'react';
import { User } from '../lib/definition';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`${user.name}'s avatar`} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;