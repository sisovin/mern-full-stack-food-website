import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Restaurant</h1>
        <p className="text-xl mb-8">Experience the best dining experience with us</p>
        <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600">Book a Table</button>
      </div>
    </section>
  );
};

export default HeroSection;
