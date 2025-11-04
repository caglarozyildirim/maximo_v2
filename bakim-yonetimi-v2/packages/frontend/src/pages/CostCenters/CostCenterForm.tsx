import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';
import { allCostCenterChanges } from '../../data/mockData';

// Mock veri yapıları
interface Asset {
  id: number;
  sapNumber: string;
  sapTitle: string;
  maintenanceNumber: string;
  producer: string;
  model: string;
  serialNumber: string;
  workstationCode: string;
  workstationName: string;
  currentCostCenterId: number;
}

interface CostCenter {
  id: number;
  code: string;
  name: string;
  responsibleUserId: string;
  responsibleUserName: string;
  responsibleUserDepartment: string;
  responsibleUserTitle: string;
  responsibleUserEmail: string;
  responsibleUserPhone: string;
}

// Mock varlıklar
const mockAssets: Asset[] = [
  {
    id: 1,
    sapNumber: 'SAP-1000234',
    sapTitle: 'Dell Precision 5560 Workstation',
    maintenanceNumber: 'MAE-2024-001',
    producer: 'Dell Inc.',
    model: 'Precision 5560',
    serialNumber: 'SN-2024-DELL-001',
    workstationCode: 'WS-IT-101',
    workstationName: 'Yazılım Geliştirme İstasyonu 1',
    currentCostCenterId: 1,
  },
  {
    id: 2,
    sapNumber: 'SAP-1000567',
    sapTitle: 'HP LaserJet Enterprise M507',
    maintenanceNumber: 'MAE-2024-045',
    producer: 'HP Inc.',
    model: 'LaserJet Enterprise M507dn',
    serialNumber: 'SN-2024-HP-045',
    workstationCode: 'WS-OFC-205',
    workstationName: 'Muhasebe Ofis İstasyonu 5',
    currentCostCenterId: 2,
  },
  {
    id: 3,
    sapNumber: 'SAP-1000890',
    sapTitle: 'Lenovo ThinkPad X1 Carbon',
    maintenanceNumber: 'MAE-2024-078',
    producer: 'Lenovo Group',
    model: 'ThinkPad X1 Carbon Gen 9',
    serialNumber: 'SN-2024-LNV-078',
    workstationCode: 'WS-QC-310',
    workstationName: 'Kalite Kontrol Mobil İstasyon 10',
    currentCostCenterId: 3,
  },
];

// Mock masraf merkezleri
const mockCostCenters: CostCenter[] = [
  {
    id: 1,
    code: 'CC-IT-001',
    name: 'Bilgi Teknolojileri',
    responsibleUserId: 'EMP-2001',
    responsibleUserName: 'Ahmet Yılmaz',
    responsibleUserDepartment: 'Bilgi Teknolojileri',
    responsibleUserTitle: 'IT Müdürü',
    responsibleUserEmail: 'ahmet.yilmaz@company.com',
    responsibleUserPhone: '+90 212 555 0101',
  },
  {
    id: 2,
    code: 'CC-FIN-002',
    name: 'Finans ve Muhasebe',
    responsibleUserId: 'EMP-2002',
    responsibleUserName: 'Ayşe Demir',
    responsibleUserDepartment: 'Finans',
    responsibleUserTitle: 'Finans Müdürü',
    responsibleUserEmail: 'ayse.demir@company.com',
    responsibleUserPhone: '+90 212 555 0202',
  },
  {
    id: 3,
    code: 'CC-QC-003',
    name: 'Kalite Kontrol',
    responsibleUserId: 'EMP-2003',
    responsibleUserName: 'Mehmet Kaya',
    responsibleUserDepartment: 'Kalite',
    responsibleUserTitle: 'Kalite Müdürü',
    responsibleUserEmail: 'mehmet.kaya@company.com',
    responsibleUserPhone: '+90 212 555 0303',
  },
  {
    id: 4,
    code: 'CC-PRD-004',
    name: 'Üretim',
    responsibleUserId: 'EMP-2004',
    responsibleUserName: 'Fatma Şahin',
    responsibleUserDepartment: 'Üretim',
    responsibleUserTitle: 'Üretim Müdürü',
    responsibleUserEmail: 'fatma.sahin@company.com',
    responsibleUserPhone: '+90 212 555 0404',
  },
  {
    id: 5,
    code: 'CC-RND-005',
    name: 'AR-GE',
    responsibleUserId: 'EMP-2005',
    responsibleUserName: 'Ali Çelik',
    responsibleUserDepartment: 'AR-GE',
    responsibleUserTitle: 'AR-GE Müdürü',
    responsibleUserEmail: 'ali.celik@company.com',
    responsibleUserPhone: '+90 212 555 0505',
  },
];

interface FormData {
  assetId: string;
  newCostCenterId: string;
  changeDate: string;
  effectiveDate: string;
  reason: string;
  notes: string;
}

const CostCenterForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<FormData>({
    assetId: '',
    newCostCenterId: '',
    changeDate: new Date().toISOString().split('T')[0],
    effectiveDate: new Date().toISOString().split('T')[0],
    reason: '',
    notes: '',
  });

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [currentCostCenter, setCurrentCostCenter] = useState<CostCenter | null>(null);
  const [newCostCenter, setNewCostCenter] = useState<CostCenter | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(id && id !== 'new');
  const current = isEditMode && id ? allCostCenterChanges.find(c => c.id === parseInt(id)) : null;

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && current) {
      const asset = mockAssets[0]; // Use first asset as default
      const currentCC = mockCostCenters[0]; // Use first cost center as current
      const newCC = mockCostCenters[1]; // Use second cost center as new

      setFormData({
        assetId: '1',
        newCostCenterId: '2',
        changeDate: current.changeDate || '2024-11-01',
        effectiveDate: '2024-11-15',
        reason: 'Cost center change required due to organizational restructuring. This change aligns with the new departmental structure and ensures proper cost allocation.',
        notes: 'Additional notes regarding this cost center change. Coordination with finance department has been completed.',
      });

      setSelectedAsset(asset);
      setCurrentCostCenter(currentCC);
      setNewCostCenter(newCC);
    }
  }, [isEditMode, current]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAssetChange = (assetId: string) => {
    const asset = mockAssets.find((a) => a.id === parseInt(assetId));
    if (asset) {
      setSelectedAsset(asset);
      const currentCC = mockCostCenters.find((cc) => cc.id === asset.currentCostCenterId);
      setCurrentCostCenter(currentCC || null);
      handleChange('assetId', assetId);

      // Yeni masraf merkezi seçildiyse ve aynı mı kontrol et
      if (formData.newCostCenterId && parseInt(formData.newCostCenterId) === asset.currentCostCenterId) {
        enqueueSnackbar('Yeni masraf merkezi, mevcut masraf merkezi ile aynı olamaz!', { variant: 'error' });
        setFormData((prev) => ({ ...prev, newCostCenterId: '' }));
        setNewCostCenter(null);
      }
    } else {
      setSelectedAsset(null);
      setCurrentCostCenter(null);
    }
  };

  const handleNewCostCenterChange = (costCenterId: string) => {
    const cc = mockCostCenters.find((c) => c.id === parseInt(costCenterId));
    if (cc) {
      // Mevcut masraf merkezi ile aynı mı kontrol et
      if (selectedAsset && selectedAsset.currentCostCenterId === cc.id) {
        enqueueSnackbar('Yeni masraf merkezi, mevcut masraf merkezi ile aynı olamaz!', { variant: 'error' });
        return;
      }
      setNewCostCenter(cc);
      handleChange('newCostCenterId', costCenterId);
    } else {
      setNewCostCenter(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.assetId) {
      newErrors.assetId = 'Varlık seçilmelidir';
    }
    if (!formData.newCostCenterId) {
      newErrors.newCostCenterId = 'Yeni masraf merkezi seçilmelidir';
    }
    if (!formData.changeDate) {
      newErrors.changeDate = 'Değişim tarihi zorunludur';
    }
    if (!formData.effectiveDate) {
      newErrors.effectiveDate = 'Yürürlük tarihi zorunludur';
    }

    // Tarih validasyonu - Yürürlük tarihi, değişim tarihinden sonra olmalı
    if (formData.changeDate && formData.effectiveDate) {
      const changeDate = new Date(formData.changeDate);
      const effectiveDate = new Date(formData.effectiveDate);
      if (effectiveDate < changeDate) {
        newErrors.effectiveDate = 'Yürürlük tarihi, değişim tarihinden önce olamaz';
      }
    }

    if (!formData.reason) {
      newErrors.reason = 'Değişiklik nedeni zorunludur';
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Değişiklik nedeni en az 10 karakter olmalıdır';
    } else if (formData.reason.length > 512) {
      newErrors.reason = 'Değişiklik nedeni en fazla 512 karakter olabilir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      enqueueSnackbar('Lütfen tüm zorunlu alanları doldurun', { variant: 'warning' });
      return;
    }

    setSubmitting(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      enqueueSnackbar('Masraf merkezi değişikliği başarıyla oluşturuldu ve onaya gönderildi', { variant: 'success' });
      navigate('/cost-centers');
    } catch (error: any) {
      enqueueSnackbar(error.message || 'İşlem başarısız oldu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const characterCount = formData.reason.length;
  const characterMin = 10;
  const characterMax = 512;

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Masraf Merkezi Değişikliği</h1>
          <p className="page-subtitle">
            <a
              href="/cost-centers"
              onClick={(e) => {
                e.preventDefault();
                navigate('/cost-centers');
              }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Geri Dön
            </a>
          </p>
        </div>
      </div>

      {/* Onay Süreci Bilgilendirmesi */}
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        <strong>6 Aşamalı Onay Süreci:</strong>
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          1. Alıcı MM Varlık Sorumlusu → 2. Mevcut MM Sorumlusu → 3. Mevcut MM Müdürü →
          4. Muhasebe → 5. SAP Entegrasyonu → 6. Raporlama
        </div>
      </Alert>

      <form onSubmit={handleSubmit}>
        {/* Bölüm 1: Varlık Seçimi */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">1. Varlık Seçimi</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Varlık <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.assetId}
                onChange={(e) => handleAssetChange(e.target.value)}
                style={{ fontSize: '0.95rem' }}
              >
                <option value="">-- Varlık Seçiniz --</option>
                {mockAssets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.sapNumber} - {asset.sapTitle} ({asset.maintenanceNumber})
                  </option>
                ))}
              </select>
              {errors.assetId && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.assetId}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bölüm 2: Varlık Bilgileri (SAP Entegrasyonu - Readonly) */}
        {selectedAsset && (
          <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#f9fafb' }}>
            <div className="card-header" style={{ backgroundColor: '#e5e7eb', color: '#374151' }}>
              2. Varlık Bilgileri (SAP)
            </div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Numarası</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.sapNumber}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Başlığı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.sapTitle}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Bakım Numarası</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.maintenanceNumber}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Üretici</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.producer}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Model</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.model}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Seri Numarası</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.serialNumber}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">İş İstasyonu Kodu</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.workstationCode}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">İş İstasyonu Adı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.workstationName}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bölüm 3: Mevcut Masraf Merkezi Bilgileri (Readonly) */}
        {currentCostCenter && (
          <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#fef3c7' }}>
            <div className="card-header" style={{ backgroundColor: '#fde68a', color: '#92400e' }}>
              3. Mevcut Masraf Merkezi
            </div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">MM Kodu</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.code}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 600 }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">MM Adı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.name}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 600 }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Sorumlu Kullanıcı ID</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.responsibleUserId}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Sorumlu Adı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.responsibleUserName}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Sorumlu Departmanı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.responsibleUserDepartment}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Sorumlu Ünvanı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.responsibleUserTitle}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Sorumlu E-posta</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.responsibleUserEmail}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Sorumlu Telefon</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={currentCostCenter.responsibleUserPhone}
                  disabled
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bölüm 4: Yeni Masraf Merkezi Seçimi ve Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">4. Yeni Masraf Merkezi</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Yeni Masraf Merkezi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.newCostCenterId}
                onChange={(e) => handleNewCostCenterChange(e.target.value)}
                disabled={!selectedAsset}
                style={{ fontSize: '0.95rem' }}
              >
                <option value="">-- Yeni Masraf Merkezi Seçiniz --</option>
                {mockCostCenters
                  .filter((cc) => !selectedAsset || cc.id !== selectedAsset.currentCostCenterId)
                  .map((cc) => (
                    <option key={cc.id} value={cc.id}>
                      {cc.code} - {cc.name}
                    </option>
                  ))}
              </select>
              {errors.newCostCenterId && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.newCostCenterId}</span>
              )}
            </div>
          </div>

          {/* Yeni Masraf Merkezi Sorumlu Bilgileri (Readonly) */}
          {newCostCenter && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#d1fae5', borderRadius: '0.5rem' }}>
              <div style={{ fontWeight: 600, color: '#065f46', marginBottom: '1rem' }}>
                Yeni Masraf Merkezi Sorumlusu
              </div>
              <div className="modern-form-grid">
                <div className="modern-form-group">
                  <label className="modern-form-label">Sorumlu Kullanıcı ID</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={newCostCenter.responsibleUserId}
                    disabled
                    style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                  />
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Sorumlu Adı</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={newCostCenter.responsibleUserName}
                    disabled
                    style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                  />
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Sorumlu Departmanı</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={newCostCenter.responsibleUserDepartment}
                    disabled
                    style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                  />
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Sorumlu Ünvanı</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={newCostCenter.responsibleUserTitle}
                    disabled
                    style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                  />
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Sorumlu E-posta</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={newCostCenter.responsibleUserEmail}
                    disabled
                    style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                  />
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Sorumlu Telefon</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={newCostCenter.responsibleUserPhone}
                    disabled
                    style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bölüm 5: Değişim Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">5. Değişim Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">
                Değişim Tarihi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="date"
                className="modern-form-control"
                value={formData.changeDate}
                onChange={(e) => handleChange('changeDate', e.target.value)}
              />
              {errors.changeDate && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.changeDate}</span>
              )}
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">
                Yürürlük Tarihi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="date"
                className="modern-form-control"
                value={formData.effectiveDate}
                onChange={(e) => handleChange('effectiveDate', e.target.value)}
              />
              {errors.effectiveDate && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.effectiveDate}</span>
              )}
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                Yürürlük tarihi, değişim tarihinden önce olamaz
              </div>
            </div>
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Değişiklik Nedeni <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                className="modern-form-control"
                value={formData.reason}
                onChange={(e) => handleChange('reason', e.target.value)}
                placeholder="Masraf merkezi değişikliğinin nedenini açıklayın (min 10, max 512 karakter)"
                rows={4}
                maxLength={characterMax}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                <span style={{ color: errors.reason ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {errors.reason || `En az ${characterMin} karakter gerekli`}
                </span>
                <span
                  style={{
                    color:
                      characterCount < characterMin
                        ? 'var(--primary)'
                        : characterCount > characterMax
                        ? 'var(--primary)'
                        : 'var(--gray-500)',
                  }}
                >
                  {characterCount} / {characterMax}
                </span>
              </div>
            </div>
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Notlar (Opsiyonel)</label>
              <textarea
                className="modern-form-control"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Ek notlar veya açıklamalar"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Form Butonları */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            type="button"
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate('/cost-centers')}
            disabled={submitting}
          >
            İptal
          </button>
          <button type="submit" className="modern-btn modern-btn-primary" disabled={submitting}>
            {submitting ? 'Gönderiliyor...' : 'Onaya Gönder'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default CostCenterForm;
