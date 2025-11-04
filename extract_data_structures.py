#!/usr/bin/env python3
"""
HTML sayfalarından veri yapılarını çıkar
"""

import os
import json
from bs4 import BeautifulSoup

BASE_DIR = "/Users/caglarozyildirim/WebstormProjects/Deneme"
APP_DIR = f"{BASE_DIR}/bakim-yonetim-app"
OUTPUT_FILE = f"{BASE_DIR}/html_data_structures.json"

# Analiz edilecek sayfalar
PAGES = [
    {"key": "index", "file": "index.html", "name": "Ana Sayfa (Dashboard)"},
    {"key": "job-requests", "file": "pages/job-requests.html", "name": "İş Talepleri - Liste"},
    {"key": "job-request-detail", "file": "pages/job-request-detail.html", "name": "İş Talebi - Detay"},
    {"key": "job-request-create", "file": "pages/job-request-create.html", "name": "İş Talebi - Oluştur"},
    {"key": "assets", "file": "pages/assets.html", "name": "Varlıklar - Liste"},
    {"key": "asset-detail", "file": "pages/asset-detail.html", "name": "Varlık - Detay"},
    {"key": "maintenance", "file": "pages/maintenance.html", "name": "Bakım - Liste"},
    {"key": "maintenance-detail", "file": "pages/maintenance-detail.html", "name": "Bakım - Detay"},
    {"key": "maintenance-create", "file": "pages/maintenance-create.html", "name": "Bakım Planı - Oluştur"},
    {"key": "incidents", "file": "pages/incidents.html", "name": "Olaylar - Liste"},
    {"key": "incident-detail", "file": "pages/incident-detail.html", "name": "Olay - Detay"},
    {"key": "incident-create", "file": "pages/incident-create.html", "name": "Olay - Oluştur (YENİ SAYFA)"},
    {"key": "reports", "file": "pages/reports.html", "name": "Raporlama"},
]

def extract_table_columns(soup):
    """Tablo kolonlarını çıkar"""
    columns = []
    tables = soup.find_all('table')

    for table in tables:
        thead = table.find('thead')
        if thead:
            headers = thead.find_all('th')
            table_cols = [th.get_text(strip=True) for th in headers]
            if table_cols:
                columns.append({"columns": table_cols, "count": len(table_cols)})

    return columns

def extract_form_fields(soup):
    """Form alanlarını çıkar"""
    fields = []

    # Input alanları
    inputs = soup.find_all('input')
    for inp in inputs:
        field_type = inp.get('type', 'text')
        field_name = inp.get('name', inp.get('id', 'unnamed'))
        field_label = inp.get('placeholder', '')

        if field_type not in ['hidden', 'submit', 'button']:
            fields.append({
                "type": field_type,
                "name": field_name,
                "label": field_label
            })

    # Select alanları
    selects = soup.find_all('select')
    for sel in selects:
        field_name = sel.get('name', sel.get('id', 'unnamed'))
        options = [opt.get_text(strip=True) for opt in sel.find_all('option')]

        fields.append({
            "type": "select",
            "name": field_name,
            "options": options,
            "option_count": len(options)
        })

    # Textarea alanları
    textareas = soup.find_all('textarea')
    for ta in textareas:
        field_name = ta.get('name', ta.get('id', 'unnamed'))

        fields.append({
            "type": "textarea",
            "name": field_name
        })

    return fields

def extract_badges(soup):
    """Badge/etiket bilgilerini çıkar"""
    badges = []

    # .badge class'ına sahip elementler
    badge_elements = soup.find_all(class_=lambda x: x and 'badge' in x)

    for badge in badge_elements:
        text = badge.get_text(strip=True)
        classes = badge.get('class', [])

        badge_type = 'default'
        if 'badge-success' in classes:
            badge_type = 'success'
        elif 'badge-warning' in classes:
            badge_type = 'warning'
        elif 'badge-danger' in classes:
            badge_type = 'danger'
        elif 'badge-info' in classes:
            badge_type = 'info'

        badges.append({
            "text": text,
            "type": badge_type
        })

    return badges

def extract_stat_cards(soup):
    """İstatistik kartlarını çıkar"""
    cards = []

    # .stat-card veya .card class'ına sahip elementler
    card_elements = soup.find_all(class_=lambda x: x and ('stat-card' in x or 'card' in x))

    for card in card_elements:
        title_elem = card.find(['h3', 'h4'])
        value_elem = card.find(class_=lambda x: x and 'stat-value' in x)

        if title_elem:
            title = title_elem.get_text(strip=True)
            value = value_elem.get_text(strip=True) if value_elem else ''

            cards.append({
                "title": title,
                "value": value
            })

    return cards

def extract_buttons(soup):
    """Buton ve işlem linklerini çıkar"""
    buttons = []

    # Button elementleri
    button_elements = soup.find_all(['button', 'a'], class_=lambda x: x and 'btn' in x)

    for btn in button_elements[:10]:  # İlk 10 buton
        text = btn.get_text(strip=True)
        if text and len(text) < 50:
            buttons.append(text)

    return list(set(buttons))  # Tekrarları kaldır

def analyze_page(file_path, page_info):
    """Bir HTML sayfasını analiz et"""

    if not os.path.exists(file_path):
        print(f"❌ BULUNAMADI: {file_path}")
        return None

    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Veri yapılarını çıkar
    data_structure = {
        "page_name": page_info['name'],
        "page_key": page_info['key'],
        "file_path": page_info['file'],
        "tables": extract_table_columns(soup),
        "form_fields": extract_form_fields(soup),
        "badges": extract_badges(soup),
        "stat_cards": extract_stat_cards(soup),
        "action_buttons": extract_buttons(soup)
    }

    # Özet istatistikler
    data_structure['summary'] = {
        "table_count": len(data_structure['tables']),
        "total_columns": sum(t['count'] for t in data_structure['tables']),
        "form_field_count": len(data_structure['form_fields']),
        "badge_count": len(data_structure['badges']),
        "card_count": len(data_structure['stat_cards']),
        "button_count": len(data_structure['action_buttons'])
    }

    return data_structure

def main():
    """Ana fonksiyon"""
    print("HTML sayfaları analiz ediliyor...\n")

    all_data = {}

    for idx, page_info in enumerate(PAGES, 1):
        file_path = f"{APP_DIR}/{page_info['file']}"

        print(f"[{idx}/{len(PAGES)}] {page_info['name']}")

        data = analyze_page(file_path, page_info)

        if data:
            all_data[page_info['key']] = data

            summary = data['summary']
            print(f"  ✓ Tablolar: {summary['table_count']} ({summary['total_columns']} kolon)")
            print(f"  ✓ Form Alanları: {summary['form_field_count']}")
            print(f"  ✓ Badge'ler: {summary['badge_count']}")
            print(f"  ✓ Kartlar: {summary['card_count']}")
            print(f"  ✓ Butonlar: {summary['button_count']}")

        print()

    # JSON dosyasına kaydet
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    print(f"{'='*60}")
    print(f"Veri yapıları kaydedildi: {OUTPUT_FILE}")
    print(f"Toplam sayfa: {len(all_data)}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
