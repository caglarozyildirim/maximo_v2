import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { allJobRequests } from '../data/mockData';

interface FormData {
  title: string;
  description: string;
  category: string;
  requestReason: string;
  priority: string;
  location: string;
  sublocation1: string;
  sublocation2: string;
  assetId: string;
  assetSapId: string;
  assetName: string;
  requestedByDate: string;
  estimatedCost: string;
  currency: string;
  costCenter: string;
  notes: string;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  category: 'HVAC',
  requestReason: 'ISG',
  priority: 'MEDIUM',
  location: '',
  sublocation1: '',
  sublocation2: '',
  assetId: '',
  assetSapId: '',
  assetName: '',
  requestedByDate: '',
  estimatedCost: '',
  currency: 'TRY',
  costCenter: '',
  notes: '',
};

const JobRequestForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(id && id !== 'new');
  const loading = false;

  // Get current job request from mock data if in edit mode
  const current = isEditMode && id ? allJobRequests.find(jr => jr.id === parseInt(id)) : null;

  useEffect(() => {
    if (isEditMode && current) {
      setFormData({
        title: current.title || '',
        description: current.description || '',
        category: 'HVAC',
        requestReason: current.requestReason || 'ISG',
        priority: current.priority || 'MEDIUM',
        location: 'Fabrika 1',
        sublocation1: 'Üretim Hattı 1',
        sublocation2: 'Bölge A',
        assetId: '1',
        assetSapId: 'SAP-10000001',
        assetName: 'Kompresör Ana Pompa',
        requestedByDate: current.requestDate || current.createdDate || new Date().toISOString().split('T')[0],
        estimatedCost: current.estimatedCost?.toString() || '0',
        currency: current.costCurrency || 'TRY',
        costCenter: 'CC-PROD-001',
        notes: current.description || '',
      });
    }
  }, [isEditMode, current]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.title.trim()) newErrors.title = 'Başlık zorunludur';
    if (!formData.description.trim()) newErrors.description = 'Açıklama zorunludur';
    if (!formData.location.trim()) newErrors.location = 'Lokasyon zorunludur';
    if (!formData.costCenter.trim()) newErrors.costCenter = 'Maliyet merkezi zorunludur';

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (isEditMode && id) {
        enqueueSnackbar('İş talebi başarıyla güncellendi', { variant: 'success' });
      } else {
        enqueueSnackbar('İş talebi başarıyla oluşturuldu', { variant: 'success' });
      }
      navigate('/job-requests');
    } catch (error: any) {
      enqueueSnackbar(error.message || 'İşlem başarısız oldu', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && isEditMode) {
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
          <h1 className="page-title">{isEditMode ? 'İş Talebi Düzenle' : 'Yeni İş Talebi'}</h1>
          <p className="page-subtitle">
            <a
              href="/job-requests"
              onClick={(e) => {
                e.preventDefault();
                navigate('/job-requests');
              }}
              style={{ color: 'var(--gray-500)', textDecoration: 'none' }}
            >
              ← Geri Dön
            </a>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="modern-card">
          <div className="card-header">Genel Bilgiler</div>

          <div className="modern-form-grid">
            {/* Başlık */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                Başlık <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="İş talebi başlığı"
                maxLength={200}
              />
              {errors.title && <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.title}</span>}
            </div>

            {/* Kategori */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                Kategori <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="HVAC">HVAC</option>
                <option value="ELEKTRIK">Elektrik</option>
                <option value="MEKANIK">Mekanik</option>
                <option value="BT">BT</option>
                <option value="INSAAT">İnşaat</option>
                <option value="DIGER">Diğer</option>
              </select>
            </div>

            {/* Talep Nedeni */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                Talep Nedeni <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.requestReason}
                onChange={(e) => handleChange('requestReason', e.target.value)}
              >
                <option value="ISG">İSG (İş Sağlığı Güvenliği)</option>
                <option value="ENERJI">Enerji Tasarrufu</option>
                <option value="BAKIM">Bakım</option>
                <option value="ARIZA">Arıza</option>
                <option value="IYILESTIRME">İyileştirme</option>
                <option value="DIGER">Diğer</option>
              </select>
            </div>

            {/* Öncelik */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                Öncelik <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                className="modern-form-control"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="LOW">Düşük</option>
                <option value="MEDIUM">Orta</option>
                <option value="HIGH">Yüksek</option>
                <option value="URGENT">Acil</option>
              </select>
            </div>

            {/* Açıklama - Full Width */}
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">
                Açıklama <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                className="modern-form-control"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Detaylı açıklama"
                rows={4}
              />
              {errors.description && <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.description}</span>}
            </div>
          </div>
        </div>

        {/* Lokasyon Bilgileri */}
        <div className="modern-card">
          <div className="card-header">Lokasyon Bilgileri</div>

          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">
                Ana Lokasyon <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Örn: İstanbul Fabrika"
              />
              {errors.location && <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.location}</span>}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Lokasyon 1</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.sublocation1}
                onChange={(e) => handleChange('sublocation1', e.target.value)}
                placeholder="Alt bölge (opsiyonel)"
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Alt Lokasyon 2</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.sublocation2}
                onChange={(e) => handleChange('sublocation2', e.target.value)}
                placeholder="İstasyon/Alan (opsiyonel)"
              />
            </div>
          </div>
        </div>

        {/* Varlık Bilgileri */}
        <div className="modern-card">
          <div className="card-header">Varlık Bilgileri (Opsiyonel)</div>

          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">Varlık ID</label>
              <input
                type="number"
                className="modern-form-control"
                value={formData.assetId}
                onChange={(e) => handleChange('assetId', e.target.value)}
                placeholder="İlişkili varlık ID"
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">SAP Varlık No</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.assetSapId}
                onChange={(e) => handleChange('assetSapId', e.target.value)}
                placeholder="SAP'den çekilen varlık no"
              />
            </div>

            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Varlık Adı</label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.assetName}
                onChange={(e) => handleChange('assetName', e.target.value)}
                placeholder="Varlık adı"
              />
            </div>
          </div>
        </div>

        {/* Maliyet ve Tarih Bilgileri */}
        <div className="modern-card">
          <div className="card-header">Maliyet ve Tarih Bilgileri</div>

          <div className="modern-form-grid">
            <div className="modern-form-group">
              <label className="modern-form-label">
                Maliyet Merkezi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-form-control"
                value={formData.costCenter}
                onChange={(e) => handleChange('costCenter', e.target.value)}
                placeholder="SAP'den gelir"
              />
              {errors.costCenter && <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{errors.costCenter}</span>}
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">İstenen Tamamlanma Tarihi</label>
              <input
                type="date"
                className="modern-form-control"
                value={formData.requestedByDate}
                onChange={(e) => handleChange('requestedByDate', e.target.value)}
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Tahmini Maliyet</label>
              <input
                type="number"
                step="0.01"
                className="modern-form-control"
                value={formData.estimatedCost}
                onChange={(e) => handleChange('estimatedCost', e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="modern-form-group">
              <label className="modern-form-label">Para Birimi</label>
              <select
                className="modern-form-control"
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            {/* Notlar - Full Width */}
            <div className="modern-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="modern-form-label">Ek Notlar</label>
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

        {/* Form Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            type="button"
            className="modern-btn modern-btn-secondary"
            onClick={() => navigate('/job-requests')}
            disabled={submitting}
          >
            İptal
          </button>
          <button
            type="submit"
            className="modern-btn modern-btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Kaydediliyor...' : isEditMode ? 'Güncelle' : 'Oluştur'}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default JobRequestForm;
