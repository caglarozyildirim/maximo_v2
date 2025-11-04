#!/usr/bin/env python3
"""
Read original Maintenance Management Application documents
"""

from docx import Document
import pandas as pd
import json

base_path = '/Users/caglarozyildirim/Desktop/Şirketler/MAN Türkiye/Maintenance Management Application'

print("="*80)
print("READING ORIGINAL DOCUMENTS")
print("="*80)

# 1. Read Requirement Analysis Document
print("\n1. REQUIREMENT ANALYSIS DOCUMENT:")
print("-"*80)
try:
    doc = Document(f'{base_path}/Maintenance Management Application Requirement Analysis (draft).docx')

    output = []
    current_section = ""

    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            # Check if heading
            if para.style.name.startswith('Heading'):
                level = para.style.name.replace('Heading ', '')
                current_section = text
                output.append(f"\n{'#' * int(level) if level.isdigit() else '#'} {text}\n")
            else:
                output.append(text)

    # Save to file
    with open('/Users/caglarozyildirim/WebstormProjects/Deneme/original_requirements.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(output))

    print(f"✅ Requirements document read: {len(output)} lines")
    print(f"   Saved to: original_requirements.txt")

except Exception as e:
    print(f"❌ Error reading requirements: {str(e)}")

# 2. Read Data Structure Excel
print("\n2. DATA STRUCTURE EXCEL:")
print("-"*80)
try:
    excel_file = pd.ExcelFile(f'{base_path}/Data Structure.xlsx')

    data_structures = {}

    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        print(f"   📊 Sheet: {sheet_name}")
        print(f"      Columns: {list(df.columns)}")
        print(f"      Rows: {len(df)}")

        data_structures[sheet_name] = df.to_dict('records')

    # Save to JSON
    with open('/Users/caglarozyildirim/WebstormProjects/Deneme/original_data_structures.json', 'w', encoding='utf-8') as f:
        json.dump(data_structures, f, indent=2, ensure_ascii=False, default=str)

    print(f"\n✅ Data structures read: {len(data_structures)} sheets")
    print(f"   Saved to: original_data_structures.json")

except Exception as e:
    print(f"❌ Error reading data structure: {str(e)}")

# 3. Read Screen Designs Excel
print("\n3. SCREEN DESIGNS EXCEL:")
print("-"*80)
try:
    excel_file = pd.ExcelFile(f'{base_path}/Screen Designs.xlsx')

    screen_designs = {}

    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        print(f"   🖥️  Screen: {sheet_name}")
        print(f"      Columns: {list(df.columns)}")
        print(f"      Rows: {len(df)}")

        screen_designs[sheet_name] = df.to_dict('records')

    # Save to JSON
    with open('/Users/caglarozyildirim/WebstormProjects/Deneme/original_screen_designs.json', 'w', encoding='utf-8') as f:
        json.dump(screen_designs, f, indent=2, ensure_ascii=False, default=str)

    print(f"\n✅ Screen designs read: {len(screen_designs)} screens")
    print(f"   Saved to: original_screen_designs.json")

except Exception as e:
    print(f"❌ Error reading screen designs: {str(e)}")

# 4. List workflow files
print("\n4. WORKFLOW DIAGRAMS:")
print("-"*80)
try:
    import os
    workflows_path = f'{base_path}/Workflows'
    workflows = os.listdir(workflows_path)

    for workflow in workflows:
        if not workflow.startswith('.'):
            print(f"   📋 {workflow}")

    print(f"\n✅ Found {len([w for w in workflows if not w.startswith('.')])} workflow files")

except Exception as e:
    print(f"❌ Error listing workflows: {str(e)}")

# 5. List use case files
print("\n5. USE CASES:")
print("-"*80)
try:
    usecases_path = f'{base_path}/Use Cases'
    usecases = os.listdir(usecases_path)

    for usecase in usecases:
        if not usecase.startswith('.'):
            print(f"   📝 {usecase}")

    print(f"\n✅ Found {len([u for u in usecases if not u.startswith('.')])} use case files")

except Exception as e:
    print(f"❌ Error listing use cases: {str(e)}")

print("\n" + "="*80)
print("DOCUMENT READING COMPLETE")
print("="*80)
