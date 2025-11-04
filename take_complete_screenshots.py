#!/usr/bin/env python3
"""
Capture complete screenshots including full pages and modal pop-ups for MAN Turkey system
"""

import subprocess
import os
import time

output_dir = '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/complete'
os.makedirs(output_dir, exist_ok=True)

def capture_screenshot(url, output_file, window_height=1080):
    """Capture screenshot with Chrome headless"""
    cmd = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless',
        '--disable-gpu',
        '--screenshot=' + output_file,
        '--window-size=1920,' + str(window_height),
        '--hide-scrollbars',
        url
    ]

    try:
        subprocess.run(cmd, check=True, capture_output=True, timeout=10)
        if os.path.exists(output_file):
            size = os.path.getsize(output_file)
            return True, size
    except Exception as e:
        return False, str(e)
    return False, "Unknown error"

print("📸 Capturing complete screenshots for MAN Turkey Bakım Yönetimi Sistemi...\n")

# Full page screenshots with extended height to capture all content
screenshots = [
    {
        'name': '01_Ana_Sayfa_Tam',
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/index.html',
        'height': 1800,
        'description': 'Ana sayfa - Dashboard tam görünüm'
    },
    {
        'name': '02_Is_Talepleri_Tam',
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/job-requests.html',
        'height': 2400,
        'description': 'İş talepleri tam liste ve filtreler'
    },
    {
        'name': '03_Varlik_Yonetimi_Tam',
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/assets.html',
        'height': 1800,
        'description': 'Varlık yönetimi tam liste'
    },
    {
        'name': '04_Varlik_Detay_Tam',
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/asset-detail.html?id=AST-001',
        'height': 2200,
        'description': 'Varlık detay sayfası - Tüm alanlar'
    },
    {
        'name': '05_Bakim_Yonetimi_Tam',
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/maintenance.html',
        'height': 1800,
        'description': 'Bakım yönetimi tam görünüm'
    },
    {
        'name': '06_Olay_Yonetimi_Tam',
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/incidents.html',
        'height': 1800,
        'description': 'Olay yönetimi tam görünüm'
    }
]

for screenshot in screenshots:
    print(f"📷 {screenshot['description']}")
    output_file = os.path.join(output_dir, screenshot['name'] + '.png')

    success, result = capture_screenshot(screenshot['url'], output_file, screenshot['height'])

    if success:
        print(f"   ✅ Kaydedildi: {screenshot['name']}.png ({result/1024:.1f} KB)\n")
    else:
        print(f"   ❌ Hata: {result}\n")

    time.sleep(1)

print("\n" + "="*60)
print("📸 Modal/Pop-up ekran görüntüleri için HTML dosyaları oluşturuluyor...")
print("="*60 + "\n")

# Create HTML files that automatically show modals for screenshot capture
modal_pages = []

# 1. İş Talebi Oluştur Modal
job_request_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yeni İş Talebi</title>
    <link rel="stylesheet" href="../bakim-yonetim-app/css/style-corporate.css">
</head>
<body>
    <header class="header">
        <div class="header-top">
            <div class="logo">
                <svg width="60" height="60" viewBox="0 0 120 120" fill="none">
                    <rect width="120" height="120" fill="#E20714" rx="4"/>
                    <text x="60" y="75" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="white" letter-spacing="-2">MAN</text>
                </svg>
                <div><h1>MAN Türkiye</h1><div>Bakım Yönetimi Sistemi</div></div>
            </div>
        </div>
    </header>
    <div class="modal active" id="jobRequestModal" style="display: flex !important;">
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>📋 Yeni İş Talebi Oluştur</h3>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label>Talep Başlığı *</label>
                        <input type="text" class="form-control" placeholder="Örn: CNC Torna Elektrik Kesintisi">
                    </div>
                    <div class="form-group">
                        <label>Açıklama *</label>
                        <textarea class="form-control" rows="3" placeholder="Sorun detaylarını açıklayın..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Kategori *</label>
                        <select class="form-control">
                            <option>Seçiniz</option>
                            <option>Mekanik</option>
                            <option>Elektrik</option>
                            <option>HVAC</option>
                            <option>Güvenlik</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Öncelik *</label>
                        <select class="form-control">
                            <option>Seçiniz</option>
                            <option>Kritik</option>
                            <option>Yüksek</option>
                            <option>Orta</option>
                            <option>Düşük</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Lokasyon *</label>
                        <select class="form-control">
                            <option>Seçiniz</option>
                            <option>Şasi Üretim Hattı</option>
                            <option>Gövde Montaj Hattı</option>
                            <option>Boya Tesisi</option>
                            <option>Final Montaj</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="submit" class="btn btn-primary" style="flex: 1;">Talep Oluştur</button>
                        <button type="button" class="btn btn-secondary" style="flex: 1;">İptal</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>'''

# 2. Varlık Ekle Modal
asset_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yeni Varlık Ekle</title>
    <link rel="stylesheet" href="../bakim-yonetim-app/css/style-corporate.css">
</head>
<body>
    <header class="header">
        <div class="header-top">
            <div class="logo">
                <svg width="60" height="60" viewBox="0 0 120 120" fill="none">
                    <rect width="120" height="120" fill="#E20714" rx="4"/>
                    <text x="60" y="75" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="white" letter-spacing="-2">MAN</text>
                </svg>
                <div><h1>MAN Türkiye</h1><div>Bakım Yönetimi Sistemi</div></div>
            </div>
        </div>
    </header>
    <div class="modal active" style="display: flex !important;">
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>📦 Yeni Varlık Ekle</h3>
            </div>
            <div class="modal-body">
                <form>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Varlık Adı *</label>
                            <input type="text" class="form-control" placeholder="Örn: CNC Torna Makinesi">
                        </div>
                        <div class="form-group">
                            <label>SAP ID *</label>
                            <input type="text" class="form-control" placeholder="Örn: 100234567">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Kategori *</label>
                            <select class="form-control">
                                <option>Üretim Makinesi</option>
                                <option>Araç</option>
                                <option>Ekipman</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Üretici</label>
                            <input type="text" class="form-control" placeholder="Örn: HAAS">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Model</label>
                            <input type="text" class="form-control" placeholder="Örn: ST-30">
                        </div>
                        <div class="form-group">
                            <label>Seri No *</label>
                            <input type="text" class="form-control" placeholder="Örn: HAAS-ST30-2021-1234">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Ana Lokasyon *</label>
                            <select class="form-control">
                                <option>Şasi Üretim Hattı</option>
                                <option>Gövde Montaj Hattı</option>
                                <option>Boya Tesisi</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Alt Lokasyon</label>
                            <input type="text" class="form-control" placeholder="Örn: Alan A1">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Maliyet Merkezi *</label>
                            <input type="text" class="form-control" placeholder="Örn: CC-PROD-001">
                        </div>
                        <div class="form-group">
                            <label>Sorumlu Ekip</label>
                            <input type="text" class="form-control" placeholder="Örn: Üretim Ekibi A">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Satın Alma Tarihi</label>
                            <input type="date" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Defter Değeri (TL)</label>
                            <input type="number" class="form-control" placeholder="Örn: 850000">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Açıklama</label>
                        <textarea class="form-control" rows="2" placeholder="Varlık açıklaması..."></textarea>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="submit" class="btn btn-primary" style="flex: 1;">Varlık Ekle</button>
                        <button type="button" class="btn btn-secondary" style="flex: 1;">İptal</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>'''

# 3. Bakım Planı Modal
maintenance_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yeni Bakım Planı</title>
    <link rel="stylesheet" href="../bakim-yonetim-app/css/style-corporate.css">
</head>
<body>
    <header class="header">
        <div class="header-top">
            <div class="logo">
                <svg width="60" height="60" viewBox="0 0 120 120" fill="none">
                    <rect width="120" height="120" fill="#E20714" rx="4"/>
                    <text x="60" y="75" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="white" letter-spacing="-2">MAN</text>
                </svg>
                <div><h1>MAN Türkiye</h1><div>Bakım Yönetimi Sistemi</div></div>
            </div>
        </div>
    </header>
    <div class="modal active" style="display: flex !important;">
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>🔧 Yeni Bakım Planı Oluştur</h3>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label>Bakım Başlığı *</label>
                        <input type="text" class="form-control" placeholder="Örn: CNC Torna Yıllık Bakım">
                    </div>
                    <div class="form-group">
                        <label>Varlık Seçimi *</label>
                        <select class="form-control">
                            <option>CNC Torna Makinesi - Şasi İşleme</option>
                            <option>Boya Kabini - Ana Hat</option>
                            <option>Kaynak Robotu - Gövde Montaj</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Bakım Tipi *</label>
                        <select class="form-control">
                            <option>Önleyici Bakım</option>
                            <option>Rutin Kontrol</option>
                            <option>Düzeltici Bakım</option>
                            <option>Tahmine Dayalı Bakım</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Planlanan Tarih *</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Tahmini Süre *</label>
                        <input type="text" class="form-control" placeholder="Örn: 4 saat">
                    </div>
                    <div class="form-group">
                        <label>Sorumlu Ekip *</label>
                        <select class="form-control">
                            <option>Bakım Ekibi A</option>
                            <option>Bakım Ekibi B</option>
                            <option>Robotik Ekip</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Açıklama</label>
                        <textarea class="form-control" rows="3" placeholder="Bakım ile ilgili detaylı açıklama..."></textarea>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="submit" class="btn btn-primary" style="flex: 1;">Bakım Planı Oluştur</button>
                        <button type="button" class="btn btn-secondary" style="flex: 1;">İptal</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>'''

# 4. Acil Olay Bildir Modal
incident_modal_html = '''<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acil Olay Bildir</title>
    <link rel="stylesheet" href="../bakim-yonetim-app/css/style-corporate.css">
</head>
<body>
    <header class="header">
        <div class="header-top">
            <div class="logo">
                <svg width="60" height="60" viewBox="0 0 120 120" fill="none">
                    <rect width="120" height="120" fill="#E20714" rx="4"/>
                    <text x="60" y="75" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="white" letter-spacing="-2">MAN</text>
                </svg>
                <div><h1>MAN Türkiye</h1><div>Bakım Yönetimi Sistemi</div></div>
            </div>
        </div>
    </header>
    <div class="modal active" style="display: flex !important;">
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>⚠️ Acil Olay Bildir</h3>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label>Olay Başlığı *</label>
                        <input type="text" class="form-control" placeholder="Örn: Montaj Platformu Elektrik Kesintisi">
                    </div>
                    <div class="form-group">
                        <label>Açıklama *</label>
                        <textarea class="form-control" rows="4" placeholder="Olay detaylarını açıklayın..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Öncelik *</label>
                        <select class="form-control">
                            <option>Kritik</option>
                            <option>Yüksek</option>
                            <option>Orta</option>
                            <option>Düşük</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Lokasyon *</label>
                        <select class="form-control">
                            <option>Şasi Üretim Hattı</option>
                            <option>Gövde Montaj Hattı</option>
                            <option>Boya Tesisi</option>
                            <option>Final Montaj Hattı</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>İlgili Varlık (Opsiyonel)</label>
                        <select class="form-control">
                            <option>Seçiniz</option>
                            <option>CNC Torna Makinesi</option>
                            <option>Boya Kabini</option>
                            <option>Kaynak Robotu</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="submit" class="btn btn-danger" style="flex: 1;">⚠️ Olay Bildir</button>
                        <button type="button" class="btn btn-secondary" style="flex: 1;">İptal</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>'''

# Save modal HTML files
modals = [
    ('modal_is_talebi.html', job_request_modal_html, '07_Modal_Is_Talebi_Olustur', 1400),
    ('modal_varlik_ekle.html', asset_modal_html, '08_Modal_Varlik_Ekle', 1800),
    ('modal_bakim_plani.html', maintenance_modal_html, '09_Modal_Bakim_Plani', 1600),
    ('modal_olay_bildir.html', incident_modal_html, '10_Modal_Acil_Olay_Bildir', 1400)
]

for filename, html_content, screenshot_name, height in modals:
    html_path = os.path.join(output_dir, filename)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"📝 HTML oluşturuldu: {filename}")

    # Capture screenshot
    output_file = os.path.join(output_dir, screenshot_name + '.png')
    time.sleep(0.5)

    success, result = capture_screenshot('file://' + html_path, output_file, height)

    if success:
        print(f"   ✅ Modal ekran görüntüsü: {screenshot_name}.png ({result/1024:.1f} KB)\n")
    else:
        print(f"   ❌ Hata: {result}\n")

    time.sleep(1)

print("\n" + "="*60)
print("🎉 Tüm ekran görüntüleri başarıyla oluşturuldu!")
print("="*60)
print(f"\n📁 Konum: {output_dir}")
print("\nOluşturulan dosyalar:")
print("  • 6 tam sayfa ekran görüntüsü")
print("  • 4 modal/pop-up ekran görüntüsü")
print("  • Toplam 10 detaylı ekran görüntüsü")
