import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
} from '@mui/material';
import { Add as AddIcon, Build, Assignment, Inventory, MonetizationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

// Chart.js'i yapılandır
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function Dashboard() {
  const navigate = useNavigate();

  // Chart referansları
  const requestsChartRef = useRef<HTMLCanvasElement>(null);
  const assetsChartRef = useRef<HTMLCanvasElement>(null);
  const maintenanceChartRef = useRef<HTMLCanvasElement>(null);
  const zimmetChartRef = useRef<HTMLCanvasElement>(null);
  const hurdaChartRef = useRef<HTMLCanvasElement>(null);
  const masrafChartRef = useRef<HTMLCanvasElement>(null);

  // Chart instance'larını sakla
  const chartsRef = useRef<Chart[]>([]);

  useEffect(() => {
    const colors = {
      blue: '#3B82F6',
      green: '#10B981',
      yellow: '#F59E0B',
      red: '#EF4444',
      purple: '#8B5CF6',
      cyan: '#06B6D4',
      orange: '#F97316',
      indigo: '#6366F1',
    };

    const doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
      },
    };

    // Cleanup önceki chartları
    chartsRef.current.forEach(chart => chart.destroy());
    chartsRef.current = [];

    // 1. İş Talepleri Durumu
    if (requestsChartRef.current) {
      const ctx = requestsChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Açık', 'İşlemde', 'Beklemede', 'Tamamlandı'],
            datasets: [{
              data: [68, 45, 23, 20],
              backgroundColor: [colors.red, colors.blue, colors.yellow, colors.green],
              borderWidth: 0,
            }],
          },
          options: doughnutOptions,
        });
        chartsRef.current.push(chart);
      }
    }

    // 2. Varlıklar Durumu
    if (assetsChartRef.current) {
      const ctx = assetsChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Aktif', 'Bakımda', 'Pasif', 'Hurda'],
            datasets: [{
              data: [1100, 89, 45, 13],
              backgroundColor: [colors.green, colors.blue, colors.yellow, colors.red],
              borderWidth: 0,
            }],
          },
          options: doughnutOptions,
        });
        chartsRef.current.push(chart);
      }
    }

    // 3. Bakım İşleri Durumu
    if (maintenanceChartRef.current) {
      const ctx = maintenanceChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Tamamlandı', 'Devam Ediyor', 'Planlandı'],
            datasets: [{
              data: [42, 24, 23],
              backgroundColor: [colors.green, colors.blue, colors.purple],
              borderWidth: 0,
            }],
          },
          options: doughnutOptions,
        });
        chartsRef.current.push(chart);
      }
    }

    // 4. Zimmet Durumu
    if (zimmetChartRef.current) {
      const ctx = zimmetChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Aktif', 'İade Edildi'],
            datasets: [{
              data: [245, 89],
              backgroundColor: [colors.cyan, colors.indigo],
              borderWidth: 0,
            }],
          },
          options: doughnutOptions,
        });
        chartsRef.current.push(chart);
      }
    }

    // 5. Hurda Durumu
    if (hurdaChartRef.current) {
      const ctx = hurdaChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Onaylandı', 'Beklemede', 'Reddedildi'],
            datasets: [{
              data: [28, 15, 8],
              backgroundColor: [colors.green, colors.yellow, colors.red],
              borderWidth: 0,
            }],
          },
          options: doughnutOptions,
        });
        chartsRef.current.push(chart);
      }
    }

    // 6. Masraf Merkezi Durumu
    if (masrafChartRef.current) {
      const ctx = masrafChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Onaylandı', 'Beklemede', 'Reddedildi'],
            datasets: [{
              data: [45, 12, 5],
              backgroundColor: [colors.green, colors.orange, colors.red],
              borderWidth: 0,
            }],
          },
          options: doughnutOptions,
        });
        chartsRef.current.push(chart);
      }
    }

    // Cleanup
    return () => {
      chartsRef.current.forEach(chart => chart.destroy());
    };
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Sayfa Başlığı */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bakım Yönetimi Sistem Özeti - Kasım 2025
          </Typography>
        </Box>
        <TextField
          select
          size="small"
          defaultValue="this-month"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="this-month">Bu Ay</MenuItem>
          <MenuItem value="last-3-months">Son 3 Ay</MenuItem>
          <MenuItem value="this-year">Bu Yıl</MenuItem>
        </TextField>
      </Box>

      {/* Hızlı İşlemler */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/job-requests/new')}
          sx={{
            bgcolor: '#3B82F6',
            '&:hover': { bgcolor: '#2563EB' },
            textTransform: 'none',
          }}
        >
          Yeni İş Talebi
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate('/assets/new')}
          sx={{ textTransform: 'none' }}
        >
          Varlık Ekle
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate('/maintenance/new')}
          sx={{ textTransform: 'none' }}
        >
          Bakım İşi
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate('/assignments/new')}
          sx={{ textTransform: 'none' }}
        >
          Zimmet Oluştur
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate('/retirements/new')}
          sx={{ textTransform: 'none' }}
        >
          Hurda Kaydı
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate('/cost-centers/new')}
          sx={{ textTransform: 'none' }}
        >
          Masraf Merkezi
        </Button>
      </Stack>

      {/* İstatistikler */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
          mb: 3,
        }}
      >
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Assignment sx={{ fontSize: '2rem', color: '#3B82F6' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  İş Talepleri
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  156
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: '#F9FAFB' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Inventory sx={{ fontSize: '2rem', color: '#6B7280' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Varlık Sayısı
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  1,247
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Build sx={{ fontSize: '2rem', color: '#667eea' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Bakım İşleri
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  89
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: '#F9FAFB' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MonetizationOn sx={{ fontSize: '2rem', color: '#10B981' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Aylık Maliyet
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  ₺847K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Grafikler - Modül Durumları */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 3,
          mb: 3,
        }}
      >
        {/* İş Talepleri Durumu */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              İş Talepleri Durumu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Bu ay
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <canvas ref={requestsChartRef} style={{ maxWidth: '280px' }} />
            </Box>
          </CardContent>
        </Card>

        {/* Varlıklar Durumu */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Varlıklar Durumu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Toplam varlıklar
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <canvas ref={assetsChartRef} style={{ maxWidth: '280px' }} />
            </Box>
          </CardContent>
        </Card>

        {/* Bakım İşleri Durumu */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Bakım İşleri Durumu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Bu ay
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <canvas ref={maintenanceChartRef} style={{ maxWidth: '280px' }} />
            </Box>
          </CardContent>
        </Card>

        {/* Zimmet Durumu */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Zimmet Durumu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Aktif zimmetler
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <canvas ref={zimmetChartRef} style={{ maxWidth: '280px' }} />
            </Box>
          </CardContent>
        </Card>

        {/* Hurda Durumu */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Hurda İşlemleri Durumu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Onay durumları
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <canvas ref={hurdaChartRef} style={{ maxWidth: '280px' }} />
            </Box>
          </CardContent>
        </Card>

        {/* Masraf Merkezi Durumu */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Masraf Merkezi Durumu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              İşlem onayları
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <canvas ref={masrafChartRef} style={{ maxWidth: '280px' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Son Aktiviteler */}
      <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Son Aktiviteler
            </Typography>
            <Button
              variant="text"
              sx={{ textTransform: 'none', fontSize: '0.875rem' }}
            >
              Tümünü Gör
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Tarih</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>İşlem</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Kullanıcı</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      03.11.2025 14:30
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Yeni iş talebi: <strong>Elektrik Panosu Kontrolü</strong>
                  </TableCell>
                  <TableCell>Ahmet Yılmaz</TableCell>
                  <TableCell>
                    <Chip label="Tamamlandı" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      03.11.2025 13:15
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Bakım işi güncellendi: <strong>HVAC Sistem Bakımı</strong>
                  </TableCell>
                  <TableCell>Mehmet Demir</TableCell>
                  <TableCell>
                    <Chip label="İşlemde" color="info" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      03.11.2025 11:45
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Varlık eklendi: <strong>Kompresör #234</strong>
                  </TableCell>
                  <TableCell>Ayşe Kara</TableCell>
                  <TableCell>
                    <Chip label="Tamamlandı" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      03.11.2025 10:20
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Zimmet talebi: <strong>Forklift FT-456</strong>
                  </TableCell>
                  <TableCell>Can Öztürk</TableCell>
                  <TableCell>
                    <Chip label="Beklemede" color="warning" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      03.11.2025 09:00
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Hurda kaydı oluşturuldu: <strong>Motor #892</strong>
                  </TableCell>
                  <TableCell>Fatma Arslan</TableCell>
                  <TableCell>
                    <Chip label="Onay Bekliyor" color="error" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
