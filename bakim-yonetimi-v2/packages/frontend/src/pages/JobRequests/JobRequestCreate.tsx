import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const JobRequestCreate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    departmentId: '',
    locationId: '',
    assetId: '',
    expectedStartDate: '',
    expectedEndDate: '',
    estimatedCost: '',
    notes: '',
  });

  // Edit modu için veri yükle
  useEffect(() => {
    if (isEditMode && id) {
      setDataLoading(true);
      // Mock data - gerçek API'den gelecek
      setTimeout(() => {
        setFormData({
          title: 'Elektrik Panosu Kontrolü',
          description: 'A blok elektrik panosunda periyodik kontrol ve bakım yapılması gerekmektedir.',
          priority: 'HIGH',
          departmentId: '1',
          locationId: '1',
          assetId: '1',
          expectedStartDate: '2025-11-05',
          expectedEndDate: '2025-11-06',
          estimatedCost: '5000',
          notes: 'Üretim durmadan yapılması önemlidir.',
        });
        setDataLoading(false);
      }, 500);
    }
  }, [isEditMode, id]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      setError('Başlık alanı zorunludur');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // API çağrısı yapılacak
      if (isEditMode) {
        console.log('Güncelleme:', id, formData);
      } else {
        console.log('Yeni kayıt:', formData);
      }

      // Başarılı olursa detay/liste sayfasına yönlendir
      setTimeout(() => {
        if (isEditMode) {
          navigate(`/job-requests/${id}`);
        } else {
          navigate('/job-requests');
        }
      }, 1000);
    } catch (err) {
      setError(isEditMode ? 'İş talebi güncellenirken bir hata oluştu' : 'İş talebi oluşturulurken bir hata oluştu');
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Sayfa Başlığı */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5 }}>
          {isEditMode ? 'İş Talebi Düzenle' : 'Yeni İş Talebi'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEditMode ? 'İş talebini düzenleyin' : 'Yeni bir iş talebi oluşturun'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Başlık */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Başlık"
                  value={formData.title}
                  onChange={handleChange('title')}
                  placeholder="İş talebinin başlığını girin"
                />
              </Grid>

              {/* Açıklama */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Açıklama"
                  value={formData.description}
                  onChange={handleChange('description')}
                  placeholder="İş talebinin detaylı açıklamasını girin"
                />
              </Grid>

              {/* Öncelik */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Öncelik"
                  value={formData.priority}
                  onChange={handleChange('priority')}
                >
                  <MenuItem value="LOW">Düşük</MenuItem>
                  <MenuItem value="MEDIUM">Orta</MenuItem>
                  <MenuItem value="HIGH">Yüksek</MenuItem>
                  <MenuItem value="URGENT">Acil</MenuItem>
                </TextField>
              </Grid>

              {/* Departman */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Departman"
                  value={formData.departmentId}
                  onChange={handleChange('departmentId')}
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  <MenuItem value="1">Üretim</MenuItem>
                  <MenuItem value="2">Bakım</MenuItem>
                  <MenuItem value="3">Kalite</MenuItem>
                  <MenuItem value="4">Lojistik</MenuItem>
                </TextField>
              </Grid>

              {/* Lokasyon */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Lokasyon"
                  value={formData.locationId}
                  onChange={handleChange('locationId')}
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  <MenuItem value="1">Fabrika A</MenuItem>
                  <MenuItem value="2">Fabrika B</MenuItem>
                  <MenuItem value="3">Depo</MenuItem>
                </TextField>
              </Grid>

              {/* Varlık */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="İlgili Varlık"
                  value={formData.assetId}
                  onChange={handleChange('assetId')}
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  <MenuItem value="1">Kompresör #123</MenuItem>
                  <MenuItem value="2">CNC Torna #456</MenuItem>
                  <MenuItem value="3">Forklift #789</MenuItem>
                </TextField>
              </Grid>

              {/* Başlangıç Tarihi */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Beklenen Başlangıç Tarihi"
                  value={formData.expectedStartDate}
                  onChange={handleChange('expectedStartDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Bitiş Tarihi */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Beklenen Bitiş Tarihi"
                  value={formData.expectedEndDate}
                  onChange={handleChange('expectedEndDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Tahmini Maliyet */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Tahmini Maliyet (₺)"
                  value={formData.estimatedCost}
                  onChange={handleChange('estimatedCost')}
                  placeholder="0.00"
                />
              </Grid>

              {/* Notlar */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notlar"
                  value={formData.notes}
                  onChange={handleChange('notes')}
                  placeholder="Ek notlarınızı buraya yazabilirsiniz"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Alt Butonlar */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
            sx={{
              bgcolor: '#3B82F6',
              '&:hover': { bgcolor: '#2563EB' },
              textTransform: 'none',
              px: 4,
            }}
          >
            {loading ? (isEditMode ? 'Güncelleniyor...' : 'Kaydediliyor...') : (isEditMode ? 'Güncelle' : 'Kaydet')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate('/job-requests')}
            disabled={loading}
            sx={{
              textTransform: 'none',
              px: 4,
            }}
          >
            İptal
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default JobRequestCreate;