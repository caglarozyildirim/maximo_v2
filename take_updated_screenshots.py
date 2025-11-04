#!/usr/bin/env python3
"""
Guncel HTML dosyalarindan ekran goruntuleri al
"""
from playwright.sync_api import sync_playwright
import time
import json

# Tum HTML sayfalari
pages = [
    {
        'name': '01_ana_sayfa',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/index.html',
        'title': 'Ana Sayfa - Dashboard'
    },
    {
        'name': '02_is_talepleri_liste',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/job-requests.html',
        'title': 'Is Talepleri - Liste'
    },
    {
        'name': '03_is_talepleri_detay',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/job-request-detail.html',
        'title': 'Is Talepleri - Detay'
    },
    {
        'name': '04_is_talepleri_olustur',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/job-request-create.html',
        'title': 'Is Talepleri - Yeni Talep Olustur'
    },
    {
        'name': '05_varliklar_liste',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/assets.html',
        'title': 'Varlik Yonetimi - Liste'
    },
    {
        'name': '06_varliklar_detay',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/asset-detail.html',
        'title': 'Varlik Yonetimi - Detay'
    },
    {
        'name': '07_bakim_liste',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/maintenance.html',
        'title': 'Bakim Yonetimi - Liste'
    },
    {
        'name': '08_bakim_detay',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/maintenance-detail.html',
        'title': 'Bakim Yonetimi - Detay'
    },
    {
        'name': '09_bakim_olustur',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/maintenance-create.html',
        'title': 'Bakim Yonetimi - Plan Olustur'
    },
    {
        'name': '10_olaylar_liste',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/incidents.html',
        'title': 'Olay Yonetimi - Liste (GUNCEL - Popup kaldirildi!)'
    },
    {
        'name': '11_olaylar_detay',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/incident-detail.html',
        'title': 'Olay Yonetimi - Detay'
    },
    {
        'name': '12_olaylar_olustur',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/incident-create.html',
        'title': 'Olay Yonetimi - Yeni Olay Olustur (YENI SAYFA!)'
    },
    {
        'name': '13_raporlar',
        'path': '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/reports.html',
        'title': 'Raporlama'
    }
]

def main():
    print("=" * 80)
    print("GUNCEL EKRAN GORUNTULERI ALINIYOR...")
    print("=" * 80)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        screenshots_taken = []

        for idx, page_info in enumerate(pages, 1):
            print(f"\n[{idx}/13] {page_info['title']}")
            print(f"    Dosya: {page_info['name']}.png")

            try:
                # HTML dosyasini yukle
                page.goto(f"file://{page_info['path']}")

                # Sayfanin yuklenmesini bekle
                page.wait_for_load_state('networkidle')
                time.sleep(1)

                # Tam sayfa ekran goruntusu al
                screenshot_path = f"/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots_updated/{page_info['name']}.png"
                page.screenshot(path=screenshot_path, full_page=True)

                screenshots_taken.append({
                    'name': page_info['name'],
                    'title': page_info['title'],
                    'path': screenshot_path,
                    'status': 'success'
                })

                print(f"    ✓ Basarili!")

            except Exception as e:
                print(f"    ✗ HATA: {e}")
                screenshots_taken.append({
                    'name': page_info['name'],
                    'title': page_info['title'],
                    'path': None,
                    'status': 'failed',
                    'error': str(e)
                })

        browser.close()

    # Ozet rapor
    print("\n" + "=" * 80)
    print("OZET RAPOR")
    print("=" * 80)

    success_count = sum(1 for s in screenshots_taken if s['status'] == 'success')
    failed_count = sum(1 for s in screenshots_taken if s['status'] == 'failed')

    print(f"\nToplam: {len(screenshots_taken)} sayfa")
    print(f"Basarili: {success_count}")
    print(f"Basarisiz: {failed_count}")

    if failed_count > 0:
        print("\nBASARISIZ SAYFALAR:")
        for s in screenshots_taken:
            if s['status'] == 'failed':
                print(f"  - {s['name']}: {s.get('error', 'Bilinmeyen hata')}")

    # JSON rapor kaydet
    report_path = '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots_updated/screenshot_report.json'
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump({
            'total': len(screenshots_taken),
            'success': success_count,
            'failed': failed_count,
            'screenshots': screenshots_taken
        }, f, indent=2, ensure_ascii=False)

    print(f"\nDetayli rapor: {report_path}")
    print("\nTUM ISLEMLER TAMAMLANDI!")

if __name__ == '__main__':
    main()
