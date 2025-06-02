import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChevronDown, Bell, AlignLeft } from 'lucide-react';

function Header({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const avatarUrl = useMemo(
    () =>
      user?.profileImage ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0D8ABC&color=fff`,
    [user]
  );

  const handleDropdownToggle = () => setDropdownOpen((open) => !open);
  const handleDropdownClose = () => setDropdownOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <AlignLeft className="h-5 w-5" />
        </button>

        {/* Logo */}
        <span className="font-bold text-xl text-blue-600">MiniCRM</span>

        {/* Right side navigation items */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            className="relative text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User profile */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <img
                src={avatarUrl}
                alt={user?.name || 'User'}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500 hidden md:block" />
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                tabIndex={-1}
                onBlur={handleDropdownClose}
              >
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <div>{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
