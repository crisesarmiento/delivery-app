'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useParams } from 'next/navigation';
import { IBranch, IProduct } from '@/types';
import { useBranches } from '@/hooks/useBranches';
import { useProducts } from '@/hooks/useProducts';

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
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
}

// Create the context with a default empty value
const NavContext = createContext<NavContextType>({
  activeTab: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTab: (value: string) => {},
  activeBranch: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveBranch: (branch: IBranch | undefined) => {},
  expandedSections: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setExpandedSections: (sections: Record<string, boolean>) => {},
  branches: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBranches: (branches: IBranch[]) => {},
  products: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProducts: (products: IProduct[]) => {},
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  const {
    allBranches,
    loading: branchesLoading,
    error: branchesError,
  } = useBranches();

  const params = useParams();

  const branchId = (params?.branchId as string) || '';

  const {
    branchProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  useEffect(() => {
    if (allBranches.length > 0) {
      setBranches(allBranches);
    }
  }, [allBranches]);

  console.log(allBranches);

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
    if (parseInt(branchId)) {
      const found = branches.find((b) => b.id === parseInt(branchId));
      if (found) setActiveBranch(found);
    }
  }, [branchId, branches, setActiveBranch]);

  useEffect(() => {
    if (activeBranch) {
      setProducts(branchProducts);
      setLoading(productsLoading);
      setError(productsError);
    }
  }, [activeBranch, branchProducts, productsLoading, productsError]);

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
        products,
        setProducts,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
