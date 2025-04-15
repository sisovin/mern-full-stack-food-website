import React from 'react';

interface SidebarProps {
  items: { name: string; href: string }[];
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 p-4 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <ul>
        {items.map((item) => (
          <li key={item.name} className="mb-4">
            <a href={item.href} className="text-white hover:text-gray-300">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
