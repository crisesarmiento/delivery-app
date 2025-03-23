'use client';

import { useState } from 'react';
import { useBranches, useProducts } from '../../hooks';
import Image from 'next/image';

// Using named function for better debugging
export function ProductDemo() {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const {
    branches,
    loading: branchesLoading,
    error: branchesError,
  } = useBranches();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts(selectedBranchId);

  const loading = branchesLoading || productsLoading;
  const error = branchesError || productsError;

  // Debug logging
  console.log('ProductDemo - branches:', branches);
  console.log('ProductDemo - products:', products);

  // Select first branch by default when branches are loaded
  if (branches.length > 0 && !selectedBranchId && !branchesLoading) {
    setSelectedBranchId(branches[0].id);
  }

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranchId(e.target.value);
  };

  // Use explicit array validations
  const validBranches = Array.isArray(branches) ? branches : [];
  const validProducts = Array.isArray(products) ? products : [];

  return (
    <div className="product-demo">
      <h2>Productos</h2>

      {validBranches.length > 0 && (
        <div className="branch-selector">
          <label htmlFor="branch-select">Seleccionar Sucursal: </label>
          <select
            id="branch-select"
            value={selectedBranchId}
            onChange={handleBranchChange}
          >
            {validBranches.map((branch) => {
              // Check branch type
              if (
                typeof branch !== 'object' ||
                branch === null ||
                !('id' in branch)
              ) {
                console.error('Invalid branch object:', branch);
                return null;
              }
              return (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>Cargando...</p>
        </div>
      )}

      <div className="products-grid">
        {validProducts.map((product) => {
          // Check product type
          if (
            typeof product !== 'object' ||
            product === null ||
            !('id' in product)
          ) {
            console.error('Invalid product object:', product);
            return null;
          }
          return (
            <div key={product.id} className="product-card">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={150}
                />
              )}
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      {!loading && validProducts.length === 0 && !error && (
        <p>No hay productos disponibles en esta sucursal.</p>
      )}
    </div>
  );
}

// Add default export to ensure compatibility
export default ProductDemo;
