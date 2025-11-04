import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';
import { allRetirements } from '../../data/mockData';

// Mock Assets with SAP Integration Data
const mockAssets = [
  {
    id: 1,
    sapNumber: 'SAP-1000234',
    sapTitle: 'Dell Precision 5560 Workstation',
    maintenanceId: 'MAE-2024-001',
    maintenanceTitle: 'İş İstasyonu Bilgisayar',
    producerName: 'Dell',
    producerModel: 'Precision 5560',
    producerSerialNumber: 'SN-DL-PRE-2024-001',
    // IFRS Fields
    ifrsDepreciationKey: 'IFRS-LINEAR',
    ifrsUsefulLife: 5,
    ifrsCapitalizationDate: '2020-01-15',
    ifrsCurrency: 'EUR',
    ifrsCurrentAPC: 2500.00,
    ifrsAccumulatedDepreciation: 2000.00,
    ifrsCurrentBookingValue: 500.00,
    // Local Fields
    localDepreciationKey: 'LOCAL-LINEAR',
    localUsefulLife: 5,
    localCurrency: 'TRY',
    localCurrentAPC: 75000.00,
    localAccumulatedDepreciation: 60000.00,
    localCurrentBookingValue: 15000.00,
    // Cost Center
    costCenterId: 1,
    costCenterCode: 'CC-IT-001',
    costCenterName: 'IT Department',
  },
  {
    id: 2,
    sapNumber: 'SAP-1000235',
    sapTitle: 'Toyota Corolla 2020',
    maintenanceId: 'MAE-2024-002',
    maintenanceTitle: 'Şirket Aracı - Sedan',
    producerName: 'Toyota',
    producerModel: 'Corolla 1.6 CVT',
    producerSerialNumber: 'VIN-TYT-2020-002',
    ifrsDepreciationKey: 'IFRS-LINEAR',
    ifrsUsefulLife: 10,
    ifrsCapitalizationDate: '2020-03-20',
    ifrsCurrency: 'EUR',
    ifrsCurrentAPC: 18000.00,
    ifrsAccumulatedDepreciation: 9000.00,
    ifrsCurrentBookingValue: 9000.00,
    localDepreciationKey: 'LOCAL-LINEAR',
    localUsefulLife: 10,
    localCurrency: 'TRY',
    localCurrentAPC: 540000.00,
    localAccumulatedDepreciation: 270000.00,
    localCurrentBookingValue: 270000.00,
    costCenterId: 2,
    costCenterCode: 'CC-OPS-002',
    costCenterName: 'Operations',
  },
  {
    id: 3,
    sapNumber: 'SAP-1000236',
    sapTitle: 'CNC Torna Makinesi',
    maintenanceId: 'MAE-2024-003',
    maintenanceTitle: 'Endüstriyel Torna',
    producerName: 'Mazak',
    producerModel: 'Quick Turn 250',
    producerSerialNumber: 'SN-MAZ-QT250-003',
    ifrsDepreciationKey: 'IFRS-LINEAR',
    ifrsUsefulLife: 15,
    ifrsCapitalizationDate: '2018-06-10',
    ifrsCurrency: 'EUR',
    ifrsCurrentAPC: 50000.00,
    ifrsAccumulatedDepreciation: 23333.33,
    ifrsCurrentBookingValue: 26666.67,
    localDepreciationKey: 'LOCAL-LINEAR',
    localUsefulLife: 15,
    localCurrency: 'TRY',
    localCurrentAPC: 1500000.00,
    localAccumulatedDepreciation: 700000.00,
    localCurrentBookingValue: 800000.00,
    costCenterId: 3,
    costCenterCode: 'CC-PROD-003',
    costCenterName: 'Production',
  },
];

const mockCostCenters = [
  { id: 1, code: 'CC-IT-001', name: 'IT Department' },
  { id: 2, code: 'CC-OPS-002', name: 'Operations' },
  { id: 3, code: 'CC-PROD-003', name: 'Production' },
  { id: 4, code: 'CC-FIN-004', name: 'Finance' },
  { id: 5, code: 'CC-HR-005', name: 'Human Resources' },
];

// Retiring Methods as per documentation
const retiringMethods = [
  { id: 1, name: 'Selling', label: 'Satış', requiresSaleInfo: true },
  { id: 2, name: 'Scrapping', label: 'İmha', requiresSaleInfo: false },
  { id: 3, name: 'Donation', label: 'Bağış', requiresSaleInfo: false },
  { id: 4, name: 'Write-off', label: 'Kayıttan Silme', requiresSaleInfo: false },
];

interface FormData {
  // Asset Selection
  assetId: string;

  // Retiring Information
  retiringMethodId: string;
  retirementReason: string;
  costCenterId: string;

  // Conditional Fields (for Selling method)
  salePrice: string;
  saleCurrency: string;
  invoiceForm: string;

  // Notes
  notes: string;
}

interface SelectedAsset {
  id: number;
  sapNumber: string;
  sapTitle: string;
  maintenanceId: string;
  maintenanceTitle: string;
  producerName: string;
  producerModel: string;
  producerSerialNumber: string;
  ifrsDepreciationKey: string;
  ifrsUsefulLife: number;
  ifrsCapitalizationDate: string;
  ifrsCurrency: string;
  ifrsCurrentAPC: number;
  ifrsAccumulatedDepreciation: number;
  ifrsCurrentBookingValue: number;
  localDepreciationKey: string;
  localUsefulLife: number;
  localCurrency: string;
  localCurrentAPC: number;
  localAccumulatedDepreciation: number;
  localCurrentBookingValue: number;
  costCenterId: number;
  costCenterCode: string;
  costCenterName: string;
}

const initialFormData: FormData = {
  assetId: '',
  retiringMethodId: '',
  retirementReason: '',
  costCenterId: '',
  salePrice: '',
  saleCurrency: 'EUR',
  invoiceForm: '',
  notes: '',
};

const RetirementForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset | null>(null);
  const [searchAsset, setSearchAsset] = useState('');

  const isEditMode = Boolean(id && id !== 'new');
  const loading = false;
  const selectedMethod = retiringMethods.find(m => m.id === parseInt(formData.retiringMethodId));
  const requiresSaleInfo = selectedMethod?.requiresSaleInfo || false;

  // Get current retirement from mock data if in edit mode
  const current = isEditMode && id ? allRetirements.find(r => r.id === parseInt(id)) : null;

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && current) {
      // Find the asset from mock data
      const asset = mockAssets.find(a => a.id === current.assetId);

      // Map retirement reason to form format
      const reasonMap: Record<string, string> = {
        'ECONOMIC_END': '1',
        'BREAKDOWN': '2',
        'OBSOLETE': '3',
        'ACCIDENT': '4',
        'OTHER': '5'
      };

      setFormData({
        assetId: current.assetId?.toString() || '',
        retiringMethodId: '1', // Default to first method
        retirementReason: current.description || '', // Use description as reason
        costCenterId: '1', // Default cost center
        salePrice: current.scrapValue?.toString() || '',
        saleCurrency: 'TRY',
        invoiceForm: '',
        notes: current.description || '',
      });

      if (asset) {
        setSelectedAsset(asset);
      }
    }
  }, [isEditMode, current]);

  const handleAssetChange = (assetId: string) => {
    const asset = mockAssets.find(a => a.id === parseInt(assetId));
    if (asset) {
      setSelectedAsset(asset);
      setFormData(prev => ({
        ...prev,
        assetId,
        costCenterId: asset.costCenterId.toString(),
      }));
      if (errors.assetId) {
        setErrors(prev => ({ ...prev, assetId: undefined }));
      }
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.assetId) {
      newErrors.assetId = 'Varlık seçimi zorunludur';
    }

    if (!formData.retiringMethodId) {
      newErrors.retiringMethodId = 'Hurda yöntemi seçimi zorunludur';
    }

    if (!formData.retirementReason || formData.retirementReason.length < 10) {
      newErrors.retirementReason = 'Hurda nedeni en az 10 karakter olmalıdır';
    }

    if (!formData.costCenterId) {
      newErrors.costCenterId = 'Maliyet merkezi seçimi zorunludur';
    }

    // Selling method için ekstra validasyon
    if (requiresSaleInfo) {
      if (!formData.salePrice || parseFloat(formData.salePrice) <= 0) {
        newErrors.salePrice = 'Satış fiyatı girilmelidir';
      }
      if (!formData.invoiceForm) {
        newErrors.invoiceForm = 'Fatura formu girilmelidir';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      enqueueSnackbar('Lütfen tüm zorunlu alanları doğru şekilde doldurun', { variant: 'warning' });
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (isEditMode && id) {
        enqueueSnackbar('Hurda kaydı başarıyla güncellendi', { variant: 'success' });
      } else {
        enqueueSnackbar('Hurda kaydı başarıyla oluşturuldu - Onay sürecine gönderildi', { variant: 'success' });
      }

      navigate('/retirements');
    } catch (error: any) {
      enqueueSnackbar(error.message || 'İşlem başarısız oldu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssets = mockAssets.filter(asset =>
    asset.sapNumber.toLowerCase().includes(searchAsset.toLowerCase()) ||
    asset.sapTitle.toLowerCase().includes(searchAsset.toLowerCase()) ||
    asset.maintenanceId.toLowerCase().includes(searchAsset.toLowerCase()) ||
    asset.maintenanceTitle.toLowerCase().includes(searchAsset.toLowerCase())
  );

  if (loading && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const characterCount = formData.retirementReason.length;
  const characterColor = characterCount < 10 ? 'var(--primary)' : 'var(--gray-500)';

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEditMode ? 'Hurda Düzenle' : 'Yeni Hurda İşlemi'}</h1>
          <p className="page-subtitle">
            <a href="/retirements" onClick={(e) => { e.preventDefault(); navigate('/retirements'); }} style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>
              ← Geri Dön
            </a>
          </p>
        </div>
      </div>

      {!isEditMode && (
        <Alert severity="info" sx={{ marginBottom: '1.5rem', borderRadius: '8px' }}>
          Hurda işlemi 4 aşamalı onay sürecinden geçecektir:
          <br />1. Maliyet Merkezi Sorumlusu → 2. Teknik Şef (SL-Engineer) → 3. Bakım Müdürü → 4. Mali/Muhasebe Onayı
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* BÖLÜM 1: Varlık Seçimi ve Temel Bilgiler */}
        <div className="modern-card">
          <div className="card-header">
            <span>Varlık Seçimi</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 400 }}>Zorunlu alanlar (*) ile işaretlenmiştir</span>
          </div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Varlık Seçimi <span style={{ color: 'var(--primary)' }}>*</span></label>
              <input
                type="text"
                className="modern-form-control"
                placeholder="SAP numarası, Maintenance ID veya başlık ile arayın..."
                value={searchAsset}
                onChange={(e) => setSearchAsset(e.target.value)}
                style={{ marginBottom: '0.5rem' }}
              />
              <select
                className="modern-form-control"
                value={formData.assetId}
                onChange={(e) => handleAssetChange(e.target.value)}
                size={5}
                style={{ height: 'auto' }}
              >
                <option value="">Varlık seçiniz...</option>
                {filteredAssets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    [{asset.sapNumber}] {asset.sapTitle} - [{asset.maintenanceId}] {asset.maintenanceTitle}
                  </option>
                ))}
              </select>
              {errors.assetId && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.assetId}</span>}
            </div>
          </div>
        </div>

        {/* BÖLÜM 2: SAP Varlık Detayları (Readonly - Otomatik) */}
        {selectedAsset && (
          <div className="modern-card">
            <div className="card-header">SAP Varlık Bilgileri (Otomatik - SAP'ten gelen bilgiler)</div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Varlık Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.sapNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Varlık Adı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.sapTitle} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Bakım Varlık ID</label>
                <input type="text" className="modern-form-control" value={selectedAsset.maintenanceId} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Bakım Varlık Adı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.maintenanceTitle} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Üretici</label>
                <input type="text" className="modern-form-control" value={selectedAsset.producerName} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Model</label>
                <input type="text" className="modern-form-control" value={selectedAsset.producerModel} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Seri Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.producerSerialNumber} readOnly disabled />
              </div>
            </div>
          </div>
        )}

        {/* BÖLÜM 3: IFRS Muhasebe Bilgileri (Readonly - Otomatik) */}
        {selectedAsset && (
          <div className="modern-card">
            <div className="card-header">IFRS Muhasebe Bilgileri (Otomatik - SAP'ten gelen bilgiler)</div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Amortisman Anahtarı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.ifrsDepreciationKey} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Faydalı Ömür (Yıl)</label>
                <input type="text" className="modern-form-control" value={selectedAsset.ifrsUsefulLife} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Aktifleştirme Tarihi</label>
                <input type="text" className="modern-form-control" value={selectedAsset.ifrsCapitalizationDate} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Para Birimi</label>
                <input type="text" className="modern-form-control" value={selectedAsset.ifrsCurrency} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Cari Maliyet Fiyatı (APC)</label>
                <input type="text" className="modern-form-control" value={`${selectedAsset.ifrsCurrentAPC.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${selectedAsset.ifrsCurrency}`} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Birikmiş Amortisman</label>
                <input type="text" className="modern-form-control" value={`${selectedAsset.ifrsAccumulatedDepreciation.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${selectedAsset.ifrsCurrency}`} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">IFRS Cari Defter Değeri</label>
                <input type="text" className="modern-form-control" value={`${selectedAsset.ifrsCurrentBookingValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${selectedAsset.ifrsCurrency}`} readOnly disabled style={{ fontWeight: 600, backgroundColor: '#f0fdf4' }} />
              </div>
            </div>
          </div>
        )}

        {/* BÖLÜM 4: Yerel Muhasebe Bilgileri (Readonly - Otomatik) */}
        {selectedAsset && (
          <div className="modern-card">
            <div className="card-header">Yerel Muhasebe Bilgileri (Otomatik - SAP'ten gelen bilgiler)</div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">Yerel Amortisman Anahtarı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.localDepreciationKey} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Yerel Faydalı Ömür (Yıl)</label>
                <input type="text" className="modern-form-control" value={selectedAsset.localUsefulLife} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Yerel Para Birimi</label>
                <input type="text" className="modern-form-control" value={selectedAsset.localCurrency} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Yerel Cari APC</label>
                <input type="text" className="modern-form-control" value={`${selectedAsset.localCurrentAPC.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${selectedAsset.localCurrency}`} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Yerel Birikmiş Amortisman</label>
                <input type="text" className="modern-form-control" value={`${selectedAsset.localAccumulatedDepreciation.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${selectedAsset.localCurrency}`} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Yerel Cari Defter Değeri</label>
                <input type="text" className="modern-form-control" value={`${selectedAsset.localCurrentBookingValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${selectedAsset.localCurrency}`} readOnly disabled style={{ fontWeight: 600, backgroundColor: '#f0fdf4' }} />
              </div>
            </div>
          </div>
        )}

        {/* BÖLÜM 5: Hurda İşlem Bilgileri (Editable - Zorunlu) */}
        <div className="modern-card">
          <div className="card-header">Hurda İşlem Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Hurda Yöntemi <span style={{ color: 'var(--primary)' }}>*</span></label>
              <select
                className="modern-form-control"
                value={formData.retiringMethodId}
                onChange={(e) => handleChange('retiringMethodId', e.target.value)}
                disabled={isEditMode}
              >
                <option value="">Seçiniz...</option>
                {retiringMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.label} ({method.name})
                  </option>
                ))}
              </select>
              {errors.retiringMethodId && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.retiringMethodId}</span>}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Maliyet Merkezi <span style={{ color: 'var(--primary)' }}>*</span></label>
              <select
                className="modern-form-control"
                value={formData.costCenterId}
                onChange={(e) => handleChange('costCenterId', e.target.value)}
              >
                <option value="">Seçiniz...</option>
                {mockCostCenters.map(cc => (
                  <option key={cc.id} value={cc.id}>
                    [{cc.code}] {cc.name}
                  </option>
                ))}
              </select>
              {errors.costCenterId && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.costCenterId}</span>}
            </div>

            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Hurda Nedeni <span style={{ color: 'var(--primary)' }}>*</span>
                <span style={{ color: characterColor, fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                  ({characterCount} karakter - minimum 10)
                </span>
              </label>
              <textarea
                className="modern-form-control"
                value={formData.retirementReason}
                onChange={(e) => handleChange('retirementReason', e.target.value)}
                placeholder="Varlığın neden hurdaya ayrıldığını detaylı olarak açıklayın (minimum 10 karakter)"
                rows={4}
              />
              {errors.retirementReason && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.retirementReason}</span>}
            </div>
          </div>
        </div>

        {/* BÖLÜM 6: Satış Bilgileri (Conditional - Sadece Selling yöntemi için zorunlu) */}
        {requiresSaleInfo && (
          <div className="modern-card" style={{ border: '2px solid #fbbf24', backgroundColor: '#fffbeb' }}>
            <div className="card-header" style={{ borderBottom: '1px solid #fcd34d' }}>
              <span>Satış Bilgileri</span>
              <span style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 600 }}>Satış yöntemi için zorunlu alanlar</span>
            </div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">Satış Fiyatı <span style={{ color: 'var(--primary)' }}>*</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="modern-form-control"
                  value={formData.salePrice}
                  onChange={(e) => handleChange('salePrice', e.target.value)}
                  placeholder="0.00"
                />
                {errors.salePrice && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.salePrice}</span>}
              </div>

              <div className="modern-form-group">
                <label className="modern-form-label">Para Birimi <span style={{ color: 'var(--primary)' }}>*</span></label>
                <select
                  className="modern-form-control"
                  value={formData.saleCurrency}
                  onChange={(e) => handleChange('saleCurrency', e.target.value)}
                >
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - Dolar</option>
                  <option value="TRY">TRY - Türk Lirası</option>
                </select>
              </div>

              <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="modern-form-label">Fatura Formu / Referansı <span style={{ color: 'var(--primary)' }}>*</span></label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={formData.invoiceForm}
                  onChange={(e) => handleChange('invoiceForm', e.target.value)}
                  placeholder="Fatura numarası veya referans kodu"
                />
                {errors.invoiceForm && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.invoiceForm}</span>}
              </div>
            </div>
          </div>
        )}

        {/* BÖLÜM 7: Ek Notlar */}
        <div className="modern-card">
          <div className="card-header">Ek Bilgiler (Opsiyonel)</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Ek Notlar</label>
              <textarea
                className="modern-form-control"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Hurda işlemi hakkında ek açıklamalar (opsiyonel)"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="button" className="modern-btn modern-btn-secondary" onClick={() => navigate('/retirements')} disabled={submitting}>
            İptal
          </button>
          <button type="submit" className="modern-btn modern-btn-primary" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : isEditMode ? 'Güncelle' : 'Hurda İşlemi Başlat'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default RetirementForm;
