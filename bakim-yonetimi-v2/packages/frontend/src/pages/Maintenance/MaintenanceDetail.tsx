import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
} from '@mui/icons-material';
import { allMaintenance } from '../../data/mockData';

const MaintenanceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const current = allMaintenance.find(item => item.id === parseInt(id || '0'));

  if (!current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <span style={{ color: 'var(--gray-600)' }}>Bakım görevi bulunamadı.</span>
      </Box>
    );
  }

  const getPriorityColor = (priority: string) => {
    const p = priority?.toLowerCase() || '';
    switch (p) {
      case 'urgent':
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
      case 'normal':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    const p = priority?.toLowerCase() || '';
    switch (p) {
      case 'urgent':
        return 'Acil';
      case 'critical':
        return 'Kritik';
      case 'high':
        return 'Yüksek';
      case 'medium':
        return 'Orta';
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Düşük';
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    const s = status?.toUpperCase() || '';
    const statusMap: Record<string, string> = {
      'PENDING': 'Beklemede',
      'IN_PROGRESS': 'Devam Ediyor',
      'COMPLETED': 'Tamamlandı',
      'OVERDUE': 'Gecikmiş',
      'CANCELLED': 'İptal',
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
          <h1 className="page-title">{current.maintenanceId}</h1>
          <p className="page-subtitle">
            <a
              href="/maintenance"
              onClick={(e) => { e.preventDefault(); navigate('/maintenance'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Bakım Görevleri Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate(`/maintenance/${id}/edit`)}
          >
            <EditIcon style={{ fontSize: '1.25rem' }} />
            Düzenle
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* Maintenance Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>Bakım Bilgileri</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Chip
                  label={getStatusLabel(current.status)}
                  sx={{
                    bgcolor: `${current.status === 'COMPLETED' ? '#10b981' : current.status === 'OVERDUE' ? '#ef4444' : '#3b82f6'}20`,
                    color: current.status === 'COMPLETED' ? '#10b981' : current.status === 'OVERDUE' ? '#ef4444' : '#3b82f6',
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

            {current.description && (
              <div className="info-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="info-label">Açıklama</span>
                  <span className="info-value">{current.description}</span>
                </div>
              </div>
            )}

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Görev Başlığı</span>
                <span className="info-value">{current.dutyTitle}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Görev Listesi Kodu</span>
                <span className="info-value">{current.taskListCode}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Planlanan Tarih</span>
                <span className="info-value">
                  {new Date(current.plannedDate).toLocaleDateString('tr-TR')}
                </span>
              </div>

              {current.actualStartDate && (
                <div className="info-item">
                  <span className="info-label">Gerçek Başlangıç</span>
                  <span className="info-value">
                    {new Date(current.actualStartDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              )}

              {current.actualEndDate && (
                <div className="info-item">
                  <span className="info-label">Gerçek Bitiş</span>
                  <span className="info-value">
                    {new Date(current.actualEndDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              )}

              {current.daysOverdue > 0 && (
                <div className="info-item">
                  <span className="info-label">Gecikme</span>
                  <span className="info-value" style={{ color: '#ef4444' }}>{current.daysOverdue} gün</span>
                </div>
              )}
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
          {/* Assigned User */}
          {current.assignedTo && (
            <div className="modern-card">
              <div className="card-header">Atanan Kişi</div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Kullanıcı ID</span>
                  <span className="info-value">{current.assignedTo}</span>
                </div>
              </div>
            </div>
          )}

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
              {current.criticalLevel && (
                <div className="info-item">
                  <span className="info-label">Kritiklik Seviyesi</span>
                  <span className="info-value">{current.criticalLevel}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetail;
