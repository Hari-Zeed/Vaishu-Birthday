'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

export function Navbar() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'messages', label: 'Messages' },
    { id: 'memories', label: 'Memories' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'letter', label: 'Open Letter' },
    { id: 'surprises', label: 'Surprises' },
  ];

  const handleScroll = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-xl font-bold text-primary">Birthday</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeTab === item.id
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <select
              value={activeTab}
              onChange={(e) => handleScroll(e.target.value)}
              className="bg-primary/20 border border-primary/40 rounded-lg px-3 py-2 text-sm text-foreground"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
