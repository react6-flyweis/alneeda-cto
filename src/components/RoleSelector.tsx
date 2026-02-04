import React, { useState } from 'react';

interface RoleSelectorProps {
  label?: string;
  onRoleChange?: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ label = 'Who are you?', onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const roles = ['CEO', 'COO', 'CTO', 'CFO', 'CMO', 'LPD', 'GSD', 'AAD'];

  const selectRole = (role: string) => {
    setSelectedRole(role);
    onRoleChange?.(role);
  };

  return (
    <div className="mb-6 max-w-2xl">
      <label className="block text-2xl font-medium text-gray-900 mb-3">{label}</label>
      <div className="flex lg:justify-between justify-start flex-wrap gap-2">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => selectRole(role)}
            className={`h-18 w-18 rounded-lg font-normal text-lg transition-all duration-200 ${
              selectedRole === role
                ? 'bg-(--dark-blue) text-white  hover:bg-gray-200'
                : 'bg-[#EDEDED] text-(--dark-text-gray) hover:bg-[#EDEDED]'
            }`}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
