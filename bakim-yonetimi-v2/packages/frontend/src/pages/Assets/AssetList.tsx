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
import { fetchAssets, deleteAsset } from '../../features/assets/assetsSlice';
import { allAssets } from '../../data/mockData';

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

const AssetList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const list = allAssets;
  const loading = false;

  // Filters
  const [search, setSearch] = useState('');
  const [assetTypeFilter, setAssetTypeFilter] = useState<number | ''>('');
  const [assetStatusFilter, setAssetStatusFilter] = useState<number | ''>('');
  const [locationFilter, setLocationFilter] = useState<number | ''>('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Filter data locally
  const filteredData = list.filter((item: any) => {
    const matchesSearch = !search ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.maintenanceId?.toLowerCase().includes(search.toLowerCase()) ||
      item.serialNumber?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !assetStatusFilter || item.status === assetStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: GridColDef[] = [
    {
      field: 'maintenanceId',
      headerName: 'Varlık No',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Varlık Adı',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'assetGroup',
      headerName: 'Tip',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Durum',
      width: 130,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        const statusMap: Record<string, string> = {
          'ACTIVE': 'Aktif',
          'INACTIVE': 'Pasif',
          'MAINTENANCE': 'Bakımda',
          'RETIRED': 'Hurdaya Ayrıldı',
          'STANDBY': 'Beklemede',
        };
        return statusMap[value] || value;
      },
    },
    {
      field: 'location',
      headerName: 'Lokasyon',
      width: 180,
      valueGetter: (params: any) => params?.value || '-',
    },
    {
      field: 'manufacturer',
      headerName: 'Üretici',
      width: 130,
      valueGetter: (params: any) => params?.value || '-',
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
                navigate(`/assets/${params.row.id}`);
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
                navigate(`/assets/${params.row.id}/edit`);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu varlığı silmek istediğinizden emin misiniz?')) {
      setDeleting(id);
      try {
        await dispatch(deleteAsset(id.toString())).unwrap();
        enqueueSnackbar('Varlık başarıyla silindi', { variant: 'success' });
        const filters: any = {
          page: page + 1,
          limit: pageSize,
        };
        if (search) filters.search = search;
        if (assetTypeFilter) filters.assetTypeId = assetTypeFilter;
        if (assetStatusFilter) filters.assetStatusId = assetStatusFilter;
        if (locationFilter) filters.locationId = locationFilter;
        dispatch(fetchAssets(filters));
      } catch (error) {
        console.error('Delete error:', error);
        enqueueSnackbar('Silme işlemi başarısız oldu', { variant: 'error' });
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">Varlık Yönetimi</h1>
          <p className="page-subtitle">Toplam {filteredData.length} varlık</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/assets/new')}>
          <span>+</span> Yeni Varlık
        </button>
      </div>

      <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
        <div className="modern-form-grid">
          <div className="modern-form-group">
            <input
              type="text"
              className="modern-form-control"
              placeholder="Varlık ara (ad, numara, seri no...)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={assetTypeFilter}
              onChange={(e) => setAssetTypeFilter(e.target.value as any)}
            >
              <option value="">Tüm Tipler</option>
              <option value="1">Makine</option>
              <option value="2">Araç</option>
              <option value="3">Ekipman</option>
            </select>
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={assetStatusFilter}
              onChange={(e) => setAssetStatusFilter(e.target.value as any)}
            >
              <option value="">Tüm Durumlar</option>
              <option value="1">Aktif</option>
              <option value="2">Bakımda</option>
              <option value="3">Arızalı</option>
            </select>
          </div>
          <div className="modern-form-group">
            <select
              className="modern-form-control"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value as any)}
            >
              <option value="">Tüm Lokasyonlar</option>
              <option value="1">Fabrika 1</option>
              <option value="2">Fabrika 2</option>
              <option value="3">Depo</option>
            </select>
          </div>
          <div className="modern-form-group">
            <button
              className="modern-btn modern-btn-secondary"
              style={{ width: '100%' }}
              onClick={() => {
                setSearch('');
                setAssetTypeFilter('');
                setAssetStatusFilter('');
                setLocationFilter('');
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
          pageSizeOptions={[10, 20, 50, 100]}
          paginationMode="client"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .MuiDataGrid-row:hover': { backgroundColor: '#f9fafb', cursor: 'pointer' },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f9fafb',
              borderBottom: '2px solid #e5e7eb',
            },
          }}
          onRowClick={(params) => navigate(`/assets/${params.row.id}`)}
        />
      </div>
    </Box>
  );
};

export default AssetList;
