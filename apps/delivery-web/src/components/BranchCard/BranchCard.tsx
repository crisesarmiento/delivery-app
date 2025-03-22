import { Branch } from '../../types';

interface BranchCardProps {
  branch: Branch;
  onClick?: () => void;
}

export function BranchCard({ branch, onClick }: BranchCardProps) {
  return (
    <div
      className="branch-card"
      onClick={onClick}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px 0',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      {branch.imageUrl && (
        <div
          className="branch-image"
          style={{
            height: '160px',
            backgroundImage: `url(${branch.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '4px',
            marginBottom: '12px',
          }}
        />
      )}
      <div className="branch-info">
        <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
          {branch.name}
        </h3>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#666' }}>
          {branch.address}
        </p>
        <div
          className="branch-status"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            color: branch.isOpen ? '#43a047' : '#e53935',
            fontWeight: 500,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: branch.isOpen ? '#43a047' : '#e53935',
              marginRight: '6px',
            }}
          />
          {branch.isOpen ? 'Open' : 'Closed'}
          <span style={{ marginLeft: 'auto', color: '#666' }}>
            {branch.openingHours}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BranchCard;