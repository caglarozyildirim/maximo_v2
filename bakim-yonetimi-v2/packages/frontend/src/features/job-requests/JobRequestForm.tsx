import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import '../../../styles/modern-form.css';

// ===========================
// MOCK DATA - Replace with actual API calls
// ===========================

const mockPriorities = [
  { code: 'URGENT', label: 'Acil - Üretim Durması', value: 1, color: '#d32f2f' },
  { code: 'HIGH', label: 'Yüksek - Üretim Yavaşlaması', value: 2, color: '#f57c00' },
  { code: 'NORMAL', label: 'Normal - Üretim Yavaşlama Olasılığı', value: 3, color: '#fbc02d' },
  { code: 'LOW', label: 'Düşük - Kısmi Verimlilik Kaybı veya Risk', value: 4, color: '#388e3c' },
];

const mockRequestReasons = [
  { code: 'OHS', label: 'İSG (İş Sağlığı ve Güvenliği)' },
  { code: 'ENERGY_SAVING', label: 'Enerji Tasarrufu' },
  { code: 'ENVIRONMENT', label: 'Çevre' },
  { code: 'PROCESS_IMPROVEMENT', label: 'Süreç İyileştirme' },
  { code: 'INVESTMENT', label: 'Yatırım' },
  { code: 'RENOVATION', label: 'Yenileme' },
];

const mockLocations = [
  {
    id: 1,
    code: 'FAC1',
    name: 'Fabrika 1',
    subUnits: [
      {
        id: 11,
        code: 'FAC1-A',
        name: 'A Blok',
        subUnits: [
          { id: 111, code: 'FAC1-A1', name: 'Kat 1' },
          { id: 112, code: 'FAC1-A2', name: 'Kat 2' },
        ],
      },
      {
        id: 12,
        code: 'FAC1-B',
        name: 'B Blok',
        subUnits: [
          { id: 121, code: 'FAC1-B1', name: 'Kat 1' },
          { id: 122, code: 'FAC1-B2', name: 'Kat 2' },
        ],
      },
    ],
  },
  {
    id: 2,
    code: 'FAC2',
    name: 'Fabrika 2',
    subUnits: [
      {
        id: 21,
        code: 'FAC2-A',
        name: 'Üretim Alanı',
        subUnits: [
          { id: 211, code: 'FAC2-A1', name: 'Hat 1' },
          { id: 212, code: 'FAC2-A2', name: 'Hat 2' },
        ],
      },
    ],
  },
  {
    id: 3,
    code: 'ADMIN',
    name: 'İdari Bina',
    subUnits: [
      {
        id: 31,
        code: 'ADMIN-1',
        name: '1. Kat',
        subUnits: [
          { id: 311, code: 'ADMIN-1A', name: 'Ofis A' },
          { id: 312, code: 'ADMIN-1B', name: 'Ofis B' },
        ],
      },
    ],
  },
];

const mockSAPAssets = [
  { id: 1, sapNumber: 10000001, title: 'Kompresör Ana Pompa - KP-001', costCenter: 'CC-100' },
  { id: 2, sapNumber: 10000002, title: 'CNC Torna Makinesi - TRN-45', costCenter: 'CC-200' },
  { id: 3, sapNumber: 10000003, title: 'Elektrik Panosu - EP-12A', costCenter: 'CC-150' },
];

const mockMaintenanceAssets = [
  { id: 1, maintenanceNumber: 20001, title: 'Havalandırma Sistemi - HVAC-01' },
  { id: 2, maintenanceNumber: 20002, title: 'Acil Durum Jeneratörü - GEN-02' },
  { id: 3, maintenanceNumber: 20003, title: 'Su Arıtma Tesisi - SAT-05' },
];

const mockDepartments = [
  { id: 1, code: 'PROD', name: 'Üretim' },
  { id: 2, code: 'MAINT', name: 'Bakım Onarım' },
  { id: 3, code: 'QC', name: 'Kalite Kontrol' },
  { id: 4, code: 'ENG', name: 'Mühendislik' },
];

const mockCostCenters = [
  { id: 1, code: 'CC-100', name: 'Üretim Hattı 1' },
  { id: 2, code: 'CC-150', name: 'Elektrik Bakım' },
  { id: 3, code: 'CC-200', name: 'Mekanik Atölye' },
];

const mockCurrentUser = {
  id: 101,
  name: 'Ahmet',
  surname: 'Yılmaz',
  department: 'Üretim',
  departmentId: 1,
};

// ===========================
// TYPES
// ===========================

interface FormData {
  // Basic Information (Required for Creation - Stage 1)
  title: string;
  description: string;
  priority: string;
  requestReason: string;

  // Location (Required)
  locationId: string;
  locationSubUnit1Id: string;
  locationSubUnit2Id: string;

  // Asset Information (Optional)
  assetType: 'sap' | 'maintenance' | '';
  assetId: string; // Unified asset ID (auto-populated from SAP or Maintenance asset)
  sapAssetId: string;
  maintenanceAssetId: string;

  // Department & Cost Center
  departmentId: string;
  costCenterId: string;

  // Document Management
  documentGroupId: string; // Auto-generated when documents are uploaded

  // Date Information
  expectedStartDate: string;
  expectedEndDate: string;

  // Cost Information (Stage 5 - Cost Calculation)
  estimatedCost: string;
  costCurrency: string;

  // Assignment (Auto-populated based on workflow)
  assignedTo: string;
  solutionResponsibleId: string;

  // Work Order & References
  workOrderNumber: string;
  externalReference: string;
  customerReference: string;

  // Creator Information (Auto-filled, readonly)
  requestedBy: number;
  requestedByName: string;
  requestDate: string;
}

// ===========================
// COMPONENT
// ===========================

export default function JobRequestForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: '',
    requestReason: '',
    locationId: '',
    locationSubUnit1Id: '',
    locationSubUnit2Id: '',
    assetType: '',
    assetId: '', // Auto-populated from asset selection
    sapAssetId: '',
    maintenanceAssetId: '',
    departmentId: mockCurrentUser.departmentId.toString(),
    costCenterId: '',
    documentGroupId: '', // Auto-generated by backend on document upload
    expectedStartDate: '',
    expectedEndDate: '',
    estimatedCost: '',
    costCurrency: 'TRY',
    assignedTo: '',
    solutionResponsibleId: '',
    workOrderNumber: '',
    externalReference: '',
    customerReference: '',
    requestedBy: mockCurrentUser.id,
    requestedByName: `${mockCurrentUser.name} ${mockCurrentUser.surname}`,
    requestDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Selection states for cascading dropdowns
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedSubUnit1, setSelectedSubUnit1] = useState<any>(null);
  const [selectedSAPAsset, setSelectedSAPAsset] = useState<any>(null);
  const [selectedMaintenanceAsset, setSelectedMaintenanceAsset] = useState<any>(null);
  const [selectedPriority, setSelectedPriority] = useState<any>(null);

  // ===========================
  // HANDLERS
  // ===========================

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleAssetTypeChange = (type: 'sap' | 'maintenance') => {
    setFormData((prev) => ({
      ...prev,
      assetType: type,
      assetId: '', // Clear unified asset ID
      sapAssetId: '',
      maintenanceAssetId: '',
    }));
    setSelectedSAPAsset(null);
    setSelectedMaintenanceAsset(null);
  };

  const handleSAPAssetChange = (assetId: string) => {
    const asset = mockSAPAssets.find((a) => a.id === parseInt(assetId));
    setSelectedSAPAsset(asset || null);
    setFormData((prev) => ({
      ...prev,
      sapAssetId: assetId,
      assetId: assetId, // Auto-populate unified asset ID
      costCenterId: asset ? mockCostCenters.find((cc) => cc.code === asset.costCenter)?.id.toString() || '' : '',
    }));
  };

  const handleMaintenanceAssetChange = (assetId: string) => {
    const asset = mockMaintenanceAssets.find((a) => a.id === parseInt(assetId));
    setSelectedMaintenanceAsset(asset || null);
    setFormData((prev) => ({
      ...prev,
      maintenanceAssetId: assetId,
      assetId: assetId, // Auto-populate unified asset ID
    }));
  };

  const handleLocationChange = (locationId: string) => {
    const location = mockLocations.find((l) => l.id === parseInt(locationId));
    setSelectedLocation(location || null);
    setSelectedSubUnit1(null);
    setFormData((prev) => ({
      ...prev,
      locationId,
      locationSubUnit1Id: '',
      locationSubUnit2Id: '',
    }));
  };

  const handleSubUnit1Change = (subUnitId: string) => {
    const subUnit = selectedLocation?.subUnits.find((s: any) => s.id === parseInt(subUnitId));
    setSelectedSubUnit1(subUnit || null);
    setFormData((prev) => ({
      ...prev,
      locationSubUnit1Id: subUnitId,
      locationSubUnit2Id: '',
    }));
  };

  const handlePriorityChange = (priorityCode: string) => {
    const priority = mockPriorities.find((p) => p.code === priorityCode);
    setSelectedPriority(priority || null);
    setFormData((prev) => ({ ...prev, priority: priorityCode }));
  };

  // ===========================
  // VALIDATION
  // ===========================

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields for Creation stage
    if (!formData.title.trim()) {
      newErrors.title = 'İş talebi başlığı zorunludur';
    } else if (formData.title.length > 128) {
      newErrors.title = 'Başlık en fazla 128 karakter olabilir';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Detaylı açıklama zorunludur';
    } else if (formData.description.length > 1024) {
      newErrors.description = 'Açıklama en fazla 1024 karakter olabilir';
    }

    if (!formData.priority) {
      newErrors.priority = 'Öncelik seviyesi seçilmelidir';
    }

    if (!formData.requestReason) {
      newErrors.requestReason = 'Talep nedeni seçilmelidir';
    }

    if (!formData.locationId) {
      newErrors.locationId = 'Ana lokasyon zorunludur';
    }

    // Date range validation
    if (formData.expectedStartDate && formData.expectedEndDate) {
      if (new Date(formData.expectedEndDate) < new Date(formData.expectedStartDate)) {
        newErrors.expectedEndDate = 'Bitiş tarihi başlangıç tarihinden önce olamaz';
      }
    }

    // Cost validation
    if (formData.estimatedCost) {
      const cost = parseFloat(formData.estimatedCost);
      if (isNaN(cost) || cost <= 0) {
        newErrors.estimatedCost = 'Tahmini maliyet pozitif bir sayı olmalıdır';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===========================
  // SUBMIT
  // ===========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      enqueueSnackbar('Lütfen zorunlu alanları doldurun', { variant: 'error' });
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Submitting Job Request:', formData);

      enqueueSnackbar('İş talebi başarıyla oluşturuldu', { variant: 'success' });
      navigate('/job-requests');
    } catch (error) {
      console.error('Failed to create job request:', error);
      enqueueSnackbar('İş talebi oluşturulurken hata oluştu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="modern-page-container">
      <div className="modern-page-header">
        <button className="back-button" onClick={() => navigate('/job-requests')}>
          <ArrowBack style={{ fontSize: '1.25rem' }} />
          <span>Geri Dön</span>
        </button>
        <div>
          <h1 className="modern-page-title">Yeni İş Talebi Oluştur</h1>
          <p className="modern-page-subtitle">
            İş talebi oluşturun ve onay sürecini başlatın
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Section 1: Basic Information */}
        <div className="modern-card">
          <div className="card-header">1. Temel Bilgiler</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                İş Talebi Başlığı <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className={`modern-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="İş talebini kısaca açıklayın (max 128 karakter)"
                maxLength={128}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                {errors.title ? (
                  <span className="error-message">{errors.title}</span>
                ) : (
                  <span className="helper-text">Örn: "CNC Torna Makinesi Arıza Giderme"</span>
                )}
                <span className="character-count">{formData.title.length}/128</span>
              </div>
            </div>

            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Detaylı Açıklama <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                className={`modern-textarea ${errors.description ? 'error' : ''}`}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="İş talebinizi detaylı olarak açıklayın (max 1024 karakter)"
                rows={6}
                maxLength={1024}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                {errors.description ? (
                  <span className="error-message">{errors.description}</span>
                ) : (
                  <span className="helper-text">Ne yapılması gerektiğini, mevcut durumu ve beklenen sonucu açıklayın</span>
                )}
                <span className="character-count">{formData.description.length}/1024</span>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">
                Öncelik Seviyesi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className={`modern-select ${errors.priority ? 'error' : ''}`}
                value={formData.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
              >
                <option value="">Öncelik seçin</option>
                {mockPriorities.map((priority) => (
                  <option key={priority.code} value={priority.code}>
                    {priority.label}
                  </option>
                ))}
              </select>
              {errors.priority && <span className="error-message">{errors.priority}</span>}
              {selectedPriority && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.75rem',
                    backgroundColor: selectedPriority.color + '15',
                    borderLeft: `3px solid ${selectedPriority.color}`,
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: selectedPriority.color, fontSize: '0.875rem' }}>
                    {selectedPriority.label}
                  </div>
                </div>
              )}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">
                Talep Nedeni <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className={`modern-select ${errors.requestReason ? 'error' : ''}`}
                value={formData.requestReason}
                onChange={(e) => handleInputChange('requestReason', e.target.value)}
              >
                <option value="">Talep nedeni seçin</option>
                {mockRequestReasons.map((reason) => (
                  <option key={reason.code} value={reason.code}>
                    {reason.label}
                  </option>
                ))}
              </select>
              {errors.requestReason && <span className="error-message">{errors.requestReason}</span>}
            </div>
          </div>
        </div>

        {/* Section 2: Location Information */}
        <div className="modern-card">
          <div className="card-header">2. Lokasyon Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">
                Ana Lokasyon <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className={`modern-select ${errors.locationId ? 'error' : ''}`}
                value={formData.locationId}
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                <option value="">Lokasyon seçin</option>
                {mockLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.code} - {location.name}
                  </option>
                ))}
              </select>
              {errors.locationId && <span className="error-message">{errors.locationId}</span>}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Birim 1</label>
              <select
                className="modern-select"
                value={formData.locationSubUnit1Id}
                onChange={(e) => handleSubUnit1Change(e.target.value)}
                disabled={!selectedLocation}
              >
                <option value="">Alt birim seçin</option>
                {selectedLocation?.subUnits.map((subUnit: any) => (
                  <option key={subUnit.id} value={subUnit.id}>
                    {subUnit.code} - {subUnit.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Birim 2</label>
              <select
                className="modern-select"
                value={formData.locationSubUnit2Id}
                onChange={(e) => handleInputChange('locationSubUnit2Id', e.target.value)}
                disabled={!selectedSubUnit1}
              >
                <option value="">Alt birim seçin</option>
                {selectedSubUnit1?.subUnits?.map((subUnit: any) => (
                  <option key={subUnit.id} value={subUnit.id}>
                    {subUnit.code} - {subUnit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Asset Information */}
        <div className="modern-card">
          <div className="card-header">3. Varlık Bilgileri (İsteğe Bağlı)</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Varlık Tipi</label>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="assetType"
                    value="sap"
                    checked={formData.assetType === 'sap'}
                    onChange={() => handleAssetTypeChange('sap')}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>SAP Varlığı</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="assetType"
                    value="maintenance"
                    checked={formData.assetType === 'maintenance'}
                    onChange={() => handleAssetTypeChange('maintenance')}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Bakım Varlığı</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="assetType"
                    value=""
                    checked={formData.assetType === ''}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        assetType: '',
                        assetId: '', // Clear unified asset ID
                        sapAssetId: '',
                        maintenanceAssetId: '',
                      }));
                      setSelectedSAPAsset(null);
                      setSelectedMaintenanceAsset(null);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Varlık Yok</span>
                </label>
              </div>
            </div>

            {formData.assetType === 'sap' && (
              <>
                <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="modern-form-label">SAP Varlığı</label>
                  <select
                    className="modern-select"
                    value={formData.sapAssetId}
                    onChange={(e) => handleSAPAssetChange(e.target.value)}
                  >
                    <option value="">SAP varlığı seçin</option>
                    {mockSAPAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.sapNumber} - {asset.title}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSAPAsset && (
                  <div
                    className="modern-form-group"
                    style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px' }}
                  >
                    <div style={{ fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem' }}>SAP Varlık Detayları</div>
                    <div className="modern-form-grid">
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SAP Numarası</div>
                        <div style={{ fontWeight: 500 }}>{selectedSAPAsset.sapNumber}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Varlık Adı</div>
                        <div style={{ fontWeight: 500 }}>{selectedSAPAsset.title}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Masraf Merkezi</div>
                        <div style={{ fontWeight: 500 }}>{selectedSAPAsset.costCenter}</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {formData.assetType === 'maintenance' && (
              <>
                <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="modern-form-label">Bakım Varlığı</label>
                  <select
                    className="modern-select"
                    value={formData.maintenanceAssetId}
                    onChange={(e) => handleMaintenanceAssetChange(e.target.value)}
                  >
                    <option value="">Bakım varlığı seçin</option>
                    {mockMaintenanceAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.maintenanceNumber} - {asset.title}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedMaintenanceAsset && (
                  <div
                    className="modern-form-group"
                    style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px' }}
                  >
                    <div style={{ fontWeight: 600, color: '#15803d', marginBottom: '0.5rem' }}>Bakım Varlık Detayları</div>
                    <div className="modern-form-grid">
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Bakım Numarası</div>
                        <div style={{ fontWeight: 500 }}>{selectedMaintenanceAsset.maintenanceNumber}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Varlık Adı</div>
                        <div style={{ fontWeight: 500 }}>{selectedMaintenanceAsset.title}</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Section 4: Department & Cost Center */}
        <div className="modern-card">
          <div className="card-header">4. Departman ve Masraf Merkezi</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Departman</label>
              <select
                className="modern-select"
                value={formData.departmentId}
                onChange={(e) => handleInputChange('departmentId', e.target.value)}
              >
                <option value="">Departman seçin</option>
                {mockDepartments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.code} - {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Masraf Merkezi</label>
              <select
                className="modern-select"
                value={formData.costCenterId}
                onChange={(e) => handleInputChange('costCenterId', e.target.value)}
              >
                <option value="">Masraf merkezi seçin</option>
                {mockCostCenters.map((cc) => (
                  <option key={cc.id} value={cc.id}>
                    {cc.code} - {cc.name}
                  </option>
                ))}
              </select>
              {formData.assetType === 'sap' && selectedSAPAsset && (
                <span className="helper-text">SAP varlığından otomatik dolduruldu</span>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Date and Cost Information */}
        <div className="modern-card">
          <div className="card-header">5. Tarih ve Maliyet Bilgileri (İsteğe Bağlı)</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Beklenen Başlangıç Tarihi</label>
              <input
                type="date"
                className="modern-input"
                value={formData.expectedStartDate}
                onChange={(e) => handleInputChange('expectedStartDate', e.target.value)}
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Beklenen Bitiş Tarihi</label>
              <input
                type="date"
                className={`modern-input ${errors.expectedEndDate ? 'error' : ''}`}
                value={formData.expectedEndDate}
                onChange={(e) => handleInputChange('expectedEndDate', e.target.value)}
                min={formData.expectedStartDate}
              />
              {errors.expectedEndDate && <span className="error-message">{errors.expectedEndDate}</span>}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Tahmini Maliyet</label>
              <input
                type="number"
                className={`modern-input ${errors.estimatedCost ? 'error' : ''}`}
                value={formData.estimatedCost}
                onChange={(e) => handleInputChange('estimatedCost', e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.estimatedCost && <span className="error-message">{errors.estimatedCost}</span>}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Para Birimi</label>
              <select
                className="modern-select"
                value={formData.costCurrency}
                onChange={(e) => handleInputChange('costCurrency', e.target.value)}
              >
                <option value="TRY">TRY - Türk Lirası</option>
                <option value="USD">USD - Amerikan Doları</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 6: Reference Information */}
        <div className="modern-card">
          <div className="card-header">6. Referans Bilgileri (İsteğe Bağlı)</div>
          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">İş Emri Numarası</label>
              <input
                type="text"
                className="modern-input"
                value={formData.workOrderNumber}
                onChange={(e) => handleInputChange('workOrderNumber', e.target.value)}
                placeholder="İş emri numarası"
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Dış Referans</label>
              <input
                type="text"
                className="modern-input"
                value={formData.externalReference}
                onChange={(e) => handleInputChange('externalReference', e.target.value)}
                placeholder="Harici sistem referansı"
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Müşteri Referansı</label>
              <input
                type="text"
                className="modern-input"
                value={formData.customerReference}
                onChange={(e) => handleInputChange('customerReference', e.target.value)}
                placeholder="Müşteri referans numarası"
              />
            </div>
          </div>
        </div>

        {/* Section 7: Creator Information (Readonly) */}
        <div className="modern-card">
          <div className="card-header">7. Talep Eden Bilgileri</div>
          <div
            className="modern-form-grid"
            style={{ backgroundColor: '#fafafa', padding: '1rem', borderRadius: '8px' }}
          >
            <div className="modern-form-group">
              <label className="modern-form-label">Talep Eden</label>
              <input
                type="text"
                className="modern-input"
                value={formData.requestedByName}
                disabled
                style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Departman</label>
              <input
                type="text"
                className="modern-input"
                value={mockCurrentUser.department}
                disabled
                style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Talep Tarihi</label>
              <input
                type="text"
                className="modern-input"
                value={new Date(formData.requestDate).toLocaleDateString('tr-TR')}
                disabled
                style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
              />
            </div>
          </div>
        </div>

        {/* Section 8: Workflow Information */}
        <div className="modern-card" style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
          <div className="card-header" style={{ color: '#92400e' }}>İş Akışı Bilgisi</div>
          <div style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#78350f', marginBottom: '0.75rem' }}>
              <strong>Onay Süreci (11 Aşama):</strong>
            </div>
            <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#78350f', lineHeight: 1.8 }}>
              <li><strong>Oluşturuldu</strong> - Talep kaydedildi</li>
              <li><strong>İş Onayı</strong> - Talep eden yöneticisi onayı</li>
              <li><strong>SL/Mühendis Devralma</strong> - Teknik sorumluluk atandı</li>
              <li><strong>Teknik Onay</strong> - SL/Mühendis teknik onayı</li>
              <li><strong>Maliyet Hesaplama</strong> - Tahmini maliyet girişi</li>
              <li><strong>İş Maliyet Onayı</strong> - GL veya üstü maliyet onayı</li>
              <li><strong>Çözüm Sorumlusu Atama</strong> - İşi yapacak kişi atandı</li>
              <li><strong>Uygulama</strong> - İş yürütülüyor</li>
              <li><strong>Çözüm Onayı</strong> - Talep eden son onay</li>
              <li><strong>Tamamlandı</strong> - İş başarıyla tamamlandı</li>
              <li><strong>Reddedildi</strong> - Herhangi bir aşamada reddedildi</li>
            </ol>
            <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#92400e' }}>
              <strong>Not:</strong> Talep oluşturulduktan sonra yöneticinizin onayına sunulacaktır.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modern-form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate('/job-requests')}>
            İptal
          </button>
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner" style={{ marginRight: '0.5rem' }} />
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save style={{ fontSize: '1.25rem' }} />
                İş Talebi Oluştur
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
