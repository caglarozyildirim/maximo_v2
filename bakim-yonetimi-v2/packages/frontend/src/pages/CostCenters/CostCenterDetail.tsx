import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { allCostCenterChanges } from '../../data/mockData';

const CostCenterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const currentChange = allCostCenterChanges.find(item => item.id === parseInt(id || '0'));

  const handleEdit = () => {
    navigate(`/cost-centers/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Bu masraf merkezi değişikliğini silmek istediğinizden emin misiniz?')) {
      enqueueSnackbar('Masraf merkezi değişikliği başarıyla silindi', {
        variant: 'success',
      });
      navigate('/cost-centers');
    }
  };

  const handleApprove = async () => {
    enqueueSnackbar('Masraf merkezi değişikliği onaylandı', { variant: 'success' });
  };

  const handleReject = async () => {
    const reason = window.prompt('Red nedeni:');
    if (reason) {
      enqueueSnackbar('Masraf merkezi değişikliği reddedildi', { variant: 'success' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    const s = status?.toUpperCase() || '';
    const statusMap: Record<string, string> = {
      'PENDING': 'Beklemede',
      'APPROVED': 'Onaylandı',
      'REJECTED': 'Reddedildi',
      'ACTIVE': 'Aktif',
      'INACTIVE': 'Pasif',
    };
    return statusMap[s] || status;
  };

  if (!currentChange) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <span style={{ color: 'var(--gray-600)' }}>Masraf merkezi değişikliği bulunamadı.</span>
      </Box>
    );
  }

  return (
    <div className="modern-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{currentChange.changeNumber}</h1>
          <p className="page-subtitle">
            <a
              href="/cost-centers"
              onClick={(e) => { e.preventDefault(); navigate('/cost-centers'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Masraf Merkezi Değişiklikleri Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {currentChange.status === 'PENDING' && (
            <>
              <button
                className="modern-btn modern-btn-primary"
                onClick={handleApprove}
                style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
              >
                <CheckIcon style={{ fontSize: '1.25rem' }} />
                Onayla
              </button>
              <button
                className="modern-btn modern-btn-primary"
                onClick={handleReject}
                style={{ background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)' }}
              >
                <CloseIcon style={{ fontSize: '1.25rem' }} />
                Reddet
              </button>
              <button
                className="modern-btn modern-btn-secondary"
                onClick={handleEdit}
              >
                <EditIcon style={{ fontSize: '1.25rem' }} />
                Düzenle
              </button>
            </>
          )}
          <button
            className="modern-btn modern-btn-secondary"
            onClick={handleDelete}
            style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
          >
            <DeleteIcon style={{ fontSize: '1.25rem' }} />
            Sil
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* General Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>Genel Bilgiler</span>
              <Chip
                label={getStatusLabel(currentChange.status)}
                color={getStatusColor(currentChange.status) as any}
                sx={{ fontWeight: 600 }}
              />
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Değişiklik No</span>
                <span className="info-value">{currentChange.changeNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Değişiklik Tarihi</span>
                <span className="info-value">
                  {new Date(currentChange.changeDate).toLocaleDateString('tr-TR')}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">Talep Eden</span>
                <span className="info-value">{currentChange.requestedBy}</span>
              </div>
            </div>
          </div>

          {/* Asset Information */}
          <div className="modern-card">
            <div className="card-header">Varlık Bilgileri</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Varlık No</span>
                <span className="info-value">{currentChange.assetNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Varlık Başlığı</span>
                <span className="info-value">{currentChange.assetTitle}</span>
              </div>
            </div>
          </div>

          {/* Cost Center Changes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Old Cost Center */}
            <div className="modern-card">
              <div className="card-header">Eski Masraf Merkezi</div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Kod</span>
                  <span className="info-value">{currentChange.fromCostCenter}</span>
                </div>
              </div>
            </div>

            {/* New Cost Center */}
            <div className="modern-card">
              <div className="card-header">Yeni Masraf Merkezi</div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Kod</span>
                  <span className="info-value">{currentChange.toCostCenter}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div>
          {/* Requested By */}
          <div className="modern-card">
            <div className="card-header">Talep Eden</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">İsim</span>
                <span className="info-value">{currentChange.requestedBy}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="modern-card">
            <div className="card-header">Durum</div>
            <div className="info-item">
              <Chip
                label={getStatusLabel(currentChange.status)}
                color={getStatusColor(currentChange.status) as any}
                sx={{
                  fontWeight: 600,
                  width: '100%',
                  justifyContent: 'center',
                }}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="modern-card">
            <div className="card-header">Tarihler</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Değişiklik Tarihi</span>
                <span className="info-value" style={{ fontSize: '0.875rem' }}>
                  {new Date(currentChange.changeDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCenterDetail;
