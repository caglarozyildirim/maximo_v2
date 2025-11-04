import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Alert, Chip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { allIncidents } from '../../data/mockData';

// Mock veri yapıları
interface SAPAsset {
  id: number;
  sapNumber: string;
  sapTitle: string;
  description: string;
}

interface MaintenanceAsset {
  id: number;
  maintenanceNumber: string;
  maintenanceTitle: string;
  description: string;
}

interface Location {
  id: number;
  code: string;
  name: string;
  subUnits: LocationSubUnit[];
}

interface LocationSubUnit {
  id: number;
  code: string;
  name: string;
}

interface CurrentUser {
  userId: string;
  name: string;
  surname: string;
  department: string;
  email: string;
}

// Mock SAP varlıkları
const mockSAPAssets: SAPAsset[] = [
  {
    id: 1,
    sapNumber: 'SAP-1000234',
    sapTitle: 'Dell Precision 5560 Workstation',
    description: 'İş istasyonu bilgisayar - Yazılım geliştirme',
  },
  {
    id: 2,
    sapNumber: 'SAP-1000567',
    sapTitle: 'HP LaserJet Enterprise M507',
    description: 'Lazer yazıcı - Muhasebe departmanı',
  },
  {
    id: 3,
    sapNumber: 'SAP-1000890',
    sapTitle: 'Siemens S7-1500 PLC',
    description: 'Programlanabilir kontrol cihazı - Üretim hattı 3',
  },
];

// Mock bakım varlıkları
const mockMaintenanceAssets: MaintenanceAsset[] = [
  {
    id: 1,
    maintenanceNumber: 'MAE-2024-001',
    maintenanceTitle: 'Kompresör Ünitesi A1',
    description: 'Ana hat hava kompresörü',
  },
  {
    id: 2,
    maintenanceNumber: 'MAE-2024-045',
    maintenanceTitle: 'Konveyör Bant Sistemi B3',
    description: 'Paketleme hattı konveyör',
  },
  {
    id: 3,
    maintenanceNumber: 'MAE-2024-078',
    maintenanceTitle: 'Klima Santrali K12',
    description: 'Üretim alanı klima sistemi',
  },
];

// Mock lokasyonlar
const mockLocations: Location[] = [
  {
    id: 1,
    code: 'LOC-FAB1',
    name: 'Fabrika 1 - Ana Üretim',
    subUnits: [
      { id: 1, code: 'SUB-FAB1-HAT1', name: 'Üretim Hattı 1' },
      { id: 2, code: 'SUB-FAB1-HAT2', name: 'Üretim Hattı 2' },
      { id: 3, code: 'SUB-FAB1-DEPO', name: 'Depo Alanı' },
    ],
  },
  {
    id: 2,
    code: 'LOC-FAB2',
    name: 'Fabrika 2 - Montaj',
    subUnits: [
      { id: 4, code: 'SUB-FAB2-MONT1', name: 'Montaj Hattı 1' },
      { id: 5, code: 'SUB-FAB2-MONT2', name: 'Montaj Hattı 2' },
      { id: 6, code: 'SUB-FAB2-TEST', name: 'Test Alanı' },
    ],
  },
  {
    id: 3,
    code: 'LOC-OFIS',
    name: 'İdari Bina',
    subUnits: [
      { id: 7, code: 'SUB-OFIS-YON', name: 'Yönetim Katı' },
      { id: 8, code: 'SUB-OFIS-MUH', name: 'Muhasebe' },
      { id: 9, code: 'SUB-OFIS-IT', name: 'IT Departmanı' },
    ],
  },
];

// Mock mevcut kullanıcı
const mockCurrentUser: CurrentUser = {
  userId: 'USR-1001',
  name: 'Ahmet',
  surname: 'Yılmaz',
  department: 'Üretim Planlama',
  email: 'ahmet.yilmaz@company.com',
};

interface FormData {
  title: string;
  description: string;
  assetType: 'sap' | 'maintenance' | '';
  sapAssetId: string;
  maintenanceAssetId: string;
  locationId: string;
  subLocationId: string;
}

const IncidentForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    assetType: '',
    sapAssetId: '',
    maintenanceAssetId: '',
    locationId: '',
    subLocationId: '',
  });

  const [selectedSAPAsset, setSelectedSAPAsset] = useState<SAPAsset | null>(null);
  const [selectedMaintenanceAsset, setSelectedMaintenanceAsset] = useState<MaintenanceAsset | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedSubLocation, setSelectedSubLocation] = useState<LocationSubUnit | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(id && id !== 'new');
  const current = isEditMode && id ? allIncidents.find(i => i.id === parseInt(id)) : null;

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && current) {
      const sapAsset = mockSAPAssets[0]; // Use first SAP asset as default
      const location = mockLocations[0]; // Use first location as default

      setFormData({
        title: current.title || 'Incident Report - Equipment Malfunction',
        description: current.description || 'Detailed description of the incident. The equipment showed signs of malfunction during operation. Immediate attention is required to prevent further issues and ensure safety.',
        assetType: 'sap',
        sapAssetId: '1',
        maintenanceAssetId: '',
        locationId: '1',
        subLocationId: '1',
      });

      setSelectedSAPAsset(sapAsset);
      setSelectedMaintenanceAsset(null);
      setSelectedLocation(location);

      const subLocation = location.subUnits.find((s) => s.id === 1);
      if (subLocation) {
        setSelectedSubLocation(subLocation);
      }
    }
  }, [isEditMode, current]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAssetTypeChange = (type: 'sap' | 'maintenance' | '') => {
    setFormData((prev) => ({
      ...prev,
      assetType: type,
      sapAssetId: '',
      maintenanceAssetId: '',
    }));
    setSelectedSAPAsset(null);
    setSelectedMaintenanceAsset(null);
    if (errors.assetType) {
      setErrors((prev) => ({ ...prev, assetType: undefined }));
    }
  };

  const handleSAPAssetChange = (assetId: string) => {
    const asset = mockSAPAssets.find((a) => a.id === parseInt(assetId));
    if (asset) {
      setSelectedSAPAsset(asset);
      handleChange('sapAssetId', assetId);
    } else {
      setSelectedSAPAsset(null);
    }
  };

  const handleMaintenanceAssetChange = (assetId: string) => {
    const asset = mockMaintenanceAssets.find((a) => a.id === parseInt(assetId));
    if (asset) {
      setSelectedMaintenanceAsset(asset);
      handleChange('maintenanceAssetId', assetId);
    } else {
      setSelectedMaintenanceAsset(null);
    }
  };

  const handleLocationChange = (locationId: string) => {
    const location = mockLocations.find((l) => l.id === parseInt(locationId));
    if (location) {
      setSelectedLocation(location);
      handleChange('locationId', locationId);
      // Alt lokasyon sıfırla
      setFormData((prev) => ({ ...prev, subLocationId: '' }));
      setSelectedSubLocation(null);
    } else {
      setSelectedLocation(null);
      setSelectedSubLocation(null);
    }
  };

  const handleSubLocationChange = (subLocationId: string) => {
    const subLocation = selectedLocation?.subUnits.find((s) => s.id === parseInt(subLocationId));
    if (subLocation) {
      setSelectedSubLocation(subLocation);
      handleChange('subLocationId', subLocationId);
    } else {
      setSelectedSubLocation(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Başlık validasyonu
    if (!formData.title.trim()) {
      newErrors.title = 'Arıza başlığı zorunludur';
    } else if (formData.title.length > 128) {
      newErrors.title = 'Arıza başlığı en fazla 128 karakter olabilir';
    }

    // Açıklama validasyonu
    if (!formData.description.trim()) {
      newErrors.description = 'Arıza açıklaması zorunludur';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Arıza açıklaması en az 10 karakter olmalıdır';
    } else if (formData.description.length > 400) {
      newErrors.description = 'Arıza açıklaması en fazla 400 karakter olabilir';
    }

    // Varlık validasyonu - SAP VEYA Bakım varlığı seçilmeli
    if (!formData.assetType) {
      newErrors.assetType = 'Varlık tipi seçilmelidir (SAP veya Bakım)';
    } else if (formData.assetType === 'sap' && !formData.sapAssetId) {
      newErrors.sapAssetId = 'SAP varlığı seçilmelidir';
    } else if (formData.assetType === 'maintenance' && !formData.maintenanceAssetId) {
      newErrors.maintenanceAssetId = 'Bakım varlığı seçilmelidir';
    }

    // Lokasyon validasyonu
    if (!formData.locationId) {
      newErrors.locationId = 'Lokasyon seçilmelidir';
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
      enqueueSnackbar('Arıza bildirimi başarıyla oluşturuldu ve bakım ekibine iletildi', { variant: 'success' });
      navigate('/incidents');
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

  const titleCharCount = formData.title.length;
  const descCharCount = formData.description.length;

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Arıza Bildirimi</h1>
          <p className="page-subtitle">
            <a
              href="/incidents"
              onClick={(e) => {
                e.preventDefault();
                navigate('/incidents');
              }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Geri Dön
            </a>
          </p>
        </div>
      </div>

      {/* İş Akışı Bilgilendirmesi */}
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        <strong>11 Aşamalı İş Akışı:</strong>
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          1. Arıza Oluştur → 2. Bakıma Teslim Et → 3. Çözüm Sorumlusu Ata → 4. Dış Kaynağa Gönder (Opsiyonel) →
          5. Gecikme Nedeni Gir (Opsiyonel) → 6. Çözüm Girişi → 7. Malzeme Girişi (Opsiyonel) → 8. SL-TL Onayı →
          9. Talep Eden Onayı → 10. Red İşlemleri → 11. Nihai Onay
        </div>
      </Alert>

      <form onSubmit={handleSubmit}>
        {/* Bölüm 1: Arıza Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">1. Arıza Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Arıza Başlığı <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Arıza başlığını kısaca özetleyin"
                maxLength={128}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                <span style={{ color: errors.title ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {errors.title || 'Kısa ve açıklayıcı bir başlık girin'}
                </span>
                <span style={{ color: titleCharCount > 128 ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {titleCharCount} / 128
                </span>
              </div>
            </div>

            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Arıza Açıklaması <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                className="modern-form-control"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Arızayı detaylı şekilde açıklayın (min 10, max 400 karakter)"
                rows={5}
                maxLength={400}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                <span style={{ color: errors.description ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {errors.description || 'En az 10 karakter gerekli'}
                </span>
                <span
                  style={{
                    color:
                      descCharCount < 10 ? 'var(--primary)' : descCharCount > 400 ? 'var(--primary)' : 'var(--gray-500)',
                  }}
                >
                  {descCharCount} / 400
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bölüm 2: Varlık Seçimi */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">2. Varlık Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Varlık Tipi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="assetType"
                    value="sap"
                    checked={formData.assetType === 'sap'}
                    onChange={() => handleAssetTypeChange('sap')}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: '0.95rem' }}>SAP Varlığı</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="assetType"
                    value="maintenance"
                    checked={formData.assetType === 'maintenance'}
                    onChange={() => handleAssetTypeChange('maintenance')}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: '0.95rem' }}>Bakım Varlığı</span>
                </label>
              </div>
              {errors.assetType && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                  {errors.assetType}
                </span>
              )}
            </div>

            {/* SAP Varlık Seçimi */}
            {formData.assetType === 'sap' && (
              <>
                <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="modern-form-label">
                    SAP Varlığı <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <select
                    className="modern-form-control"
                    value={formData.sapAssetId}
                    onChange={(e) => handleSAPAssetChange(e.target.value)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <option value="">-- SAP Varlığı Seçiniz --</option>
                    {mockSAPAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.sapNumber} - {asset.sapTitle}
                      </option>
                    ))}
                  </select>
                  {errors.sapAssetId && (
                    <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.sapAssetId}</span>
                  )}
                </div>

                {/* SAP Varlık Detayları */}
                {selectedSAPAsset && (
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      padding: '1rem',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '0.5rem',
                      border: '1px solid #bae6fd',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#0c4a6e', marginBottom: '0.5rem' }}>
                      SAP Varlık Detayları
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#0c4a6e' }}>
                      <strong>SAP No:</strong> {selectedSAPAsset.sapNumber}
                      <br />
                      <strong>Başlık:</strong> {selectedSAPAsset.sapTitle}
                      <br />
                      <strong>Açıklama:</strong> {selectedSAPAsset.description}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Bakım Varlık Seçimi */}
            {formData.assetType === 'maintenance' && (
              <>
                <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="modern-form-label">
                    Bakım Varlığı <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <select
                    className="modern-form-control"
                    value={formData.maintenanceAssetId}
                    onChange={(e) => handleMaintenanceAssetChange(e.target.value)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <option value="">-- Bakım Varlığı Seçiniz --</option>
                    {mockMaintenanceAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.maintenanceNumber} - {asset.maintenanceTitle}
                      </option>
                    ))}
                  </select>
                  {errors.maintenanceAssetId && (
                    <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.maintenanceAssetId}</span>
                  )}
                </div>

                {/* Bakım Varlık Detayları */}
                {selectedMaintenanceAsset && (
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      padding: '1rem',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#14532d', marginBottom: '0.5rem' }}>
                      Bakım Varlık Detayları
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#14532d' }}>
                      <strong>Bakım No:</strong> {selectedMaintenanceAsset.maintenanceNumber}
                      <br />
                      <strong>Başlık:</strong> {selectedMaintenanceAsset.maintenanceTitle}
                      <br />
                      <strong>Açıklama:</strong> {selectedMaintenanceAsset.description}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bölüm 3: Lokasyon Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">3. Lokasyon Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">
                Lokasyon <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.locationId}
                onChange={(e) => handleLocationChange(e.target.value)}
                style={{ fontSize: '0.95rem' }}
              >
                <option value="">-- Lokasyon Seçiniz --</option>
                {mockLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.code} - {location.name}
                  </option>
                ))}
              </select>
              {errors.locationId && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.locationId}</span>
              )}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Lokasyon (Opsiyonel)</label>
              <select
                className="modern-form-control"
                value={formData.subLocationId}
                onChange={(e) => handleSubLocationChange(e.target.value)}
                disabled={!selectedLocation}
                style={{ fontSize: '0.95rem' }}
              >
                <option value="">-- Alt Lokasyon Seçiniz --</option>
                {selectedLocation?.subUnits.map((subUnit) => (
                  <option key={subUnit.id} value={subUnit.id}>
                    {subUnit.code} - {subUnit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bölüm 4: Oluşturan Bilgileri (Readonly) */}
        <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#fef3c7' }}>
          <div className="card-header" style={{ backgroundColor: '#fde68a', color: '#78350f' }}>
            4. Oluşturan Bilgileri
          </div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Kullanıcı ID</label>
              <input
                type="text"
                className="modern-form-control"
                value={mockCurrentUser.userId}
                disabled
                style={{ backgroundColor: '#fef3c7', color: '#78350f', fontWeight: 600 }}
              />
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">Ad Soyad</label>
              <input
                type="text"
                className="modern-form-control"
                value={`${mockCurrentUser.name} ${mockCurrentUser.surname}`}
                disabled
                style={{ backgroundColor: '#fef3c7', color: '#78350f', fontWeight: 600 }}
              />
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">Departman</label>
              <input
                type="text"
                className="modern-form-control"
                value={mockCurrentUser.department}
                disabled
                style={{ backgroundColor: '#fef3c7', color: '#78350f', fontWeight: 600 }}
              />
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">E-posta</label>
              <input
                type="text"
                className="modern-form-control"
                value={mockCurrentUser.email}
                disabled
                style={{ backgroundColor: '#fef3c7', color: '#78350f', fontWeight: 600 }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#fffbeb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#78350f',
            }}
          >
            <strong>Not:</strong> Bu bilgiler otomatik olarak doldurulmuştur. Arıza oluşturulduğunda sistem tarafından
            kaydedilecektir.
          </div>
        </div>

        {/* İş Akışı Bilgisi */}
        <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#ede9fe' }}>
          <div className="card-header" style={{ backgroundColor: '#ddd6fe', color: '#4c1d95' }}>
            Sonraki Aşamalar
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#4c1d95', lineHeight: '1.8' }}>
              <strong>Arıza oluşturulduktan sonra:</strong>
              <ol style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Arıza, bakım ekibine otomatik olarak iletilecektir</li>
                <li>Bakım sorumlusu varlığı teslim alacaktır</li>
                <li>SL-TL (Bölüm Lideri) çözüm sorumlusu atayacaktır</li>
                <li>Çözüm sorumlusu arızayı giderecek ve çözüm bilgilerini girecektir</li>
                <li>
                  İki aşamalı onay süreci: <Chip label="SL-TL Onayı" size="small" sx={{ mx: 0.5 }} />
                  <Chip label="Talep Eden Onayı" size="small" sx={{ mx: 0.5 }} />
                </li>
                <li>Her aşamada yorum ekleyebilirsiniz</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Form Butonları */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            type="button"
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate('/incidents')}
            disabled={submitting}
          >
            İptal
          </button>
          <button type="submit" className="modern-btn modern-btn-primary" disabled={submitting}>
            {submitting ? 'Gönderiliyor...' : 'Arıza Bildir'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default IncidentForm;
