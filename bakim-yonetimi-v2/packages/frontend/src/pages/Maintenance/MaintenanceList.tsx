import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchMaintenanceDuties,
  deleteMaintenanceDuty,
} from '../../features/maintenance/maintenanceSlice';
import { allMaintenance } from '../../data/mockData';

// Priority badge helper
const getPriorityBadge = (priority: string) => {
  const p = priority?.toLowerCase() || '';
  const priorityConfig: Record<string, { label: string; color: any }> = {
    'urgent': { label: 'Acil', color: 'error' },
    'critical': { label: 'Kritik', color: 'error' },
    'high': { label: 'Yüksek', color: 'warning' },
    'medium': { label: 'Orta', color: 'info' },
    'normal': { label: 'Normal', color: 'default' },
    'low': { label: 'Düşük', color: 'default' },
  };

  const config = priorityConfig[p] || { label: priority, color: 'default' };
  return <Chip label={config.label} color={config.color} size="small" />;
};

// Status badge helper
const getStatusBadge = (statusName: string, color?: string) => {
  const defaultColor = color || '#3b82f6';
  return (
    <Chip
      label={statusName}
      size="small"
      sx={{
        bgcolor: `${defaultColor}20`,
        color: defaultColor,
        fontWeight: 600,
      }}
    />
  );
};

const MaintenanceList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const duties = allMaintenance;
  const loading = false;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Filter data locally
  const filteredData = duties.filter((item: any) => {
    const matchesSearch = !search ||
      item.maintenanceId?.toLowerCase().includes(search.toLowerCase()) ||
      item.assetTitle?.toLowerCase().includes(search.toLowerCase()) ||
      item.dutyTitle?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesPriority = !priorityFilter || item.priority?.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu bakım görevini silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeleting(id);
    try {
      await dispatch(deleteMaintenanceDuty(id)).unwrap();
      enqueueSnackbar('Bakım görevi başarıyla silindi', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Bakım görevi silinirken bir hata oluştu', { variant: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'maintenanceId',
      headerName: 'Bakım No',
      width: 150,
    },
    {
      field: 'sapNumber',
      headerName: 'SAP No',
      width: 130,
    },
    {
      field: 'assetTitle',
      headerName: 'Varlık',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'dutyTitle',
      headerName: 'Görev',
      width: 250,
    },
    {
      field: 'priority',
      headerName: 'Öncelik',
      width: 120,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        const priorityMap: Record<string, string> = {
          'URGENT': 'Acil',
          'CRITICAL': 'Kritik',
          'HIGH': 'Yüksek',
          'MEDIUM': 'Orta',
          'NORMAL': 'Normal',
          'LOW': 'Düşük',
        };
        const upperValue = value?.toString().toUpperCase();
        return priorityMap[upperValue] || value;
      },
    },
    {
      field: 'status',
      headerName: 'Durum',
      width: 130,
      valueFormatter: (value: any) => {
        const statusMap: Record<string, string> = {
          'PENDING': 'Beklemede',
          'IN_PROGRESS': 'Devam Ediyor',
          'COMPLETED': 'Tamamlandı',
          'OVERDUE': 'Gecikmiş',
          'CANCELLED': 'İptal',
          'ACTIVE': 'Aktif',
          'INACTIVE': 'Pasif',
        };
        return statusMap[value] || value || '-';
      },
    },
    {
      field: 'plannedDate',
      headerName: 'Planlanan Tarih',
      width: 150,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('tr-TR');
      },
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Görüntüle">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/maintenance/${params.row.id}`);
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
                navigate(`/maintenance/${params.row.id}/edit`);
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
          <h1 className="page-title">Bakım Yönetimi</h1>
          <p className="page-subtitle">Toplam {filteredData.length} bakım görevi</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/maintenance/new')}>
          <span>+</span> Yeni Bakım Görevi
        </button>
      </div>

      <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
        <div className="modern-form-grid">
          <div className="modern-form-group">
            <input
              type="text"
              className="modern-form-control"
              placeholder="Ara... (bakım no, varlık, açıklama)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tüm Durumlar</option>
              <option value="1">Planlandı</option>
              <option value="2">Devam Ediyor</option>
              <option value="3">Tamamlandı</option>
              <option value="4">İptal</option>
            </select>
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">Tüm Öncelikler</option>
              <option value="critical">Kritik</option>
              <option value="high">Yüksek</option>
              <option value="medium">Orta</option>
              <option value="low">Düşük</option>
            </select>
          </div>
          <div className="modern-form-group">
            <button
              className="modern-btn modern-btn-secondary"
              style={{ width: '100%' }}
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setPriorityFilter('');
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
          onRowClick={(params) => navigate(`/maintenance/${params.row.id}`)}
        />
      </div>
    </Box>
  );
};

export default MaintenanceList;
