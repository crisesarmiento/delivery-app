import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      className="product-card"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '320px',
        backgroundColor: 'white',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      {!product.isAvailable && (
        <div
          className="unavailable-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '4px',
            }}
          >
            Currently Unavailable
          </span>
        </div>
      )}
      {product.imageUrl && (
        <div
          className="product-image"
          style={{
            height: '180px',
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <div
        className="product-info"
        style={{
          padding: '16px',
        }}
      >
        <div
          className="product-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
            {product.name}
          </h3>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#2e7d32',
            }}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p
          style={{
            margin: '0 0 12px',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.4',
          }}
        >
          {product.description}
        </p>
        <div
          className="product-footer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '4px 8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#666',
            }}
          >
            {product.category}
          </span>
          <button
            onClick={onAddToCart}
            disabled={!product.isAvailable}
            style={{
              backgroundColor: product.isAvailable ? '#2e7d32' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: product.isAvailable ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;