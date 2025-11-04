import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  Pending,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchJobRequestById, approveJobRequest, rejectJobRequest } from './jobRequestsSlice';
import { JobRequestStatus, Priority } from '../../types';
import dayjs from 'dayjs';

const statusLabels: Record<JobRequestStatus, string> = {
  [JobRequestStatus.NEW]: 'Yeni',
  [JobRequestStatus.MANAGER_APPROVAL]: 'Yönetici Onayı Bekliyor',
  [JobRequestStatus.SL_ENGINEER_TAKEOVER]: 'Mühendis Devraldı',
  [JobRequestStatus.TECHNICAL_APPROVAL]: 'Teknik Onay Bekliyor',
  [JobRequestStatus.COST_CALCULATION]: 'Maliyet Hesaplanıyor',
  [JobRequestStatus.BUSINESS_COST_APPROVAL]: 'İş Maliyeti Onayı Bekliyor',
  [JobRequestStatus.SOLUTION_ASSIGNMENT]: 'Çözüm Sorumlusu Atanıyor',
  [JobRequestStatus.IMPLEMENTATION]: 'Uygulama Aşamasında',
  [JobRequestStatus.SOLUTION_APPROVAL]: 'Çözüm Onayı Bekliyor',
  [JobRequestStatus.DONE]: 'Tamamlandı',
  [JobRequestStatus.REJECTED]: 'Reddedildi',
  [JobRequestStatus.CANCELLED]: 'İptal Edildi',
};

const priorityLabels: Record<Priority, string> = {
  [Priority.LOW]: 'Düşük',
  [Priority.MEDIUM]: 'Orta',
  [Priority.HIGH]: 'Yüksek',
  [Priority.URGENT]: 'Acil',
};

export default function JobRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current: jobRequest, loading } = useAppSelector((state) => state.jobRequests);

  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchJobRequestById(id));
    }
  }, [dispatch, id]);

  const handleApprove = async () => {
    if (!jobRequest || !jobRequest.approvals) return;

    const pendingApproval = jobRequest.approvals.find(a => a.status === 'PENDING');
    if (!pendingApproval) return;

    await dispatch(approveJobRequest({
      id: jobRequest.id,
      approvalId: pendingApproval.id,
      comment,
    }));
    setApprovalDialog(false);
    setComment('');
  };

  const handleReject = async () => {
    if (!jobRequest || !jobRequest.approvals) return;

    const pendingApproval = jobRequest.approvals.find(a => a.status === 'PENDING');
    if (!pendingApproval) return;

    await dispatch(rejectJobRequest({
      id: jobRequest.id,
      approvalId: pendingApproval.id,
      comment,
    }));
    setRejectDialog(false);
    setComment('');
  };

  if (loading || !jobRequest) {
    return <Typography>Yükleniyor...</Typography>;
  }

  const pendingApproval = jobRequest.approvals?.find(a => a.status === 'PENDING');

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/job-requests')}
        sx={{ mb: 2 }}
      >
        Geri
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              İŞ TALEBİ #{jobRequest.requestNumber}
            </Typography>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {jobRequest.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip label={statusLabels[jobRequest.status]} color="primary" />
              <Chip label={priorityLabels[jobRequest.priority]} variant="outlined" />
            </Box>
          </Box>

          {pendingApproval && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setRejectDialog(true)}
              >
                Reddet
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => setApprovalDialog(true)}
              >
                Onayla
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Temel Bilgiler
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Talep Eden
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {jobRequest.requestedBy.firstName} {jobRequest.requestedBy.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Departman
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {jobRequest.department}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Oluşturulma Tarihi
                </Typography>
                <Typography variant="body1">
                  {dayjs(jobRequest.createdAt).format('DD.MM.YYYY HH:mm')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Lokasyon
                </Typography>
                <Typography variant="body1">
                  {jobRequest.location || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Açıklama
                </Typography>
                <Typography variant="body1">
                  {jobRequest.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              İş Akışı Geçmişi
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              {jobRequest.workflowHistory?.map((history) => (
                <ListItem key={history.id} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {history.action === 'approved' ? <CheckCircle color="success" fontSize="small" /> :
                     history.action === 'rejected' ? <Cancel color="error" fontSize="small" /> :
                     <Pending color="primary" fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {history.stepName}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {history.actor.firstName} {history.actor.lastName}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {dayjs(history.createdAt).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                        {history.comment && (
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {history.comment}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Approval Dialog */}
      <Dialog open={approvalDialog} onClose={() => setApprovalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>İş Talebini Onayla</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Yorum (opsiyonel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog(false)}>İptal</Button>
          <Button variant="contained" color="success" onClick={handleApprove}>
            Onayla
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>İş Talebini Reddet</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Red Nedeni *"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialog(false)}>İptal</Button>
          <Button variant="contained" color="error" onClick={handleReject} disabled={!comment}>
            Reddet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
