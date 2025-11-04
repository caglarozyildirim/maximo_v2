import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface JobRequestDetail {
  id: number;
  requestNumber: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  requestedBy: {
    name: string;
    department: string;
  };
  department: string;
  location: string;
  asset: string;
  requestDate: string;
  expectedStartDate: string;
  expectedEndDate: string;
  estimatedCost: number;
  notes: string;
  workflowHistory: Array<{
    action: string;
    performedBy: string;
    date: string;
    comment: string;
  }>;
}

const statusLabels: Record<string, string> = {
  PENDING: 'Beklemede',
  IN_PROGRESS: 'İşlemde',
  COMPLETED: 'Tamamlandı',
  REJECTED: 'Reddedildi',
  MANAGER_APPROVAL: 'Yönetici Onayı',
  TECHNICAL_APPROVAL: 'Teknik Onay',
};

const priorityLabels: Record<string, string> = {
  LOW: 'Düşük',
  MEDIUM: 'Orta',
  HIGH: 'Yüksek',
  URGENT: 'Acil',
};

const JobRequestDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [jobRequest, setJobRequest] = useState<JobRequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Mock data - gerçek API'den gelecek
    setTimeout(() => {
      setJobRequest({
        id: parseInt(id || '1'),
        requestNumber: 'JR202500001',
        title: 'Elektrik Panosu Kontrolü',
        description: 'A blok elektrik panosunda periyodik kontrol ve bakım yapılması gerekmektedir.',
        status: 'PENDING',
        priority: 'HIGH',
        requestedBy: {
          name: 'Ahmet Yılmaz',
          department: 'Üretim Müdürlüğü',
        },
        department: 'Üretim',
        location: 'Fabrika A - A Blok',
        asset: 'Elektrik Panosu EP-001',
        requestDate: '2025-11-03',
        expectedStartDate: '2025-11-05',
        expectedEndDate: '2025-11-06',
        estimatedCost: 5000,
        notes: 'Üretim durmadan yapılması önemlidir.',
        workflowHistory: [
          {
            action: 'Talep Oluşturuldu',
            performedBy: 'Ahmet Yılmaz',
            date: '2025-11-03 14:30',
            comment: 'İş talebi sisteme girildi',
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleApprove = () => {
    setApproveDialogOpen(true);
  };

  const handleReject = () => {
    setRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    // API çağrısı yapılacak
    console.log('Onaylama:', { id, comment });
    setSnackbarMessage('İş talebi başarıyla onaylandı');
    setSnackbarOpen(true);
    setApproveDialogOpen(false);
    setComment('');

    // İş akışı geçmişini güncelle (mock)
    if (jobRequest) {
      setJobRequest({
        ...jobRequest,
        status: 'IN_PROGRESS',
        workflowHistory: [
          ...jobRequest.workflowHistory,
          {
            action: 'Talep Onaylandı',
            performedBy: 'Sistem Kullanıcısı',
            date: new Date().toLocaleString('tr-TR'),
            comment: comment || 'Onay verildi',
          },
        ],
      });
    }
  };

  const confirmReject = () => {
    // API çağrısı yapılacak
    console.log('Reddetme:', { id, comment });
    setSnackbarMessage('İş talebi reddedildi');
    setSnackbarOpen(true);
    setRejectDialogOpen(false);
    setComment('');

    // İş akışı geçmişini güncelle (mock)
    if (jobRequest) {
      setJobRequest({
        ...jobRequest,
        status: 'REJECTED',
        workflowHistory: [
          ...jobRequest.workflowHistory,
          {
            action: 'Talep Reddedildi',
            performedBy: 'Sistem Kullanıcısı',
            date: new Date().toLocaleString('tr-TR'),
            comment: comment || 'Red gerekçesi belirtilmedi',
          },
        ],
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!jobRequest) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>İş talebi bulunamadı</Typography>
      </Box>
    );
  }

  const statusColor = jobRequest.status === 'PENDING' ? 'warning' :
                      jobRequest.status === 'COMPLETED' ? 'success' : 'info';

  const priorityColor = jobRequest.priority === 'URGENT' ? 'error' :
                        jobRequest.priority === 'HIGH' ? 'warning' : 'default';

  return (
    <Box sx={{ p: 3 }}>
      {/* Sayfa Başlığı */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              startIcon={<BackIcon />}
              onClick={() => navigate('/job-requests')}
              sx={{ textTransform: 'none' }}
            >
              Geri
            </Button>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                {jobRequest.requestNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {jobRequest.title}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/job-requests/${id}/edit`)}
            sx={{ textTransform: 'none' }}
          >
            Düzenle
          </Button>
          {jobRequest.status !== 'REJECTED' && jobRequest.status !== 'COMPLETED' && (
            <>
              <Button
                variant="contained"
                startIcon={<ApproveIcon />}
                onClick={handleApprove}
                sx={{
                  bgcolor: '#10B981',
                  '&:hover': { bgcolor: '#059669' },
                  textTransform: 'none',
                }}
              >
                Onayla
              </Button>
              <Button
                variant="outlined"
                startIcon={<RejectIcon />}
                color="error"
                onClick={handleReject}
                sx={{ textTransform: 'none' }}
              >
                Reddet
              </Button>
            </>
          )}
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Sol Taraf - Detaylar */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Talep Bilgileri
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Durum
                  </Typography>
                  <Chip label={statusLabels[jobRequest.status] || jobRequest.status} color={statusColor} size="small" sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Öncelik
                  </Typography>
                  <Chip label={priorityLabels[jobRequest.priority] || jobRequest.priority} color={priorityColor} size="small" sx={{ mt: 0.5 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Açıklama
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {jobRequest.description}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Departman
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {jobRequest.department}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Lokasyon
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {jobRequest.location}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    İlgili Varlık
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {jobRequest.asset}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Tahmini Maliyet
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600 }}>
                    ₺{jobRequest.estimatedCost.toLocaleString('tr-TR')}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Başlangıç Tarihi
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {new Date(jobRequest.expectedStartDate).toLocaleDateString('tr-TR')}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Bitiş Tarihi
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {new Date(jobRequest.expectedEndDate).toLocaleDateString('tr-TR')}
                  </Typography>
                </Grid>

                {jobRequest.notes && (
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Notlar
                    </Typography>
                    <Paper sx={{ p: 2, mt: 0.5, bgcolor: '#F9FAFB' }}>
                      <Typography variant="body2">{jobRequest.notes}</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sağ Taraf - İş Akışı ve Talep Eden */}
        <Grid item xs={12} md={4}>
          {/* Talep Eden */}
          <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Talep Eden
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {jobRequest.requestedBy.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {jobRequest.requestedBy.department}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                Talep Tarihi: {new Date(jobRequest.requestDate).toLocaleDateString('tr-TR')}
              </Typography>
            </CardContent>
          </Card>

          {/* İş Akışı Geçmişi */}
          <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                İş Akışı Geçmişi
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {jobRequest.workflowHistory.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3B82F6', mr: 2, mt: 1 }} />
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.action}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="caption" display="block" color="text.secondary">
                            {item.performedBy} - {item.date}
                          </Typography>
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {item.comment}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Onaylama Dialog'u */}
      <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>İş Talebini Onayla</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Bu iş talebini onaylamak istediğinizden emin misiniz?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Yorum (Opsiyonel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Onay hakkında notlarınızı buraya yazabilirsiniz..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialogOpen(false)} sx={{ textTransform: 'none' }}>
            İptal
          </Button>
          <Button
            onClick={confirmApprove}
            variant="contained"
            sx={{
              bgcolor: '#10B981',
              '&:hover': { bgcolor: '#059669' },
              textTransform: 'none',
            }}
          >
            Onayla
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reddetme Dialog'u */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>İş Talebini Reddet</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Bu iş talebini reddetmek istediğinizden emin misiniz?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Red Gerekçesi"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Lütfen reddetme gerekçenizi belirtiniz..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)} sx={{ textTransform: 'none' }}>
            İptal
          </Button>
          <Button
            onClick={confirmReject}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Reddet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Başarı/Hata Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobRequestDetail;