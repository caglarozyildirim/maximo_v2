import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Visibility as ViewIcon, Edit as EditIcon, Delete as DeleteIcon, Assignment } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchJobRequests, deleteJobRequest } from '../features/job-requests/jobRequestsSlice';
import StatusBadge from '../components/StatusBadge';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { allJobRequests } from '../data/mockData';

// Status mapping for new StatusBadge component
const mapStatusToBadgeType = (status: string) => {
  const statusMap: Record<string, any> = {
    PENDING: { type: 'pending', label: 'Bekliyor' },
    MANAGER_APPROVAL: { type: 'pending', label: 'Yönetici Onayı' },
    ENGINEER_TAKEOVER: { type: 'in_progress', label: 'Mühendis Ataması' },
    TECHNICAL_APPROVAL: { type: 'in_progress', label: 'Teknik Onay' },
    COST_CALCULATION: { type: 'in_progress', label: 'Maliyet' },
    BUSINESS_APPROVAL: { type: 'in_progress', label: 'İş Onayı' },
    SOLUTION_ASSIGNMENT: { type: 'in_progress', label: 'Çözüm Ataması' },
    IMPLEMENTATION: { type: 'in_progress', label: 'Uygulama' },
    SOLUTION_APPROVAL: { type: 'in_progress', label: 'Çözüm Onayı' },
    COMPLETED: { type: 'completed', label: 'Tamamlandı' },
    REJECTED: { type: 'rejected', label: 'Reddedildi' },
    CANCELLED: { type: 'cancelled', label: 'İptal' },
  };

  const config = statusMap[status] || { type: 'pending', label: status };
  return <StatusBadge status={config.type} customLabel={config.label} />;
};

// Priority badge helper
const getPriorityBadge = (priority: string) => {
  const p = priority?.toUpperCase() || '';
  const priorityConfig: Record<string, { label: string; color: any }> = {
    'URGENT': { label: 'Acil', color: 'error' },
    'CRITICAL': { label: 'Kritik', color: 'error' },
    'HIGH': { label: 'Yüksek', color: 'warning' },
    'MEDIUM': { label: 'Orta', color: 'info' },
    'NORMAL': { label: 'Normal', color: 'default' },
    'LOW': { label: 'Düşük', color: 'default' },
  };

  const config = priorityConfig[p] || { label: priority, color: 'default' };
  return <Chip label={config.label} color={config.color} size="small" />;
};

const JobRequestList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Use mock data instead of Redux
  const list = allJobRequests;
  const loading = false;

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Filter data locally
  const filteredData = list.filter((item: any) => {
    const matchesSearch = !search ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.requestNumber?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const columns: GridColDef[] = [
    {
      field: 'requestNumber',
      headerName: 'Talep No',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Başlık',
      flex: 1,
      minWidth: 250,
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
      width: 150,
      valueFormatter: (value: any) => {
        if (!value) return '-';
        const statusMap: Record<string, string> = {
          'PENDING': 'Bekliyor',
          'MANAGER_APPROVAL': 'Yönetici Onayı',
          'ENGINEER_TAKEOVER': 'Mühendis Ataması',
          'TECHNICAL_APPROVAL': 'Teknik Onay',
          'COST_CALCULATION': 'Maliyet',
          'BUSINESS_APPROVAL': 'İş Onayı',
          'SOLUTION_ASSIGNMENT': 'Çözüm Ataması',
          'IMPLEMENTATION': 'Uygulama',
          'SOLUTION_APPROVAL': 'Çözüm Onayı',
          'COMPLETED': 'Tamamlandı',
          'REJECTED': 'Reddedildi',
          'CANCELLED': 'İptal',
        };
        return statusMap[value] || value;
      },
    },
    {
      field: 'requestedByName',
      headerName: 'Talep Eden',
      width: 150,
    },
    {
      field: 'createdDate',
      headerName: 'Oluşturma Tarihi',
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
                navigate(`/job-requests/${params.row.id}`);
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
                navigate(`/job-requests/${params.row.id}/edit`);
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
    if (window.confirm('Bu iş talebini silmek istediğinizden emin misiniz?')) {
      setDeleting(id);
      try {
        await dispatch(deleteJobRequest(id.toString())).unwrap();
        enqueueSnackbar('İş talebi başarıyla silindi', { variant: 'success' });
        const filters: any = { page: page + 1, limit: pageSize };
        if (search) filters.search = search;
        if (statusFilter !== 'ALL') filters.status = statusFilter;
        if (priorityFilter !== 'ALL') filters.priority = priorityFilter;
        dispatch(fetchJobRequests(filters));
      } catch (error) {
        enqueueSnackbar('Silme işlemi başarısız oldu', { variant: 'error' });
      } finally {
        setDeleting(null);
      }
    }
  };

  // Show loading skeleton
  if (loading && list.length === 0) {
    return (
      <Box>
        <div className="page-header">
          <div>
            <h1 className="page-title">İş Talepleri</h1>
            <p className="page-subtitle">Yükleniyor...</p>
          </div>
          <button className="modern-btn modern-btn-primary" onClick={() => navigate('/job-requests/new')}>
            <span>+</span> Yeni Talep
          </button>
        </div>
        <LoadingSkeleton type="table" rows={10} />
      </Box>
    );
  }

  // Show empty state
  const showEmptyState = !loading && filteredData.length === 0;

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">İş Talepleri</h1>
          <p className="page-subtitle">Toplam {filteredData.length} talep</p>
        </div>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/job-requests/new')}>
          <span>+</span> Yeni Talep
        </button>
      </div>

      <FilterPanel
        onSearch={(value) => setSearch(value)}
        onStatusFilter={(value) => setStatusFilter(value || 'ALL')}
        onClearFilters={() => {
          setSearch('');
          setStatusFilter('ALL');
          setPriorityFilter('ALL');
        }}
        statusOptions={[
          { label: 'Tümü', value: '' },
          { label: 'Bekliyor', value: 'PENDING' },
          { label: 'Yönetici Onayı', value: 'MANAGER_APPROVAL' },
          { label: 'Mühendis Ataması', value: 'ENGINEER_TAKEOVER' },
          { label: 'Tamamlandı', value: 'COMPLETED' },
          { label: 'Reddedildi', value: 'REJECTED' },
        ]}
        showDateFilter={false}
        showStatusFilter={true}
        showCategoryFilter={false}
      />

      {showEmptyState ? (
        <EmptyState
          icon={<Assignment sx={{ fontSize: '4rem', color: '#3B82F6' }} />}
          title="Henüz İş Talebi Yok"
          description="Yeni bir iş talebi oluşturarak başlayın"
          action={
            <button className="modern-btn modern-btn-primary" onClick={() => navigate('/job-requests/new')}>
              <span>+</span> İlk Talebi Oluştur
            </button>
          }
        />
      ) : (
        <div className="modern-card">
          <DataGrid
            rows={filteredData}
            columns={columns}
            loading={loading}
            pageSizeOptions={[10, 25, 50, 100]}
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
            onRowClick={(params) => navigate(`/job-requests/${params.row.id}`)}
          />
        </div>
      )}
    </Box>
  );
};

export default JobRequestList;
