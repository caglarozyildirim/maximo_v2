#!/usr/bin/env python3
"""
Tüm HTML sayfalarından ekran görüntüsü al
"""

import os
from playwright.sync_api import sync_playwright

BASE_DIR = "/Users/caglarozyildirim/WebstormProjects/Deneme"
APP_DIR = f"{BASE_DIR}/bakim-yonetim-app"
OUTPUT_DIR = f"{BASE_DIR}/screenshots"

# Ekran görüntüsü alınacak sayfalar
PAGES = [
    {"file": "index.html", "output": "01_ana_sayfa.png"},
    {"file": "pages/job-requests.html", "output": "02_is_talepleri_liste.png"},
    {"file": "pages/job-request-detail.html", "output": "03_is_talepleri_detay.png"},
    {"file": "pages/job-request-create.html", "output": "04_is_talepleri_olustur.png"},
    {"file": "pages/assets.html", "output": "05_varliklar_liste.png"},
    {"file": "pages/asset-detail.html", "output": "06_varliklar_detay.png"},
    {"file": "pages/maintenance.html", "output": "07_bakim_liste.png"},
    {"file": "pages/maintenance-detail.html", "output": "08_bakim_detay.png"},
    {"file": "pages/maintenance-create.html", "output": "09_bakim_olustur.png"},
    {"file": "pages/incidents.html", "output": "10_olaylar_liste.png"},
    {"file": "pages/incident-detail.html", "output": "11_olaylar_detay.png"},
    {"file": "pages/incident-create.html", "output": "12_olaylar_olustur.png"},
    {"file": "pages/reports.html", "output": "13_raporlar.png"},
]

def capture_screenshots():
    """Tüm sayfalarda ekran görüntüsü al"""

    # Output klasörü oluştur
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Ekran görüntüleri alınıyor...")
    print(f"Output klasör: {OUTPUT_DIR}")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        for idx, page_info in enumerate(PAGES, 1):
            html_path = f"{APP_DIR}/{page_info['file']}"
            output_path = f"{OUTPUT_DIR}/{page_info['output']}"

            if not os.path.exists(html_path):
                print(f"❌ [{idx}/{len(PAGES)}] BULUNAMADI: {html_path}")
                continue

            try:
                page.goto(f'file://{html_path}')
                page.wait_for_timeout(1000)  # 1 saniye bekle
                page.screenshot(path=output_path, full_page=True)

                file_size = os.path.getsize(output_path) / 1024  # KB
                print(f"✅ [{idx}/{len(PAGES)}] {page_info['output']} ({file_size:.1f} KB)")
            except Exception as e:
                print(f"❌ [{idx}/{len(PAGES)}] HATA: {page_info['file']} - {str(e)}")

        browser.close()

    print(f"\n{'='*60}")
    print(f"Ekran görüntüleri alındı: {OUTPUT_DIR}")
    print(f"Toplam: {len([f for f in os.listdir(OUTPUT_DIR) if f.endswith('.png')])} dosya")
    print(f"{'='*60}")

if __name__ == "__main__":
    capture_screenshots()
