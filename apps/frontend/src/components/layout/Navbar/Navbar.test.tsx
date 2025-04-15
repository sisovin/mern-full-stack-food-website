import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('renders Navbar component', () => {
    const links = [
      { name: 'Home', href: '/' },
      { name: 'Menu', href: '/menu' },
      { name: 'Contact', href: '/contact' },
    ];
    const logo = 'logo.png';

    render(<Navbar links={links} logo={logo} />);
    const homeLink = screen.getByText(/Home/i);
    const menuLink = screen.getByText(/Menu/i);
    const contactLink = screen.getByText(/Contact/i);
    const logoElement = screen.getByAltText(/Logo/i);

    expect(homeLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
  });

  test('renders links and logo props correctly', () => {
    const links = [
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Blog', href: '/blog' },
    ];
    const logo = 'new-logo.png';

    render(<Navbar links={links} logo={logo} />);
    const aboutLink = screen.getByText(/About/i);
    const servicesLink = screen.getByText(/Services/i);
    const blogLink = screen.getByText(/Blog/i);
    const logoElement = screen.getByAltText(/Logo/i);

    expect(aboutLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
  });
});
