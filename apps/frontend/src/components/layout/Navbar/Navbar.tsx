import React from 'react';

interface NavbarProps {
  links: { name: string; href: string }[];
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ links, logo }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-white text-lg font-semibold">Food Website</span>
        </div>
        <div className="flex space-x-4">
          <a
            key="Home"
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </a>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            key="BookTable"
            href="/book-table"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Book Table
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
