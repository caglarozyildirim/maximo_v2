import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { allJobRequests } from '../data/mockData';
import WorkflowHistory from '../components/WorkflowHistory';
import Comments from '../components/Comments';
import DocumentAttachments from '../components/DocumentAttachments';

const JobRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const current = allJobRequests.find(item => item.id === parseInt(id || '0'));
  const { enqueueSnackbar } = useSnackbar();

  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!current) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <span style={{ color: 'var(--gray-600)' }}>İş talebi bulunamadı.</span>
      </Box>
    );
  }

  const handleApprove = async () => {
    if (!id) return;

    setSubmitting(true);
    try {
      // Mock implementation - would normally call API
      enqueueSnackbar('İş talebi başarıyla onaylandı', { variant: 'success' });
      setApproveDialog(false);
      setComment('');
    } catch (error) {
      console.error('Approve error:', error);
      enqueueSnackbar('Onaylama sırasında bir hata oluştu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      enqueueSnackbar('Red nedeni zorunludur', { variant: 'warning' });
      return;
    }
    if (!id) return;

    setSubmitting(true);
    try {
      // Mock implementation - would normally call API
      enqueueSnackbar('İş talebi reddedildi', { variant: 'info' });
      setRejectDialog(false);
      setComment('');
    } catch (error) {
      console.error('Reject error:', error);
      enqueueSnackbar('Reddetme sırasında bir hata oluştu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddComment = async (content: string) => {
    enqueueSnackbar('Yorum eklendi', { variant: 'success' });
  };

  const handleDeleteComment = async (commentId: number) => {
    enqueueSnackbar('Yorum silindi', { variant: 'success' });
  };

  const handleUploadDocument = async (file: File) => {
    enqueueSnackbar(`Döküman yüklendi: ${file.name}`, { variant: 'success' });
  };

  const handleDeleteDocument = async (docId: number) => {
    enqueueSnackbar('Döküman silindi', { variant: 'success' });
  };

  const handleDownloadDocument = (docId: number, filename: string) => {
    enqueueSnackbar(`İndiriliyor: ${filename}`, { variant: 'info' });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: any }> = {
      PENDING: { label: 'Bekliyor', color: 'warning' },
      MANAGER_APPROVAL: { label: 'Yönetici Onayı', color: 'info' },
      COMPLETED: { label: 'Tamamlandı', color: 'success' },
      REJECTED: { label: 'Reddedildi', color: 'error' },
    };
    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Chip label={config.label} color={config.color} />;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { label: string; color: any }> = {
      LOW: { label: 'Düşük', color: 'default' },
      MEDIUM: { label: 'Orta', color: 'info' },
      HIGH: { label: 'Yüksek', color: 'warning' },
      URGENT: { label: 'Acil', color: 'error' },
    };
    const config = priorityConfig[priority] || { label: priority, color: 'default' };
    return <Chip label={config.label} color={config.color} />;
  };

  const showApproveButton = ['MANAGER_APPROVAL', 'TECHNICAL_APPROVAL', 'BUSINESS_APPROVAL'].includes(current.status);

  return (
    <div className="modern-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{current.requestNumber}</h1>
          <p className="page-subtitle">
            <a
              href="/job-requests"
              onClick={(e) => { e.preventDefault(); navigate('/job-requests'); }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← İş Talepleri Listesine Dön
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {showApproveButton && (
            <>
              <button
                className="modern-btn modern-btn-primary"
                onClick={() => setApproveDialog(true)}
                style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
              >
                <ApproveIcon style={{ fontSize: '1.25rem' }} />
                Onayla
              </button>
              <button
                className="modern-btn modern-btn-primary"
                onClick={() => setRejectDialog(true)}
                style={{ background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)' }}
              >
                <RejectIcon style={{ fontSize: '1.25rem' }} />
                Reddet
              </button>
            </>
          )}
          <button
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate(`/job-requests/${id}/edit`)}
          >
            <EditIcon style={{ fontSize: '1.25rem' }} />
            Düzenle
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        {/* Main Content */}
        <div>
          {/* Request Information */}
          <div className="modern-card">
            <div className="card-header">
              <span>{current.title}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {getStatusBadge(current.status)}
                {getPriorityBadge(current.priority)}
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <span className="info-label">Açıklama</span>
                <span className="info-value">{current.description}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Talep Numarası</span>
                <span className="info-value">{current.requestNumber}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Talep Nedeni</span>
                <span className="info-value">{current.requestReason}</span>
              </div>

              {current.estimatedCost && (
                <div className="info-item">
                  <span className="info-label">Tahmini Maliyet</span>
                  <span className="info-value">₺{current.estimatedCost.toLocaleString('tr-TR')}</span>
                </div>
              )}

              {current.waitingDays && (
                <div className="info-item">
                  <span className="info-label">Bekleme Süresi</span>
                  <span className="info-value">{current.waitingDays} gün</span>
                </div>
              )}

              {current.approvalStage && (
                <div className="info-item">
                  <span className="info-label">Onay Aşaması</span>
                  <span className="info-value">{current.approvalStage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Workflow History */}
          <div className="modern-card">
            <div className="card-header">İş Akışı Geçmişi</div>
            <WorkflowHistory
              items={[
                {
                  id: 1,
                  action: 'CREATED',
                  status: current.status,
                  performedBy: { firstName: current.requestedByName || 'Sistem', lastName: '' },
                  createdAt: current.createdDate,
                },
                ...(current.status !== 'PENDING'
                  ? [
                      {
                        id: 2,
                        action: 'SUBMITTED',
                        status: 'MANAGER_APPROVAL',
                        performedBy: { firstName: current.requestedByName || 'Sistem', lastName: '' },
                        createdAt: current.createdDate,
                      },
                    ]
                  : []),
              ]}
            />
          </div>

          {/* Comments */}
          <div className="modern-card">
            <div className="card-header">Yorumlar</div>
            <Comments
              comments={[
                {
                  id: 1,
                  content: 'Bu talep acil olarak değerlendirilmelidir.',
                  createdBy: { firstName: 'Ahmet', lastName: 'Yılmaz' },
                  createdAt: new Date().toISOString(),
                },
              ]}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>

          {/* Documents */}
          <div className="modern-card">
            <div className="card-header">Dökümanlar</div>
            <DocumentAttachments
              documents={[
                {
                  id: 1,
                  filename: 'teknik-rapor.pdf',
                  fileSize: 2457600,
                  fileType: 'application/pdf',
                  uploadedBy: { firstName: 'Mehmet', lastName: 'Demir' },
                  createdAt: new Date().toISOString(),
                },
              ]}
              onUpload={handleUploadDocument}
              onDelete={handleDeleteDocument}
              onDownload={handleDownloadDocument}
            />
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
                <span className="info-value">{current.requestedByName || 'Kullanıcı ID: ' + current.requestedBy}</span>
              </div>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="modern-card">
            <div className="card-header">Durum ve Öncelik</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Durum</span>
                <Chip
                  label={current.status}
                  color={current.status === 'PENDING' ? 'warning' : 'default'}
                />
              </div>
              <div className="info-item">
                <span className="info-label">Öncelik</span>
                <Chip
                  label={current.priority}
                  color={current.priority === 'URGENT' ? 'error' : current.priority === 'HIGH' ? 'warning' : 'default'}
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="modern-card">
            <div className="card-header">Tarihler</div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Talep Tarihi</span>
                <span className="info-value" style={{ fontSize: '0.875rem' }}>
                  {new Date(current.requestDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Oluşturma</span>
                <span className="info-value" style={{ fontSize: '0.875rem' }}>
                  {new Date(current.createdDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={approveDialog} onClose={() => setApproveDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Talebi Onayla</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Yorum (opsiyonel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialog(false)} disabled={submitting}>İptal</Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            color="success"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <ApproveIcon />}
          >
            {submitting ? 'Onaylanıyor...' : 'Onayla'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Talebi Reddet</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            label="Red Nedeni"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
            error={!comment.trim()}
            helperText={!comment.trim() ? 'Red nedeni zorunludur' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialog(false)} disabled={submitting}>İptal</Button>
          <Button
            onClick={handleReject}
            variant="contained"
            color="error"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <RejectIcon />}
          >
            {submitting ? 'Reddediliyor...' : 'Reddet'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobRequestDetail;
