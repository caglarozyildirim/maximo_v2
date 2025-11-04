#!/usr/bin/env python3
"""
Create Visio-style workflow diagrams as SVG files for MAN Turkey Maintenance Management System
"""

import os

# Create diagrams directory
os.makedirs('/Users/caglarozyildirim/WebstormProjects/Deneme/diagrams', exist_ok=True)

# Diagram 1: Job Request Workflow
job_request_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <style>
      .swimlane-header { fill: #E20714; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: white; }
      .swimlane-bg { fill: #F5F5F5; stroke: #666; stroke-width: 2; }
      .process-box { fill: #FFFFFF; stroke: #333; stroke-width: 2; }
      .decision-box { fill: #FFF8DC; stroke: #333; stroke-width: 2; }
      .start-end { fill: #00A859; stroke: #333; stroke-width: 2; }
      .text { font-family: Arial, sans-serif; font-size: 14px; fill: #000; text-anchor: middle; }
      .label { font-family: Arial, sans-serif; font-size: 12px; fill: #666; }
      .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
  </defs>

  <!-- Title -->
  <text x="600" y="30" style="font-size: 20px; font-weight: bold; text-anchor: middle; fill: #1A1A1A;">İş Talebi Süreci - MAN Türkiye</text>

  <!-- Swimlane 1: Talep Sahibi -->
  <rect x="50" y="60" width="1100" height="200" class="swimlane-bg"/>
  <rect x="50" y="60" width="150" height="200" fill="#E20714"/>
  <text x="125" y="165" class="swimlane-header" transform="rotate(-90 125 165)">Talep Sahibi</text>

  <!-- Swimlane 2: Bakım Yöneticisi -->
  <rect x="50" y="260" width="1100" height="220" class="swimlane-bg"/>
  <rect x="50" y="260" width="150" height="220" fill="#E20714"/>
  <text x="125" y="375" class="swimlane-header" transform="rotate(-90 125 375)">Bakım Yöneticisi</text>

  <!-- Swimlane 3: Teknisyen -->
  <rect x="50" y="480" width="1100" height="200" class="swimlane-bg"/>
  <rect x="50" y="480" width="150" height="200" fill="#E20714"/>
  <text x="125" y="585" class="swimlane-header" transform="rotate(-90 125 585)">Teknisyen</text>

  <!-- Swimlane 4: Sistem -->
  <rect x="50" y="680" width="1100" height="180" class="swimlane-bg"/>
  <rect x="50" y="680" width="150" height="180" fill="#E20714"/>
  <text x="125" y="775" class="swimlane-header" transform="rotate(-90 125 775)">Sistem</text>

  <!-- Process Steps - Talep Sahibi -->
  <ellipse cx="280" cy="160" rx="60" ry="30" class="start-end"/>
  <text x="280" y="165" class="text">Başla</text>

  <rect x="380" y="130" width="120" height="60" class="process-box"/>
  <text x="440" y="155" class="text">İş Talebi</text>
  <text x="440" y="175" class="text">Oluştur</text>

  <rect x="550" y="130" width="120" height="60" class="process-box"/>
  <text x="610" y="155" class="text">Form</text>
  <text x="610" y="175" class="text">Doldur</text>

  <!-- Process Steps - Bakım Yöneticisi -->
  <rect x="380" y="330" width="120" height="60" class="process-box"/>
  <text x="440" y="355" class="text">Talebi</text>
  <text x="440" y="375" class="text">İncele</text>

  <path d="M 550 360 L 610 320 L 670 360 L 610 400 Z" class="decision-box"/>
  <text x="610" y="355" class="text" style="font-size: 12px;">Onay?</text>

  <rect x="760" y="330" width="120" height="60" class="process-box"/>
  <text x="820" y="355" class="text">Teknisyen</text>
  <text x="820" y="375" class="text">Ata</text>

  <rect x="550" y="430" width="120" height="60" class="process-box"/>
  <text x="610" y="455" class="text">Red</text>
  <text x="610" y="475" class="text">Bildirimi</text>

  <!-- Process Steps - Teknisyen -->
  <rect x="760" y="540" width="120" height="60" class="process-box"/>
  <text x="820" y="565" class="text">İşi</text>
  <text x="820" y="585" class="text">Tamamla</text>

  <rect x="920" y="540" width="120" height="60" class="process-box"/>
  <text x="980" y="565" class="text">Rapor</text>
  <text x="980" y="585" class="text">Hazırla</text>

  <!-- Process Steps - Sistem -->
  <rect x="920" y="730" width="120" height="60" class="process-box"/>
  <text x="980" y="755" class="text">Durum</text>
  <text x="980" y="775" class="text">Güncelle</text>

  <ellipse cx="1080" cy="760" rx="60" ry="30" class="start-end"/>
  <text x="1080" y="765" class="text">Bitir</text>

  <!-- Arrows -->
  <path d="M 340 160 L 380 160" class="arrow"/>
  <path d="M 500 160 L 550 160" class="arrow"/>
  <path d="M 610 190 L 610 280 L 440 280 L 440 330" class="arrow"/>
  <path d="M 500 360 L 550 360" class="arrow"/>
  <path d="M 670 360 L 760 360" class="arrow"/>
  <text x="700" y="350" class="label">Evet</text>
  <path d="M 610 400 L 610 430" class="arrow"/>
  <text x="620" y="420" class="label">Hayır</text>
  <path d="M 820 390 L 820 540" class="arrow"/>
  <path d="M 880 570 L 920 570" class="arrow"/>
  <path d="M 980 600 L 980 730" class="arrow"/>
  <path d="M 1040 760 L 1080 760" class="arrow"/>
</svg>'''

# Diagram 2: Maintenance Planning Workflow
maintenance_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      .swimlane-header { fill: #E20714; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: white; }
      .swimlane-bg { fill: #F5F5F5; stroke: #666; stroke-width: 2; }
      .process-box { fill: #FFFFFF; stroke: #333; stroke-width: 2; }
      .decision-box { fill: #FFF8DC; stroke: #333; stroke-width: 2; }
      .start-end { fill: #00A859; stroke: #333; stroke-width: 2; }
      .text { font-family: Arial, sans-serif; font-size: 14px; fill: #000; text-anchor: middle; }
      .label { font-family: Arial, sans-serif; font-size: 12px; fill: #666; }
      .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
  </defs>

  <!-- Title -->
  <text x="600" y="30" style="font-size: 20px; font-weight: bold; text-anchor: middle; fill: #1A1A1A;">Bakım Planlama Süreci - MAN Türkiye</text>

  <!-- Swimlane 1: Bakım Planlayıcı -->
  <rect x="50" y="60" width="1100" height="220" class="swimlane-bg"/>
  <rect x="50" y="60" width="150" height="220" fill="#E20714"/>
  <text x="125" y="175" class="swimlane-header" transform="rotate(-90 125 175)">Bakım Planlayıcı</text>

  <!-- Swimlane 2: Bakım Ekibi -->
  <rect x="50" y="280" width="1100" height="240" class="swimlane-bg"/>
  <rect x="50" y="280" width="150" height="240" fill="#E20714"/>
  <text x="125" y="405" class="swimlane-header" transform="rotate(-90 125 405)">Bakım Ekibi</text>

  <!-- Swimlane 3: Sistem -->
  <rect x="50" y="520" width="1100" height="220" class="swimlane-bg"/>
  <rect x="50" y="520" width="150" height="220" fill="#E20714"/>
  <text x="125" y="635" class="swimlane-header" transform="rotate(-90 125 635)">Sistem</text>

  <!-- Process Steps - Bakım Planlayıcı -->
  <ellipse cx="280" cy="170" rx="60" ry="30" class="start-end"/>
  <text x="280" y="175" class="text">Başla</text>

  <rect x="380" y="140" width="120" height="60" class="process-box"/>
  <text x="440" y="165" class="text">Varlık</text>
  <text x="440" y="185" class="text">Seç</text>

  <rect x="550" y="140" width="120" height="60" class="process-box"/>
  <text x="610" y="165" class="text">Bakım</text>
  <text x="610" y="185" class="text">Tipi Belirle</text>

  <rect x="720" y="140" width="120" height="60" class="process-box"/>
  <text x="780" y="165" class="text">Tarih &amp;</text>
  <text x="780" y="185" class="text">Ekip Ata</text>

  <path d="M 890 170 L 950 140 L 1010 170 L 950 200 Z" class="decision-box"/>
  <text x="950" y="165" class="text" style="font-size: 12px;">Acil?</text>

  <rect x="720" y="230" width="120" height="60" class="process-box"/>
  <text x="780" y="255" class="text">Öncelik:</text>
  <text x="780" y="275" class="text">Normal</text>

  <!-- Process Steps - Bakım Ekibi -->
  <rect x="380" y="360" width="120" height="60" class="process-box"/>
  <text x="440" y="385" class="text">Bakımı</text>
  <text x="440" y="405" class="text">Başlat</text>

  <rect x="550" y="360" width="120" height="60" class="process-box"/>
  <text x="610" y="385" class="text">Bakım</text>
  <text x="610" y="405" class="text">Gerçekleştir</text>

  <path d="M 720 390 L 780 360 L 840 390 L 780 420 Z" class="decision-box"/>
  <text x="780" y="385" class="text" style="font-size: 12px;">Yedek</text>
  <text x="780" y="400" class="text" style="font-size: 12px;">Parça?</text>

  <rect x="890" y="360" width="120" height="60" class="process-box"/>
  <text x="950" y="385" class="text">Parça</text>
  <text x="950" y="405" class="text">Değiştir</text>

  <rect x="720" y="460" width="120" height="60" class="process-box"/>
  <text x="780" y="485" class="text">Bakımı</text>
  <text x="780" y="505" class="text">Kapat</text>

  <!-- Process Steps - Sistem -->
  <rect x="380" y="590" width="120" height="60" class="process-box"/>
  <text x="440" y="615" class="text">Bildirim</text>
  <text x="440" y="635" class="text">Gönder</text>

  <rect x="550" y="590" width="120" height="60" class="process-box"/>
  <text x="610" y="615" class="text">Durum</text>
  <text x="610" y="635" class="text">Güncelle</text>

  <rect x="720" y="590" width="120" height="60" class="process-box"/>
  <text x="780" y="615" class="text">Geçmiş</text>
  <text x="780" y="635" class="text">Kaydet</text>

  <rect x="890" y="590" width="120" height="60" class="process-box"/>
  <text x="950" y="615" class="text">Sonraki</text>
  <text x="950" y="635" class="text">Planla</text>

  <ellipse cx="1070" cy="620" rx="60" ry="30" class="start-end"/>
  <text x="1070" y="625" class="text">Bitir</text>

  <!-- Arrows -->
  <path d="M 340 170 L 380 170" class="arrow"/>
  <path d="M 500 170 L 550 170" class="arrow"/>
  <path d="M 670 170 L 720 170" class="arrow"/>
  <path d="M 840 170 L 890 170" class="arrow"/>
  <path d="M 1010 170 L 1060 170 L 1060 320 L 440 320 L 440 360" class="arrow"/>
  <text x="1030" y="165" class="label">Evet</text>
  <path d="M 950 200 L 950 220 L 780 220 L 780 230" class="arrow"/>
  <text x="860" y="215" class="label">Hayır</text>
  <path d="M 500 390 L 550 390" class="arrow"/>
  <path d="M 670 390 L 720 390" class="arrow"/>
  <path d="M 840 390 L 890 390" class="arrow"/>
  <text x="850" y="380" class="label">Evet</text>
  <path d="M 780 420 L 780 460" class="arrow"/>
  <text x="790" y="445" class="label">Hayır</text>
  <path d="M 950 420 L 950 440 L 780 440 L 780 460" class="arrow"/>
  <path d="M 780 520 L 780 550 L 440 550 L 440 590" class="arrow"/>
  <path d="M 500 620 L 550 620" class="arrow"/>
  <path d="M 670 620 L 720 620" class="arrow"/>
  <path d="M 840 620 L 890 620" class="arrow"/>
  <path d="M 1010 620 L 1070 620" class="arrow"/>
</svg>'''

# Diagram 3: Incident Management Workflow
incident_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <style>
      .swimlane-header { fill: #E20714; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: white; }
      .swimlane-bg { fill: #F5F5F5; stroke: #666; stroke-width: 2; }
      .process-box { fill: #FFFFFF; stroke: #333; stroke-width: 2; }
      .decision-box { fill: #FFF8DC; stroke: #333; stroke-width: 2; }
      .start-end { fill: #00A859; stroke: #333; stroke-width: 2; }
      .critical { fill: #FFE6E6; stroke: #E20714; stroke-width: 3; }
      .text { font-family: Arial, sans-serif; font-size: 14px; fill: #000; text-anchor: middle; }
      .label { font-family: Arial, sans-serif; font-size: 12px; fill: #666; }
      .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
      .critical-arrow { stroke: #E20714; stroke-width: 3; fill: none; marker-end: url(#critical-arrowhead); }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
    <marker id="critical-arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#E20714" />
    </marker>
  </defs>

  <!-- Title -->
  <text x="600" y="30" style="font-size: 20px; font-weight: bold; text-anchor: middle; fill: #1A1A1A;">Olay Yönetimi Süreci - MAN Türkiye</text>

  <!-- Swimlane 1: Bildirimci -->
  <rect x="50" y="60" width="1100" height="180" class="swimlane-bg"/>
  <rect x="50" y="60" width="150" height="180" fill="#E20714"/>
  <text x="125" y="155" class="swimlane-header" transform="rotate(-90 125 155)">Bildirimci</text>

  <!-- Swimlane 2: Olay Yöneticisi -->
  <rect x="50" y="240" width="1100" height="240" class="swimlane-bg"/>
  <rect x="50" y="240" width="150" height="240" fill="#E20714"/>
  <text x="125" y="365" class="swimlane-header" transform="rotate(-90 125 365)">Olay Yöneticisi</text>

  <!-- Swimlane 3: Müdahale Ekibi -->
  <rect x="50" y="480" width="1100" height="200" class="swimlane-bg"/>
  <rect x="50" y="480" width="150" height="200" fill="#E20714"/>
  <text x="125" y="585" class="swimlane-header" transform="rotate(-90 125 585)">Müdahale Ekibi</text>

  <!-- Swimlane 4: Sistem -->
  <rect x="50" y="680" width="1100" height="180" class="swimlane-bg"/>
  <rect x="50" y="680" width="150" height="180" fill="#E20714"/>
  <text x="125" y="775" class="swimlane-header" transform="rotate(-90 125 775)">Sistem</text>

  <!-- Process Steps - Bildirimci -->
  <ellipse cx="280" cy="150" rx="60" ry="30" class="start-end"/>
  <text x="280" y="155" class="text">Olay</text>

  <rect x="380" y="120" width="120" height="60" class="critical"/>
  <text x="440" y="145" class="text">Olay</text>
  <text x="440" y="165" class="text">Bildir</text>

  <rect x="550" y="120" width="120" height="60" class="process-box"/>
  <text x="610" y="145" class="text">Detay</text>
  <text x="610" y="165" class="text">Gir</text>

  <!-- Process Steps - Olay Yöneticisi -->
  <rect x="380" y="310" width="120" height="60" class="process-box"/>
  <text x="440" y="335" class="text">Olayı</text>
  <text x="440" y="355" class="text">Değerlendir</text>

  <path d="M 550 340 L 610 310 L 670 340 L 610 370 Z" class="decision-box"/>
  <text x="610" y="335" class="text" style="font-size: 11px;">Öncelik</text>
  <text x="610" y="350" class="text" style="font-size: 11px;">Seviyesi?</text>

  <rect x="720" y="270" width="120" height="60" class="critical"/>
  <text x="780" y="295" class="text">Acil</text>
  <text x="780" y="315" class="text">Ekip Çağır</text>

  <rect x="720" y="350" width="120" height="60" class="process-box"/>
  <text x="780" y="375" class="text">Normal</text>
  <text x="780" y="395" class="text">Atama</text>

  <rect x="890" y="310" width="120" height="60" class="process-box"/>
  <text x="950" y="335" class="text">İzleme</text>
  <text x="950" y="355" class="text">Başlat</text>

  <!-- Process Steps - Müdahale Ekibi -->
  <rect x="380" y="540" width="120" height="60" class="process-box"/>
  <text x="440" y="565" class="text">Müdahale</text>
  <text x="440" y="585" class="text">Et</text>

  <rect x="550" y="540" width="120" height="60" class="process-box"/>
  <text x="610" y="565" class="text">Sorunu</text>
  <text x="610" y="585" class="text">Çöz</text>

  <path d="M 720 570 L 780 540 L 840 570 L 780 600 Z" class="decision-box"/>
  <text x="780" y="565" class="text" style="font-size: 12px;">Çözüldü?</text>

  <rect x="890" y="540" width="120" height="60" class="process-box"/>
  <text x="950" y="565" class="text">Rapor</text>
  <text x="950" y="585" class="text">Hazırla</text>

  <rect x="720" y="630" width="120" height="60" class="process-box"/>
  <text x="780" y="655" class="text">Ek</text>
  <text x="780" y="675" class="text">Kaynak</text>

  <!-- Process Steps - Sistem -->
  <rect x="380" y="730" width="120" height="60" class="process-box"/>
  <text x="440" y="755" class="text">Bildirim</text>
  <text x="440" y="775" class="text">Gönder</text>

  <rect x="550" y="730" width="120" height="60" class="process-box"/>
  <text x="610" y="755" class="text">Durum</text>
  <text x="610" y="775" class="text">Güncelle</text>

  <rect x="720" y="730" width="120" height="60" class="process-box"/>
  <text x="780" y="755" class="text">Olay</text>
  <text x="780" y="775" class="text">Kapat</text>

  <ellipse cx="900" cy="760" rx="60" ry="30" class="start-end"/>
  <text x="900" y="765" class="text">Bitir</text>

  <!-- Arrows -->
  <path d="M 340 150 L 380 150" class="critical-arrow"/>
  <path d="M 500 150 L 550 150" class="arrow"/>
  <path d="M 610 180 L 610 260 L 440 260 L 440 310" class="arrow"/>
  <path d="M 500 340 L 550 340" class="arrow"/>
  <path d="M 670 340 L 720 340" class="arrow"/>
  <path d="M 610 310 L 610 280 L 720 280 L 720 300" class="critical-arrow"/>
  <text x="635" y="295" class="label" style="fill: #E20714; font-weight: bold;">Kritik</text>
  <path d="M 610 370 L 610 380 L 720 380" class="arrow"/>
  <text x="630" y="375" class="label">Normal</text>
  <path d="M 840 300 L 890 300 L 890 310" class="arrow"/>
  <path d="M 840 380 L 860 380 L 860 340 L 890 340" class="arrow"/>
  <path d="M 950 370 L 950 500 L 440 500 L 440 540" class="arrow"/>
  <path d="M 500 570 L 550 570" class="arrow"/>
  <path d="M 670 570 L 720 570" class="arrow"/>
  <path d="M 840 570 L 890 570" class="arrow"/>
  <text x="850" y="565" class="label">Evet</text>
  <path d="M 780 600 L 780 630" class="arrow"/>
  <text x="790" y="620" class="label">Hayır</text>
  <path d="M 780 690 L 780 710 L 440 710 L 440 730" class="arrow"/>
  <path d="M 950 600 L 950 710 L 610 710 L 610 730" class="arrow"/>
  <path d="M 500 760 L 550 760" class="arrow"/>
  <path d="M 670 760 L 720 760" class="arrow"/>
  <path d="M 840 760 L 900 760" class="arrow"/>
</svg>'''

# Diagram 4: Asset Management Workflow
asset_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <style>
      .swimlane-header { fill: #E20714; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: white; }
      .swimlane-bg { fill: #F5F5F5; stroke: #666; stroke-width: 2; }
      .process-box { fill: #FFFFFF; stroke: #333; stroke-width: 2; }
      .data-box { fill: #E6F3FF; stroke: #0066CC; stroke-width: 2; }
      .start-end { fill: #00A859; stroke: #333; stroke-width: 2; }
      .text { font-family: Arial, sans-serif; font-size: 14px; fill: #000; text-anchor: middle; }
      .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
      .data-arrow { stroke: #0066CC; stroke-width: 2; fill: none; stroke-dasharray: 5,5; }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
  </defs>

  <!-- Title -->
  <text x="500" y="30" style="font-size: 20px; font-weight: bold; text-anchor: middle; fill: #1A1A1A;">Varlık Yönetimi Süreci - MAN Türkiye</text>

  <!-- Swimlane 1: Varlık Yöneticisi -->
  <rect x="50" y="60" width="900" height="280" class="swimlane-bg"/>
  <rect x="50" y="60" width="150" height="280" fill="#E20714"/>
  <text x="125" y="205" class="swimlane-header" transform="rotate(-90 125 205)">Varlık Yöneticisi</text>

  <!-- Swimlane 2: Sistem/Veritabanı -->
  <rect x="50" y="340" width="900" height="300" class="swimlane-bg"/>
  <rect x="50" y="340" width="150" height="300" fill="#E20714"/>
  <text x="125" y="495" class="swimlane-header" transform="rotate(-90 125 495)">Sistem / Veritabanı</text>

  <!-- Process Steps - Varlık Yöneticisi -->
  <ellipse cx="260" cy="200" rx="60" ry="30" class="start-end"/>
  <text x="260" y="205" class="text">Başla</text>

  <rect x="360" y="170" width="120" height="60" class="process-box"/>
  <text x="420" y="195" class="text">Varlık</text>
  <text x="420" y="215" class="text">Bilgilerini Gir</text>

  <rect x="520" y="170" width="120" height="60" class="process-box"/>
  <text x="580" y="195" class="text">SAP ID</text>
  <text x="580" y="215" class="text">Ata</text>

  <rect x="680" y="170" width="120" height="60" class="process-box"/>
  <text x="740" y="195" class="text">Lokasyon &amp;</text>
  <text x="740" y="215" class="text">Sorumlu Ata</text>

  <rect x="360" y="270" width="120" height="60" class="process-box"/>
  <text x="420" y="295" class="text">Bakım</text>
  <text x="420" y="315" class="text">Planla</text>

  <rect x="520" y="270" width="120" height="60" class="process-box"/>
  <text x="580" y="295" class="text">Geçmiş</text>
  <text x="580" y="315" class="text">İzle</text>

  <rect x="680" y="270" width="120" height="60" class="process-box"/>
  <text x="740" y="295" class="text">Rapor</text>
  <text x="740" y="315" class="text">Görüntüle</text>

  <!-- Data Storage -->
  <rect x="260" y="410" width="140" height="80" class="data-box"/>
  <text x="330" y="440" class="text" style="font-size: 12px;">Varlık Ana Bilgileri</text>
  <text x="330" y="460" class="text" style="font-size: 11px;">ID, SAP ID, Ad</text>
  <text x="330" y="475" class="text" style="font-size: 11px;">Model, Seri No</text>

  <rect x="430" y="410" width="140" height="80" class="data-box"/>
  <text x="500" y="440" class="text" style="font-size: 12px;">Lokasyon Bilgileri</text>
  <text x="500" y="460" class="text" style="font-size: 11px;">Tesis, Alan</text>
  <text x="500" y="475" class="text" style="font-size: 11px;">Maliyet Merkezi</text>

  <rect x="600" y="410" width="140" height="80" class="data-box"/>
  <text x="670" y="440" class="text" style="font-size: 12px;">Bakım Bilgileri</text>
  <text x="670" y="460" class="text" style="font-size: 11px;">Son Bakım</text>
  <text x="670" y="475" class="text" style="font-size: 11px;">Sonraki Bakım</text>

  <rect x="770" y="410" width="140" height="80" class="data-box"/>
  <text x="840" y="440" class="text" style="font-size: 12px;">Finansal Bilgiler</text>
  <text x="840" y="460" class="text" style="font-size: 11px;">Satın Alma</text>
  <text x="840" y="475" class="text" style="font-size: 11px;">Defter Değeri</text>

  <rect x="430" y="530" width="140" height="80" class="data-box"/>
  <text x="500" y="560" class="text" style="font-size: 12px;">Durum Bilgileri</text>
  <text x="500" y="580" class="text" style="font-size: 11px;">Aktif/Pasif</text>
  <text x="500" y="595" class="text" style="font-size: 11px;">Çalışma Durumu</text>

  <!-- Arrows -->
  <path d="M 320 200 L 360 200" class="arrow"/>
  <path d="M 480 200 L 520 200" class="arrow"/>
  <path d="M 640 200 L 680 200" class="arrow"/>
  <path d="M 480 300 L 520 300" class="arrow"/>
  <path d="M 640 300 L 680 300" class="arrow"/>

  <!-- Data Flow Arrows -->
  <path d="M 420 230 L 420 360 L 330 360 L 330 410" class="data-arrow"/>
  <path d="M 580 230 L 580 370 L 330 370 L 330 410" class="data-arrow"/>
  <path d="M 740 230 L 740 380 L 500 380 L 500 410" class="data-arrow"/>
  <path d="M 420 330 L 420 390 L 670 390 L 670 410" class="data-arrow"/>
  <path d="M 580 330 L 580 520 L 570 520" class="data-arrow"/>
  <path d="M 740 330 L 740 400 L 840 400 L 840 410" class="data-arrow"/>
</svg>'''

# Save all diagrams
diagrams = {
    'is_talebi_akisi.svg': job_request_svg,
    'bakim_planlama_akisi.svg': maintenance_svg,
    'olay_yonetimi_akisi.svg': incident_svg,
    'varlik_yonetimi_akisi.svg': asset_svg
}

for filename, content in diagrams.items():
    filepath = os.path.join('/Users/caglarozyildirim/WebstormProjects/Deneme/diagrams', filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Created: {filename}")

print("\n🎉 All Visio-style workflow diagrams created successfully!")
print("\nDiagrams created:")
print("  1. is_talebi_akisi.svg - Job Request Workflow")
print("  2. bakim_planlama_akisi.svg - Maintenance Planning Workflow")
print("  3. olay_yonetimi_akisi.svg - Incident Management Workflow")
print("  4. varlik_yonetimi_akisi.svg - Asset Management Workflow")
