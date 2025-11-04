import { useParams, useNavigate } from 'react-router-dom';
import { Box, Chip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { allRetirements } from '../../data/mockData';

const RetirementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const current = allRetirements.find(item => item.id === parseInt(id || '0'));

  const getStatusLabel = (status: string) => {
    const s = status?.toUpperCase() || '';
    const statusMap: Record<string, string> = {
      'PENDING': 'Beklemede',
      'APPROVED': 'Onaylandı',
      'REJECTED': 'Reddedildi',
      'COMPLETED': 'Tamamlandı',
      'ACTIVE': 'Aktif',
      'INACTIVE': 'Pasif',
    };
    return statusMap[s] || status;
  };

  if (!current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <span style={{ color: 'var(--gray-600)' }}>Hurda kaydı bulunamadı.</span>
      </Box>
    );
  }

  return (
    <div className="modern-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{current.retirementNumber}</h1>
          <p className="page-subtitle">
            <a
              href="/retirements"
              onClick={(e) => { e.preventDefault(); navigate('/retirements'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Hurda Kayıtları Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate(`/retirements/${id}/edit`)}
          >
            <EditIcon style={{ fontSize: '1.25rem' }} />
            Düzenle
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* Retirement Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>Hurda Bilgileri</span>
              <Chip
                label={getStatusLabel(current.status)}
                color={current.status === 'COMPLETED' ? 'success' : current.status === 'PENDING' ? 'warning' : 'default'}
              />
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Hurda No</span>
                <span className="info-value">{current.retirementNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Varlık</span>
                <span className="info-value">{current.assetTitle}</span>
              </div>

              <div className="info-item">
                <span className="info-label">SAP Numarası</span>
                <span className="info-value">{current.sapNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Hurda Tarihi</span>
                <span className="info-value">
                  {new Date(current.retirementDate).toLocaleDateString('tr-TR')}
                </span>
              </div>

              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <span className="info-label">Sebep</span>
                <span className="info-value">{current.retirementReason}</span>
              </div>

              {current.bookValue && (
                <div className="info-item">
                  <span className="info-label">Defter Değeri</span>
                  <span className="info-value">₺{current.bookValue.toLocaleString('tr-TR')}</span>
                </div>
              )}

              {current.scrapValue && (
                <div className="info-item">
                  <span className="info-label">Hurda Değeri</span>
                  <span className="info-value">₺{current.scrapValue.toLocaleString('tr-TR')}</span>
                </div>
              )}

              {current.description && (
                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="info-label">Açıklama</span>
                  <span className="info-value">{current.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Asset Information */}
          <div className="modern-card">
            <div className="card-header">Varlık Bilgileri</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Varlık ID</span>
                <span className="info-value">{current.assetId}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Varlık Başlığı</span>
                <span className="info-value">{current.assetTitle}</span>
              </div>

              <div className="info-item">
                <span className="info-label">SAP Numarası</span>
                <span className="info-value">{current.sapNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Status */}
          <div className="modern-card">
            <div className="card-header">Durum</div>
            <div className="info-item">
              <Chip
                label={getStatusLabel(current.status)}
                color={current.status === 'COMPLETED' ? 'success' : current.status === 'PENDING' ? 'warning' : 'default'}
                sx={{
                  fontWeight: 600,
                  width: '100%',
                  justifyContent: 'center',
                }}
              />
            </div>
          </div>

          {/* Financial Summary */}
          {(current.bookValue || current.scrapValue) && (
            <div className="modern-card">
              <div className="card-header">Mali Özet</div>
              <div className="info-grid">
                {current.bookValue && (
                  <div className="info-item">
                    <span className="info-label">Defter Değeri</span>
                    <span className="info-value">₺{current.bookValue.toLocaleString('tr-TR')}</span>
                  </div>
                )}
                {current.scrapValue && (
                  <div className="info-item">
                    <span className="info-label">Hurda Değeri</span>
                    <span className="info-value">₺{current.scrapValue.toLocaleString('tr-TR')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Requesters */}
          <div className="modern-card">
            <div className="card-header">Talep Eden</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Kullanıcı ID</span>
                <span className="info-value">{current.requestedBy}</span>
              </div>
              {current.approvedBy && (
                <div className="info-item">
                  <span className="info-label">Onaylayan</span>
                  <span className="info-value">Kullanıcı ID: {current.approvedBy}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="modern-card">
            <div className="card-header">Tarihler</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Hurda Tarihi</span>
                <span className="info-value" style={{ fontSize: '0.875rem' }}>
                  {new Date(current.retirementDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementDetail;
