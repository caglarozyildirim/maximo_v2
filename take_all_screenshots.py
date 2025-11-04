#!/usr/bin/env python3
import subprocess
import os
import time

# Paths
base_path = '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app'
screenshot_dir = '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots_full'
chrome_path = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

# Create screenshot directory
os.makedirs(screenshot_dir, exist_ok=True)

# Pages to screenshot
pages = [
    ('index.html', '01_ana_sayfa.png', 1400, 1200),
    ('pages/job-requests.html', '02_is_talepleri_liste.png', 1400, 1400),
    ('pages/assets.html', '03_varlik_yonetimi_liste.png', 1400, 1000),
    ('pages/asset-detail.html?id=AST-001', '04_varlik_detay.png', 1400, 1400),
    ('pages/maintenance.html', '05_bakim_yonetimi.png', 1400, 1000),
    ('pages/incidents.html', '06_olay_yonetimi.png', 1400, 1000),
]

print("MAN Türkiye Bakım Yönetimi - Screenshot Alma Başladı\n")

for html_file, output_name, width, height in pages:
    html_path = os.path.join(base_path, html_file)
    output_path = os.path.join(screenshot_dir, output_name)

    print(f"📸 Alınıyor: {output_name} ({width}x{height})")

    cmd = [
        chrome_path,
        '--headless',
        '--disable-gpu',
        f'--screenshot={output_path}',
        f'--window-size={width},{height}',
        f'file://{html_path}'
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, timeout=10, text=True)
        if os.path.exists(output_path):
            file_size = os.path.getsize(output_path) / 1024
            print(f"   ✅ Başarılı: {file_size:.1f} KB\n")
        else:
            print(f"   ❌ Hata: Dosya oluşturulamadı\n")
            if result.stderr:
                print(f"   Error: {result.stderr}\n")
    except subprocess.TimeoutExpired:
        print(f"   ❌ Timeout: 10 saniye aşıldı\n")
    except Exception as e:
        print(f"   ❌ Hata: {str(e)}\n")

    time.sleep(0.5)

print("\n🎉 Tüm screenshot'lar alındı!")
print(f"📁 Klasör: {screenshot_dir}")
