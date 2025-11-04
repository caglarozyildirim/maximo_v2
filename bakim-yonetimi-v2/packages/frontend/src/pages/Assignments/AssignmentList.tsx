import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AssignmentReturn as ReturnIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchAssignments,
  deleteAssignment,
  returnAssignment,
  ReturnAssignmentData,
} from '../../features/assignments/assignmentsSlice';
import { allAssignments } from '../../data/mockData';

const AssignmentList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const assignments = allAssignments;
  const loading = false;

  const [search, setSearch] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [returnDialog, setReturnDialog] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const [returnNotes, setReturnNotes] = useState('');
  const [returning, setReturning] = useState(false);

  // Filter data locally
  const filteredData = assignments.filter((item: any) => {
    const matchesSearch = !search ||
      item.assignmentNumber?.toLowerCase().includes(search.toLowerCase()) ||
      item.assignedTo?.toLowerCase().includes(search.toLowerCase()) ||
      item.assetTitle?.toLowerCase().includes(search.toLowerCase());
    const matchesActive = isActiveFilter === 'all' ||
      (isActiveFilter === 'active' && item.isActive) ||
      (isActiveFilter === 'returned' && !item.isActive);
    return matchesSearch && matchesActive;
  });

  const handleOpenReturnDialog = (id: number) => {
    setReturnDialog({ open: true, id });
    setReturnNotes('');
  };

  const handleCloseReturnDialog = () => {
    setReturnDialog({ open: false, id: null });
    setReturnNotes('');
  };

  const handleReturnAssignment = async () => {
    if (!returnDialog.id) return;

    setReturning(true);
    try {
      const data: ReturnAssignmentData = returnNotes ? { returnNotes } : {};
      await dispatch(returnAssignment({ id: returnDialog.id, data })).unwrap();
      enqueueSnackbar('Zimmet başarıyla iade edildi', { variant: 'success' });
      handleCloseReturnDialog();
    } catch (error) {
      enqueueSnackbar('İade işlemi sırasında bir hata oluştu', { variant: 'error' });
    } finally {
      setReturning(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu zimmet kaydını silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeleting(id);
    try {
      await dispatch(deleteAssignment(id)).unwrap();
      enqueueSnackbar('Zimmet başarıyla silindi', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Zimmet silinirken bir hata oluştu', { variant: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'assignmentNumber',
      headerName: 'Zimmet No',
      width: 150,
    },
    {
      field: 'maintenanceId',
      headerName: 'Varlık No',
      width: 150,
    },
    {
      field: 'assetTitle',
      headerName: 'Varlık Adı',
      flex: 1,
    },
    {
      field: 'assignedToUser',
      headerName: 'Zimmetli Kişi',
      width: 200,
      valueGetter: (params: any) => {
        const userId = params?.row?.assignedToUser;
        // Mock users'dan isim bulma - basit bir çözüm
        const userNames: Record<number, string> = {
          1: 'Ahmet Yılmaz', 2: 'Mehmet Demir', 3: 'Ayşe Kara',
          4: 'Fatma Şahin', 5: 'Ali Çelik', 6: 'Zeynep Aydın',
          7: 'Mustafa Öztürk', 8: 'Elif Yıldız'
        };
        return userNames[userId] || '-';
      },
    },
    {
      field: 'assignedDate',
      headerName: 'Zimmet Tarihi',
      width: 150,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('tr-TR');
      },
    },
    {
      field: 'status',
      headerName: 'Durum',
      width: 120,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        const statusMap: Record<string, string> = {
          'ACTIVE': 'Aktif',
          'RETURNED': 'İade Edildi',
          'PENDING': 'Beklemede',
          'OVERDUE': 'Gecikmiş',
        };
        return statusMap[value] || value;
      },
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Görüntüle">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/assignments/${params.row.id}`);
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
                navigate(`/assignments/${params.row.id}/edit`);
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
          <h1 className="page-title">Zimmet Yönetimi</h1>
          <p className="page-subtitle">Toplam {filteredData.length} zimmet kaydı</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/assignments/new')}>
          <span>+</span> Yeni Zimmet
        </button>
      </div>

      <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
        <div className="modern-form-grid">
          <div className="modern-form-group">
            <input
              type="text"
              className="modern-form-control"
              placeholder="Ara... (zimmet no, varlık, kişi)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={isActiveFilter}
              onChange={(e) => setIsActiveFilter(e.target.value)}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="returned">İade Edildi</option>
            </select>
          </div>
          <div className="modern-form-group">
            <button
              className="modern-btn modern-btn-secondary"
              style={{ width: '100%' }}
              onClick={() => {
                setSearch('');
                setIsActiveFilter('all');
              }}
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
          loading={loading}
          paginationMode="client"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[10, 25, 50]}
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
          onRowClick={(params) => navigate(`/assignments/${params.row.id}`)}
        />
      </div>

      {/* Return Dialog */}
      <Dialog open={returnDialog.open} onClose={handleCloseReturnDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Zimmet İade</DialogTitle>
        <DialogContent>
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
    </Box>
  );
};

export default AssignmentList;
