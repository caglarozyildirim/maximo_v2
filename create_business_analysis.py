#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

def read_visio_text(vsdx_path):
    """Extract text from Visio file"""
    texts = []
    try:
        with zipfile.ZipFile(vsdx_path, 'r') as zip_ref:
            # Read all XML files in the visio/pages directory
            for file_name in zip_ref.namelist():
                if file_name.startswith('visio/pages/page') and file_name.endswith('.xml'):
                    xml_content = zip_ref.read(file_name)
                    try:
                        root = ET.fromstring(xml_content)
                        # Find all text elements
                        for text_elem in root.iter():
                            if text_elem.text and text_elem.text.strip():
                                texts.append(text_elem.text.strip())
                    except:
                        pass
    except Exception as e:
        print(f"Error reading {vsdx_path}: {e}")

    return texts

def create_business_analysis():
    # Load JSON data
    with open('/Users/caglarozyildirim/WebstormProjects/Deneme/maintenance_docs_content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    workflows_path = Path("/Users/caglarozyildirim/Desktop/Şirketler/MAN Türkiye/Maintenance Management Application/Workflows")

    # Read Visio workflows
    workflows = {
        'Job Request': read_visio_text(workflows_path / 'Work Flow of Job Request.vsdx'),
        'Maintenance': read_visio_text(workflows_path / 'Work Flow of Maintenance.vsdx'),
        'Asset Entry': read_visio_text(workflows_path / 'Work Flow of Asset Entry.vsdx'),
        'Asset Assignment': read_visio_text(workflows_path / 'Work flow of asset assigment.vsdx'),
        'Incident Notification': read_visio_text(workflows_path / 'Workflow of Incident Notification.vsdx'),
        'Asset Retirement': read_visio_text(workflows_path / 'Work Flow Asset Retirement.vsdx'),
        'Cost Center Change': read_visio_text(workflows_path / 'Work Flow Cost Center Change.vsdx')
    }

    # Create markdown document
    md_content = []

    # Header
    md_content.append("# BAKIM YÖNETİMİ UYGULAMASI İŞ ANALİZİ DOKÜMANI\n")
    md_content.append("**Versiyon:** 1.0\n")
    md_content.append("**Tarih:** Ekim 2025\n")
    md_content.append("**Proje:** Maintenance Management Application (Maximo Replacement)\n")
    md_content.append("\n---\n\n")

    # 1. YÖNETİCİ ÖZETİ
    md_content.append("## 1. YÖNETİCİ ÖZETİ\n\n")
    md_content.append("### 1.1 Projenin Amacı ve Hedefleri\n\n")

    req_analysis = data.get('requirement_analysis', {})
    paragraphs = req_analysis.get('paragraphs', [])

    # Extract management summary
    in_mgmt_summary = False
    for i, para in enumerate(paragraphs):
        if 'Management Summary' in para.get('text', ''):
            in_mgmt_summary = True
            continue
        if in_mgmt_summary and para.get('style') == 'Normal':
            text = para.get('text', '')
            if text and len(text) > 50:
                md_content.append(f"{text}\n\n")
        if in_mgmt_summary and para.get('style', '').startswith('Heading'):
            break

    md_content.append("**Ana Hedefler:**\n\n")
    md_content.append("- Bakım departmanının Maximo uygulamasındaki tüm operasyonlarını yeni bir platforma taşımak\n")
    md_content.append("- Lisans maliyetlerini azaltmak ve destek yeteneklerini artırmak\n")
    md_content.append("- 2027'de DIVA projesinin devreye girmesine kadar 2 yıllık geçici çözüm sağlamak\n")
    md_content.append("- Süreçleri ve sorumlulukları takip etmek\n")
    md_content.append("- Hassas kararlar ve bilgiler için kayıt tutmak (onaylar ve maliyetler)\n")
    md_content.append("- Geliştirme maliyetlerini minimum düzeyde tutmak\n\n")

    md_content.append("### 1.2 Kapsam\n\n")
    md_content.append("Bu proje, bakım departmanı ve ilgili departmanlar (maliyet kontrolü, muhasebe, lojistik ve depo) ")
    md_content.append("tarafından kullanılan Maximo uygulamasındaki tüm fonksiyonları kapsamaktadır.\n\n")

    md_content.append("**Ana Fonksiyonlar:**\n\n")
    functions = [
        "İş Talebi Yönetimi (Request Management)",
        "Sabit Varlık Yönetimi (Fixed Asset Management)",
        "Varlık Girişi (Asset Entry)",
        "Varlık Atama Süreci (Asset Assignment Process)",
        "Bakım (Maintenance)",
        "Düzenli Bakım (Regular Maintenance)",
        "Toplu Bakım (Mass Maintenance)",
        "Olay Yönetimi (Incident Management)",
        "Maliyet Merkezi Değişiklik Süreci (Cost Center Change Process)",
        "Varlık Emekliliği (Asset Retirement)",
        "Raporlama (Reports)",
        "Operasyonel Gereksinimler (Operational Requirements)"
    ]

    for func in functions:
        md_content.append(f"- {func}\n")

    md_content.append("\n### 1.3 Kapsam Dışı Öğeler\n\n")
    md_content.append("Kapsam dışı bilgiler, süreç detayları bölümünde belirtilmiştir. ")
    md_content.append("Temel olarak, maliyet optimizasyonu ve proje basitliği için bazı fonksiyonlar kapsam dışı bırakılmıştır.\n\n")

    # 2. İŞ SÜREÇLERİ VE AKIŞLARI
    md_content.append("---\n\n")
    md_content.append("## 2. İŞ SÜREÇLERİ VE AKIŞLARI\n\n")

    workflow_descriptions = {
        'Job Request': {
            'title': 'İş Talebi Süreci (Job Request Workflow)',
            'description': 'İş talepleri oluşturulur, detaylandırılır, onay süreçlerinden geçirilir ve çözüme kavuşturulur. '
                          'Bu süreç, talep oluşturma, teknik onay, iş yöneticisi onayı, maliyet onayı ve çözüm aşamalarını içerir.'
        },
        'Maintenance': {
            'title': 'Bakım Süreci (Maintenance Workflow)',
            'description': 'Düzenli ve planlı bakım işlemlerinin yönetildiği süreçtir. Preventif bakım planlaması, '
                          'bakım takvimi, bakım ekiplerinin atanması ve bakım işlemlerinin tamamlanması adımlarını içerir.'
        },
        'Asset Entry': {
            'title': 'Varlık Girişi Süreci (Asset Entry Workflow)',
            'description': 'Yeni varlıkların sisteme kaydedilmesi sürecidir. Varlık bilgilerinin girilmesi, '
                          'SAP entegrasyonu, varlık etiketleme ve lokasyon atama işlemlerini kapsar.'
        },
        'Asset Assignment': {
            'title': 'Varlık Atama Süreci (Asset Assignment Workflow)',
            'description': 'Varlıkların çalışanlara veya departmanlara atanması sürecidir. '
                          'Atama talebi, onay süreci, zimmet formu oluşturma ve teslim alma adımlarını içerir.'
        },
        'Incident Notification': {
            'title': 'Olay Bildirimi Süreci (Incident Notification Workflow)',
            'description': 'Acil arıza ve olayların bildirilmesi ve yönetilmesi sürecidir. '
                          'Olay bildirimi, önceliklendirme, müdahale ekibi atama ve çözüm adımlarını kapsar.'
        },
        'Asset Retirement': {
            'title': 'Varlık Emekliliği Süreci (Asset Retirement Workflow)',
            'description': 'Varlıkların hizmetten çıkarılması sürecidir. Emeklilik talebi, değerlendirme, '
                          'onay, varlık teslim alma ve kayıtlardan silme işlemlerini içerir.'
        },
        'Cost Center Change': {
            'title': 'Maliyet Merkezi Değişikliği Süreci (Cost Center Change Workflow)',
            'description': 'Varlıkların maliyet merkezleri arasında transfer edilmesi sürecidir. '
                          'Transfer talebi, onay süreci, muhasebe kaydı ve SAP güncellemesi adımlarını kapsar.'
        }
    }

    for wf_key, wf_info in workflow_descriptions.items():
        md_content.append(f"### 2.{list(workflow_descriptions.keys()).index(wf_key) + 1} {wf_info['title']}\n\n")
        md_content.append(f"**Açıklama:** {wf_info['description']}\n\n")

        if wf_key in workflows and workflows[wf_key]:
            md_content.append("**Süreç Adımları ve Akış Elemanları:**\n\n")
            unique_items = []
            for item in workflows[wf_key]:
                if item and len(item) > 2 and item not in unique_items:
                    unique_items.append(item)

            for item in unique_items[:30]:  # Limit to reasonable number
                md_content.append(f"- {item}\n")
            md_content.append("\n")

    # 3. FONKSİYONEL GEREKSİNİMLER
    md_content.append("---\n\n")
    md_content.append("## 3. FONKSİYONEL GEREKSİNİMLER\n\n")

    # Extract functional requirements from paragraphs
    md_content.append("### 3.1 İş Talebi Yönetimi (Job Request)\n\n")
    md_content.append("**Amaç:** Talepleri toplamak, onay sürecini yönetmek ve tüm süreci takip etmek.\n\n")
    md_content.append("**Hedefler:**\n\n")
    md_content.append("- Talepleri toplamak\n")
    md_content.append("- Onay sürecini yönetmek\n")
    md_content.append("- Çözüm sürecini yönetmek\n")
    md_content.append("- Kullanılan dolaylı malzemelerin tüketimini kaydetmek\n")
    md_content.append("- Raporlama\n\n")

    md_content.append("**Süreçler ve Aktiviteler:**\n\n")
    md_content.append("1. **Talep Toplama**\n")
    md_content.append("   - İş talebi oluşturma\n")
    md_content.append("   - Talep detaylandırma\n")
    md_content.append("   - Detay ekleme\n")
    md_content.append("   - Ek dosya ekleme\n")
    md_content.append("   - Maliyet hesaplama\n\n")

    md_content.append("2. **Onay Süreci Yönetimi**\n")
    md_content.append("   - SL veya Mühendis teknik onayı\n")
    md_content.append("   - İş yöneticisi talep onayı\n")
    md_content.append("   - İş yöneticisi maliyet onayı\n")
    md_content.append("   - Çözüm onayı\n")
    md_content.append("   - Red işlemleri\n\n")

    md_content.append("3. **Çözüm Süreci Yönetimi**\n")
    md_content.append("   - Talep sorumluluğunun SL-Mühendis kullanıcı tarafından devralınması\n")
    md_content.append("   - Çözüm sorumlusu atama\n")
    md_content.append("   - Ticket durumu takibi\n\n")

    md_content.append("4. **Raporlar**\n")
    md_content.append("   - Talep listesi\n")
    md_content.append("   - Aylık kapatılan ticket sayısı\n")
    md_content.append("   - Aylık açılan ticket sayısı\n")
    md_content.append("   - Beklenen durumlar\n\n")

    md_content.append("### 3.2 Sabit Varlık Yönetimi (Fixed Asset Management)\n\n")
    md_content.append("Sabit varlıkların yaşam döngüsü boyunca yönetimi:\n\n")
    md_content.append("- **Varlık Girişi:** Yeni varlıkların sisteme kaydı, SAP entegrasyonu\n")
    md_content.append("- **Varlık Atama:** Varlıkların çalışanlara veya departmanlara zimmetlenmesi\n")
    md_content.append("- **Varlık Transferi:** Maliyet merkezi değişiklikleri ve lokasyon güncellemeleri\n")
    md_content.append("- **Varlık Emekliliği:** Hizmetten çıkarma ve kayıt silme işlemleri\n\n")

    md_content.append("### 3.3 Bakım Yönetimi (Maintenance)\n\n")
    md_content.append("**Alt Modüller:**\n\n")
    md_content.append("- **Düzenli Bakım (Regular Maintenance):** Planlı periyodik bakım işlemleri\n")
    md_content.append("- **Toplu Bakım (Mass Maintenance):** Birden fazla varlık için toplu bakım operasyonları\n")
    md_content.append("- Bakım planı oluşturma ve takvimleme\n")
    md_content.append("- Bakım ekibi ve malzeme yönetimi\n")
    md_content.append("- Bakım geçmişi kayıtları\n\n")

    md_content.append("### 3.4 Olay Yönetimi (Incident Management)\n\n")
    md_content.append("Acil arıza ve olayların yönetimi:\n\n")
    md_content.append("- Olay bildirimi ve kayıt\n")
    md_content.append("- Önceliklendirme (kritik, yüksek, orta, düşük)\n")
    md_content.append("- Müdahale ekibi atama\n")
    md_content.append("- Çözüm süresi takibi\n")
    md_content.append("- Olay raporlama\n\n")

    # 4. VERİ MODELİ VE VERİ YAPISI
    md_content.append("---\n\n")
    md_content.append("## 4. VERİ MODELİ VE VERİ YAPISI\n\n")

    data_structure = data.get('data_structure', {})
    md_content.append(f"Veri yapısı **{len(data_structure)} adet tablo/sheet** içermektedir.\n\n")

    # List all sheets
    md_content.append("**Veri Modeli Tabloları:**\n\n")
    for sheet_name in sorted(data_structure.keys())[:50]:  # Limit to reasonable number
        md_content.append(f"- {sheet_name}\n")

    md_content.append("\n**Örnek Veri Alanları (Job Request):**\n\n")
    md_content.append("| Alan Adı | Açıklama |\n")
    md_content.append("|----------|----------|\n")
    md_content.append("| Request Id | Talep benzersiz kimliği |\n")
    md_content.append("| Request Title | Talep başlığı |\n")
    md_content.append("| Request Description | Talep detaylı açıklaması |\n")
    md_content.append("| Asset Id | Varlık kimliği |\n")
    md_content.append("| Asset SAP Id | SAP sistemindeki varlık kimliği |\n")
    md_content.append("| Location | Varlık lokasyonu |\n")
    md_content.append("| Priority | Öncelik seviyesi |\n")
    md_content.append("| Creation Date Time | Oluşturulma tarihi ve saati |\n")
    md_content.append("| Current Assignee | Mevcut atanan kişi |\n")
    md_content.append("| Cost Value | Maliyet değeri |\n")
    md_content.append("| Cost Currency | Maliyet para birimi |\n")
    md_content.append("| Approval Status | Onay durumu |\n\n")

    # 5. EKRAN TASARIMLARI
    md_content.append("---\n\n")
    md_content.append("## 5. EKRAN TASARIMLARI\n\n")

    screen_designs = data.get('screen_designs', {})
    md_content.append(f"Uygulama **{len(screen_designs)} adet ekran tasarımı** içermektedir.\n\n")

    md_content.append("**Ana Ekranlar:**\n\n")
    for i, screen_name in enumerate(sorted(screen_designs.keys())[:30], 1):
        md_content.append(f"{i}. {screen_name}\n")

    md_content.append("\n**Ekran Tasarım Özellikleri:**\n\n")
    md_content.append("- Responsive tasarım (mobil ve desktop uyumlu)\n")
    md_content.append("- Kullanıcı dostu arayüz\n")
    md_content.append("- Hızlı erişim için dashboard görünümü\n")
    md_content.append("- Filtreleme ve arama özellikleri\n")
    md_content.append("- Export (Excel, PDF) fonksiyonları\n")
    md_content.append("- Çoklu dil desteği (Türkçe/İngilizce)\n\n")

    # 6. KULLANIM SENARYOLARI
    md_content.append("---\n\n")
    md_content.append("## 6. KULLANIM SENARYOLARI (USE CASES)\n\n")

    use_cases = data.get('use_cases', {})
    md_content.append(f"**Tanımlı Use Case Sayısı:** {len(use_cases)}\n\n")

    for uc_name in use_cases:
        md_content.append(f"### 6.{list(use_cases.keys()).index(uc_name) + 1} {uc_name}\n\n")

        uc_data = use_cases[uc_name]
        if isinstance(uc_data, dict) and 'paragraphs' in uc_data:
            # It's a Word document
            paragraphs = uc_data.get('paragraphs', [])
            for para in paragraphs[:20]:  # Limit paragraphs
                text = para.get('text', '').strip()
                if text and len(text) > 5:
                    if para.get('style', '').startswith('Heading'):
                        md_content.append(f"**{text}**\n\n")
                    else:
                        md_content.append(f"{text}\n\n")
        md_content.append("\n")

    # 7. FORMLAR VE ÇIKTILAR
    md_content.append("---\n\n")
    md_content.append("## 7. FORMLAR VE ÇIKTILAR\n\n")

    md_content.append("### 7.1 Varlık Atama Formu (Asset Assignment Form)\n\n")
    assignment_form = data.get('asset_assignment_form', {})
    if assignment_form.get('paragraphs'):
        md_content.append("Bu form, varlıkların çalışanlara zimmetlenmesi sırasında kullanılır.\n\n")
        md_content.append("**Form İçeriği:**\n\n")
        for para in assignment_form.get('paragraphs', [])[:15]:
            text = para.get('text', '').strip()
            if text and len(text) > 3:
                md_content.append(f"- {text}\n")
        md_content.append("\n")

    md_content.append("### 7.2 Varlık Emeklilik Çıktısı (Asset Retirement Printout)\n\n")
    retirement_doc = data.get('asset_retirement_printout', {})
    if retirement_doc.get('paragraphs'):
        md_content.append("Varlık hizmetten çıkarma işlemlerinde kullanılan resmi çıktıdır.\n\n")
        md_content.append("**Çıktı İçeriği:**\n\n")
        for para in retirement_doc.get('paragraphs', [])[:15]:
            text = para.get('text', '').strip()
            if text and len(text) > 3:
                md_content.append(f"- {text}\n")
        md_content.append("\n")

    # 8. PROJE DURUMU
    md_content.append("---\n\n")
    md_content.append("## 8. PROJE DURUMU VE PLANLAMA\n\n")

    overall_status = data.get('overall_status', {})
    md_content.append("### 8.1 Genel Durum\n\n")

    if overall_status:
        for sheet_name, sheet_data in overall_status.items():
            md_content.append(f"**{sheet_name}**\n\n")
            if sheet_data and len(sheet_data) > 0:
                # Try to create a simple table
                md_content.append("| " + " | ".join(str(cell) for cell in sheet_data[0][:5]) + " |\n")
                md_content.append("|" + "|".join(["---" for _ in range(min(5, len(sheet_data[0])))]) + "|\n")
                for row in sheet_data[1:10]:  # Limit rows
                    md_content.append("| " + " | ".join(str(cell)[:30] for cell in row[:5]) + " |\n")
                md_content.append("\n")

    md_content.append("### 8.2 Proje Zaman Çizelgesi\n\n")
    md_content.append("- **Başlangıç:** 2025\n")
    md_content.append("- **Planlanan Tamamlanma:** 2 yıl içinde\n")
    md_content.append("- **DIVA Projesine Geçiş:** 2027\n\n")

    # 9. TEKNİK GEREKSİNİMLER
    md_content.append("---\n\n")
    md_content.append("## 9. TEKNİK GEREKSİNİMLER\n\n")

    md_content.append("### 9.1 Entegrasyonlar\n\n")
    md_content.append("- **SAP Entegrasyonu:** Varlık bilgileri, maliyet merkezi, muhasebe kayıtları\n")
    md_content.append("- **Active Directory:** Kullanıcı kimlik doğrulama ve yetkilendirme\n")
    md_content.append("- **E-posta Sistemi:** Bildirimler ve onay süreçleri\n\n")

    md_content.append("### 9.2 Güvenlik Gereksinimleri\n\n")
    md_content.append("- Rol tabanlı erişim kontrolü (RBAC)\n")
    md_content.append("- Veri şifreleme (transit ve rest)\n")
    md_content.append("- Audit logging (tüm işlemler kayıt altında)\n")
    md_content.append("- Yedekleme ve kurtarma planı\n\n")

    md_content.append("### 9.3 Performans Gereksinimleri\n\n")
    md_content.append("- Maksimum 100 eşzamanlı kullanıcı desteği\n")
    md_content.append("- Sayfa yükleme süresi < 3 saniye\n")
    md_content.append("- Veri tabanı sorgu optimizasyonu\n")
    md_content.append("- Düzenli performans izleme\n\n")

    # 10. ROLLER VE YETKİLER
    md_content.append("---\n\n")
    md_content.append("## 10. ROLLER VE YETKİLER\n\n")

    md_content.append("### Kullanıcı Rolleri\n\n")
    md_content.append("1. **Talep Sahibi (Requester):** İş talebi oluşturabilir, kendi taleplerini görüntüleyebilir\n")
    md_content.append("2. **Shift Leader / Mühendis:** Teknik onay verebilir, talep atayabilir, çözüm sürecini yönetebilir\n")
    md_content.append("3. **İş Yöneticisi (Business Manager):** Talep ve maliyet onayı verebilir\n")
    md_content.append("4. **Bakım Teknisyeni:** Bakım işlemlerini gerçekleştirebilir, malzeme kullanımını kaydedebilir\n")
    md_content.append("5. **Varlık Yöneticisi:** Varlık girişi, atama ve emeklilik işlemlerini yapabilir\n")
    md_content.append("6. **Maliyet Kontrolörü:** Maliyet raporlarına erişebilir, maliyet merkezi değişikliklerini onaylayabilir\n")
    md_content.append("7. **Sistem Yöneticisi:** Tüm yetkilere sahip, sistem yapılandırmasını yönetebilir\n\n")

    # 11. SONUÇ VE ÖNERİLER
    md_content.append("---\n\n")
    md_content.append("## 11. SONUÇ VE ÖNERİLER\n\n")

    md_content.append("### 11.1 Kritik Başarı Faktörleri\n\n")
    md_content.append("- Kullanıcı eğitiminin eksiksiz verilmesi\n")
    md_content.append("- SAP entegrasyonunun sorunsuz çalışması\n")
    md_content.append("- Mevcut Maximo verilerinin başarılı migrasyonu\n")
    md_content.append("- Süreç sahiplerinin aktif katılımı\n")
    md_content.append("- Düzenli geri bildirim ve iyileştirme döngüsü\n\n")

    md_content.append("### 11.2 Riskler ve Öneriler\n\n")
    md_content.append("| Risk | Etki | Öneri |\n")
    md_content.append("|------|------|-------|\n")
    md_content.append("| Veri migrasyonu hataları | Yüksek | Pilot çalışma ve aşamalı geçiş |\n")
    md_content.append("| Kullanıcı adaptasyonu | Orta | Yoğun eğitim ve süper kullanıcı desteği |\n")
    md_content.append("| SAP entegrasyon sorunları | Yüksek | Erken test ve fallback planı |\n")
    md_content.append("| Proje gecikmeleri | Orta | Agile metodoloji ve iteratif geliştirme |\n\n")

    md_content.append("### 11.3 Sonraki Adımlar\n\n")
    md_content.append("1. Detaylı teknik tasarım dokümantasyonunun hazırlanması\n")
    md_content.append("2. Geliştirme ekibinin oluşturulması\n")
    md_content.append("3. Sprint planlamasının yapılması\n")
    md_content.append("4. Test ortamının hazırlanması\n")
    md_content.append("5. Pilot kullanıcı grubunun belirlenmesi\n\n")

    md_content.append("---\n\n")
    md_content.append("**Doküman Sonu**\n\n")
    md_content.append("*Bu doküman, Maintenance Management Application projesi için hazırlanmış kapsamlı iş analizi dokümanıdır. ")
    md_content.append("Tüm gereksinim dokümanları, workflow diyagramları, veri yapısı, ekran tasarımları ve use case'ler analiz edilerek oluşturulmuştur.*\n")

    # Write to file
    output_path = "/Users/caglarozyildirim/WebstormProjects/Deneme/Bakim_Yonetim_Uygulamasi_Is_Analizi.md"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(''.join(md_content))

    print(f"✅ İş analizi dokümanı başarıyla oluşturuldu!")
    print(f"📄 Dosya yolu: {output_path}")
    print(f"📊 Toplam satır sayısı: {len(md_content)}")

    return output_path

if __name__ == "__main__":
    create_business_analysis()
