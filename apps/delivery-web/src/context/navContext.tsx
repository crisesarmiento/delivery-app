'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// Define navigation context interface
interface NavContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  expandedSections: Record<string, boolean>;
  setExpandedSections: (sections: Record<string, boolean>) => void;
}

// Create the context with a default empty value
const NavContext = createContext<NavContextType>({
  activeTab: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTab: (value: string) => {},
  expandedSections: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setExpandedSections: (sections: Record<string, boolean>) => {},
});

// Custom hook to use the navigation context
export const useNav = () => useContext(NavContext);

// Provider component to wrap the application
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('');
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (activeTab) {
      setExpandedSections((sections: Record<string, boolean>) => {
        const newState: Record<string, boolean> = { ...sections };
        Object.keys(newState).forEach((key) => {
          newState[key] = key === activeTab.toLowerCase();
        });
        return newState;
      });
    }
  }, [activeTab, setExpandedSections]);

  return (
    <NavContext.Provider
      value={{
        activeTab,
        setActiveTab,
        expandedSections,
        setExpandedSections,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
