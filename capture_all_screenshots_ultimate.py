#!/usr/bin/env python3
"""
Capture ALL screenshots for ultimate comprehensive analysis document
Includes all detail pages, modals, and full-page views
"""

import subprocess
import time
import os

base_path = '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app'
screenshots_dir = '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/ultimate'

# Create screenshots directory
os.makedirs(screenshots_dir, exist_ok=True)

# Define all pages with their configurations
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
        'name': '03_Is_Talebi_Detay_Corporate',
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
        'name': '05_Varlik_Detay',
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

# Modals to capture
modals_html = {
    'modal-yeni-is-talebi.html': '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 20px; background: #f5f5f5; }
        .modal { display: block !important; position: relative !important; }
        .modal-content { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
<div class="modal" id="newJobRequestModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Yeni İş Talebi Oluştur</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <form id="newJobRequestForm">
                <div class="form-group">
                    <label>Talep Başlığı *</label>
                    <input type="text" required placeholder="Örn: Boya Kabini Havalandırma Arızası">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Kategori *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="hvac">HVAC (İklimlendirme)</option>
                            <option value="electrical">Elektrik Sistemleri</option>
                            <option value="mechanical">Mekanik Ekipman</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Öncelik *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="urgent">Acil - Üretim Durdu</option>
                            <option value="high">Yüksek - Üretim Yavaşladı</option>
                            <option value="normal">Normal</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Talep Nedeni *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="ohs">İSG (OHS)</option>
                            <option value="energy">Enerji Tasarrufu</option>
                            <option value="improvement">Süreç İyileştirme</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Lokasyon *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="paint">Boya Tesisi</option>
                            <option value="assembly">Montaj Hattı</option>
                            <option value="warehouse">Depo</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Açıklama *</label>
                    <textarea rows="4" required placeholder="Sorunu detaylı açıklayınız..."></textarea>
                </div>
                <div class="form-group">
                    <label>İlişkili Varlık</label>
                    <select>
                        <option value="">Seçiniz...</option>
                        <option value="AST-001">CNC Torna - Şasi İşleme</option>
                        <option value="AST-002">Boya Kabini - Ana Hat</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-primary">Talep Oluştur</button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>''',

    'modal-varlik-ekle.html': '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 20px; background: #f5f5f5; }
        .modal { display: block !important; position: relative !important; }
        .modal-content { box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 900px; margin: 0 auto; }
    </style>
</head>
<body>
<div class="modal" id="addAssetModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Yeni Varlık Ekle</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <form id="addAssetForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>Varlık Adı *</label>
                        <input type="text" required placeholder="Örn: CNC Torna Makinesi">
                    </div>
                    <div class="form-group">
                        <label>SAP Varlık No</label>
                        <input type="text" placeholder="SAP'den otomatik gelecek">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Varlık Tipi *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="mechanic">Mekanik Ekipman</option>
                            <option value="electric">Elektrikli Ekipman</option>
                            <option value="hand-tools">El Aletleri</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Kategori *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="production">Üretim Ekipmanı</option>
                            <option value="maintenance">Bakım Ekipmanı</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Üretici</label>
                        <input type="text" placeholder="Örn: HAAS">
                    </div>
                    <div class="form-group">
                        <label>Model</label>
                        <input type="text" placeholder="Örn: ST-30">
                    </div>
                    <div class="form-group">
                        <label>Seri No</label>
                        <input type="text" placeholder="Örn: HAAS-ST30-2021-1234">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Lokasyon *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="chassis">Şasi Üretim Hattı</option>
                            <option value="paint">Boya Tesisi</option>
                            <option value="assembly">Montaj Hattı</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Alt Lokasyon 1</label>
                        <input type="text" placeholder="Örn: Alan A">
                    </div>
                    <div class="form-group">
                        <label>Alt Lokasyon 2</label>
                        <input type="text" placeholder="Örn: İstasyon 1">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Satın Alma Tarihi</label>
                        <input type="date">
                    </div>
                    <div class="form-group">
                        <label>Satın Alma Değeri</label>
                        <input type="number" placeholder="Örn: 900000">
                    </div>
                    <div class="form-group">
                        <label>Para Birimi</label>
                        <select>
                            <option value="TRY">TRY</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Açıklama</label>
                    <textarea rows="3" placeholder="Varlık hakkında ek bilgiler..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-primary">Varlık Ekle</button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>''',

    'modal-yeni-bakim.html': '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 20px; background: #f5f5f5; }
        .modal { display: block !important; position: relative !important; }
        .modal-content { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
<div class="modal" id="newMaintenanceModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Yeni Bakım Talebi Oluştur</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <form id="newMaintenanceForm">
                <div class="form-group">
                    <label>Bakım Başlığı *</label>
                    <input type="text" required placeholder="Örn: CNC Torna Periyodik Bakım">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Bakım Tipi *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="periodic">Periyodik Bakım</option>
                            <option value="preventive">Önleyici Bakım</option>
                            <option value="corrective">Düzeltici Bakım</option>
                            <option value="measured">Ölçüm Bazlı Bakım</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Öncelik *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="high">Yüksek</option>
                            <option value="normal">Normal</option>
                            <option value="low">Düşük</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Varlık Seçimi *</label>
                    <select required>
                        <option value="">Seçiniz...</option>
                        <option value="AST-001">CNC Torna Makinesi - Şasi İşleme</option>
                        <option value="AST-002">Boya Kabini - Ana Hat</option>
                        <option value="AST-003">Hidrolik Pres - Şasi</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Planlanan Tarih *</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Tahmini Süre (Saat)</label>
                        <input type="number" placeholder="Örn: 4">
                    </div>
                </div>
                <div class="form-group">
                    <label>Bakım Açıklaması *</label>
                    <textarea rows="4" required placeholder="Yapılacak bakım işlemlerini açıklayınız..."></textarea>
                </div>
                <div class="form-group">
                    <label>Sorumlu Ekip</label>
                    <select>
                        <option value="">Seçiniz...</option>
                        <option value="mechanical">Mekanik Bakım Ekibi</option>
                        <option value="electrical">Elektrik Bakım Ekibi</option>
                        <option value="electronics">Elektronik Bakım Ekibi</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-primary">Bakım Talebi Oluştur</button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>''',

    'modal-olay-bildir.html': '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/style-corporate.css">
    <style>
        body { margin: 0; padding: 20px; background: #f5f5f5; }
        .modal { display: block !important; position: relative !important; }
        .modal-content { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
<div class="modal" id="reportIncidentModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Acil Olay Bildir</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <form id="reportIncidentForm">
                <div class="form-group">
                    <label>Olay Başlığı *</label>
                    <input type="text" required placeholder="Örn: Elektrik Kesintisi - Boya Hattı">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Olay Tipi *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="breakdown">Ekipman Arızası</option>
                            <option value="safety">Güvenlik Olayı</option>
                            <option value="quality">Kalite Sorunu</option>
                            <option value="environmental">Çevre Olayı</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Aciliyet *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="critical">Kritik - Üretim Durdu</option>
                            <option value="high">Yüksek - Hızlı Müdahale</option>
                            <option value="medium">Orta</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Lokasyon *</label>
                        <select required>
                            <option value="">Seçiniz...</option>
                            <option value="paint">Boya Tesisi</option>
                            <option value="assembly">Montaj Hattı</option>
                            <option value="chassis">Şasi Üretim</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>İlişkili Varlık</label>
                        <select>
                            <option value="">Seçiniz...</option>
                            <option value="AST-001">CNC Torna - Şasi</option>
                            <option value="AST-002">Boya Kabini</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Olay Açıklaması *</label>
                    <textarea rows="4" required placeholder="Olayı detaylı açıklayınız. Ne oldu? Üretim durdu mu? Yaralanma var mı?"></textarea>
                </div>
                <div class="form-group">
                    <label>Alınan Acil Önlemler</label>
                    <textarea rows="3" placeholder="Şu ana kadar alınan önlemleri yazınız..."></textarea>
                </div>
                <div class="form-group" style="background: #FFF3CD; padding: 12px; border-radius: 4px; border-left: 3px solid #FFA500;">
                    <strong>⚠️ Uyarı:</strong> Kritik olaylar otomatik olarak ilgili tüm yöneticilere bildirilecektir.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">İptal</button>
                    <button type="submit" class="btn btn-danger">Acil Olay Bildir</button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>'''
}

print("="*80)
print("CAPTURING ALL SCREENSHOTS FOR ULTIMATE ANALYSIS DOCUMENT")
print("="*80)

# Capture main pages
print("\n1. CAPTURING MAIN PAGES:")
print("-"*80)

for page in pages:
    print(f"\n📸 Capturing: {page['name']}")
    print(f"   URL: {page['url']}")
    print(f"   Size: {page['width']}x{page['height']}")

    output_file = f"{screenshots_dir}/{page['name']}.png"

    cmd = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        f'--screenshot={output_file}',
        f'--window-size={page["width"]},{page["height"]}',
        page['url']
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        if os.path.exists(output_file):
            size_kb = os.path.getsize(output_file) / 1024
            print(f"   ✅ Screenshot saved: {size_kb:.1f} KB")
        else:
            print(f"   ❌ Failed to create screenshot")
            if result.stderr:
                print(f"   Error: {result.stderr}")
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")

    time.sleep(0.5)

# Create and capture modals
print("\n\n2. CAPTURING MODALS:")
print("-"*80)

modals_dir = f'{base_path}/modals-temp'
os.makedirs(modals_dir, exist_ok=True)

for modal_file, modal_html in modals_html.items():
    modal_path = f'{modals_dir}/{modal_file}'

    # Write modal HTML
    with open(modal_path, 'w', encoding='utf-8') as f:
        f.write(modal_html)

    modal_name = modal_file.replace('.html', '').replace('modal-', '').title()
    print(f"\n📸 Capturing Modal: {modal_name}")

    output_file = f"{screenshots_dir}/08_Modal_{modal_name.replace(' ', '_')}.png"

    cmd = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        f'--screenshot={output_file}',
        '--window-size=1200,1400',
        f'file://{modal_path}'
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        if os.path.exists(output_file):
            size_kb = os.path.getsize(output_file) / 1024
            print(f"   ✅ Modal screenshot saved: {size_kb:.1f} KB")
        else:
            print(f"   ❌ Failed to create modal screenshot")
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")

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
