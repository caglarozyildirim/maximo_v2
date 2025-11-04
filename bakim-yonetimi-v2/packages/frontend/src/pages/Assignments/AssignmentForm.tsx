import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';
import { allAssignments } from '../../data/mockData';

// Mock data - Gerçek uygulamada API'den gelecek
const mockAssets = [
  {
    id: 1,
    sapNumber: '1000234',
    sapTitle: 'Dell Latitude 5420 Laptop',
    maintenanceNumber: 'MAE-2024-001',
    maintenanceTitle: 'Dizüstü Bilgisayar',
    producer: 'Dell',
    model: 'Latitude 5420',
    serialNumber: 'SN-DL-2024-001',
    status: 'Active',
    location: 'Merkez Ofis',
    locationSubUnit1: 'IT Departmanı',
    locationSubUnit2: '3. Kat',
    costCenter: 'CC-IT-001',
    currentOwnerId: 2,
    currentOwnerNumber: '1001',
    currentOwnerName: 'Mehmet',
    currentOwnerSurname: 'Yılmaz',
    currentOwnerDepartment: 'IT',
    currentOwnerManagerId: 5,
    currentOwnerManagerNumber: '2001',
    currentOwnerManagerName: 'Ali',
    currentOwnerManagerSurname: 'Demir',
    currentOwnerManagerDepartment: 'IT Management',
  },
  {
    id: 2,
    sapNumber: '1000235',
    sapTitle: 'HP Laserjet Pro M404',
    maintenanceNumber: 'MAE-2024-002',
    maintenanceTitle: 'Lazer Yazıcı',
    producer: 'HP',
    model: 'Laserjet Pro M404',
    serialNumber: 'SN-HP-2024-002',
    status: 'Active',
    location: 'Merkez Ofis',
    locationSubUnit1: 'Muhasebe',
    locationSubUnit2: '2. Kat',
    costCenter: 'CC-FIN-002',
    currentOwnerId: 3,
    currentOwnerNumber: '1002',
    currentOwnerName: 'Ayşe',
    currentOwnerSurname: 'Kaya',
    currentOwnerDepartment: 'Muhasebe',
    currentOwnerManagerId: 6,
    currentOwnerManagerNumber: '2002',
    currentOwnerManagerName: 'Fatma',
    currentOwnerManagerSurname: 'Şahin',
    currentOwnerManagerDepartment: 'Finance Management',
  },
  {
    id: 3,
    sapNumber: '1000236',
    sapTitle: 'Toyota Corolla 2023',
    maintenanceNumber: 'MAE-2024-003',
    maintenanceTitle: 'Şirket Aracı',
    producer: 'Toyota',
    model: 'Corolla 1.6 CVT',
    serialNumber: 'VIN-TYT-2024-003',
    status: 'Active',
    location: 'Araç Parkı',
    locationSubUnit1: 'Kat Garajı',
    locationSubUnit2: 'A Blok',
    costCenter: 'CC-OPS-003',
    currentOwnerId: 4,
    currentOwnerNumber: '1003',
    currentOwnerName: 'Can',
    currentOwnerSurname: 'Öztürk',
    currentOwnerDepartment: 'Satış',
    currentOwnerManagerId: 7,
    currentOwnerManagerNumber: '2003',
    currentOwnerManagerName: 'Zeynep',
    currentOwnerManagerSurname: 'Aydın',
    currentOwnerManagerDepartment: 'Sales Management',
  },
];

const mockUsers = [
  { id: 1, number: '1000', name: 'Ahmet', surname: 'Yılmaz', department: 'IT', managerId: 5, managerNumber: '2001', managerName: 'Ali', managerSurname: 'Demir', managerDepartment: 'IT Management' },
  { id: 2, number: '1001', name: 'Mehmet', surname: 'Yılmaz', department: 'IT', managerId: 5, managerNumber: '2001', managerName: 'Ali', managerSurname: 'Demir', managerDepartment: 'IT Management' },
  { id: 3, number: '1002', name: 'Ayşe', surname: 'Kaya', department: 'Muhasebe', managerId: 6, managerNumber: '2002', managerName: 'Fatma', managerSurname: 'Şahin', managerDepartment: 'Finance Management' },
  { id: 4, number: '1003', name: 'Can', surname: 'Öztürk', department: 'Satış', managerId: 7, managerNumber: '2003', managerName: 'Zeynep', managerSurname: 'Aydın', managerDepartment: 'Sales Management' },
  { id: 8, number: '1004', name: 'Elif', surname: 'Çelik', department: 'İnsan Kaynakları', managerId: 9, managerNumber: '2004', managerName: 'Hasan', managerSurname: 'Yıldız', managerDepartment: 'HR Management' },
  { id: 10, number: '1005', name: 'Burak', surname: 'Aksoy', department: 'Üretim', managerId: 11, managerNumber: '2005', managerName: 'Murat', managerSurname: 'Kara', managerDepartment: 'Production Management' },
];

interface FormData {
  assetId: string;
  newAssigneeId: string;
  changeReason: string;
  exchangeDate: string;
}

interface SelectedAsset {
  id: number;
  sapNumber: string;
  sapTitle: string;
  maintenanceNumber: string;
  maintenanceTitle: string;
  producer: string;
  model: string;
  serialNumber: string;
  status: string;
  location: string;
  locationSubUnit1: string;
  locationSubUnit2: string;
  costCenter: string;
  currentOwnerNumber: string;
  currentOwnerName: string;
  currentOwnerSurname: string;
  currentOwnerDepartment: string;
  currentOwnerManagerNumber: string;
  currentOwnerManagerName: string;
  currentOwnerManagerSurname: string;
  currentOwnerManagerDepartment: string;
}

interface SelectedUser {
  id: number;
  number: string;
  name: string;
  surname: string;
  department: string;
  managerNumber: string;
  managerName: string;
  managerSurname: string;
  managerDepartment: string;
}

const initialFormData: FormData = {
  assetId: '',
  newAssigneeId: '',
  changeReason: '',
  exchangeDate: new Date().toISOString().split('T')[0],
};

const AssignmentForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset | null>(null);
  const [selectedNewAssignee, setSelectedNewAssignee] = useState<SelectedUser | null>(null);
  const [searchAsset, setSearchAsset] = useState('');
  const [searchUser, setSearchUser] = useState('');

  const isEditMode = Boolean(id && id !== 'new');
  const loading = false;

  // Get current assignment from mock data if in edit mode
  const current = isEditMode && id ? allAssignments.find(a => a.id === parseInt(id)) : null;

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && current) {
      const asset = mockAssets.find(a => a.id === current.assetId) || mockAssets[0];
      const newAssignee = mockUsers.find(u => u.id === (current.assignedToUser || 1)) || mockUsers[0];

      setFormData({
        assetId: (current.assetId || 1).toString(),
        newAssigneeId: (current.assignedToUser || 1).toString(),
        changeReason: 'Assignment change required due to employee relocation and departmental reorganization. The asset needs to be transferred to ensure continued operational efficiency.',
        exchangeDate: current.assignedDate || '2024-11-15',
      });

      setSelectedAsset(asset);
      setSelectedNewAssignee(newAssignee);
    }
  }, [isEditMode, current]);

  const handleAssetChange = (assetId: string) => {
    const asset = mockAssets.find(a => a.id === parseInt(assetId));
    if (asset) {
      setSelectedAsset(asset);
      setFormData(prev => ({ ...prev, assetId }));
      if (errors.assetId) {
        setErrors(prev => ({ ...prev, assetId: undefined }));
      }
    }
  };

  const handleNewAssigneeChange = (userId: string) => {
    const user = mockUsers.find(u => u.id === parseInt(userId));
    if (user) {
      // Business Rule: Yeni sahip, mevcut sahip ile aynı olamaz
      if (selectedAsset && selectedAsset.currentOwnerNumber === user.number) {
        enqueueSnackbar('Yeni sahip, mevcut sahip ile aynı olamaz!', { variant: 'error' });
        return;
      }

      setSelectedNewAssignee(user);
      setFormData(prev => ({ ...prev, newAssigneeId: userId }));
      if (errors.newAssigneeId) {
        setErrors(prev => ({ ...prev, newAssigneeId: undefined }));
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

    // Asset validation
    if (!formData.assetId) {
      newErrors.assetId = 'Varlık seçimi zorunludur';
    }

    // New Assignee validation
    if (!formData.newAssigneeId) {
      newErrors.newAssigneeId = 'Yeni zimmetli kişi seçimi zorunludur';
    }

    // Change Reason validation (min 10, max 512 characters)
    if (!formData.changeReason) {
      newErrors.changeReason = 'Değişiklik nedeni zorunludur';
    } else if (formData.changeReason.length < 10) {
      newErrors.changeReason = 'Değişiklik nedeni en az 10 karakter olmalıdır';
    } else if (formData.changeReason.length > 512) {
      newErrors.changeReason = 'Değişiklik nedeni en fazla 512 karakter olabilir';
    }

    // Exchange Date validation (must be today or future)
    if (!formData.exchangeDate) {
      newErrors.exchangeDate = 'Değişim tarihi zorunludur';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.exchangeDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.exchangeDate = 'Değişim tarihi bugün veya gelecek bir tarih olmalıdır';
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
        enqueueSnackbar('Zimmet başarıyla güncellendi', { variant: 'success' });
      } else {
        enqueueSnackbar('Zimmet başarıyla oluşturuldu', { variant: 'success' });
      }

      navigate('/assignments');
    } catch (error: any) {
      enqueueSnackbar(error.message || 'İşlem başarısız oldu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssets = mockAssets.filter(asset =>
    asset.sapNumber.toLowerCase().includes(searchAsset.toLowerCase()) ||
    asset.sapTitle.toLowerCase().includes(searchAsset.toLowerCase()) ||
    asset.maintenanceNumber.toLowerCase().includes(searchAsset.toLowerCase()) ||
    asset.maintenanceTitle.toLowerCase().includes(searchAsset.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user =>
    user.number.toLowerCase().includes(searchUser.toLowerCase()) ||
    `${user.name} ${user.surname}`.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.department.toLowerCase().includes(searchUser.toLowerCase())
  );

  if (loading && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const characterCount = formData.changeReason.length;
  const characterColor = characterCount < 10 ? 'var(--primary)' : characterCount > 512 ? 'var(--primary)' : 'var(--gray-500)';

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEditMode ? 'Zimmet Düzenle' : 'Yeni Zimmet Transfer'}</h1>
          <p className="page-subtitle">
            <a href="/assignments" onClick={(e) => { e.preventDefault(); navigate('/assignments'); }} style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>
              ← Geri Dön
            </a>
          </p>
        </div>
      </div>

      {!isEditMode && (
        <Alert severity="info" sx={{ marginBottom: '1.5rem', borderRadius: '8px' }}>
          Bu form ile varlık zimmet transferi yapabilirsiniz. Transfer işlemi 3 aşamalı onay sürecinden geçecektir:
          <br />1. Mevcut sahibin onayı → 2. Yeni sahibin müdürünün onayı → 3. Mevcut sahibin müdürünün onayı
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* BÖLÜM 1: Zimmet Transfer Bilgileri (Editable) */}
        <div className="modern-card">
          <div className="card-header">
            <span>Zimmet Transfer Bilgileri</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 400 }}>Zorunlu alanlar (*) ile işaretlenmiştir</span>
          </div>
          <div className="modern-form-grid">
            {/* Varlık Seçimi */}
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Varlık Seçimi <span style={{ color: 'var(--primary)' }}>*</span></label>
              <input
                type="text"
                className="modern-form-control"
                placeholder="SAP numarası, Maintenance numarası veya başlık ile arayın..."
                value={searchAsset}
                onChange={(e) => setSearchAsset(e.target.value)}
                disabled={isEditMode}
                style={{ marginBottom: '0.5rem' }}
              />
              <select
                className="modern-form-control"
                value={formData.assetId}
                onChange={(e) => handleAssetChange(e.target.value)}
                disabled={isEditMode}
                size={5}
                style={{ height: 'auto' }}
              >
                <option value="">Varlık seçiniz...</option>
                {filteredAssets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    [{asset.sapNumber}] {asset.sapTitle} / [{asset.maintenanceNumber}] {asset.maintenanceTitle}
                  </option>
                ))}
              </select>
              {errors.assetId && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.assetId}</span>}
            </div>

            {/* Yeni Zimmetli Seçimi */}
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Yeni Zimmetli Kişi <span style={{ color: 'var(--primary)' }}>*</span></label>
              <input
                type="text"
                className="modern-form-control"
                placeholder="Personel numarası, ad-soyad veya departman ile arayın..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                disabled={isEditMode}
                style={{ marginBottom: '0.5rem' }}
              />
              <select
                className="modern-form-control"
                value={formData.newAssigneeId}
                onChange={(e) => handleNewAssigneeChange(e.target.value)}
                disabled={isEditMode}
                size={5}
                style={{ height: 'auto' }}
              >
                <option value="">Kişi seçiniz...</option>
                {filteredUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    [{user.number}] {user.name} {user.surname} - {user.department}
                  </option>
                ))}
              </select>
              {errors.newAssigneeId && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.newAssigneeId}</span>}
            </div>

            {/* Değişiklik Nedeni */}
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Değişiklik Nedeni <span style={{ color: 'var(--primary)' }}>*</span>
                <span style={{ color: characterColor, fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                  ({characterCount}/512 karakter - minimum 10)
                </span>
              </label>
              <textarea
                className="modern-form-control"
                value={formData.changeReason}
                onChange={(e) => handleChange('changeReason', e.target.value)}
                placeholder="Zimmet değişikliğinin nedenini detaylı olarak açıklayın (minimum 10, maksimum 512 karakter)"
                rows={4}
                maxLength={512}
              />
              {errors.changeReason && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.changeReason}</span>}
            </div>

            {/* Değişim Tarihi */}
            <div className="modern-form-group">
              <label className="modern-form-label">Değişim Tarihi <span style={{ color: 'var(--primary)' }}>*</span></label>
              <input
                type="date"
                className="modern-form-control"
                value={formData.exchangeDate}
                onChange={(e) => handleChange('exchangeDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                disabled={isEditMode}
              />
              {errors.exchangeDate && <span style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>{errors.exchangeDate}</span>}
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem', display: 'block' }}>
                Varlığın el değiştireceği tarih (bugün veya gelecek bir tarih)
              </span>
            </div>
          </div>
        </div>

        {/* BÖLÜM 2: Varlık Detayları (Readonly) */}
        {selectedAsset && (
          <div className="modern-card">
            <div className="card-header">Varlık Detayları (Otomatik)</div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.sapNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Başlığı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.sapTitle} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Maintenance Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.maintenanceNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Maintenance Başlığı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.maintenanceTitle} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Üretici</label>
                <input type="text" className="modern-form-control" value={selectedAsset.producer} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Model</label>
                <input type="text" className="modern-form-control" value={selectedAsset.model} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Seri Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.serialNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Durum</label>
                <input type="text" className="modern-form-control" value={selectedAsset.status} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Lokasyon</label>
                <input type="text" className="modern-form-control" value={selectedAsset.location} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Lokasyon Alt Birim 1</label>
                <input type="text" className="modern-form-control" value={selectedAsset.locationSubUnit1} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Lokasyon Alt Birim 2</label>
                <input type="text" className="modern-form-control" value={selectedAsset.locationSubUnit2} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Maliyet Merkezi</label>
                <input type="text" className="modern-form-control" value={selectedAsset.costCenter} readOnly disabled />
              </div>
            </div>
          </div>
        )}

        {/* BÖLÜM 3: Mevcut Sahip Bilgileri (Readonly) */}
        {selectedAsset && (
          <div className="modern-card">
            <div className="card-header">Mevcut Sahip Bilgileri (Otomatik)</div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">Personel Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Ad</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerName} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Soyad</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerSurname} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Departman</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerDepartment} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Numarası</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerManagerNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Adı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerManagerName} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Soyadı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerManagerSurname} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Departmanı</label>
                <input type="text" className="modern-form-control" value={selectedAsset.currentOwnerManagerDepartment} readOnly disabled />
              </div>
            </div>
          </div>
        )}

        {/* BÖLÜM 4: Yeni Sahip Detayları (Readonly) */}
        {selectedNewAssignee && (
          <div className="modern-card">
            <div className="card-header">Yeni Sahip Detayları (Otomatik)</div>
            <div className="modern-form-grid">
              <div className="modern-form-group">
                <label className="modern-form-label">Personel Numarası</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.number} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Ad</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.name} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Soyad</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.surname} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Departman</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.department} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Numarası</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.managerNumber} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Adı</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.managerName} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Soyadı</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.managerSurname} readOnly disabled />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Müdür Departmanı</label>
                <input type="text" className="modern-form-control" value={selectedNewAssignee.managerDepartment} readOnly disabled />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="button" className="modern-btn modern-btn-secondary" onClick={() => navigate('/assignments')} disabled={submitting}>
            İptal
          </button>
          <button type="submit" className="modern-btn modern-btn-primary" disabled={submitting}>
            {submitting ? 'Kaydediliyor...' : isEditMode ? 'Güncelle' : 'Zimmet Transfer İsteği Oluştur'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AssignmentForm;
