'use client';

import React from 'react';
import { useBranches } from '../../hooks';
import Image from 'next/image';

function BranchDemo() {
  const { branches, loading, error } = useBranches();

  // Use explicit array validation
  const validBranches = Array.isArray(branches) ? branches : [];

  return (
    <div className="branch-demo">
      <h2>Nuestras Sucursales</h2>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <p>Cargando sucursales...</p>
      ) : validBranches.length === 0 ? (
        <p>No hay sucursales disponibles.</p>
      ) : (
        <div className="branches-list">
          {validBranches.map((branch) => {
            // Validate branch object
            if (
              typeof branch !== 'object' ||
              branch === null ||
              !('id' in branch)
            ) {
              console.error('Invalid branch object:', branch);
              return null;
            }
            return (
              <div key={branch.id} className="branch-card">
                {branch.imageUrl && (
                  <Image
                    src={branch.imageUrl}
                    alt={branch.name}
                    width={300}
                    height={200}
                    className="branch-image"
                  />
                )}
                <div className="branch-details">
                  <h3>{branch.name}</h3>
                  <p>{branch.address}</p>
                  <span
                    className={branch.isOpen ? 'status-open' : 'status-closed'}
                  >
                    {branch.isOpen ? 'Abierto' : 'Cerrado'}
                  </span>
                  <p className="branch-hours">{branch.openingHours}</p>
                  <p className="branch-phone">{branch.phoneNumber}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BranchDemo;
