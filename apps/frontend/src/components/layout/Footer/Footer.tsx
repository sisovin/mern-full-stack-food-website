import React from 'react';

interface FooterProps {
  links: { name: string; href: string }[];
  socialMedia: { name: string; href: string; icon: React.ReactNode }[];
}

const Footer: React.FC<FooterProps> = ({ links, socialMedia }) => {
  return (
    <footer className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex space-x-4">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
