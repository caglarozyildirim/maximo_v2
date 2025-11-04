import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  AssignmentReturn as ReturnIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { allAssignments } from '../../data/mockData';

const AssignmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const current = allAssignments.find(item => item.id === parseInt(id || '0'));
  const { enqueueSnackbar } = useSnackbar();

  const getStatusLabel = (status: string) => {
    const s = status?.toUpperCase() || '';
    const statusMap: Record<string, string> = {
      'ACTIVE': 'Aktif',
      'INACTIVE': 'Pasif',
      'RETURNED': 'İade Edildi',
      'OVERDUE': 'Gecikmiş',
      'PENDING': 'Beklemede',
    };
    return statusMap[s] || status;
  };

  const [returnDialog, setReturnDialog] = useState(false);
  const [returnNotes, setReturnNotes] = useState('');
  const [returning, setReturning] = useState(false);

  const handleOpenReturnDialog = () => {
    setReturnDialog(true);
    setReturnNotes('');
  };

  const handleCloseReturnDialog = () => {
    setReturnDialog(false);
    setReturnNotes('');
  };

  const handleReturnAssignment = async () => {
    if (!id) return;

    setReturning(true);
    try {
      // Mock implementation - would normally call API
      enqueueSnackbar('Zimmet başarıyla iade edildi', { variant: 'success' });
      handleCloseReturnDialog();
    } catch (error) {
      enqueueSnackbar('İade işlemi sırasında bir hata oluştu', { variant: 'error' });
    } finally {
      setReturning(false);
    }
  };

  if (!current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <span style={{ color: 'var(--gray-600)' }}>Zimmet bulunamadı.</span>
      </Box>
    );
  }

  return (
    <div className="modern-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{current.assignmentNumber}</h1>
          <p className="page-subtitle">
            <a
              href="/assignments"
              onClick={(e) => { e.preventDefault(); navigate('/assignments'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Zimmetler Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {current.status === 'ACTIVE' && (
            <>
              <button
                className="modern-btn modern-btn-secondary"
                onClick={() => navigate(`/assignments/${id}/edit`)}
              >
                <EditIcon style={{ fontSize: '1.25rem' }} />
                Düzenle
              </button>
              <button
                className="modern-btn modern-btn-primary"
                onClick={handleOpenReturnDialog}
                style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
              >
                <ReturnIcon style={{ fontSize: '1.25rem' }} />
                İade Et
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* Assignment Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>Zimmet Bilgileri</span>
              <Chip
                label={getStatusLabel(current.status)}
                color={current.status === 'ACTIVE' ? 'success' : current.status === 'OVERDUE' ? 'error' : 'default'}
                sx={{ fontWeight: 600 }}
              />
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Zimmet No</span>
                <span className="info-value">{current.assignmentNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Zimmet Tarihi</span>
                <span className="info-value">
                  {new Date(current.assignedDate).toLocaleDateString('tr-TR')}
                </span>
              </div>

              {current.expectedReturnDate && (
                <div className="info-item">
                  <span className="info-label">Beklenen İade Tarihi</span>
                  <span className="info-value">
                    {new Date(current.expectedReturnDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              )}

              {current.daysOverdue > 0 && (
                <div className="info-item">
                  <span className="info-label">Gecikme</span>
                  <span className="info-value" style={{ color: '#ef4444' }}>{current.daysOverdue} gün</span>
                </div>
              )}

              <div className="info-item">
                <span className="info-label">Departman</span>
                <span className="info-value">{current.department}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Durum</span>
                <span className="info-value">{current.condition}</span>
              </div>

              {current.notes && (
                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="info-label">Notlar</span>
                  <span className="info-value">{current.notes}</span>
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
                <span className="info-label">Bakım ID</span>
                <span className="info-value">{current.maintenanceId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Assigned To User */}
          <div className="modern-card">
            <div className="card-header">Zimmetli Kişi</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Kullanıcı ID</span>
                <span className="info-value">{current.assignedToUser}</span>
              </div>
            </div>
          </div>

          {/* Department */}
          <div className="modern-card">
            <div className="card-header">Departman</div>
            <div className="info-item">
              <span className="info-value">{current.department}</span>
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
                <span className="info-label">Koşul</span>
                <span className="info-value">{current.condition}</span>
              </div>
              {current.daysOverdue > 0 && (
                <div className="info-item">
                  <span className="info-label">Gecikme</span>
                  <span className="info-value" style={{ color: '#ef4444' }}>{current.daysOverdue} gün</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Return Dialog */}
      <Dialog open={returnDialog} onClose={handleCloseReturnDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Zimmet İade</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <span style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
              {current.assetTitle} (ID: {current.assetId}) varlığını iade etmek üzeresiniz.
            </span>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="İade Notları (Opsiyonel)"
            value={returnNotes}
            onChange={(e) => setReturnNotes(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReturnDialog} disabled={returning}>
            İptal
          </Button>
          <Button
            onClick={handleReturnAssignment}
            variant="contained"
            color="warning"
            disabled={returning}
          >
            {returning ? 'İade Ediliyor...' : 'İade Et'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignmentDetail;
