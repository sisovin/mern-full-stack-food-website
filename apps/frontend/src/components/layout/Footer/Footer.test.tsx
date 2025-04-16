import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import nock from 'nock';

describe('Footer component', () => {
  test('renders Footer component', () => {
    const links = [
      { name: 'Home', href: '/' },
      { name: 'Menu', href: '/menu' },
      { name: 'Contact', href: '/contact' },
    ];
    const socialMedia = [
      { name: 'Facebook', href: 'https://facebook.com', icon: <i className="fab fa-facebook"></i> },
      { name: 'Twitter', href: 'https://twitter.com', icon: <i className="fab fa-twitter"></i> },
      { name: 'Instagram', href: 'https://instagram.com', icon: <i className="fab fa-instagram"></i> },
    ];

    render(<Footer links={links} socialMedia={socialMedia} />);
    const homeLink = screen.getByText(/Home/i);
    const menuLink = screen.getByText(/Menu/i);
    const contactLink = screen.getByText(/Contact/i);
    const facebookIcon = screen.getByText(/Facebook/i);
    const twitterIcon = screen.getByText(/Twitter/i);
    const instagramIcon = screen.getByText(/Instagram/i);

    expect(homeLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
  });

  test('renders links and socialMedia props correctly', () => {
    const links = [
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Blog', href: '/blog' },
    ];
    const socialMedia = [
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: <i className="fab fa-linkedin"></i> },
      { name: 'YouTube', href: 'https://youtube.com', icon: <i className="fab fa-youtube"></i> },
      { name: 'Pinterest', href: 'https://pinterest.com', icon: <i className="fab fa-pinterest"></i> },
    ];

    render(<Footer links={links} socialMedia={socialMedia} />);
    const aboutLink = screen.getByText(/About/i);
    const servicesLink = screen.getByText(/Services/i);
    const blogLink = screen.getByText(/Blog/i);
    const linkedinIcon = screen.getByText(/LinkedIn/i);
    const youtubeIcon = screen.getByText(/YouTube/i);
    const pinterestIcon = screen.getByText(/Pinterest/i);

    expect(aboutLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(youtubeIcon).toBeInTheDocument();
    expect(pinterestIcon).toBeInTheDocument();
  });

  test('mocks API call for footer component', async () => {
    nock('http://localhost:3000')
      .get('/api/footer-data')
      .reply(200, {
        links: [
          { name: 'Home', href: '/' },
          { name: 'Menu', href: '/menu' },
          { name: 'Contact', href: '/contact' },
        ],
        socialMedia: [
          { name: 'Facebook', href: 'https://facebook.com', icon: <i className="fab fa-facebook"></i> },
          { name: 'Twitter', href: 'https://twitter.com', icon: <i className="fab fa-twitter"></i> },
          { name: 'Instagram', href: 'https://instagram.com', icon: <i className="fab fa-instagram"></i> },
        ],
      });

    const { getByText } = render(<Footer links={[]} socialMedia={[]} />);
    const homeLink = getByText(/Home/i);
    const menuLink = getByText(/Menu/i);
    const contactLink = getByText(/Contact/i);
    const facebookIcon = getByText(/Facebook/i);
    const twitterIcon = getByText(/Twitter/i);
    const instagramIcon = getByText(/Instagram/i);

    expect(homeLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
  });
});
