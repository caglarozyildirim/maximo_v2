import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Build, Assessment, ReportProblem, Assignment, Inventory, Warning } from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchJobRequests } from '../features/job-requests/jobRequestsSlice';
import { dashboardMockData } from '../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.jobRequests);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobRequests({ page: 1, limit: 10 }));
  }, [dispatch]);

  const stats = {
    total: list.length,
    pending: list.filter((jr) => jr.status === 'PENDING').length,
    inProgress: list.filter((jr) =>
      ['MANAGER_APPROVAL', 'ENGINEER_TAKEOVER', 'TECHNICAL_APPROVAL', 'COST_CALCULATION',
       'BUSINESS_APPROVAL', 'SOLUTION_ASSIGNMENT', 'IMPLEMENTATION', 'SOLUTION_APPROVAL'].includes(jr.status)
    ).length,
    completed: list.filter((jr) => jr.status === 'COMPLETED').length,
  };

  // MAN Design Guide Colors
  const colors = {
    blue: '#4B96D2',      // MAN Blue
    green: '#91B900',     // MAN Green
    yellow: '#FFCD00',    // MAN Yellow
    red: '#E40045',       // MAN Red
    purple: '#764ba2',    // Purple (kullanım için)
    cyan: '#4B96D2',      // MAN Blue variant
    orange: '#F97316',    // Orange (kullanım için)
    pink: '#E40045',      // MAN Red variant
    indigo: '#303C49',    // MAN Anthracite
    teal: '#91B900'       // MAN Green variant
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
            size: 12
          }
        }
      }
    },
    onClick: (_event: any, elements: any, chart: any) => {
      if (elements.length > 0) {
        const chartType = chart.canvas.id;
        navigate(`/${chartType}`);
      }
    }
  };

  // İş Talepleri Chart
  const jobRequestsChart = {
    labels: ['Açık', 'İşlemde', 'Beklemede', 'Tamamlandı'],
    datasets: [{
      data: [68, 45, 23, 20],
      backgroundColor: [colors.red, colors.blue, colors.yellow, colors.green],
      borderWidth: 0
    }]
  };

  // Varlıklar Chart
  const assetsChart = {
    labels: ['Aktif', 'Bakımda', 'Pasif', 'Hurda'],
    datasets: [{
      data: [1100, 89, 45, 13],
      backgroundColor: [colors.green, colors.blue, colors.yellow, colors.red],
      borderWidth: 0
    }]
  };

  // Bakım İşleri Chart
  const maintenanceChart = {
    labels: ['Tamamlandı', 'Devam Ediyor', 'Planlandı'],
    datasets: [{
      data: [42, 24, 23],
      backgroundColor: [colors.green, colors.blue, colors.purple],
      borderWidth: 0
    }]
  };

  // Zimmet Chart
  const assignmentsChart = {
    labels: ['Aktif', 'İade Edildi'],
    datasets: [{
      data: [245, 89],
      backgroundColor: [colors.cyan, colors.indigo],
      borderWidth: 0
    }]
  };

  // Hurda Chart
  const retirementsChart = {
    labels: ['Onaylandı', 'Beklemede', 'Reddedildi'],
    datasets: [{
      data: [28, 15, 8],
      backgroundColor: [colors.green, colors.yellow, colors.red],
      borderWidth: 0
    }]
  };

  // Masraf Merkezi Chart
  const costCentersChart = {
    labels: ['Onaylandı', 'Beklemede', 'Reddedildi'],
    datasets: [{
      data: [45, 12, 5],
      backgroundColor: [colors.green, colors.orange, colors.red],
      borderWidth: 0
    }]
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'Bekliyor',
      MANAGER_APPROVAL: 'Yönetici Onayı',
      ENGINEER_TAKEOVER: 'Mühendis Ataması',
      TECHNICAL_APPROVAL: 'Teknik Onay',
      COST_CALCULATION: 'Maliyet',
      BUSINESS_APPROVAL: 'İş Onayı',
      SOLUTION_ASSIGNMENT: 'Çözüm Ataması',
      IMPLEMENTATION: 'Uygulama',
      SOLUTION_APPROVAL: 'Çözüm Onayı',
      COMPLETED: 'Tamamlandı',
      REJECTED: 'Reddedildi',
      CANCELLED: 'İptal',
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Bakım Yönetimi Sistem Özeti - Kasım 2025</p>
        </div>
      </div>

      {/* HIZLI İŞLEMLER */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="modern-btn modern-btn-primary" onClick={() => navigate('/job-requests/new')}>
          <span>+</span> Yeni İş Talebi
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={() => navigate('/assets/new')}>
          <span>+</span> Varlık Ekle
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={() => navigate('/maintenance/new')}>
          <span>+</span> Bakım İşi
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={() => navigate('/assignments/new')}>
          <span>+</span> Zimmet Oluştur
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={() => navigate('/retirements/new')}>
          <span>+</span> Hurda Kaydı
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={() => navigate('/cost-centers/new')}>
          <span>+</span> Masraf Merkezi
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={() => navigate('/incidents/new')}>
          <span>+</span> Olay Bildirimi
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Assignment style={{ fontSize: '2rem', color: '#4B96D2' }} />
          </div>
          <div>
            <div className="stat-label">İş Talepleri</div>
            <div className="stat-value">{dashboardMockData.stats.totalJobRequests}</div>
            <div style={{ fontSize: '0.75rem', color: '#E40045', marginTop: '0.25rem', fontWeight: 600 }}>
              {dashboardMockData.stats.pendingJobRequests} onay bekliyor
            </div>
          </div>
        </div>

        <div className="stat-card gray">
          <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Inventory style={{ fontSize: '2rem', color: '#6E7E8D' }} />
          </div>
          <div>
            <div className="stat-label">Varlık Sayısı</div>
            <div className="stat-value">1,247</div>
            <div style={{ fontSize: '0.75rem', color: '#4B96D2', marginTop: '0.25rem', fontWeight: 600 }}>
              {dashboardMockData.stats.overdueAssignments} zimmet gecikmiş
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Build style={{ fontSize: '2rem', color: '#E40045' }} />
          </div>
          <div>
            <div className="stat-label">Bakım İşleri</div>
            <div className="stat-value">89</div>
            <div style={{ fontSize: '0.75rem', color: '#E40045', marginTop: '0.25rem', fontWeight: 600 }}>
              {dashboardMockData.stats.criticalMaintenanceOverdue} kritik gecikmiş
            </div>
          </div>
        </div>

        <div className="stat-card gray">
          <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReportProblem style={{ fontSize: '2rem', color: '#E40045' }} />
          </div>
          <div>
            <div className="stat-label">Arıza Kayıtları</div>
            <div className="stat-value">{dashboardMockData.stats.openIncidents + dashboardMockData.stats.inProgressIncidents}</div>
            <div style={{ fontSize: '0.75rem', color: '#FFCD00', marginTop: '0.25rem', fontWeight: 600 }}>
              {dashboardMockData.stats.openIncidents} açık, {dashboardMockData.stats.inProgressIncidents} devam ediyor
            </div>
          </div>
        </div>
      </div>

      {/* KRİTİK UYARILAR PANEL */}
      <div className="modern-card" style={{ marginBottom: '2rem', border: '2px solid #FFF8DB', backgroundColor: '#FFFEF5' }}>
        <div className="card-header" style={{ borderBottom: '1px solid #FFEEAA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Warning style={{ fontSize: '1.75rem', color: '#FFCD00' }} />
            <span style={{ fontWeight: 700, color: '#92400E' }}>Kritik Uyarılar ve Bekleyen İşlemler</span>
          </div>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {/* Uyarı 1 - Kritik Bakım Gecikmiş */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#FFE5EF',
                borderLeft: '4px solid #E40045',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => navigate('/maintenance')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '1.25rem', paddingTop: '0.125rem' }}>🔴</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#C00038', marginBottom: '0.25rem' }}>
                  Kritik Bakım Gecikmiş ({dashboardMockData.stats.criticalMaintenanceOverdue} Varlık)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#C00038', marginBottom: '0.5rem' }}>
                  {dashboardMockData.criticalMaintenance.map((m, i) => (
                    <div key={i}>
                      • <strong>{m.assetTitle}</strong>: {m.daysOverdue} gün gecikmiş - {m.description}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#C00038', fontWeight: 600 }}>→</div>
            </div>

            {/* Uyarı 2 - Bekleyen Onaylar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#FFF8DB',
                borderLeft: '4px solid #FFCD00',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => navigate('/job-requests')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '1.25rem', paddingTop: '0.125rem' }}>⏰</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#DFAD00', marginBottom: '0.25rem' }}>
                  Bekleyen Onaylar ({dashboardMockData.stats.pendingJobRequests} İş Talebi)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#DFAD00' }}>
                  Toplam tutar: <strong>{dashboardMockData.pendingApprovals.reduce((sum, p) => sum + p.estimatedCost, 0).toLocaleString('tr-TR')} TL</strong>
                  {' • '}
                  Ortalama bekleme: <strong>{Math.round(dashboardMockData.pendingApprovals.reduce((sum, p) => sum + p.waitingDays, 0) / dashboardMockData.pendingApprovals.length)} gün</strong>
                  {' • '}
                  En acil: <strong>{dashboardMockData.pendingApprovals.sort((a, b) => b.waitingDays - a.waitingDays)[0]?.title}</strong> ({dashboardMockData.pendingApprovals.sort((a, b) => b.waitingDays - a.waitingDays)[0]?.waitingDays} gün)
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#DFAD00', fontWeight: 600 }}>→</div>
            </div>

            {/* Uyarı 3 - Zimmet Takibi */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#E8F4FC',
                borderLeft: '4px solid #4B96D2',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => navigate('/assets')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Assessment style={{ fontSize: '1.5rem', paddingTop: '0.125rem', color: '#2B76B2' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#2B76B2', marginBottom: '0.25rem' }}>
                  Zimmet Takibi Gerekli ({dashboardMockData.stats.overdueAssignments} Gecikmiş)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#2B76B2' }}>
                  En uzun gecikme: <strong>{dashboardMockData.overdueAssignments.sort((a, b) => b.daysOverdue - a.daysOverdue)[0]?.assetTitle}</strong> ({dashboardMockData.overdueAssignments.sort((a, b) => b.daysOverdue - a.daysOverdue)[0]?.daysOverdue} gün)
                  {' • '}
                  Yüksek değerli: <strong>Lenovo Laptop</strong> (20 gün gecikmiş)
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#2B76B2', fontWeight: 600 }}>→</div>
            </div>

            {/* Uyarı 4 - Bütçe Aşımı Riski */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#FFE5EF',
                borderLeft: '4px solid #E40045',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => navigate('/cost-centers')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '1.25rem', paddingTop: '0.125rem' }}>💸</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#C00038', marginBottom: '0.25rem' }}>
                  Bütçe Aşımı Riski ({dashboardMockData.stats.budgetRiskCenters} Masraf Merkezi)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#C00038', marginBottom: '0.5rem' }}>
                  {dashboardMockData.budgetRiskCostCenters.map((cc, i) => (
                    <div key={i}>
                      • <strong>{cc.costCenterName}</strong>: %{cc.utilizationPercentage} kullanım ({cc.remainingBudget.toLocaleString('tr-TR')} TL kaldı)
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#C00038', fontWeight: 600 }}>→</div>
            </div>
          </div>
        </div>
      </div>

      {/* GRAFİKLER - MODÜL DURUMLARI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* İş Talepleri Durumu */}
        <div className="modern-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/job-requests')}>
          <div className="card-header">
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>İş Talepleri Durumu</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Bu ay</div>
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut id="job-requests" data={jobRequestsChart} options={doughnutOptions} />
          </div>
        </div>

        {/* Varlıklar Durumu */}
        <div className="modern-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/assets')}>
          <div className="card-header">
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Varlıklar Durumu</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Toplam varlıklar</div>
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut id="assets" data={assetsChart} options={doughnutOptions} />
          </div>
        </div>

        {/* Bakım İşleri Durumu */}
        <div className="modern-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/maintenance')}>
          <div className="card-header">
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Bakım İşleri Durumu</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Bu ay</div>
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut id="maintenance" data={maintenanceChart} options={doughnutOptions} />
          </div>
        </div>

        {/* Zimmet Durumu */}
        <div className="modern-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/assignments')}>
          <div className="card-header">
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Zimmet Durumu</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Aktif zimmetler</div>
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut id="assignments" data={assignmentsChart} options={doughnutOptions} />
          </div>
        </div>

        {/* Hurda Durumu */}
        <div className="modern-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/retirements')}>
          <div className="card-header">
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Hurda İşlemleri Durumu</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Onay durumları</div>
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut id="retirements" data={retirementsChart} options={doughnutOptions} />
          </div>
        </div>

        {/* Masraf Merkezi Durumu */}
        <div className="modern-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/cost-centers')}>
          <div className="card-header">
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Masraf Merkezi Durumu</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>İşlem onayları</div>
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut id="cost-centers" data={costCentersChart} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* SON AKTİVİTELER */}
      <div className="modern-card">
        <div className="card-header">
          <span>Son Aktiviteler</span>
          <button
            className="modern-btn modern-btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            onClick={() => navigate('/job-requests')}
          >
            Tümünü Gör →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
            }}
          >
            <thead>
              <tr
                style={{
                  background: 'linear-gradient(135deg, #F3F4F6 0%, #F9FAFB 100%)',
                  borderBottom: '2px solid #E5E7EB',
                }}
              >
                <th
                  style={{
                    padding: '1.25rem 1rem',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: '#374151',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Tarih
                </th>
                <th
                  style={{
                    padding: '1.25rem 1rem',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: '#374151',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  İşlem
                </th>
                <th
                  style={{
                    padding: '1.25rem 1rem',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: '#374151',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Kullanıcı
                </th>
                <th
                  style={{
                    padding: '1.25rem 1rem',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: '#374151',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Durum
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardMockData.pendingApprovals.slice(0, 5).map((jobRequest, index) => {
                const user = dashboardMockData.users.find(u => u.id === jobRequest.requestedBy);
                const userName = user ? `${user.firstName} ${user.lastName}` : 'N/A';

                return (
                  <tr
                    key={jobRequest.id}
                    style={{
                      transition: 'background 0.2s ease',
                      background: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                      borderBottom: '1px solid #F3F4F6',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : '#f9fafb';
                    }}
                    onClick={() => navigate(`/job-requests/${jobRequest.id}`)}
                  >
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span style={{ color: '#6B7280' }}>
                        {new Date(jobRequest.requestDate).toLocaleDateString('tr-TR')}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', color: '#111827' }}>
                      Yeni iş talebi: <strong>{jobRequest.title}</strong>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', color: '#111827' }}>
                      {userName}
                    </td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span className="modern-badge modern-badge-warning">
                        {jobRequest.waitingDays} gün bekliyor
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {dashboardMockData.pendingApprovals.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Henüz aktivite yok
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Dashboard;
