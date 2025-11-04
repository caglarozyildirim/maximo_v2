#!/usr/bin/env python3
"""
Capture Rejection Action Screenshots
Shows rejected state and workflows
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import os

base_path = "/Users/caglarozyildirim/WebstormProjects/Deneme"
app_path = f"{base_path}/bakim-yonetim-app"
screenshot_dir = f"{base_path}/screenshots_complete"

chrome_options = Options()
chrome_options.add_argument('--headless=new')
chrome_options.add_argument('--window-size=1920,1080')
chrome_options.add_argument('--force-device-scale-factor=1')

driver = webdriver.Chrome(options=chrome_options)

def capture(name, description=""):
    filepath = f"{screenshot_dir}/{name}.png"
    driver.save_screenshot(filepath)
    print(f"✓ Captured: {name}")
    time.sleep(0.5)

try:
    print("\n" + "="*60)
    print("CAPTURING REJECTION ACTION SCREENSHOTS")
    print("="*60 + "\n")

    # İŞ TALEBİ - Reddedilmiş Durum
    print("\n📋 İş Talebi - Reddedilmiş Durum...")
    driver.get(f"file://{app_path}/pages/job-request-detail.html?id=JR-2025-001")
    time.sleep(2)

    # Simulate rejected state
    driver.execute_script("""
        // Change status to rejected
        document.getElementById('statusBadge').textContent = 'Reddedildi';
        document.getElementById('statusBadge').className = 'badge badge-status';
        document.getElementById('statusBadge').style.background = '#FFEBEE';
        document.getElementById('statusBadge').style.color = '#E20714';
        document.getElementById('statusBadge').style.borderColor = '#E20714';

        // Update status icon
        const statusIcon = document.getElementById('statusIcon');
        statusIcon.textContent = '✗';
        statusIcon.style.backgroundColor = '#FFF5F5';
        statusIcon.style.color = '#E20714';

        const statusLabel = document.getElementById('statusLabel');
        statusLabel.textContent = 'Reddedildi';

        // Disable buttons
        const approveBtn = document.querySelector('.btn-approve');
        const rejectBtn = document.querySelector('.btn-reject');
        if (approveBtn) {
            approveBtn.disabled = true;
            approveBtn.style.opacity = '0.5';
            approveBtn.style.cursor = 'not-allowed';
        }
        if (rejectBtn) {
            rejectBtn.disabled = true;
            rejectBtn.style.opacity = '0.5';
            rejectBtn.style.cursor = 'not-allowed';
        }
    """)
    time.sleep(1)
    capture("30_Is_Talebi_Reddedilmis_Durum", "İş Talebi Reddedilmiş Durumu - Butonlar Pasif")

    # VARLIK - Reddedilmiş Durum
    print("\n📦 Varlık - Reddedilmiş Durum...")
    driver.get(f"file://{app_path}/pages/asset-detail.html?id=AST-007")
    time.sleep(2)

    driver.execute_script("""
        const statusBadge = document.getElementById('asset-status-badge');
        statusBadge.textContent = 'Reddedildi';
        statusBadge.className = 'badge badge-danger';
        statusBadge.style.fontSize = '1rem';
        statusBadge.style.padding = '0.5rem 1rem';

        // Disable buttons
        const approveBtn = document.querySelector('.btn-approve');
        const rejectBtn = document.querySelector('.btn-reject');
        if (approveBtn) {
            approveBtn.disabled = true;
            approveBtn.style.opacity = '0.5';
            approveBtn.style.cursor = 'not-allowed';
        }
        if (rejectBtn) {
            rejectBtn.disabled = true;
            rejectBtn.style.opacity = '0.5';
            rejectBtn.style.cursor = 'not-allowed';
        }
    """)
    time.sleep(1)
    capture("31_Varlik_Reddedilmis_Durum", "Varlık Reddedilmiş Durumu - Butonlar Pasif")

    # BAKIM - Reddedilmiş Durum
    print("\n🔧 Bakım Planı - Reddedilmiş Durum...")
    driver.get(f"file://{app_path}/pages/maintenance-detail.html?id=MNT-2025-047")
    time.sleep(2)

    driver.execute_script("""
        const statusBadge = document.getElementById('maintenance-status-badge');
        statusBadge.textContent = 'Reddedildi';
        statusBadge.className = 'badge badge-danger';
        statusBadge.style.fontSize = '1rem';
        statusBadge.style.padding = '0.5rem 1rem';

        // Disable buttons
        const approveBtn = document.querySelector('.btn-approve');
        const rejectBtn = document.querySelector('.btn-reject');
        if (approveBtn) {
            approveBtn.disabled = true;
            approveBtn.style.opacity = '0.5';
            approveBtn.style.cursor = 'not-allowed';
        }
        if (rejectBtn) {
            rejectBtn.disabled = true;
            rejectBtn.style.opacity = '0.5';
            rejectBtn.style.cursor = 'not-allowed';
        }
    """)
    time.sleep(1)
    capture("32_Bakim_Reddedilmis_Durum", "Bakım Planı Reddedilmiş Durumu - Butonlar Pasif")

    # OLAY - Reddedilmiş Durum
    print("\n⚠️ Olay - Reddedilmiş Durum...")
    driver.get(f"file://{app_path}/pages/incident-detail.html?id=INC-2025-013")
    time.sleep(2)

    driver.execute_script("""
        const statusBadge = document.getElementById('incident-status-badge');
        statusBadge.textContent = 'Reddedildi';
        statusBadge.className = 'badge badge-danger';

        // Disable buttons
        const approveBtn = document.querySelector('.btn-approve');
        const rejectBtn = document.querySelector('.btn-reject');
        if (approveBtn) {
            approveBtn.disabled = true;
            approveBtn.style.opacity = '0.5';
            approveBtn.style.cursor = 'not-allowed';
        }
        if (rejectBtn) {
            rejectBtn.disabled = true;
            rejectBtn.style.opacity = '0.5';
            rejectBtn.style.cursor = 'not-allowed';
        }
    """)
    time.sleep(1)
    capture("33_Olay_Reddedilmis_Durum", "Olay Reddedilmiş Durumu - Butonlar Pasif")

    print("\n" + "="*60)
    print("✅ REJECTION SCREENSHOTS COMPLETED!")
    print("New screenshots: 4 (30-33)")
    print("="*60 + "\n")

finally:
    driver.quit()
    print("Browser closed.")
