import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Alert, Collapse } from '@mui/material';
import { useSnackbar } from 'notistack';
import { debounce } from 'lodash';
import { allAssets } from '../../data/mockData';

// Mock veri yapıları
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
  subUnits2?: LocationSubUnit2[];
}

interface LocationSubUnit2 {
  id: number;
  code: string;
  name: string;
}

interface CurrentUser {
  userId: string;
  name: string;
  surname: string;
  department: string;
}

// Mock lokasyonlar
const mockLocations: Location[] = [
  {
    id: 1,
    code: 'LOC-FAB1',
    name: 'Fabrika 1 - Ana Üretim',
    subUnits: [
      {
        id: 1,
        code: 'SUB1-PRES',
        name: 'Pres Bölümü',
        subUnits2: [
          { id: 1, code: 'SUB2-A', name: 'Alan A' },
          { id: 2, code: 'SUB2-B', name: 'Alan B' },
        ],
      },
      { id: 2, code: 'SUB1-CNC', name: 'CNC Bölümü', subUnits2: [] },
    ],
  },
  {
    id: 2,
    code: 'LOC-FAB2',
    name: 'Fabrika 2 - Montaj',
    subUnits: [
      { id: 3, code: 'SUB1-MONT', name: 'Montaj Hattı', subUnits2: [] },
      { id: 4, code: 'SUB1-TEST', name: 'Test Alanı', subUnits2: [] },
    ],
  },
];

const mockCurrentUser: CurrentUser = {
  userId: 'USR-3001',
  name: 'Ayşe',
  surname: 'Kara',
  department: 'Bakım Yönetimi',
};

interface FormData {
  maintenanceId: string;
  maintenanceTitle: string;
  assetDescription: string;
  assetType: string;
  assetStatus: string;
  locationId: string;
  locationSubUnit1Id: string;
  locationSubUnit2Id: string;
  producerName: string;
  producerModel: string;
  producerSerialNumber: string;
  assignedUserId: string;
  assignedWorkstationId: string;
  purchasingOrderNumber: string;
  calibrationRequired: boolean;
  lastCalibrationDate: string;
  calibrationDoneBy: string;
  calibrationEnteredBy: string;
  acquisitionMethod: string;
  relevancyReviewed: boolean;
}

const AssetForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<FormData>({
    maintenanceId: '',
    maintenanceTitle: '',
    assetDescription: '',
    assetType: '',
    assetStatus: 'A',
    locationId: '',
    locationSubUnit1Id: '',
    locationSubUnit2Id: '',
    producerName: '',
    producerModel: '',
    producerSerialNumber: '',
    assignedUserId: '',
    assignedWorkstationId: '',
    purchasingOrderNumber: '',
    calibrationRequired: false,
    lastCalibrationDate: '',
    calibrationDoneBy: '',
    calibrationEnteredBy: '',
    acquisitionMethod: 'P',
    relevancyReviewed: false,
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedSubUnit1, setSelectedSubUnit1] = useState<LocationSubUnit | null>(null);
  const [maintenanceIdValid, setMaintenanceIdValid] = useState<boolean | null>(null);
  const [checkingId, setCheckingId] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSAPInfo] = useState(false); // SAP integration placeholder

  const isEditMode = Boolean(id && id !== 'new');
  const current = isEditMode && id ? allAssets.find(a => a.id === parseInt(id)) : null;

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && current) {
      setFormData({
        maintenanceId: current.maintenanceId || 'MAE-EDIT-001',
        maintenanceTitle: current.title || 'Editable Asset Title',
        assetDescription: `Asset Description for ${current.title}. This is a comprehensive description that provides detailed information about the asset and its purpose.`,
        assetType: 'MACHINERY',
        assetStatus: current.status === 'ACTIVE' ? 'A' : current.status === 'MAINTENANCE' ? 'I' : 'A',
        locationId: '1',
        locationSubUnit1Id: '1',
        locationSubUnit2Id: '1',
        producerName: current.manufacturer || 'Manufacturer Name',
        producerModel: current.model || 'Model Number',
        producerSerialNumber: current.serialNumber || 'SN-000000000',
        assignedUserId: 'USR-3001',
        assignedWorkstationId: 'WS-001',
        purchasingOrderNumber: 'PO-2024-0001',
        calibrationRequired: true,
        lastCalibrationDate: '2024-10-01',
        calibrationDoneBy: 'Calibration Service Inc.',
        calibrationEnteredBy: 'John Doe',
        acquisitionMethod: 'P',
        relevancyReviewed: true,
      });

      // Set selected location
      const location = mockLocations.find((l) => l.id === 1);
      if (location) {
        setSelectedLocation(location);
        const subUnit1 = location.subUnits.find((s) => s.id === 1);
        if (subUnit1) {
          setSelectedSubUnit1(subUnit1);
        }
      }

      setMaintenanceIdValid(true);
    }
  }, [isEditMode, current]);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Maintenance ID uniqueness check (debounced)
  const checkMaintenanceIdUniqueness = useCallback(
    debounce(async (id: string) => {
      if (!id || id.length < 4) {
        setMaintenanceIdValid(null);
        return;
      }

      setCheckingId(true);
      try {
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Mock: ID'ler 10000-10010 arası kullanılmış kabul edelim
        const usedIds = ['10000', '10001', '10002', '10003', '10004'];
        const isUnique = !usedIds.includes(id);
        setMaintenanceIdValid(isUnique);

        if (!isUnique) {
          setErrors((prev) => ({ ...prev, maintenanceId: 'Bu Bakım ID zaten kullanılmaktadır' }));
        }
      } catch (error) {
        setMaintenanceIdValid(null);
      } finally {
        setCheckingId(false);
      }
    }, 500),
    []
  );

  const handleMaintenanceIdChange = (value: string) => {
    handleChange('maintenanceId', value);
    setMaintenanceIdValid(null);
    checkMaintenanceIdUniqueness(value);
  };

  const handleLocationChange = (locationId: string) => {
    const location = mockLocations.find((l) => l.id === parseInt(locationId));
    setSelectedLocation(location || null);
    setSelectedSubUnit1(null);
    setFormData((prev) => ({ ...prev, locationId, locationSubUnit1Id: '', locationSubUnit2Id: '' }));
  };

  const handleSubUnit1Change = (subUnitId: string) => {
    const subUnit = selectedLocation?.subUnits.find((s) => s.id === parseInt(subUnitId));
    setSelectedSubUnit1(subUnit || null);
    setFormData((prev) => ({ ...prev, locationSubUnit1Id: subUnitId, locationSubUnit2Id: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.maintenanceId.trim()) {
      newErrors.maintenanceId = 'Bakım ID zorunludur';
    } else if (maintenanceIdValid === false) {
      newErrors.maintenanceId = 'Bu Bakım ID zaten kullanılmaktadır';
    }

    if (!formData.maintenanceTitle.trim()) {
      newErrors.maintenanceTitle = 'Bakım Başlığı zorunludur';
    } else if (formData.maintenanceTitle.length > 128) {
      newErrors.maintenanceTitle = 'Bakım Başlığı en fazla 128 karakter olabilir';
    }

    if (!formData.assetStatus) {
      newErrors.assetStatus = 'Varlık Durumu zorunludur';
    }

    if (!formData.locationId) {
      newErrors.locationId = 'Lokasyon zorunludur';
    }

    if (formData.assetDescription && formData.assetDescription.length > 512) {
      newErrors.assetDescription = 'Açıklama en fazla 512 karakter olabilir';
    }

    if (formData.producerName && formData.producerName.length > 32) {
      newErrors.producerName = 'Üretici adı en fazla 32 karakter olabilir';
    }

    if (formData.producerModel && formData.producerModel.length > 64) {
      newErrors.producerModel = 'Model adı en fazla 64 karakter olabilir';
    }

    if (formData.producerSerialNumber && formData.producerSerialNumber.length > 32) {
      newErrors.producerSerialNumber = 'Seri numarası en fazla 32 karakter olabilir';
    }

    if (formData.assignedWorkstationId && formData.assignedWorkstationId.length > 8) {
      newErrors.assignedWorkstationId = 'İş istasyonu ID en fazla 8 karakter olabilir';
    }

    if (formData.calibrationRequired && !formData.lastCalibrationDate) {
      newErrors.lastCalibrationDate = 'Kalibrasyon gerekli olarak işaretlendiğinde son kalibrasyon tarihi zorunludur';
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

    if (checkingId) {
      enqueueSnackbar('Bakım ID kontrolü devam ediyor, lütfen bekleyin', { variant: 'info' });
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      enqueueSnackbar('Varlık başarıyla oluşturuldu', { variant: 'success' });
      navigate('/assets');
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

  const titleCharCount = formData.maintenanceTitle.length;
  const descCharCount = formData.assetDescription.length;

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Varlık Girişi</h1>
          <p className="page-subtitle">
            <a
              href="/assets"
              onClick={(e) => {
                e.preventDefault();
                navigate('/assets');
              }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Geri Dön
            </a>
          </p>
        </div>
      </div>

      <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
        <strong>ÖNEMLİ:</strong> Bakım ID benzersiz olmalıdır. Sistem otomatik olarak kontrol edecektir.
      </Alert>

      <form onSubmit={handleSubmit}>
        {/* Bölüm 1: Temel Bilgiler */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">1. Temel Bilgiler</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">
                Bakım ID <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.maintenanceId}
                onChange={(e) => handleMaintenanceIdChange(e.target.value)}
                placeholder="Benzersiz bakım numarası"
                style={{
                  borderColor:
                    maintenanceIdValid === true
                      ? '#22c55e'
                      : maintenanceIdValid === false
                      ? 'var(--primary)'
                      : undefined,
                }}
              />
              {checkingId && <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Kontrol ediliyor...</span>}
              {maintenanceIdValid === true && (
                <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>✓ Kullanılabilir</span>
              )}
              {errors.maintenanceId && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.maintenanceId}</span>
              )}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">
                Bakım Başlığı <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.maintenanceTitle}
                onChange={(e) => handleChange('maintenanceTitle', e.target.value)}
                placeholder="Varlık başlığı"
                maxLength={128}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                {titleCharCount} / 128
              </div>
              {errors.maintenanceTitle && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.maintenanceTitle}</span>
              )}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Varlık Tipi (Opsiyonel)</label>
              <select
                className="modern-form-control"
                value={formData.assetType}
                onChange={(e) => handleChange('assetType', e.target.value)}
              >
                <option value="">-- Seçiniz --</option>
                <option value="MACHINERY">Makine</option>
                <option value="VEHICLE">Araç</option>
                <option value="TOOL">Alet</option>
                <option value="IT_EQUIPMENT">BT Ekipmanı</option>
                <option value="OTHER">Diğer</option>
              </select>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">
                Varlık Durumu <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.assetStatus}
                onChange={(e) => handleChange('assetStatus', e.target.value)}
              >
                <option value="A">Aktif</option>
                <option value="I">Pasif</option>
                <option value="S">Hurda</option>
              </select>
            </div>

            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Açıklama</label>
              <textarea
                className="modern-form-control"
                value={formData.assetDescription}
                onChange={(e) => handleChange('assetDescription', e.target.value)}
                placeholder="Detaylı açıklama (max 512 karakter)"
                rows={3}
                maxLength={512}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                {descCharCount} / 512
              </div>
            </div>
          </div>
        </div>

        {/* Bölüm 2: SAP Entegrasyonu (Placeholder) */}
        <Collapse in={showSAPInfo}>
          <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#f0f9ff' }}>
            <div className="card-header" style={{ backgroundColor: '#bae6fd', color: '#0c4a6e' }}>
              2. SAP Bilgileri (Readonly - SAP Entegrasyonu)
            </div>
            <div style={{ padding: '1rem', fontSize: '0.875rem', color: '#0c4a6e' }}>
              SAP entegre olduğunda bu alanlar otomatik doldurulacaktır.
            </div>
          </div>
        </Collapse>

        {/* Bölüm 3: Lokasyon */}
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
              >
                <option value="">-- Lokasyon Seçiniz --</option>
                {mockLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.code} - {loc.name}
                  </option>
                ))}
              </select>
              {errors.locationId && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.locationId}</span>
              )}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Lokasyon 1</label>
              <select
                className="modern-form-control"
                value={formData.locationSubUnit1Id}
                onChange={(e) => handleSubUnit1Change(e.target.value)}
                disabled={!selectedLocation}
              >
                <option value="">-- Alt Lokasyon Seçiniz --</option>
                {selectedLocation?.subUnits.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.code} - {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Lokasyon 2</label>
              <select
                className="modern-form-control"
                value={formData.locationSubUnit2Id}
                onChange={(e) => handleChange('locationSubUnit2Id', e.target.value)}
                disabled={!selectedSubUnit1 || !selectedSubUnit1.subUnits2?.length}
              >
                <option value="">-- Alt Lokasyon 2 Seçiniz --</option>
                {selectedSubUnit1?.subUnits2?.map((sub2) => (
                  <option key={sub2.id} value={sub2.id}>
                    {sub2.code} - {sub2.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bölüm 4: Üretici Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">4. Üretici Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Üretici Adı</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.producerName}
                onChange={(e) => handleChange('producerName', e.target.value)}
                placeholder="Üretici firma (max 32 karakter)"
                maxLength={32}
              />
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">Model</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.producerModel}
                onChange={(e) => handleChange('producerModel', e.target.value)}
                placeholder="Model adı (max 64 karakter)"
                maxLength={64}
              />
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">Seri Numarası</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.producerSerialNumber}
                onChange={(e) => handleChange('producerSerialNumber', e.target.value)}
                placeholder="Seri no (max 32 karakter)"
                maxLength={32}
              />
            </div>
          </div>
        </div>

        {/* Bölüm 5: Atama Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">5. Atama Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Atanan Kullanıcı</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.assignedUserId}
                onChange={(e) => handleChange('assignedUserId', e.target.value)}
                placeholder="Kullanıcı ID veya ara"
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                Varlığın atandığı kullanıcı
              </div>
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">İş İstasyonu ID</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.assignedWorkstationId}
                onChange={(e) => handleChange('assignedWorkstationId', e.target.value)}
                placeholder="İstasyon ID (max 8 karakter)"
                maxLength={8}
              />
            </div>
            <div className="modern-form-group">
              <label className="modern-form-label">Satın Alma Sipariş No</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.purchasingOrderNumber}
                onChange={(e) => handleChange('purchasingOrderNumber', e.target.value)}
                placeholder="PO numarası"
              />
            </div>
          </div>
        </div>

        {/* Bölüm 6: Kalibrasyon */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">6. Kalibrasyon</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.calibrationRequired}
                  onChange={(e) => handleChange('calibrationRequired', e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                <span>Kalibrasyon Gerekli</span>
              </label>
            </div>

            {formData.calibrationRequired && (
              <>
                <div className="modern-form-group">
                  <label className="modern-form-label">
                    Son Kalibrasyon Tarihi <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <input
                    type="date"
                    className="modern-form-control"
                    value={formData.lastCalibrationDate}
                    onChange={(e) => handleChange('lastCalibrationDate', e.target.value)}
                  />
                  {errors.lastCalibrationDate && (
                    <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.lastCalibrationDate}</span>
                  )}
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Kalibrasyon Yapan</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={formData.calibrationDoneBy}
                    onChange={(e) => handleChange('calibrationDoneBy', e.target.value)}
                    placeholder="Kalibrasyon yapan kişi/kurum"
                  />
                </div>
                <div className="modern-form-group">
                  <label className="modern-form-label">Kalibrasyon Kaydeden</label>
                  <input
                    type="text"
                    className="modern-form-control"
                    value={formData.calibrationEnteredBy}
                    onChange={(e) => handleChange('calibrationEnteredBy', e.target.value)}
                    placeholder="Sisteme kaydeden kullanıcı"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bölüm 7: Edinme Yöntemi ve İnceleme */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">7. Edinme Yöntemi ve İnceleme</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Edinme Yöntemi</label>
              <select
                className="modern-form-control"
                value={formData.acquisitionMethod}
                onChange={(e) => handleChange('acquisitionMethod', e.target.value)}
              >
                <option value="P">Satın Alma (Purchasing)</option>
                <option value="U">Tanımlanamayan Varlık (Unidentified)</option>
                <option value="O">Diğer (Other)</option>
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                Varsayılan: Satın Alma
              </div>
            </div>
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.relevancyReviewed}
                  onChange={(e) => handleChange('relevancyReviewed', e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                <span>Bakım İlgililik İncelemesi Yapıldı</span>
              </label>
              <div style={{ fontSize: '0.75rem', color: '#92400e', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.25rem' }}>
                <strong>Not:</strong> Bu alan sadece Maintenance Key User tarafından işaretlenebilir. Varlığın bakıma ilgili olup olmadığının incelendiğini gösterir.
              </div>
            </div>
          </div>
        </div>

        {/* Bölüm 8: Oluşturan Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#fef3c7' }}>
          <div className="card-header" style={{ backgroundColor: '#fde68a', color: '#78350f' }}>
            8. Oluşturan Bilgileri
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
          </div>
        </div>

        {/* Form Butonları */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            type="button"
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate('/assets')}
            disabled={submitting}
          >
            İptal
          </button>
          <button type="submit" className="modern-btn modern-btn-primary" disabled={submitting || checkingId}>
            {submitting ? 'Oluşturuluyor...' : 'Varlık Oluştur'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AssetForm;
