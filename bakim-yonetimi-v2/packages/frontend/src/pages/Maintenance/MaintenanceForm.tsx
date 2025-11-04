import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Alert, Chip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { allMaintenance } from '../../data/mockData';

// Mock veri yapıları
interface Asset {
  id: number;
  sapNumber: string;
  sapTitle: string;
  maintenanceNumber: string;
  maintenanceTitle: string;
  location: string;
  locationSubUnit1: string;
  locationSubUnit2: string;
  costCenter: string;
  workstation: string;
}

interface TaskList {
  id: number;
  taskListId: string;
  title: string;
  taskCount: number;
  tasks: string[];
}

interface CurrentUser {
  userId: string;
  name: string;
  surname: string;
  department: string;
}

// Mock varlıklar
const mockAssets: Asset[] = [
  {
    id: 1,
    sapNumber: 'SAP-1000234',
    sapTitle: 'Hidrolik Pres Makinesi HP-01',
    maintenanceNumber: 'MAE-2024-001',
    maintenanceTitle: 'Hidrolik Pres Ünitesi 1',
    location: 'Fabrika 1 - Üretim Hattı 1',
    locationSubUnit1: 'Pres Bölümü',
    locationSubUnit2: 'Alan A',
    costCenter: 'CC-PRD-001',
    workstation: 'WS-PRESS-01',
  },
  {
    id: 2,
    sapNumber: 'SAP-1000567',
    sapTitle: 'CNC Torna Makinesi CT-05',
    maintenanceNumber: 'MAE-2024-045',
    maintenanceTitle: 'CNC Torna 5',
    location: 'Fabrika 2 - Talaşlı İmalat',
    locationSubUnit1: 'CNC Bölümü',
    locationSubUnit2: 'Hat B',
    costCenter: 'CC-PRD-002',
    workstation: 'WS-CNC-05',
  },
  {
    id: 3,
    sapNumber: 'SAP-1000890',
    sapTitle: 'Kompresör Ünitesi KMP-A1',
    maintenanceNumber: 'MAE-2024-078',
    maintenanceTitle: 'Ana Hat Kompresör A1',
    location: 'Fabrika 1 - Enerji Merkezi',
    locationSubUnit1: 'Kompresör İstasyonu',
    locationSubUnit2: 'Üniteler',
    costCenter: 'CC-MNT-001',
    workstation: 'WS-COMP-A1',
  },
];

// Mock görev listeleri
const mockTaskLists: TaskList[] = [
  {
    id: 1,
    taskListId: 'TL-HYD-001',
    title: 'Hidrolik Sistem Periyodik Bakım',
    taskCount: 8,
    tasks: [
      'Hidrolik yağ seviyesi kontrolü',
      'Basınç göstergesi okuması',
      'Hortum ve bağlantı kontrolü',
      'Filtre temizliği/değişimi',
      'Pompa sesli çalışma kontrolü',
      'Sızdırmazlık kontrolü',
      'Güvenlik valfi testi',
      'Genel temizlik',
    ],
  },
  {
    id: 2,
    taskListId: 'TL-CNC-002',
    title: 'CNC Makine Bakımı',
    taskCount: 10,
    tasks: [
      'Aks yağlama sistemi kontrolü',
      'Soğutma sıvısı seviyesi',
      'Takım tutucu temizliği',
      'Ray ve kızak kontrolü',
      'Pnömatik sistem kontrolü',
      'Kontrol paneli test',
      'Elektrik bağlantıları kontrolü',
      'Ölçüm cihazları kalibrasyon',
      'Talaş toplama sistemi',
      'Genel makine temizliği',
    ],
  },
  {
    id: 3,
    taskListId: 'TL-COMP-003',
    title: 'Kompresör Bakımı',
    taskCount: 6,
    tasks: [
      'Kompresör yağı kontrolü',
      'Hava filtresi kontrolü',
      'Yağ ayırıcı kontrolü',
      'Emniyet valfi kontrolü',
      'Motor akım ölçümü',
      'Titreşim analizi',
    ],
  },
];

// Mock mevcut kullanıcı
const mockCurrentUser: CurrentUser = {
  userId: 'USR-2001',
  name: 'Mehmet',
  surname: 'Özkan',
  department: 'Bakım ve Onarım',
};

interface FormData {
  dutyTitle: string;
  dutyDescription: string;
  maintenanceFinalDay: string;
  assetId: string;
  taskListId: string;
  maintenanceResponsibleId: string;
  dutyStatus: string;
}

const MaintenanceForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<FormData>({
    dutyTitle: '',
    dutyDescription: '',
    maintenanceFinalDay: '',
    assetId: '',
    taskListId: '',
    maintenanceResponsibleId: '',
    dutyStatus: 'PLANNED',
  });

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(id && id !== 'new');
  const current = isEditMode && id ? allMaintenance.find(m => m.id === parseInt(id)) : null;

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && current) {
      const asset = mockAssets[0]; // Use first asset as default
      const taskList = mockTaskLists[0]; // Use first task list as default

      setFormData({
        dutyTitle: current.dutyTitle || 'Maintenance Duty Title - Periodic Maintenance Work',
        dutyDescription: 'Detailed description of the maintenance duty. This includes all necessary steps and procedures that need to be followed during the maintenance work.',
        maintenanceFinalDay: current.plannedDate || '2024-12-31',
        assetId: '1',
        taskListId: '1',
        maintenanceResponsibleId: 'USR-2001',
        dutyStatus: current.status || 'PLANNED',
      });

      setSelectedAsset(asset);
      setSelectedTaskList(taskList);
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
      handleChange('assetId', assetId);

      // Görev başlığını otomatik oluştur (eğer task list seçiliyse)
      if (selectedTaskList) {
        const autoTitle = `${selectedTaskList.title} - ${asset.maintenanceTitle}`;
        setFormData((prev) => ({ ...prev, dutyTitle: autoTitle, assetId }));
      }
    } else {
      setSelectedAsset(null);
    }
  };

  const handleTaskListChange = (taskListId: string) => {
    const taskList = mockTaskLists.find((t) => t.id === parseInt(taskListId));
    if (taskList) {
      setSelectedTaskList(taskList);
      handleChange('taskListId', taskListId);

      // Görev başlığını otomatik oluştur (eğer asset seçiliyse)
      if (selectedAsset) {
        const autoTitle = `${taskList.title} - ${selectedAsset.maintenanceTitle}`;
        setFormData((prev) => ({ ...prev, dutyTitle: autoTitle, taskListId }));
      }
    } else {
      setSelectedTaskList(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.dutyTitle.trim()) {
      newErrors.dutyTitle = 'Görev başlığı zorunludur';
    } else if (formData.dutyTitle.length > 256) {
      newErrors.dutyTitle = 'Görev başlığı en fazla 256 karakter olabilir';
    }

    if (!formData.maintenanceFinalDay) {
      newErrors.maintenanceFinalDay = 'Son tarih zorunludur';
    } else {
      const selectedDate = new Date(formData.maintenanceFinalDay);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.maintenanceFinalDay = 'Son tarih bugün veya gelecek bir tarih olmalıdır';
      }
    }

    if (!formData.assetId) {
      newErrors.assetId = 'Varlık seçimi zorunludur';
    }

    if (!formData.taskListId) {
      newErrors.taskListId = 'Görev listesi seçimi zorunludur';
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
      enqueueSnackbar('Bakım görevi başarıyla oluşturuldu', { variant: 'success' });
      navigate('/maintenance');
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

  const titleCharCount = formData.dutyTitle.length;
  const descCharCount = formData.dutyDescription.length;

  return (
    <Box>
      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Bakım Görevi</h1>
          <p className="page-subtitle">
            <a
              href="/maintenance"
              onClick={(e) => {
                e.preventDefault();
                navigate('/maintenance');
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
        <strong>Bakım Görevi İş Akışı:</strong>
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <Chip label="PLANNED" size="small" sx={{ mr: 0.5 }} /> →
          <Chip label="ACTIVE" size="small" sx={{ mx: 0.5 }} /> →
          <Chip label="ASSIGNED" size="small" sx={{ mx: 0.5 }} /> →
          <Chip label="IN PROGRESS" size="small" sx={{ mx: 0.5 }} /> →
          <Chip label="APPROVAL REQUESTED" size="small" sx={{ mx: 0.5 }} /> →
          <Chip label="DONE" size="small" sx={{ mx: 0.5 }} />
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
          Görev oluşturulduğunda PLANNED durumunda başlar. Son tarihe 5 hafta kala otomatik olarak ACTIVE olur.
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
          <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#f0f9ff' }}>
            <div className="card-header" style={{ backgroundColor: '#bae6fd', color: '#0c4a6e' }}>
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
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e', fontWeight: 600 }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">SAP Başlığı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.sapTitle}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e', fontWeight: 600 }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Bakım Numarası</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.maintenanceNumber}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Bakım Başlığı</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.maintenanceTitle}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Lokasyon</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.location}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Alt Lokasyon 1</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.locationSubUnit1}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Alt Lokasyon 2</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.locationSubUnit2}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
              <div className="modern-form-group">
                <label className="modern-form-label">Masraf Merkezi</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.costCenter}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
              <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="modern-form-label">İş İstasyonu</label>
                <input
                  type="text"
                  className="modern-form-control"
                  value={selectedAsset.workstation}
                  disabled
                  style={{ backgroundColor: '#f0f9ff', color: '#0c4a6e' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bölüm 3: Görev Listesi Seçimi */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">3. Görev Listesi</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Görev Listesi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.taskListId}
                onChange={(e) => handleTaskListChange(e.target.value)}
                style={{ fontSize: '0.95rem' }}
              >
                <option value="">-- Görev Listesi Seçiniz --</option>
                {mockTaskLists.map((taskList) => (
                  <option key={taskList.id} value={taskList.id}>
                    {taskList.taskListId} - {taskList.title} ({taskList.taskCount} görev)
                  </option>
                ))}
              </select>
              {errors.taskListId && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.taskListId}</span>
              )}
            </div>
          </div>

          {/* Görev Listesi Detayları */}
          {selectedTaskList && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '0.5rem',
                border: '1px solid #bbf7d0',
              }}
            >
              <div style={{ fontWeight: 600, color: '#14532d', marginBottom: '0.75rem' }}>
                Görev Listesi Detayları - Toplam {selectedTaskList.taskCount} Görev
              </div>
              <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#14532d', lineHeight: '1.8' }}>
                {selectedTaskList.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Bölüm 4: Bakım Görevi Bilgileri */}
        <div className="modern-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">4. Bakım Görevi Bilgileri</div>
          <div className="modern-form-grid">
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Görev Başlığı <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.dutyTitle}
                onChange={(e) => handleChange('dutyTitle', e.target.value)}
                placeholder="Otomatik oluşturulur veya manuel düzenleyebilirsiniz"
                maxLength={256}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                <span style={{ color: errors.dutyTitle ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {errors.dutyTitle || 'Varlık ve görev listesi seçildiğinde otomatik oluşturulur'}
                </span>
                <span style={{ color: titleCharCount > 256 ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {titleCharCount} / 256
                </span>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">
                Son Tarih <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="date"
                className="modern-form-control"
                value={formData.maintenanceFinalDay}
                onChange={(e) => handleChange('maintenanceFinalDay', e.target.value)}
              />
              {errors.maintenanceFinalDay && (
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.maintenanceFinalDay}</span>
              )}
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                Bakım işinin tamamlanması gereken son tarih
              </div>
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Durum</label>
              <select
                className="modern-form-control"
                value={formData.dutyStatus}
                onChange={(e) => handleChange('dutyStatus', e.target.value)}
              >
                <option value="PLANNED">Planlandı (Varsayılan)</option>
                <option value="ACTIVE">Aktif</option>
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                Genellikle PLANNED olarak başlar
              </div>
            </div>

            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Açıklama (Opsiyonel)</label>
              <textarea
                className="modern-form-control"
                value={formData.dutyDescription}
                onChange={(e) => handleChange('dutyDescription', e.target.value)}
                placeholder="Ek açıklamalar veya özel talimatlar"
                rows={3}
                maxLength={256}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                <span style={{ color: descCharCount > 256 ? 'var(--primary)' : 'var(--gray-500)' }}>
                  {descCharCount} / 256
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bölüm 5: Oluşturan Bilgileri (Readonly) */}
        <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#fef3c7' }}>
          <div className="card-header" style={{ backgroundColor: '#fde68a', color: '#78350f' }}>
            5. Oluşturan Bilgileri
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
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
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
            <strong>Not:</strong> Bu bilgiler otomatik olarak doldurulmuştur. Oluşturma zamanı görev kaydedildiğinde
            sistem tarafından eklenecektir.
          </div>
        </div>

        {/* Sonraki Aşamalar */}
        <div className="modern-card" style={{ marginBottom: '1.5rem', backgroundColor: '#ede9fe' }}>
          <div className="card-header" style={{ backgroundColor: '#ddd6fe', color: '#4c1d95' }}>
            Sonraki Aşamalar
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#4c1d95', lineHeight: '1.8' }}>
              <strong>Bakım görevi oluşturulduktan sonra:</strong>
              <ol style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Görev PLANNED durumunda oluşturulur</li>
                <li>Son tarihe 5 hafta kala otomatik olarak ACTIVE durumuna geçer</li>
                <li>SL/Mühendis bir bakım sorumlusu (teknisyen) atar (ASSIGNED)</li>
                <li>Teknisyen işe başlar ve ziyaret kaydı oluşturur (IN PROGRESS)</li>
                <li>Görevler tamamlanır, malzeme tüketimi kaydedilir</li>
                <li>Teknisyen onay talep eder (APPROVAL REQUESTED)</li>
                <li>SL/Mühendis onaylar veya reddeder</li>
                <li>Onaylandığında görev tamamlanır (DONE)</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Form Butonları */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            type="button"
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate('/maintenance')}
            disabled={submitting}
          >
            İptal
          </button>
          <button type="submit" className="modern-btn modern-btn-primary" disabled={submitting}>
            {submitting ? 'Oluşturuluyor...' : 'Bakım Görevi Oluştur'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default MaintenanceForm;
