#!/usr/bin/env python3
"""
bakim-yonetim-app ve desktop/new klasörlerini karşılaştırıp iş analizi oluştur
"""
import json
from pathlib import Path
from collections import defaultdict
import re

def compare_and_analyze():
    # bakim-yonetim-app HTML sayfalarını analiz et
    app_path = Path("bakim-yonetim-app")
    pages_path = app_path / "pages"

    print("=== Mevcut HTML Sayfaları (bakim-yonetim-app) ===\n")
    html_files = list(pages_path.glob("*.html"))
    html_pages = {}

    for html_file in sorted(html_files):
        page_name = html_file.stem
        html_pages[page_name] = {
            'file': html_file.name,
            'path': str(html_file)
        }
        print(f"  - {page_name}.html")

    print(f"\nToplam: {len(html_pages)} sayfa\n")

    # Desktop/new dokümanlarından beklenen sayfaları çıkar
    print("\n=== Desktop/new Dokümanlarında Belirtilen Modüller ===\n")

    expected_modules = {
        'Job Request': {
            'turkish': 'İş Talebi',
            'pages': ['Create Job Request', 'Job Request List', 'Job Request Detail'],
            'workflows': ['Work Flow of Job Request'],
            'description': 'İş taleplerinin oluşturulması, listelenmesi ve detaylarının görüntülenmesi'
        },
        'Asset Management': {
            'turkish': 'Varlık Yönetimi',
            'pages': ['Asset Entry', 'Asset List', 'Asset Detail'],
            'workflows': ['Work Flow of Asset Entry'],
            'description': 'Varlıkların kaydı, listelenmesi ve detaylarının yönetimi'
        },
        'Asset Assignment': {
            'turkish': 'Varlık Zimmeti',
            'pages': ['Asset Assignment', 'Asset Assignment List', 'Asset Assignment Print'],
            'workflows': ['Work flow of asset assigment'],
            'description': 'Varlıkların kullanıcılara zimmetlenmesi ve zimmet takibi'
        },
        'Asset Retirement': {
            'turkish': 'Varlık Hurdaya Çıkarma',
            'pages': ['Asset Retirement', 'Asset Retirement List', 'Asset Retirement Printout'],
            'workflows': ['Work Flow Asset Retirement'],
            'description': 'Varlıkların hurdaya çıkarılması ve kayıtlarının tutulması'
        },
        'Maintenance Management': {
            'turkish': 'Bakım Yönetimi',
            'pages': ['Maintenance Requirement', 'Maintenance Duty List', 'Maintenance Visit', 'Maintenance Detail'],
            'workflows': ['Work Flow of Maintenance'],
            'description': 'Bakım gereksinimlerinin yönetimi ve bakım ziyaretlerinin planlanması'
        },
        'Periodic Maintenance': {
            'turkish': 'Periyodik Bakım',
            'pages': ['Periodic Maintenance Requirement List', 'Periodic Maintenance Creation'],
            'workflows': [],
            'description': 'Periyodik bakım gereksinimlerinin tanımlanması ve takibi'
        },
        'Incident Management': {
            'turkish': 'Olay Yönetimi',
            'pages': ['Incident Notification', 'Incident List'],
            'workflows': ['Workflow of Incident Notification'],
            'description': 'Olayların bildirilmesi ve takibi'
        },
        'Cost Center Change': {
            'turkish': 'Masraf Merkezi Değişikliği',
            'pages': ['Cost Center Change', 'Cost Center Change List'],
            'workflows': ['Work Flow Cost Center Change'],
            'description': 'Varlıkların masraf merkezi değişikliklerinin yönetimi'
        },
        'Asset Groups': {
            'turkish': 'Varlık Grupları',
            'pages': ['Asset Group List'],
            'workflows': [],
            'description': 'Varlık gruplarının tanımlanması ve yönetimi'
        },
        'Reports': {
            'turkish': 'Raporlar',
            'pages': ['Reports'],
            'workflows': [],
            'description': 'Çeşitli raporların oluşturulması ve görüntülenmesi'
        }
    }

    for module, info in expected_modules.items():
        print(f"\n{module} ({info['turkish']}):")
        print(f"  Açıklama: {info['description']}")
        print(f"  Beklenen Sayfalar: {', '.join(info['pages'])}")
        if info['workflows']:
            print(f"  İş Akışları: {', '.join(info['workflows'])}")

    # Karşılaştırma: Mevcut vs Beklenen
    print("\n\n=== KARŞILAŞTIRMA: Mevcut vs Beklenen ===\n")

    # HTML dosya isimlerinden modül eşleşmelerini bul
    module_mapping = {
        'job-request': 'Job Request',
        'asset': 'Asset Management',
        'maintenance': 'Maintenance Management',
        'periodic-maintenance': 'Periodic Maintenance',
        'incident': 'Incident Management',
        'reports': 'Reports'
    }

    found_modules = defaultdict(list)
    missing_pages = []

    for html_name in html_pages.keys():
        matched = False
        for key, module in module_mapping.items():
            if key in html_name:
                found_modules[module].append(html_name)
                matched = True
                break

        if not matched and html_name not in ['reports']:
            # Eşleşmeyen sayfalar
            pass

    print("Mevcut Modüller ve Sayfaları:")
    for module in sorted(found_modules.keys()):
        print(f"\n{module} ({expected_modules.get(module, {}).get('turkish', '')}):")
        for page in sorted(found_modules[module]):
            print(f"  ✓ {page}.html")

    # Eksik modüller
    print("\n\nEksik veya Kısmi Modüller:")
    for module, info in expected_modules.items():
        if module not in found_modules:
            print(f"\n❌ {module} ({info['turkish']}):")
            print(f"   Hiçbir sayfa bulunamadı")
            print(f"   Beklenen: {', '.join(info['pages'])}")
        elif len(found_modules[module]) < len(info['pages']):
            print(f"\n⚠️  {module} ({info['turkish']}):")
            print(f"   Mevcut: {len(found_modules[module])} sayfa")
            print(f"   Beklenen: {len(info['pages'])} sayfa")

    # Data Structure karşılaştırması
    print("\n\n=== VERİ YAPILARI ===\n")

    # JSON'dan data structures'ı oku
    analysis_file = Path("desktop_new_analysis.json")
    if analysis_file.exists():
        with open(analysis_file, 'r', encoding='utf-8') as f:
            analysis_data = json.load(f)

        print("Desktop/new Dokümanlarında Tanımlanan Veri Yapıları:")
        for table_name, fields in list(analysis_data['data_structures'].items())[:10]:
            print(f"\n{table_name}:")
            print(f"  Alan sayısı: {len(fields)}")
            if fields:
                print(f"  İlk 5 alan:")
                for field in fields[:5]:
                    print(f"    - {field['name']} ({field['type']}, {field['length']})")

    # Workflows
    print("\n\n=== İŞ AKIŞLARI (WORKFLOWS) ===\n")
    print("Desktop/new Klasöründeki İş Akışları:")
    if analysis_file.exists():
        for workflow in analysis_data['workflows']:
            print(f"  - {workflow}")

    print("\n\nMevcut HTML'lerde İş Akışı Gösterimi: YOK")
    print("  Not: Mevcut HTML sayfaları iş akışı gösterimleri içermiyor")

    # Sonuçları JSON olarak kaydet
    comparison_result = {
        'existing_pages': list(html_pages.keys()),
        'expected_modules': expected_modules,
        'found_modules': {k: v for k, v in found_modules.items()},
        'missing_modules': [m for m in expected_modules.keys() if m not in found_modules],
        'page_count': {
            'existing': len(html_pages),
            'expected': sum(len(info['pages']) for info in expected_modules.values())
        }
    }

    with open('comparison_result.json', 'w', encoding='utf-8') as f:
        json.dump(comparison_result, f, ensure_ascii=False, indent=2)

    print("\n\nKarşılaştırma sonuçları comparison_result.json dosyasına kaydedildi.")

if __name__ == "__main__":
    compare_and_analyze()