#!/usr/bin/env python3
import re
import os

# New corporate MAN logo SVG
new_logo_html = '''<svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- MAN Logo - Professional Corporate Design -->
                    <rect width="120" height="120" fill="#E20714" rx="4"/>
                    <text x="60" y="75" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="white" letter-spacing="-2">MAN</text>
                </svg>
                <div>
                    <h1>MAN Türkiye</h1>
                    <div>Bakım Yönetimi Sistemi</div>
                </div>'''

# Pattern to match old logo
old_logo_pattern = r'<svg[^>]*>[\s\S]*?</svg>\s*<div>\s*<h1>MAN Türkiye</h1>\s*<div[^>]*>.*?</div>\s*</div>'

files_to_update = [
    '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/job-requests.html',
    '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/assets.html',
    '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/asset-detail.html',
    '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/maintenance.html',
    '/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetim-app/pages/incidents.html',
]

print("Updating logos in all HTML files...\n")

for file_path in files_to_update:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace logo
        updated_content = re.sub(old_logo_pattern, new_logo_html, content, flags=re.DOTALL)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        print(f"✅ Updated: {os.path.basename(file_path)}")
    else:
        print(f"❌ Not found: {file_path}")

print("\n🎉 All logos updated with corporate MAN design!")
