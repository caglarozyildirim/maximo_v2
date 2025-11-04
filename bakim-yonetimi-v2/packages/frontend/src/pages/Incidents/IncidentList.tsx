import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Visibility as ViewIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchIncidents, deleteIncident } from '../../features/incidents/incidentsSlice';
import { allIncidents } from '../../data/mockData';

// Severity badge helper
const getSeverityBadge = (severity: string) => {
  const sev = severity?.toLowerCase() || '';
  const severityConfig: Record<string, { label: string; color: any }> = {
    'urgent': { label: 'Acil', color: 'error' },
    'critical': { label: 'Kritik', color: 'error' },
    'high': { label: 'Yüksek', color: 'warning' },
    'medium': { label: 'Orta', color: 'info' },
    'normal': { label: 'Normal', color: 'default' },
    'low': { label: 'Düşük', color: 'default' },
  };

  const config = severityConfig[sev] || { label: severity, color: 'default' };
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

const IncidentList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const incidents = allIncidents;
  const loading = false;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Filter data locally
  const filteredData = incidents.filter((item: any) => {
    const matchesSearch = !search ||
      item.incidentNumber?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.assetTitle?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesSeverity = !severityFilter || item.severity?.toLowerCase() === severityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu olay kaydını silmek istediğinizden emin misiniz?')) return;
    setDeleting(id);
    try {
      await dispatch(deleteIncident(id)).unwrap();
      enqueueSnackbar('Olay kaydı başarıyla silindi', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Silme işlemi sırasında bir hata oluştu', { variant: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'incidentNumber',
      headerName: 'Olay No',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Başlık',
      flex: 1,
    },
    {
      field: 'assetTitle',
      headerName: 'Varlık',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Açıklama',
      width: 200,
    },
    {
      field: 'priority',
      headerName: 'Önem',
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
          'OPEN': 'Açık',
          'IN_PROGRESS': 'Devam Ediyor',
          'REPORTED': 'Bildirildi',
          'INVESTIGATING': 'İnceleniyor',
          'RESOLVED': 'Çözüldü',
          'CLOSED': 'Kapatıldı',
          'ACTIVE': 'Aktif',
          'STANDBY': 'Beklemede',
          'MAINTENANCE': 'Bakımda'
        };
        return statusMap[value] || value || '-';
      },
    },
    {
      field: 'reportedDate',
      headerName: 'Bildirim Tarihi',
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
                navigate(`/incidents/${params.row.id}`);
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
                navigate(`/incidents/${params.row.id}/edit`);
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
          <h1 className="page-title">Olay Yönetimi</h1>
          <p className="page-subtitle">Toplam {filteredData.length} olay bildirimi</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/incidents/new')}>
          <span>+</span> Yeni Olay
        </button>
      </div>

      <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
        <div className="modern-form-grid">
          <div className="modern-form-group">
            <input
              type="text"
              className="modern-form-control"
              placeholder="Ara... (olay no, başlık, varlık)"
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
              <option value="1">Bildirildi</option>
              <option value="2">İnceleniyor</option>
              <option value="3">Çözüldü</option>
              <option value="4">Kapatıldı</option>
            </select>
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="">Tüm Önem Dereceleri</option>
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
                setSeverityFilter('');
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
          onRowClick={(params) => navigate(`/incidents/${params.row.id}`)}
        />
      </div>
    </Box>
  );
};

export default IncidentList;
