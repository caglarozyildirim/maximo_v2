#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Desktop/new klasöründeki Screen Designs.xlsx dosyasını detaylı analiz et
Her ekran için hangi alanların olması gerektiğini çıkart
"""

import pandas as pd
import json

# Screen Designs.xlsx dosyasını oku
file_path = "/Users/caglarozyildirim/Desktop/new/Screen Designs.xlsx"

# Tüm sheet'leri oku
xl = pd.ExcelFile(file_path)

print("="*80)
print("EKRAN TASARIMLARI - DETAYLI ANALİZ")
print("="*80)
print(f"\nToplam Sheet Sayısı: {len(xl.sheet_names)}")
print(f"Sheet İsimleri: {xl.sheet_names}")
print()

# Her sheet için detaylı analiz
ekranlar = {}

# 1 JR - Job Request ekranı
print("\n" + "="*80)
print("1. JOB REQUEST (İş Talebi) EKRANI")
print("="*80)

df_jr = pd.read_excel(file_path, sheet_name='1 JR')
print(f"Satır sayısı: {len(df_jr)}")
print(f"Kolon sayısı: {len(df_jr.columns)}")
print("\nİlk 20 satır:")
print(df_jr.head(20).to_string())

# 2 JRL - Job Request List
print("\n" + "="*80)
print("2. JOB REQUEST LIST (İş Talebi Listesi)")
print("="*80)

df_jrl = pd.read_excel(file_path, sheet_name='2 JRL')
print(f"Satır sayısı: {len(df_jrl)}")
print("\nTüm satırlar:")
print(df_jrl.to_string())

# 3 AE - Asset Entry
print("\n" + "="*80)
print("3. ASSET ENTRY (Varlık Girişi)")
print("="*80)

df_ae = pd.read_excel(file_path, sheet_name='3 AE')
print(f"Satır sayısı: {len(df_ae)}")
print("\nİlk 20 satır:")
print(df_ae.head(20).to_string())

# 4 AL - Asset List
print("\n" + "="*80)
print("4. ASSET LIST (Varlık Listesi)")
print("="*80)

df_al = pd.read_excel(file_path, sheet_name='4 AL')
print(f"Satır sayısı: {len(df_al)}")
print("\nTüm satırlar:")
print(df_al.to_string())

# 5 AA - Asset Assignment
print("\n" + "="*80)
print("5. ASSET ASSIGNMENT (Varlık Zimmeti)")
print("="*80)

df_aa = pd.read_excel(file_path, sheet_name='5 AA')
print(f"Satır sayısı: {len(df_aa)}")
print("\nİlk 30 satır:")
print(df_aa.head(30).to_string())

# Activities X Screens - Hangi ekranda hangi özellikler var
print("\n" + "="*80)
print("ACTIVITIES X SCREENS - EKRAN FONKSİYONLARI")
print("="*80)

df_acts = pd.read_excel(file_path, sheet_name='Activities X Screens')
print(f"Satır sayısı: {len(df_acts)}")
print("\nİlk 30 satır:")
print(df_acts.head(30).to_string())

print("\n" + "="*80)
print("ANALİZ TAMAMLANDI")
print("="*80)
