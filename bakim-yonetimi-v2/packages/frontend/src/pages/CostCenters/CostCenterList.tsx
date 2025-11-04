import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchCostCenterChanges,
  deleteCostCenterChange,
  approveCostCenterChange,
  rejectCostCenterChange,
  CostCenterChange,
} from '../../features/costCenters/costCentersSlice';
import { useSnackbar } from 'notistack';
import { allCostCenterChanges } from '../../data/mockData';

// Status badge helper
const getStatusBadge = (statusCode: string, statusName?: string) => {
  const statusConfig: Record<string, { label: string; color: any }> = {
    'PENDING': { label: 'Beklemede', color: 'warning' },
    'APPROVED': { label: 'Onaylandı', color: 'success' },
    'REJECTED': { label: 'Reddedildi', color: 'error' },
  };

  const config = statusConfig[statusCode] || { label: statusName || statusCode, color: 'default' };
  const label = statusName || config.label;
  return <Chip label={label} color={config.color} size="small" />;
};

const CostCenterList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const changes = allCostCenterChanges;
  const loading = false;

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Filter data locally
  const filteredData = changes.filter((item: any) => {
    const matchesSearch = !searchTerm ||
      item.changeNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fromCostCenter?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.toCostCenter?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu masraf merkezi değişikliğini silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(deleteCostCenterChange(id)).unwrap();
        enqueueSnackbar('Masraf merkezi değişikliği başarıyla silindi', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar(error.message || 'Silme işlemi başarısız oldu', {
          variant: 'error',
        });
      }
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await dispatch(approveCostCenterChange(id)).unwrap();
      enqueueSnackbar('Masraf merkezi değişikliği onaylandı', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Onaylama başarısız oldu', { variant: 'error' });
    }
  };

  const handleOpenRejectDialog = (id: number) => {
    setRejectId(id);
    setRejectReason('');
    setRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectId(null);
    setRejectReason('');
  };

  const handleReject = async () => {
    if (!rejectId || !rejectReason.trim()) {
      enqueueSnackbar('Red nedeni gereklidir', { variant: 'warning' });
      return;
    }

    try {
      await dispatch(rejectCostCenterChange({ id: rejectId, reason: rejectReason })).unwrap();
      enqueueSnackbar('Masraf merkezi değişikliği reddedildi', { variant: 'success' });
      handleCloseRejectDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Reddetme başarısız oldu', { variant: 'error' });
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'changeNumber',
      headerName: 'Değişiklik No',
      width: 150,
    },
    {
      field: 'asset',
      headerName: 'Varlık',
      width: 200,
      valueGetter: (params: any) => params?.row?.assetNumber || '-',
      renderCell: (params: GridRenderCellParams<CostCenterChange>) => (
        <Box>
          <div style={{ fontWeight: 500 }}>{params?.row?.assetNumber || '-'}</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            {params?.row?.assetTitle || '-'}
          </div>
        </Box>
      ),
    },
    {
      field: 'fromCostCenter',
      headerName: 'Eski Masraf Merkezi',
      width: 180,
      valueGetter: (params: any) => params?.row?.fromCostCenter || '-',
      renderCell: (params: GridRenderCellParams<CostCenterChange>) => (
        <Box>
          <div style={{ fontWeight: 500 }}>{params?.row?.fromCostCenter || '-'}</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            {params?.row?.fromCostCenter || '-'}
          </div>
        </Box>
      ),
    },
    {
      field: 'toCostCenter',
      headerName: 'Yeni Masraf Merkezi',
      width: 180,
      valueGetter: (params: any) => params?.row?.toCostCenter || '-',
      renderCell: (params: GridRenderCellParams<CostCenterChange>) => (
        <Box>
          <div style={{ fontWeight: 500 }}>{params?.row?.toCostCenter || '-'}</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            {params?.row?.toCostCenter || '-'}
          </div>
        </Box>
      ),
    },
    {
      field: 'changeDate',
      headerName: 'Değişiklik Tarihi',
      width: 150,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('tr-TR');
      },
    },
    {
      field: 'status',
      headerName: 'Durum',
      width: 130,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        const statusMap: Record<string, string> = {
          'PENDING': 'Beklemede',
          'APPROVED': 'Onaylandı',
          'REJECTED': 'Reddedildi'
        };
        return statusMap[value] || value;
      },
    },
    {
      field: 'requestedBy',
      headerName: 'Talep Eden',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams<CostCenterChange>) => (
        <Box>
          <Tooltip title="Görüntüle">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/cost-centers/${params.row.id}`);
              }}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Düzenle">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/cost-centers/${params.row.id}/edit`);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">Masraf Merkezi Değişiklikleri</h1>
          <p className="page-subtitle">Toplam {filteredData.length} değişiklik</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/cost-centers/new')}>
          <span>+</span> Yeni Değişiklik
        </button>
      </div>

      <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
        <div className="modern-form-grid">
          <div className="modern-form-group">
            <input
              type="text"
              className="modern-form-control"
              placeholder="Ara (Varlık No, Masraf Merkezi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modern-form-group">
            <button
              className="modern-btn modern-btn-secondary"
              style={{ width: '100%' }}
              onClick={() => setSearchTerm('')}
            >
              Temizle
            </button>
          </div>
        </div>
      </div>

      <div className="modern-card">
        <DataGrid
          rows={filteredData}
          columns={columns}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          paginationMode="client"
          loading={loading}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .MuiDataGrid-row:hover': { backgroundColor: '#f9fafb', cursor: 'pointer' },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f9fafb',
              borderBottom: '2px solid #e5e7eb',
            },
          }}
          onRowClick={(params) => navigate(`/cost-centers/${params.row.id}`)}
        />
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Değişikliği Reddet</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Red Nedeni"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>İptal</Button>
          <Button
            onClick={handleReject}
            variant="contained"
            color="error"
            disabled={!rejectReason.trim()}
          >
            Reddet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CostCenterList;
