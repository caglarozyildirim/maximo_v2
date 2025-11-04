import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
} from '@mui/icons-material';
import { allAssets } from '../../data/mockData';

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Use mock data
  const current = allAssets.find(asset => asset.id === parseInt(id || '0'));

  if (!current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div>Varlık bulunamadı</div>
      </Box>
    );
  }

  const getStatusColor = (color?: string) => color || '#3b82f6';

  return (
    <div className="modern-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{current.maintenanceId}</h1>
          <p className="page-subtitle">
            <a
              href="/assets"
              onClick={(e) => { e.preventDefault(); navigate('/assets'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Varlıklar Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate(`/assets/${id}/edit`)}
          >
            <EditIcon style={{ fontSize: '1.25rem' }} />
            Düzenle
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* Basic Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>{current.title}</span>
              <Chip
                label={current.status}
                sx={{
                  bgcolor: `${getStatusColor()}20`,
                  color: getStatusColor(),
                  fontWeight: 600,
                }}
              />
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Varlık Tipi</span>
                <span className="info-value">{current.assetGroup}</span>
              </div>

              {current.serialNumber && (
                <div className="info-item">
                  <span className="info-label">Seri No</span>
                  <span className="info-value">{current.serialNumber}</span>
                </div>
              )}

              {current.model && (
                <div className="info-item">
                  <span className="info-label">Model</span>
                  <span className="info-value">{current.model}</span>
                </div>
              )}

              {current.manufacturer && (
                <div className="info-item">
                  <span className="info-label">Üretici</span>
                  <span className="info-value">{current.manufacturer}</span>
                </div>
              )}
            </div>
          </div>

          {/* Financial Information */}
          <div className="modern-card">
            <div className="card-header">Mali Bilgiler</div>
            <div className="info-grid">
              {current.purchasePrice && (
                <div className="info-item">
                  <span className="info-label">Alış Fiyatı</span>
                  <span className="info-value">₺{current.purchasePrice.toLocaleString('tr-TR')}</span>
                </div>
              )}

              {current.currentValue && (
                <div className="info-item">
                  <span className="info-label">Güncel Değer</span>
                  <span className="info-value">₺{current.currentValue.toLocaleString('tr-TR')}</span>
                </div>
              )}

              {current.purchaseDate && (
                <div className="info-item">
                  <span className="info-label">Alış Tarihi</span>
                  <span className="info-value">{new Date(current.purchaseDate).toLocaleDateString('tr-TR')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Maintenance History */}
          <div className="modern-card">
            <div className="card-header">Bakım Geçmişi</div>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <span style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                Henüz bakım kaydı yok
              </span>
            </Box>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Location */}
          {current.location && (
            <div className="modern-card">
              <div className="card-header">Lokasyon</div>
              <div className="info-item">
                <span className="info-value">{current.location}</span>
              </div>
            </div>
          )}

          {/* Cost Center */}
          {current.costCenter && (
            <div className="modern-card">
              <div className="card-header">Masraf Merkezi</div>
              <div className="info-item">
                <span className="info-value">{current.costCenter}</span>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="modern-card">
            <div className="card-header">Tarihler</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Oluşturma</span>
                <span className="info-value" style={{ fontSize: '0.875rem' }}>
                  {new Date(current.createdAt).toLocaleString('tr-TR')}
                </span>
              </div>
              {current.updatedAt && (
                <div className="info-item">
                  <span className="info-label">Güncelleme</span>
                  <span className="info-value" style={{ fontSize: '0.875rem' }}>
                    {new Date(current.updatedAt).toLocaleString('tr-TR')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
