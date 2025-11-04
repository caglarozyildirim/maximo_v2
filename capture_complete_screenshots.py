#!/usr/bin/env python3
"""
Comprehensive Screenshot Capture Script
Captures ALL functionalities including modals, popups, alerts, approve/reject actions
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import os

# Setup
base_path = "/Users/caglarozyildirim/WebstormProjects/Deneme"
app_path = f"{base_path}/bakim-yonetim-app"
screenshot_dir = f"{base_path}/screenshots_complete"

# Create screenshot directory
os.makedirs(screenshot_dir, exist_ok=True)

# Chrome options
chrome_options = Options()
chrome_options.add_argument('--headless=new')
chrome_options.add_argument('--window-size=1920,1080')
chrome_options.add_argument('--force-device-scale-factor=1')
chrome_options.add_argument('--disable-gpu')

driver = webdriver.Chrome(options=chrome_options)
wait = WebDriverWait(driver, 10)

screenshots = []

def capture(name, description=""):
    """Capture screenshot with description"""
    filepath = f"{screenshot_dir}/{name}.png"
    driver.save_screenshot(filepath)
    screenshots.append({
        'name': name,
        'description': description,
        'path': filepath
    })
    print(f"✓ Captured: {name}")
    time.sleep(0.5)

try:
    print("\n" + "="*60)
    print("STARTING COMPREHENSIVE SCREENSHOT CAPTURE")
    print("="*60 + "\n")

    # ========================================
    # 1. ANA SAYFA (DASHBOARD)
    # ========================================
    print("\n📊 1. ANA SAYFA (DASHBOARD)")
    print("-" * 60)

    driver.get(f"file://{app_path}/index.html")
    time.sleep(2)
    capture("01_Dashboard_Ana_Sayfa", "Ana dashboard görünümü - istatistikler ve grafikler")

    # ========================================
    # 2. İŞ TALEPLERİ MODÜLÜ
    # ========================================
    print("\n📋 2. İŞ TALEPLERİ MODÜLÜ")
    print("-" * 60)

    # Liste sayfası
    driver.get(f"file://{app_path}/pages/job-requests.html")
    time.sleep(2)
    capture("02_Is_Talepleri_Liste", "İş talepleri liste görünümü - filtreleme ve arama")

    # Yeni talep modal'ı aç
    try:
        add_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn-primary")))
        driver.execute_script("arguments[0].click();", add_button)
        time.sleep(1)
        capture("03_Is_Talebi_Modal_Acik", "Yeni İş Talebi oluşturma modal'ı")

        # Modal'ı kapat
        driver.execute_script("document.querySelector('.modal-close').click();")
        time.sleep(0.5)
    except Exception as e:
        print(f"  ⚠ Modal capture failed: {e}")

    # İş Talebi Detay sayfası
    driver.get(f"file://{app_path}/pages/job-request-detail.html?id=JR-2025-001")
    time.sleep(2)
    capture("04_Is_Talebi_Detay", "İş Talebi detay sayfası - timeline ve yorumlar")

    # Onay butonu ile confirm dialog
    driver.execute_script("""
        // Override confirm to keep it visible
        window.originalConfirm = window.confirm;
        window.confirm = function(msg) {
            document.body.insertAdjacentHTML('beforeend',
                '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:2rem;border:2px solid #E20714;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:10000;width:400px;">' +
                '<h3 style="margin:0 0 1rem 0;color:#E20714;">Onay Gerekli</h3>' +
                '<p style="margin:0 0 1.5rem 0;color:#333;">' + msg + '</p>' +
                '<div style="display:flex;gap:1rem;justify-content:flex-end;">' +
                '<button style="padding:0.5rem 1.5rem;background:#ccc;border:none;border-radius:4px;cursor:pointer;">İptal</button>' +
                '<button style="padding:0.5rem 1.5rem;background:#00A859;color:white;border:none;border-radius:4px;cursor:pointer;">Onayla</button>' +
                '</div></div>');
            return false;
        };
        document.querySelector('.btn-approve').click();
    """)
    time.sleep(1)
    capture("05_Is_Talebi_Onay_Dialog", "İş talebi onaylama confirmation dialog'u")

    # Remove dialog
    driver.execute_script("document.body.lastElementChild.remove();")

    # Reddetme prompt
    driver.execute_script("""
        window.prompt = function(msg) {
            document.body.insertAdjacentHTML('beforeend',
                '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:2rem;border:2px solid #E20714;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:10000;width:450px;">' +
                '<h3 style="margin:0 0 1rem 0;color:#E20714;">Reddetme Nedeni</h3>' +
                '<p style="margin:0 0 1rem 0;color:#666;">' + msg + '</p>' +
                '<textarea style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:4px;margin-bottom:1rem;min-height:80px;" placeholder="Reddetme nedeninizi giriniz..."></textarea>' +
                '<div style="display:flex;gap:1rem;justify-content:flex-end;">' +
                '<button style="padding:0.5rem 1.5rem;background:#ccc;border:none;border-radius:4px;cursor:pointer;">İptal</button>' +
                '<button style="padding:0.5rem 1.5rem;background:#E20714;color:white;border:none;border-radius:4px;cursor:pointer;">Reddet</button>' +
                '</div></div>');
            return null;
        };
        document.querySelector('.btn-reject').click();
    """)
    time.sleep(1)
    capture("06_Is_Talebi_Red_Dialog", "İş talebi reddetme nedeni girişi")

    # ========================================
    # 3. VARLIK YÖNETİMİ MODÜLÜ
    # ========================================
    print("\n📦 3. VARLIK YÖNETİMİ MODÜLÜ")
    print("-" * 60)

    driver.get(f"file://{app_path}/pages/assets.html")
    time.sleep(2)
    capture("07_Varlik_Yonetimi_Liste", "Varlık yönetimi liste görünümü")

    # Varlık ekleme modal
    try:
        add_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn-primary")))
        driver.execute_script("arguments[0].click();", add_button)
        time.sleep(1)
        capture("08_Varlik_Ekle_Modal", "Yeni Varlık ekleme formu")
        driver.execute_script("document.querySelector('.modal-close').click();")
    except:
        pass

    # Varlık detay sayfası
    driver.get(f"file://{app_path}/pages/asset-detail.html?id=AST-007")
    time.sleep(2)
    capture("09_Varlik_Detay_Onay_Bekliyor", "Varlık detay - Onay Bekliyor durumu (butonlar aktif)")

    # Onay dialog
    driver.execute_script("""
        window.confirm = function(msg) {
            document.body.insertAdjacentHTML('beforeend',
                '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:2rem;border:2px solid #00A859;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:10000;width:400px;">' +
                '<h3 style="margin:0 0 1rem 0;color:#00A859;">✓ Varlık Onayı</h3>' +
                '<p style="margin:0 0 1.5rem 0;color:#333;">' + msg + '</p>' +
                '<div style="display:flex;gap:1rem;justify-content:flex-end;">' +
                '<button style="padding:0.5rem 1.5rem;background:#ccc;border:none;border-radius:4px;cursor:pointer;">İptal</button>' +
                '<button style="padding:0.5rem 1.5rem;background:#00A859;color:white;border:none;border-radius:4px;cursor:pointer;">Onayla</button>' +
                '</div></div>');
            return false;
        };
        document.querySelector('.btn-approve').click();
    """)
    time.sleep(1)
    capture("10_Varlik_Onay_Dialog", "Varlık onaylama dialog'u")

    # ========================================
    # 4. BAKIM YÖNETİMİ MODÜLÜ
    # ========================================
    print("\n🔧 4. BAKIM YÖNETİMİ MODÜLÜ")
    print("-" * 60)

    driver.get(f"file://{app_path}/pages/maintenance.html")
    time.sleep(2)
    capture("11_Bakim_Yonetimi_Liste", "Bakım planları liste görünümü")

    # Bakım planı ekleme modal
    try:
        add_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn-primary")))
        driver.execute_script("arguments[0].click();", add_button)
        time.sleep(1)
        capture("12_Bakim_Plani_Modal", "Yeni Bakım Planı oluşturma formu")
        driver.execute_script("document.querySelector('.modal-close').click();")
    except:
        pass

    # Bakım detay
    driver.get(f"file://{app_path}/pages/maintenance-detail.html?id=MNT-2025-047")
    time.sleep(2)
    capture("13_Bakim_Detay", "Bakım planı detay sayfası - süreç adımları")

    # ========================================
    # 5. OLAY YÖNETİMİ MODÜLÜ
    # ========================================
    print("\n⚠️ 5. OLAY YÖNETİMİ MODÜLÜ")
    print("-" * 60)

    driver.get(f"file://{app_path}/pages/incidents.html")
    time.sleep(2)
    capture("14_Olay_Yonetimi_Liste", "Olay yönetimi liste görünümü - SLA takibi")

    # Olay bildirme modal
    try:
        add_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn-primary")))
        driver.execute_script("arguments[0].click();", add_button)
        time.sleep(1)
        capture("15_Olay_Bildir_Modal", "Yeni Olay bildirme formu")
        driver.execute_script("document.querySelector('.modal-close').click();")
    except:
        pass

    # Olay detay
    driver.get(f"file://{app_path}/pages/incident-detail.html?id=INC-2025-013")
    time.sleep(2)
    capture("16_Olay_Detay", "Olay detay sayfası - müdahale süreci")

    # Çözüm onayı dialog
    driver.execute_script("""
        window.confirm = function(msg) {
            document.body.insertAdjacentHTML('beforeend',
                '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:2rem;border:2px solid #00A859;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:10000;width:420px;">' +
                '<h3 style="margin:0 0 1rem 0;color:#00A859;">✓ Çözüm Onayı</h3>' +
                '<p style="margin:0 0 1.5rem 0;color:#333;">' + msg + '</p>' +
                '<div style="display:flex;gap:1rem;justify-content:flex-end;">' +
                '<button style="padding:0.5rem 1.5rem;background:#ccc;border:none;border-radius:4px;cursor:pointer;">İptal</button>' +
                '<button style="padding:0.5rem 1.5rem;background:#00A859;color:white;border:none;border-radius:4px;cursor:pointer;">Çözümü Onayla</button>' +
                '</div></div>');
            return false;
        };
        document.querySelector('.btn-approve').click();
    """)
    time.sleep(1)
    capture("17_Olay_Cozum_Onay", "Olay çözümü onaylama dialog'u")

    # ========================================
    # 6. RAPORLAR
    # ========================================
    print("\n📊 6. RAPORLAR MODÜLÜ")
    print("-" * 60)

    driver.get(f"file://{app_path}/pages/reports.html")
    time.sleep(2)
    capture("18_Raporlar_Sayfa", "Raporlar sayfası - rapor kategorileri")

    # ========================================
    # 7. BAŞARI BİLDİRİMLERİ (Success Notifications)
    # ========================================
    print("\n✅ 7. BAŞARI BİLDİRİMLERİ")
    print("-" * 60)

    driver.get(f"file://{app_path}/pages/job-request-detail.html?id=JR-2025-001")
    time.sleep(1)

    # Başarı bildirimi göster
    driver.execute_script("""
        document.body.insertAdjacentHTML('beforeend',
            '<div style="position:fixed;top:20px;right:20px;background:#00A859;color:white;padding:1.5rem 2rem;border-radius:8px;box-shadow:0 4px 20px rgba(0,168,89,0.4);z-index:10000;min-width:350px;animation:slideIn 0.3s ease;">' +
            '<div style="display:flex;align-items:center;gap:1rem;">' +
            '<div style="font-size:2rem;">✅</div>' +
            '<div>' +
            '<div style="font-weight:600;font-size:1.1rem;margin-bottom:0.25rem;">İşlem Başarılı!</div>' +
            '<div style="opacity:0.95;font-size:0.9rem;">JR-2025-001 numaralı iş talebi başarıyla onaylandı ve sisteme eklendi!</div>' +
            '</div>' +
            '</div></div>');
    """)
    time.sleep(1)
    capture("19_Basari_Bildirimi", "Başarı bildirimi - yeşil notification")

    # ========================================
    # 8. HATA BİLDİRİMLERİ (Error Notifications)
    # ========================================
    print("\n❌ 8. HATA/RED BİLDİRİMLERİ")
    print("-" * 60)

    driver.execute_script("document.body.lastElementChild.remove();")
    time.sleep(0.3)

    driver.execute_script("""
        document.body.insertAdjacentHTML('beforeend',
            '<div style="position:fixed;top:20px;right:20px;background:#E20714;color:white;padding:1.5rem 2rem;border-radius:8px;box-shadow:0 4px 20px rgba(226,7,20,0.4);z-index:10000;min-width:350px;">' +
            '<div style="display:flex;align-items:center;gap:1rem;">' +
            '<div style="font-size:2rem;">❌</div>' +
            '<div>' +
            '<div style="font-weight:600;font-size:1.1rem;margin-bottom:0.25rem;">İşlem Reddedildi</div>' +
            '<div style="opacity:0.95;font-size:0.9rem;">JR-2025-001 numaralı iş talebi reddedildi.<br>Neden: Bütçe yetersizliği</div>' +
            '</div>' +
            '</div></div>');
    """)
    time.sleep(1)
    capture("20_Red_Bildirimi", "Red bildirimi - kırmızı notification")

    # ========================================
    # 9. UYARI BİLDİRİMLERİ (Warning Notifications)
    # ========================================
    print("\n⚠️ 9. UYARI BİLDİRİMLERİ")
    print("-" * 60)

    driver.execute_script("document.body.lastElementChild.remove();")
    time.sleep(0.3)

    driver.execute_script("""
        document.body.insertAdjacentHTML('beforeend',
            '<div style="position:fixed;top:20px;right:20px;background:#FFA500;color:white;padding:1.5rem 2rem;border-radius:8px;box-shadow:0 4px 20px rgba(255,165,0,0.4);z-index:10000;min-width:350px;">' +
            '<div style="display:flex;align-items:center;gap:1rem;">' +
            '<div style="font-size:2rem;">⚠️</div>' +
            '<div>' +
            '<div style="font-weight:600;font-size:1.1rem;margin-bottom:0.25rem;">Dikkat!</div>' +
            '<div style="opacity:0.95;font-size:0.9rem;">Bakım planı MNT-2025-047 yarın sona eriyor. Lütfen kontrol ediniz.</div>' +
            '</div>' +
            '</div></div>');
    """)
    time.sleep(1)
    capture("21_Uyari_Bildirimi", "Uyarı bildirimi - turuncu notification")

    # ========================================
    # 10. CREATE FORMS (Oluşturma Formları)
    # ========================================
    print("\n📝 10. OLUŞTURMA FORMLARI")
    print("-" * 60)

    driver.get(f"file://{app_path}/pages/job-request-create.html")
    time.sleep(2)
    capture("22_Is_Talebi_Olustur_Form", "İş Talebi oluşturma formu - tam sayfa")

    driver.get(f"file://{app_path}/pages/asset-create.html")
    time.sleep(2)
    capture("23_Varlik_Olustur_Form", "Varlık oluşturma formu - tam sayfa")

    driver.get(f"file://{app_path}/pages/maintenance-create.html")
    time.sleep(2)
    capture("24_Bakim_Plani_Olustur_Form", "Bakım Planı oluşturma formu - tam sayfa")

    driver.get(f"file://{app_path}/pages/incident-create.html")
    time.sleep(2)
    capture("25_Olay_Bildir_Form", "Olay bildirme formu - tam sayfa")

    # ========================================
    # 11. MOBİL GÖRÜNÜM (Responsive)
    # ========================================
    print("\n📱 11. MOBİL RESPONSIVE GÖRÜNÜM")
    print("-" * 60)

    driver.set_window_size(375, 812)  # iPhone X size
    time.sleep(1)

    driver.get(f"file://{app_path}/index.html")
    time.sleep(2)
    capture("26_Mobil_Dashboard", "Mobil görünüm - Dashboard (375px)")

    driver.get(f"file://{app_path}/pages/job-requests.html")
    time.sleep(2)
    capture("27_Mobil_Is_Talepleri", "Mobil görünüm - İş Talepleri listesi")

    driver.get(f"file://{app_path}/pages/assets.html")
    time.sleep(2)
    capture("28_Mobil_Varliklar", "Mobil görünüm - Varlık listesi")

    # ========================================
    # 12. TABLET GÖRÜNÜM
    # ========================================
    print("\n📱 12. TABLET GÖRÜNÜM")
    print("-" * 60)

    driver.set_window_size(768, 1024)  # iPad size
    time.sleep(1)

    driver.get(f"file://{app_path}/index.html")
    time.sleep(2)
    capture("29_Tablet_Dashboard", "Tablet görünüm - Dashboard (768px)")

    # ========================================
    # SUMMARY
    # ========================================
    print("\n" + "="*60)
    print(f"✅ SCREENSHOT CAPTURE COMPLETED!")
    print(f"Total screenshots: {len(screenshots)}")
    print(f"Save location: {screenshot_dir}/")
    print("="*60 + "\n")

    # Create index file
    with open(f"{screenshot_dir}/INDEX.txt", "w", encoding="utf-8") as f:
        f.write("MAN TÜRKİYE BAKIM YÖNETİMİ - EKSİKSİZ EKRAN GÖRÜNTÜLERİ\n")
        f.write("="*70 + "\n\n")
        f.write(f"Toplam Ekran Görüntüsü: {len(screenshots)}\n")
        f.write(f"Tarih: {time.strftime('%d.%m.%Y %H:%M')}\n\n")
        f.write("-"*70 + "\n\n")

        for i, shot in enumerate(screenshots, 1):
            f.write(f"{i}. {shot['name']}.png\n")
            f.write(f"   {shot['description']}\n\n")

    print("📄 Index file created: INDEX.txt\n")

finally:
    driver.quit()
    print("Browser closed.")
