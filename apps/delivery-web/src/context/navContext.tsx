'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useParams } from 'next/navigation';
import { IBranch } from '@/types';
import { useBranches } from '@/hooks/useBranches';

// Define navigation context interface
interface NavContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeBranch: IBranch | undefined;
  setActiveBranch: (branch: IBranch | undefined) => void;
  expandedSections: Record<string, boolean>;
  setExpandedSections: (sections: Record<string, boolean>) => void;
  branches: IBranch[];
  setBranches: (branches: IBranch[]) => void;
  loading: boolean;
}

// Create the context with a default empty value
const NavContext = createContext<NavContextType>({
  activeTab: '',
  setActiveTab: (value: string) => {},
  activeBranch: undefined,
  setActiveBranch: (branch: IBranch | undefined) => {},
  expandedSections: {},
  setExpandedSections: (sections: Record<string, boolean>) => {},
  branches: [],
  setBranches: (branches: IBranch[]) => {},
  loading: false,
});

// Custom hook to use the navigation context
export const useNav = () => useContext(NavContext);

// Provider component to wrap the application
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('');
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [activeBranch, setActiveBranch] = useState<IBranch | undefined>(
    undefined
  );
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    allBranches,
    loading: branchesLoading,
    error: branchesError,
    refetch,
  } = useBranches();

  const params = useParams();

  const branchId = params?.branchId ? Number(params.branchId) : null;

  useEffect(() => {
    refetch();
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(branchesLoading);
    if (allBranches.length > 0) {
      setBranches(allBranches);
      setLoading(false);
    } else {
      setError('No branches found');
      setLoading(false);
    }
  }, [allBranches, branchesLoading, branchesError]);

  useEffect(() => {
    if (branchId) {
      const found = branches.find((b) => b.id === branchId);
      if (found) setActiveBranch(found);
    }
  }, [branchId, branches, setActiveBranch]);

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
        activeBranch,
        setActiveBranch,
        branches,
        setBranches,
        loading,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
