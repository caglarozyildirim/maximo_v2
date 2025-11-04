#!/usr/bin/env python3
"""
Capture ALL fixed screenshots with corrected modals and pages
"""

import subprocess
import time
import os

base_path = '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app'
screenshots_dir = '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/fixed'

# Create screenshots directory
os.makedirs(screenshots_dir, exist_ok=True)

print("="*80)
print("CAPTURING ALL FIXED SCREENSHOTS")
print("="*80)

# All main pages
pages = [
    {
        'name': '01_Ana_Sayfa_Dashboard',
        'url': f'file://{base_path}/index.html',
        'width': 1920,
        'height': 2400
    },
    {
        'name': '02_Is_Talepleri_Liste',
        'url': f'file://{base_path}/pages/job-requests.html',
        'width': 1920,
        'height': 2200
    },
    {
        'name': '03_Is_Talebi_Detay',
        'url': f'file://{base_path}/pages/job-request-detail.html?id=JR-2025-001',
        'width': 1920,
        'height': 2800
    },
    {
        'name': '04_Varlik_Yonetimi_Liste',
        'url': f'file://{base_path}/pages/assets.html',
        'width': 1920,
        'height': 2200
    },
    {
        'name': '05_Varlik_Detay_Fixed',
        'url': f'file://{base_path}/pages/asset-detail.html?id=AST-001',
        'width': 1920,
        'height': 2800
    },
    {
        'name': '06_Bakim_Yonetimi',
        'url': f'file://{base_path}/pages/maintenance.html',
        'width': 1920,
        'height': 2400
    },
    {
        'name': '07_Olay_Yonetimi',
        'url': f'file://{base_path}/pages/incidents.html',
        'width': 1920,
        'height': 2400
    }
]

def capture_screenshot(url, output_file, width, height):
    """Capture screenshot with Chrome"""
    cmd = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        f'--screenshot={output_file}',
        f'--window-size={width},{height}',
        url
    ]

    try:
        subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        if os.path.exists(output_file):
            size_kb = os.path.getsize(output_file) / 1024
            return True, size_kb
        return False, 0
    except Exception as e:
        return False, str(e)

# Capture main pages
print("\n1. CAPTURING MAIN PAGES:")
print("-"*80)

for page in pages:
    print(f"\n📸 {page['name']}")
    output_file = f"{screenshots_dir}/{page['name']}.png"
    success, size = capture_screenshot(page['url'], output_file, page['width'], page['height'])
    if success:
        print(f"   ✅ {size:.1f} KB")
    else:
        print(f"   ❌ Failed: {size}")
    time.sleep(0.5)

# Create improved modals with better styling
print("\n\n2. CREATING IMPROVED MODALS:")
print("-"*80)

modals_dir = f'{base_path}/modals-fixed'
os.makedirs(modals_dir, exist_ok=True)

# Modal: Yeni İş Talebi (Job Request Create)
job_request_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body {
            margin: 0;
            padding: 40px;
            background: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }
        .modal-content {
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            border-radius: 8px;
            background: white;
            max-width: 900px;
            margin: 0 auto;
        }
        .modal-header {
            background: #E20714;
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h2 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        .modal-body {
            padding: 2rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
            font-size: 0.95rem;
        }
        .form-group label span {
            color: #E20714;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 0.95rem;
            box-sizing: border-box;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #E20714;
            box-shadow: 0 0 0 3px rgba(226, 7, 20, 0.1);
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        .modal-footer {
            padding: 1.5rem 2rem;
            background: #f8f9fa;
            border-radius: 0 0 8px 8px;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-primary {
            background: #E20714;
            color: white;
        }
        .btn-primary:hover {
            background: #c00610;
        }
        .btn-secondary {
            background: white;
            color: #666;
            border: 1px solid #ddd;
        }
        .btn-secondary:hover {
            background: #f8f9fa;
        }
    </style>
</head>
<body>
    <div class="modal-content">
        <div class="modal-header">
            <h2>✏️ Yeni İş Talebi Oluştur</h2>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label>Talep Başlığı <span>*</span></label>
                    <input type="text" value="Boya Kabini Havalandırma Sistemi Arızası" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Kategori <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="hvac" selected>HVAC (İklimlendirme)</option>
                            <option value="electrical">Elektrik Sistemleri</option>
                            <option value="mechanical">Mekanik Ekipman</option>
                            <option value="plumbing">Sıhhi Tesisat</option>
                            <option value="building">Bina Onarımı</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Öncelik <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="urgent">Acil - Üretim Durdu</option>
                            <option value="high" selected>Yüksek - Üretim Yavaşladı</option>
                            <option value="normal">Normal</option>
                            <option value="low">Düşük</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Talep Nedeni <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="ohs" selected>İSG (OHS - Occupational Health & Safety)</option>
                            <option value="energy">Enerji Tasarrufu (Energy Saving)</option>
                            <option value="environment">Çevre (Environment)</option>
                            <option value="improvement">Süreç İyileştirme (Process Improvement)</option>
                            <option value="investment">Yatırım (Investment)</option>
                            <option value="renovation">Yenileme (Renovation)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Lokasyon <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="paint" selected>Boya Tesisi</option>
                            <option value="assembly">Montaj Hattı</option>
                            <option value="chassis">Şasi Üretim</option>
                            <option value="warehouse">Depo</option>
                            <option value="office">Ofis</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Alt Lokasyon 1</label>
                        <input type="text" value="Ana Boya Hattı" placeholder="Örn: Ana Boya Hattı">
                    </div>
                    <div class="form-group">
                        <label>Alt Lokasyon 2</label>
                        <input type="text" value="Kabin 1" placeholder="Örn: Kabin 1">
                    </div>
                </div>

                <div class="form-group">
                    <label>Açıklama <span>*</span></label>
                    <textarea rows="4" required>Ana boya kabininde havalandırma sistemi yetersiz çalışıyor. Boya buharı kabinde kalıyor, çalışanlar etkileniyor. Hemen müdahale gerekiyor.</textarea>
                </div>

                <div class="form-group">
                    <label>İlişkili Varlık</label>
                    <select>
                        <option value="">Seçiniz...</option>
                        <option value="AST-001">AST-001 - CNC Torna Makinesi - Şasi İşleme</option>
                        <option value="AST-002" selected>AST-002 - Boya Kabini - Ana Hat</option>
                        <option value="AST-003">AST-003 - Hidrolik Pres - Şasi Tesisi</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>İstenen Tamamlanma Tarihi</label>
                    <input type="date" value="2025-10-15">
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-primary">✓ Talep Oluştur</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>'''

# Save and capture job request modal
modal_path = f'{modals_dir}/modal-yeni-is-talebi.html'
with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(job_request_modal_html)

print(f"\n📸 Yeni İş Talebi Modal")
output_file = f"{screenshots_dir}/08_Modal_Yeni_Is_Talebi_Fixed.png"
success, size = capture_screenshot(f'file://{modal_path}', output_file, 1200, 1800)
if success:
    print(f"   ✅ {size:.1f} KB")
else:
    print(f"   ❌ Failed")
time.sleep(0.5)

# Modal: Varlık Ekle
asset_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 40px; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
        .modal-content { box-shadow: 0 10px 40px rgba(0,0,0,0.15); border-radius: 8px; background: white; max-width: 1000px; margin: 0 auto; }
        .modal-header { background: #E20714; color: white; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0; }
        .modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 600; }
        .modal-body { padding: 2rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #333; font-size: 0.95rem; }
        .form-group label span { color: #E20714; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.95rem; box-sizing: border-box; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #E20714; box-shadow: 0 0 0 3px rgba(226, 7, 20, 0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .modal-footer { padding: 1.5rem 2rem; background: #f8f9fa; border-radius: 0 0 8px 8px; display: flex; justify-content: flex-end; gap: 1rem; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background: #E20714; color: white; }
        .btn-primary:hover { background: #c00610; }
        .btn-secondary { background: white; color: #666; border: 1px solid #ddd; }
        .btn-secondary:hover { background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="modal-content">
        <div class="modal-header">
            <h2>📦 Yeni Varlık Ekle</h2>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-row-2">
                    <div class="form-group">
                        <label>Varlık Adı <span>*</span></label>
                        <input type="text" value="Robot Kaynak Makinesi" required>
                    </div>
                    <div class="form-group">
                        <label>SAP Varlık No</label>
                        <input type="text" value="100234999" placeholder="SAP'den otomatik gelecek">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Varlık Tipi <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="hand-tools">El Aletleri (Hand tools)</option>
                            <option value="electric">Elektrikli Ekipman (Electric)</option>
                            <option value="construction">İnşaat Ekipmanı (Construction)</option>
                            <option value="tool-counter">Alet - Sayaç (Tool – Counter)</option>
                            <option value="mechanic" selected>Mekanik (Mechanic)</option>
                            <option value="office">Ofis Ekipmanı (Office)</option>
                            <option value="meeting">Toplantı Odası (Meeting room)</option>
                            <option value="other">Diğer (Other)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Kategori <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="production" selected>Üretim Ekipmanı</option>
                            <option value="maintenance">Bakım Ekipmanı</option>
                            <option value="quality">Kalite Kontrol</option>
                            <option value="safety">Güvenlik</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Durum <span>*</span></label>
                        <select required>
                            <option value="active" selected>Aktif (Active)</option>
                            <option value="inactive">Pasif (Inactive)</option>
                            <option value="maintenance">Bakımda (Maintenance)</option>
                            <option value="faulty">Arızalı (Faulty)</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Üretici</label>
                        <input type="text" value="KUKA Robotics" placeholder="Örn: HAAS">
                    </div>
                    <div class="form-group">
                        <label>Model</label>
                        <input type="text" value="KR 120 R3200" placeholder="Örn: ST-30">
                    </div>
                    <div class="form-group">
                        <label>Seri No</label>
                        <input type="text" value="KUKA-KR120-2024-5678" placeholder="Örn: HAAS-ST30-2021-1234">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Lokasyon <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="chassis">Şasi Üretim Hattı</option>
                            <option value="paint">Boya Tesisi</option>
                            <option value="assembly" selected>Montaj Hattı</option>
                            <option value="warehouse">Depo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Alt Lokasyon 1</label>
                        <input type="text" value="Alan B" placeholder="Örn: Alan A">
                    </div>
                    <div class="form-group">
                        <label>Alt Lokasyon 2</label>
                        <input type="text" value="İstasyon 3" placeholder="Örn: İstasyon 1">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Satın Alma Tarihi</label>
                        <input type="date" value="2024-03-15">
                    </div>
                    <div class="form-group">
                        <label>Satın Alma Değeri (TRY)</label>
                        <input type="number" value="1500000" placeholder="Örn: 900000">
                    </div>
                    <div class="form-group">
                        <label>Para Birimi</label>
                        <select>
                            <option value="TRY" selected>TRY (Türk Lirası)</option>
                            <option value="EUR">EUR (Euro)</option>
                            <option value="USD">USD (Dolar)</option>
                        </select>
                    </div>
                </div>

                <div class="form-row-2">
                    <div class="form-group">
                        <label>Maliyet Merkezi <span>*</span></label>
                        <input type="text" value="CC-ASSEMBLY-001" placeholder="Örn: CC-PROD-001" required>
                    </div>
                    <div class="form-group">
                        <label>Zimmetli Kişi/Ekip</label>
                        <input type="text" value="Montaj Ekibi B" placeholder="Örn: Üretim Ekibi A">
                    </div>
                </div>

                <div class="form-group">
                    <label>Açıklama</label>
                    <textarea rows="3" placeholder="Varlık hakkında ek bilgiler...">Otobüs gövde kaynağı için kullanılan robot kaynak sistemi. Programlanabilir 6 eksenli robot kol.</textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-primary">✓ Varlık Ekle</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>'''

modal_path = f'{modals_dir}/modal-varlik-ekle.html'
with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(asset_modal_html)

print(f"\n📸 Varlık Ekle Modal")
output_file = f"{screenshots_dir}/09_Modal_Varlik_Ekle_Fixed.png"
success, size = capture_screenshot(f'file://{modal_path}', output_file, 1300, 2000)
if success:
    print(f"   ✅ {size:.1f} KB")
else:
    print(f"   ❌ Failed")
time.sleep(0.5)

# Modal: Yeni Bakım Planı
maintenance_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 40px; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
        .modal-content { box-shadow: 0 10px 40px rgba(0,0,0,0.15); border-radius: 8px; background: white; max-width: 900px; margin: 0 auto; }
        .modal-header { background: #E20714; color: white; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0; }
        .modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 600; }
        .modal-body { padding: 2rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #333; font-size: 0.95rem; }
        .form-group label span { color: #E20714; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.95rem; box-sizing: border-box; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #E20714; box-shadow: 0 0 0 3px rgba(226, 7, 20, 0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .modal-footer { padding: 1.5rem 2rem; background: #f8f9fa; border-radius: 0 0 8px 8px; display: flex; justify-content: flex-end; gap: 1rem; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background: #E20714; color: white; }
        .btn-primary:hover { background: #c00610; }
        .btn-secondary { background: white; color: #666; border: 1px solid #ddd; }
        .btn-secondary:hover { background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="modal-content">
        <div class="modal-header">
            <h2>🔧 Yeni Bakım Planı Oluştur</h2>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label>Bakım Planı Başlığı <span>*</span></label>
                    <input type="text" value="CNC Torna Makinesi - Yıllık Periyodik Bakım" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Bakım Tipi <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="periodic" selected>Periyodik Bakım (Periodic Maintenance)</option>
                            <option value="measured">Ölçüm Bazlı Bakım (Measured Maintenance)</option>
                            <option value="preventive">Önleyici Bakım (Preventive Maintenance)</option>
                            <option value="corrective">Düzeltici Bakım (Corrective Maintenance)</option>
                            <option value="mass">Toplu Bakım (Mass Maintenance)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Öncelik <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="urgent">Acil</option>
                            <option value="high" selected>Yüksek</option>
                            <option value="normal">Normal</option>
                            <option value="low">Düşük</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Varlık Seçimi <span>*</span></label>
                    <select required>
                        <option value="">Seçiniz...</option>
                        <option value="AST-001" selected>AST-001 - CNC Torna Makinesi - Şasi İşleme</option>
                        <option value="AST-002">AST-002 - Boya Kabini - Ana Hat</option>
                        <option value="AST-003">AST-003 - Hidrolik Pres - Şasi Tesisi</option>
                        <option value="AST-004">AST-004 - Kompresör Sistemi - Santral</option>
                        <option value="AST-005">AST-005 - Robot Kaynak - Montaj</option>
                    </select>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Planlanan Başlangıç Tarihi <span>*</span></label>
                        <input type="date" value="2025-12-15" required>
                    </div>
                    <div class="form-group">
                        <label>Tahmini Süre (Saat)</label>
                        <input type="number" value="4" placeholder="Örn: 4">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Tekrar Periyodu</label>
                        <select>
                            <option value="">Tek Seferlik</option>
                            <option value="weekly">Haftalık</option>
                            <option value="monthly">Aylık</option>
                            <option value="quarterly">3 Aylık</option>
                            <option value="semi-annual">6 Aylık</option>
                            <option value="annual" selected>Yıllık</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Sorumlu Ekip</label>
                        <select>
                            <option value="">Seçiniz...</option>
                            <option value="mechanical" selected>Mekanik Bakım Ekibi</option>
                            <option value="electrical">Elektrik Bakım Ekibi</option>
                            <option value="electronics">Elektronik Bakım Ekibi</option>
                            <option value="automation">Otomasyon Ekibi</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Bakım Açıklaması <span>*</span></label>
                    <textarea rows="5" required>Yıllık rutin bakım işlemleri:
- Yağ ve filtre değişimi
- Rulman kontrolü ve greslemesi
- Elektrik bağlantıları kontrolü
- Pnömatik sistem kontrolü
- Hassasiyet kalibrasyon testi
- Genel temizlik ve bakım</textarea>
                </div>

                <div class="form-group">
                    <label>Gerekli Malzemeler</label>
                    <textarea rows="3" placeholder="Yedek parça ve malzeme listesi...">- Hidrolik yağ (20L)
- Yağ filtreleri (2 adet)
- Rulman gresi (1kg)
- Temizlik malzemeleri</textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Tahmini Maliyet (TRY)</label>
                        <input type="number" value="5000" placeholder="Örn: 5000">
                    </div>
                    <div class="form-group">
                        <label>Maliyet Merkezi</label>
                        <input type="text" value="CC-MAINT-001" placeholder="Örn: CC-MAINT-001">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-primary">✓ Bakım Planı Oluştur</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>'''

modal_path = f'{modals_dir}/modal-yeni-bakim.html'
with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(maintenance_modal_html)

print(f"\n📸 Yeni Bakım Planı Modal")
output_file = f"{screenshots_dir}/10_Modal_Yeni_Bakim_Plani_Fixed.png"
success, size = capture_screenshot(f'file://{modal_path}', output_file, 1200, 2200)
if success:
    print(f"   ✅ {size:.1f} KB")
else:
    print(f"   ❌ Failed")
time.sleep(0.5)

# Modal: Olay Bildir
incident_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 40px; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
        .modal-content { box-shadow: 0 10px 40px rgba(0,0,0,0.15); border-radius: 8px; background: white; max-width: 900px; margin: 0 auto; }
        .modal-header { background: #E20714; color: white; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0; }
        .modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 600; }
        .modal-body { padding: 2rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #333; font-size: 0.95rem; }
        .form-group label span { color: #E20714; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.95rem; box-sizing: border-box; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #E20714; box-shadow: 0 0 0 3px rgba(226, 7, 20, 0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .warning-box { background: #FFF3CD; padding: 1rem; border-radius: 4px; border-left: 4px solid #FFA500; margin-bottom: 1.5rem; }
        .warning-box strong { color: #FFA500; }
        .modal-footer { padding: 1.5rem 2rem; background: #f8f9fa; border-radius: 0 0 8px 8px; display: flex; justify-content: flex-end; gap: 1rem; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-danger { background: #E20714; color: white; }
        .btn-danger:hover { background: #c00610; }
        .btn-secondary { background: white; color: #666; border: 1px solid #ddd; }
        .btn-secondary:hover { background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="modal-content">
        <div class="modal-header">
            <h2>⚠️ Acil Olay Bildir</h2>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label>Olay Başlığı <span>*</span></label>
                    <input type="text" value="Elektrik Kesintisi - Ana Boya Hattı" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Olay Tipi <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="breakdown" selected>Ekipman Arızası (Equipment Breakdown)</option>
                            <option value="safety">Güvenlik Olayı (Safety Incident)</option>
                            <option value="quality">Kalite Sorunu (Quality Issue)</option>
                            <option value="environmental">Çevre Olayı (Environmental Incident)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Aciliyet <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="critical" selected>Kritik - Üretim Durdu</option>
                            <option value="high">Yüksek - Hızlı Müdahale</option>
                            <option value="medium">Orta</option>
                            <option value="low">Düşük</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Lokasyon <span>*</span></label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="chassis">Şasi Üretim Hattı</option>
                            <option value="paint" selected>Boya Tesisi</option>
                            <option value="assembly">Montaj Hattı</option>
                            <option value="warehouse">Depo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>İlişkili Varlık</label>
                        <select>
                            <option value="">Seçiniz...</option>
                            <option value="AST-001">AST-001 - CNC Torna</option>
                            <option value="AST-002" selected>AST-002 - Boya Kabini - Ana Hat</option>
                            <option value="AST-003">AST-003 - Hidrolik Pres</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Olay Açıklaması <span>*</span></label>
                    <textarea rows="4" required>Ana boya hattında ani elektrik kesintisi oldu. Tüm boya robotları durdu. 15 adet otobüs yarı boyalı halde bekliyor. Hemen elektrik ekibinin müdahale etmesi gerekiyor.</textarea>
                </div>

                <div class="form-group">
                    <label>Alınan Acil Önlemler</label>
                    <textarea rows="3" placeholder="Şu ana kadar alınan önlemleri yazınız...">- Elektrik panosu kontrol edildi
- Sigorta atması tespit edildi
- Elektrik ekibi çağrıldı
- Yarı boyalı ürünler koruma altına alındı</textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Üretim Durumu</label>
                        <select>
                            <option value="stopped" selected>Üretim Durdu</option>
                            <option value="slowed">Üretim Yavaşladı</option>
                            <option value="normal">Normal Devam Ediyor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Yaralanma/Kaza Var mı?</label>
                        <select>
                            <option value="no" selected>Hayır</option>
                            <option value="yes">Evet - Detay Ekle</option>
                        </select>
                    </div>
                </div>

                <div class="warning-box">
                    <strong>⚠️ Önemli Uyarı:</strong><br>
                    Kritik olaylar otomatik olarak ilgili tüm yöneticilere, bakım ekibine ve güvenlik birimine bildirilecektir.
                    SMS ve e-posta ile anında bildirim gönderilir.
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-danger">⚠️ Acil Olay Bildir</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>'''

modal_path = f'{modals_dir}/modal-olay-bildir.html'
with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(incident_modal_html)

print(f"\n📸 Olay Bildir Modal")
output_file = f"{screenshots_dir}/11_Modal_Olay_Bildir_Fixed.png"
success, size = capture_screenshot(f'file://{modal_path}', output_file, 1200, 1900)
if success:
    print(f"   ✅ {size:.1f} KB")
else:
    print(f"   ❌ Failed")
time.sleep(0.5)

print("\n" + "="*80)
print("SCREENSHOT CAPTURE COMPLETE")
print("="*80)

# List all captured screenshots
screenshots = sorted([f for f in os.listdir(screenshots_dir) if f.endswith('.png')])
print(f"\n✅ Total screenshots captured: {len(screenshots)}")
for screenshot in screenshots:
    size_kb = os.path.getsize(f'{screenshots_dir}/{screenshot}') / 1024
    print(f"   - {screenshot} ({size_kb:.1f} KB)")

print(f"\n📁 Screenshots saved to: {screenshots_dir}")
