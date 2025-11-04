import { useParams, useNavigate } from 'react-router-dom';
import { Box, Chip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { allIncidents } from '../../data/mockData';

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const current = allIncidents.find(item => item.id === parseInt(id || '0'));

  if (!current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <span style={{ color: 'var(--gray-600)' }}>Olay bulunamadı.</span>
      </Box>
    );
  }

  const getPriorityColor = (priority: string) => {
    const p = priority?.toUpperCase() || '';
    switch (p) {
      case 'URGENT': return 'error';
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'NORMAL': return 'info';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    const p = priority?.toUpperCase() || '';
    switch (p) {
      case 'URGENT': return 'Acil';
      case 'CRITICAL': return 'Kritik';
      case 'HIGH': return 'Yüksek';
      case 'MEDIUM': return 'Orta';
      case 'NORMAL': return 'Normal';
      case 'LOW': return 'Düşük';
      default: return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    const s = status?.toUpperCase() || '';
    const statusMap: Record<string, string> = {
      'PENDING': 'Beklemede',
      'REPORTED': 'Bildirildi',
      'INVESTIGATING': 'İnceleniyor',
      'IN_PROGRESS': 'Devam Ediyor',
      'RESOLVED': 'Çözüldü',
      'CLOSED': 'Kapalı',
      'OPEN': 'Açık',
      'COMPLETED': 'Tamamlandı',
      'ACTIVE': 'Aktif',
      'INACTIVE': 'Pasif',
    };
    return statusMap[s] || status;
  };

  return (
    <div className="modern-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{current.incidentNumber}</h1>
          <p className="page-subtitle">
            <a
              href="/incidents"
              onClick={(e) => { e.preventDefault(); navigate('/incidents'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Olaylar Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate(`/incidents/${id}/edit`)}
          >
            <EditIcon style={{ fontSize: '1.25rem' }} />
            Düzenle
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* Incident Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>{current.title}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Chip
                  label={getStatusLabel(current.status)}
                  sx={{
                    bgcolor: `${current.status === 'COMPLETED' ? '#10b981' : current.status === 'OPEN' ? '#ef4444' : '#3b82f6'}20`,
                    color: current.status === 'COMPLETED' ? '#10b981' : current.status === 'OPEN' ? '#ef4444' : '#3b82f6',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={getPriorityLabel(current.priority)}
                  color={getPriorityColor(current.priority) as any}
                  sx={{ fontWeight: 600 }}
                />
              </div>
            </div>

            <div className="info-grid" style={{ marginBottom: '1.5rem' }}>
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <span className="info-label">Açıklama</span>
                <span className="info-value">{current.description}</span>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Olay Numarası</span>
                <span className="info-value">{current.incidentNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Bildirim Tarihi</span>
                <span className="info-value">
                  {new Date(current.reportedDate).toLocaleDateString('tr-TR')}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">Bildiren Kişi</span>
                <span className="info-value">Kullanıcı ID: {current.reportedBy}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Atanan Kişi</span>
                <span className="info-value">Kullanıcı ID: {current.assignedTo}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Lokasyon</span>
                <span className="info-value">{current.locationName}</span>
              </div>
            </div>
          </div>

          {/* Asset Information */}
          <div className="modern-card">
            <div className="card-header">Varlık Bilgileri</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">SAP Numarası</span>
                <span className="info-value">{current.sapNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Varlık Başlığı</span>
                <span className="info-value">{current.assetTitle}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Varlık ID</span>
                <span className="info-value">{current.assetId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Reported By */}
          <div className="modern-card">
            <div className="card-header">Bildiren</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Kullanıcı ID</span>
                <span className="info-value">{current.reportedBy}</span>
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div className="modern-card">
            <div className="card-header">Atanan Kişi</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Kullanıcı ID</span>
                <span className="info-value">{current.assignedTo}</span>
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div className="modern-card">
            <div className="card-header">Durum Bilgileri</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Durum</span>
                <span className="info-value">{getStatusLabel(current.status)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Öncelik</span>
                <span className="info-value">{getPriorityLabel(current.priority)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Bildirim Tarihi</span>
                <span className="info-value" style={{ fontSize: '0.875rem' }}>
                  {new Date(current.reportedDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
