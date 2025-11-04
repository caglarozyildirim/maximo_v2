import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  Pagination,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface JobRequest {
  id: number;
  requestNumber: string;
  title: string;
  status: string;
  priority: string;
  requestedBy: string;
  department: string;
  requestDate: string;
}

const statusLabels: Record<string, string> = {
  PENDING: 'Beklemede',
  IN_PROGRESS: 'İşlemde',
  COMPLETED: 'Tamamlandı',
  REJECTED: 'Reddedildi',
  MANAGER_APPROVAL: 'Yönetici Onayı',
  TECHNICAL_APPROVAL: 'Teknik Onay',
};

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  REJECTED: 'error',
  MANAGER_APPROVAL: 'info',
  TECHNICAL_APPROVAL: 'info',
};

const priorityLabels: Record<string, string> = {
  LOW: 'Düşük',
  MEDIUM: 'Orta',
  HIGH: 'Yüksek',
  URGENT: 'Acil',
};

const priorityColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
  LOW: 'info',
  MEDIUM: 'default',
  HIGH: 'warning',
  URGENT: 'error',
};

const JobRequestsList: React.FC = () => {
  const navigate = useNavigate();
  const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Mock data - gerçek API'den gelecek
  useEffect(() => {
    setLoading(true);
    // Tüm mock veri
    const allRequests = [
      {
        id: 1,
        requestNumber: 'JR202500001',
        title: 'Elektrik Panosu Kontrolü',
        status: 'PENDING',
        priority: 'HIGH',
        requestedBy: 'Ahmet Yılmaz',
        department: 'Üretim',
        requestDate: '2025-11-03',
      },
      {
        id: 2,
        requestNumber: 'JR202500002',
        title: 'HVAC Sistem Bakımı',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        requestedBy: 'Mehmet Demir',
        department: 'Bakım',
        requestDate: '2025-11-02',
      },
      {
        id: 3,
        requestNumber: 'JR202500003',
        title: 'Kompresör Arıza Onarımı',
        status: 'COMPLETED',
        priority: 'URGENT',
        requestedBy: 'Ayşe Kara',
        department: 'Üretim',
        requestDate: '2025-11-01',
      },
      {
        id: 4,
        requestNumber: 'JR202500004',
        title: 'Jeneratör Bakımı',
        status: 'PENDING',
        priority: 'LOW',
        requestedBy: 'Fatma Öz',
        department: 'Teknik',
        requestDate: '2025-11-04',
      },
      {
        id: 5,
        requestNumber: 'JR202500005',
        title: 'Asansör Arıza Tespiti',
        status: 'REJECTED',
        priority: 'URGENT',
        requestedBy: 'Ali Demir',
        department: 'İdari',
        requestDate: '2025-10-30',
      },
    ];

    // Simüle edilmiş filtreleme
    setTimeout(() => {
      let filtered = [...allRequests];

      // Arama filtresi
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (req) =>
            req.requestNumber.toLowerCase().includes(searchLower) ||
            req.title.toLowerCase().includes(searchLower) ||
            req.requestedBy.toLowerCase().includes(searchLower) ||
            req.department.toLowerCase().includes(searchLower)
        );
      }

      // Durum filtresi
      if (statusFilter) {
        filtered = filtered.filter((req) => req.status === statusFilter);
      }

      // Öncelik filtresi
      if (priorityFilter) {
        filtered = filtered.filter((req) => req.priority === priorityFilter);
      }

      setJobRequests(filtered);
      setTotalPages(1);
      setLoading(false);
    }, 300);
  }, [page, search, statusFilter, priorityFilter]);

  const handleViewDetails = (id: number) => {
    navigate(`/job-requests/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/job-requests/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu iş talebini silmek istediğinizden emin misiniz?')) {
      // API çağrısı yapılacak
      console.log('Delete:', id);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Sayfa Başlığı */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5 }}>
            İş Talepleri
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tüm iş taleplerini görüntüleyin ve yönetin
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/job-requests/new')}
          sx={{
            bgcolor: '#3B82F6',
            '&:hover': { bgcolor: '#2563EB' },
            textTransform: 'none',
            px: 3,
            py: 1,
          }}
        >
          Yeni İş Talebi
        </Button>
      </Box>

      {/* Filtreler */}
      <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="İş talebi ara..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, maxWidth: 400 }}
            />
            <TextField
              select
              size="small"
              label="Durum"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">Tümü</MenuItem>
              <MenuItem value="PENDING">Beklemede</MenuItem>
              <MenuItem value="IN_PROGRESS">İşlemde</MenuItem>
              <MenuItem value="COMPLETED">Tamamlandı</MenuItem>
              <MenuItem value="REJECTED">Reddedildi</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              label="Öncelik"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Tümü</MenuItem>
              <MenuItem value="LOW">Düşük</MenuItem>
              <MenuItem value="MEDIUM">Orta</MenuItem>
              <MenuItem value="HIGH">Yüksek</MenuItem>
              <MenuItem value="URGENT">Acil</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* Tablo */}
      <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>Talep No</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Başlık</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Öncelik</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Talep Eden</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Departman</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tarih</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : jobRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">Henüz iş talebi bulunmamaktadır</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                jobRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#3B82F6' }}>
                        {request.requestNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[request.status] || request.status}
                        size="small"
                        color={statusColors[request.status]}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={priorityLabels[request.priority] || request.priority}
                        size="small"
                        color={priorityColors[request.priority]}
                      />
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.department}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(request.requestDate).toLocaleDateString('tr-TR')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(request.id)}
                          sx={{ color: '#3B82F6' }}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(request.id)}
                          sx={{ color: '#10B981' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(request.id)}
                          sx={{ color: '#EF4444' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Sayfalama */}
        {totalPages > 1 && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default JobRequestsList;