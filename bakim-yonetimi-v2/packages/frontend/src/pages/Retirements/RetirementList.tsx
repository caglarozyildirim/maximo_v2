import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Visibility as ViewIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchRetirements, deleteRetirement } from '../../features/retirements/retirementsSlice';
import { allRetirements } from '../../data/mockData';

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

const RetirementList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const retirements = allRetirements;
  const loading = false;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Filter data locally
  const filteredData = retirements.filter((item: any) => {
    const matchesSearch = !search ||
      item.retirementNumber?.toLowerCase().includes(search.toLowerCase()) ||
      item.assetTitle?.toLowerCase().includes(search.toLowerCase()) ||
      item.reason?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu hurda kaydını silmek istediğinizden emin misiniz?')) return;
    setDeleting(id);
    try {
      await dispatch(deleteRetirement(id)).unwrap();
      enqueueSnackbar('Hurda kaydı başarıyla silindi', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Silme işlemi sırasında bir hata oluştu', { variant: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'retirementNumber',
      headerName: 'Hurda No',
      width: 150,
    },
    {
      field: 'assetTitle',
      headerName: 'Varlık',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'retirementReason',
      headerName: 'Sebep',
      width: 200,
      valueFormatter: (value: any) => {
        const reasons: Record<string, string> = {
          'ECONOMIC_END': 'Ekonomik Ömür Sonu',
          'BREAKDOWN': 'Arıza',
          'OBSOLETE': 'Teknolojik Eskime',
          'ACCIDENT': 'Kaza',
          'OTHER': 'Diğer'
        };
        return reasons[value] || value || '-';
      },
    },
    {
      field: 'retirementDate',
      headerName: 'Hurda Tarihi',
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
          'REJECTED': 'Reddedildi',
          'COMPLETED': 'Tamamlandı'
        };
        return statusMap[value] || value;
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
                navigate(`/retirements/${params.row.id}`);
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
                navigate(`/retirements/${params.row.id}/edit`);
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
          <h1 className="page-title">Hurda Yönetimi</h1>
          <p className="page-subtitle">Toplam {filteredData.length} hurda kaydı</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/retirements/new')}>
          <span>+</span> Yeni Hurda
        </button>
      </div>

      <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
        <div className="modern-form-grid">
          <div className="modern-form-group">
            <input
              type="text"
              className="modern-form-control"
              placeholder="Ara... (hurda no, varlık, sebep)"
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
              <option value="1">Beklemede</option>
              <option value="2">Onaylandı</option>
              <option value="3">Reddedildi</option>
            </select>
          </div>
          <div className="modern-form-group">
            <button
              className="modern-btn modern-btn-secondary"
              style={{ width: '100%' }}
              onClick={() => {
                setSearch('');
                setStatusFilter('');
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
          onRowClick={(params) => navigate(`/retirements/${params.row.id}`)}
        />
      </div>
    </Box>
  );
};

export default RetirementList;
