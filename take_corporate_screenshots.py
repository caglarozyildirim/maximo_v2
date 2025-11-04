#!/usr/bin/env python3
import subprocess
import os
import time

# Screenshots to take with corporate design
screenshots = [
    {
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/index.html',
        'output': '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/corporate_01_ana_sayfa.png',
        'name': 'Ana Sayfa - Corporate'
    },
    {
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/job-requests.html',
        'output': '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/corporate_02_is_talepleri.png',
        'name': 'İş Talepleri - Corporate'
    },
    {
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/assets.html',
        'output': '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/corporate_03_varlik_yonetimi.png',
        'name': 'Varlık Yönetimi - Corporate'
    },
    {
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/asset-detail.html?id=AST-001',
        'output': '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/corporate_04_varlik_detay.png',
        'name': 'Varlık Detayı - Corporate'
    },
    {
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/maintenance.html',
        'output': '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/corporate_05_bakim_yonetimi.png',
        'name': 'Bakım Yönetimi - Corporate'
    },
    {
        'url': 'file:///Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/incidents.html',
        'output': '/Users/caglarozyildirim/WebstormProjects/Deneme/screenshots/corporate_06_olay_yonetimi.png',
        'name': 'Olay Yönetimi - Corporate'
    }
]

print("📸 Taking corporate design screenshots...\n")

for screenshot in screenshots:
    print(f"Capturing: {screenshot['name']}")

    cmd = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless',
        '--disable-gpu',
        '--screenshot=' + screenshot['output'],
        '--window-size=1920,1080',
        '--hide-scrollbars',
        screenshot['url']
    ]

    try:
        subprocess.run(cmd, check=True, capture_output=True)

        if os.path.exists(screenshot['output']):
            size = os.path.getsize(screenshot['output'])
            print(f"  ✅ Saved: {os.path.basename(screenshot['output'])} ({size/1024:.1f} KB)")
        else:
            print(f"  ❌ Failed: {screenshot['name']}")
    except Exception as e:
        print(f"  ❌ Error: {str(e)}")

    time.sleep(1)

print("\n🎉 Corporate screenshots captured successfully!")
