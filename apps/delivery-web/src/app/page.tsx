'use client';

import { useState, useEffect } from 'react';
import { Branch } from '../types';
import { branchesApi } from '../services/api';
import BranchCard from '../components/BranchCard/BranchCard';

export default function HomePage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await branchesApi.getBranches();
        if (response.success && response.data) {
          setBranches(response.data);
        } else {
          setError(response.message || 'Failed to fetch branches');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBranches();
  }, []);

  const handleBranchClick = (branchId: string) => {
    // This will be implemented in the future to navigate to branch details
    console.log(`Branch clicked: ${branchId}`);
    // Future implementation will use Next.js router to navigate to the branch page
  };

  return (
    <main className="main-container" style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>
        Smarty Delivery
      </h1>

      <section>
        <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>
          Select a Restaurant
        </h2>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            Loading...
          </div>
        )}

        {error && (
          <div style={{
            padding: '20px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <div className="branches-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {branches.map(branch => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onClick={() => handleBranchClick(branch.id)}
            />
          ))}
        </div>

        {branches.length === 0 && !loading && !error && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            No restaurants available at the moment.
          </div>
        )}
      </section>

      <footer style={{
        marginTop: '60px',
        padding: '20px 0',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>© 2023 Smarty Delivery. All rights reserved.</p>
      </footer>
    </main>
  );
}
