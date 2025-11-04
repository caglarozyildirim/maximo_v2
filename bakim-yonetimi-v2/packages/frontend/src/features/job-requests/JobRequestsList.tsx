import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Typography,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Add, Visibility, Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchJobRequests } from './jobRequestsSlice';
import { JobRequestStatus, Priority } from '../../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/tr';

dayjs.extend(relativeTime);
dayjs.locale('tr');

const statusColors: Record<JobRequestStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  [JobRequestStatus.NEW]: 'info',
  [JobRequestStatus.MANAGER_APPROVAL]: 'warning',
  [JobRequestStatus.SL_ENGINEER_TAKEOVER]: 'info',
  [JobRequestStatus.TECHNICAL_APPROVAL]: 'warning',
  [JobRequestStatus.COST_CALCULATION]: 'info',
  [JobRequestStatus.BUSINESS_COST_APPROVAL]: 'warning',
  [JobRequestStatus.SOLUTION_ASSIGNMENT]: 'info',
  [JobRequestStatus.IMPLEMENTATION]: 'primary',
  [JobRequestStatus.SOLUTION_APPROVAL]: 'warning',
  [JobRequestStatus.DONE]: 'success',
  [JobRequestStatus.REJECTED]: 'error',
  [JobRequestStatus.CANCELLED]: 'default',
};

const statusLabels: Record<JobRequestStatus, string> = {
  [JobRequestStatus.NEW]: 'Yeni',
  [JobRequestStatus.MANAGER_APPROVAL]: 'Yönetici Onayı',
  [JobRequestStatus.SL_ENGINEER_TAKEOVER]: 'Mühendis Devraldı',
  [JobRequestStatus.TECHNICAL_APPROVAL]: 'Teknik Onay',
  [JobRequestStatus.COST_CALCULATION]: 'Maliyet Hesaplama',
  [JobRequestStatus.BUSINESS_COST_APPROVAL]: 'İş Maliyeti Onayı',
  [JobRequestStatus.SOLUTION_ASSIGNMENT]: 'Çözüm Ataması',
  [JobRequestStatus.IMPLEMENTATION]: 'Uygulama',
  [JobRequestStatus.SOLUTION_APPROVAL]: 'Çözüm Onayı',
  [JobRequestStatus.DONE]: 'Tamamlandı',
  [JobRequestStatus.REJECTED]: 'Reddedildi',
  [JobRequestStatus.CANCELLED]: 'İptal Edildi',
};

const priorityColors: Record<Priority, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  [Priority.LOW]: 'info',
  [Priority.MEDIUM]: 'default',
  [Priority.HIGH]: 'warning',
  [Priority.URGENT]: 'error',
};

const priorityLabels: Record<Priority, string> = {
  [Priority.LOW]: 'Düşük',
  [Priority.MEDIUM]: 'Orta',
  [Priority.HIGH]: 'Yüksek',
  [Priority.URGENT]: 'Acil',
};

export default function JobRequestsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, pagination } = useAppSelector((state) => state.jobRequests);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchJobRequests({
      page: page + 1,
      limit: 20,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      search: search || undefined,
    }));
  }, [dispatch, page, statusFilter, search]);

  const columns: GridColDef[] = [
    {
      field: 'requestNumber',
      headerName: 'Talep No',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'title',
      headerName: 'Başlık',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'status',
      headerName: 'Durum',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={statusLabels[params.value as JobRequestStatus]}
          color={statusColors[params.value as JobRequestStatus]}
          size="small"
        />
      ),
    },
    {
      field: 'priority',
      headerName: 'Öncelik',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={priorityLabels[params.value as Priority]}
          color={priorityColors[params.value as Priority]}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'requestedBy',
      headerName: 'Talep Eden',
      width: 150,
      valueGetter: (value: any) => `${value?.firstName} ${value?.lastName}`,
    },
    {
      field: 'department',
      headerName: 'Departman',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Oluşturulma',
      width: 150,
      valueGetter: (value: string) => dayjs(value).fromNow(),
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Detay">
            <IconButton
              size="small"
              onClick={() => navigate(`/job-requests/${params.row.id}`)}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Düzenle">
            <IconButton
              size="small"
              onClick={() => navigate(`/job-requests/${params.row.id}/edit`)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            İş Talepleri
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tüm iş taleplerini görüntüleyin ve yönetin
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/job-requests/new')}
        >
          Yeni İş Talebi
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            placeholder="Talep No, Başlık veya Açıklama ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" fontWeight={600}>
            Durum:
          </Typography>
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={(_, value) => value && setStatusFilter(value)}
            size="small"
          >
            <ToggleButton value="all">Tümü</ToggleButton>
            <ToggleButton value={JobRequestStatus.NEW}>Yeni</ToggleButton>
            <ToggleButton value={JobRequestStatus.MANAGER_APPROVAL}>Onay Bekliyor</ToggleButton>
            <ToggleButton value={JobRequestStatus.IMPLEMENTATION}>Uygulamada</ToggleButton>
            <ToggleButton value={JobRequestStatus.DONE}>Tamamlandı</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>

      <Paper>
        <DataGrid
          rows={list}
          columns={columns}
          loading={loading}
          pageSizeOptions={[20, 50, 100]}
          paginationModel={{ page, pageSize: pagination.limit }}
          onPaginationModelChange={(model) => setPage(model.page)}
          rowCount={pagination.total}
          paginationMode="server"
          disableRowSelectionOnClick
          autoHeight
          sx={{
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
          }}
          onRowClick={(params) => navigate(`/job-requests/${params.id}`)}
        />
      </Paper>
    </Box>
  );
}
