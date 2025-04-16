import React, { createContext, useState, ReactNode } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

interface UIProviderProps {
  children: ReactNode;
}

const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <UIContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIContext, UIProvider };
