# Asset Form Requirements - Complete Analysis

**Generated:** 2025-11-04 15:32:56

## Executive Summary

- **Database Tables:** 4 (Asset, Asset Group Header, Asset Group Item, Asset Retirement)
- **Total Database Fields:** 87
- **Asset Table Fields:** 31
- **Form Fields:** 37
- **Readonly Fields:** 10
- **Editable Fields:** 21
- **Integration Points:** 2 (SAP, SRM)
- **Workflows:** 2 (Assignment, Retirement)

## 1. Database Schema

### 1.1 Asset Table (31 fields)

| # | Field Name | Type | Length | Description |
|---|------------|------|--------|-------------|
| 1 | Id | int | 8 |  |
| 2 | Maintenance Id | int | 8 |  |
| 3 | Maintenance Title | text | 128 |  |
| 4 | SAP Id | int | 12 | Anla |
| 5 | SAP Title | text | 100 | Anla |
| 6 | Asset description | text | 512 |  |
| 7 | Asset Type | int | 4 |  |
| 8 | Asset Status | char | 1 |  |
| 9 | SRM Number | int | 10 |  |
| 10 | SRM item number | int | 4 |  |
| 11 | SRM Created by | int | 8 |  |
| 12 | Location | int | 4 |  |
| 13 | Location sub unit | int | 4 |  |
| 14 | Location sub unit | int | 4 |  |
| 15 | Producer name | text | 32 |  |
| 16 | Producer Model Name | text | 64 |  |
| 17 | Producer Serial Number | text | 32 |  |
| 18 | Document Group Id | int | 8 |  |
| 19 | Last changed by | int | 8 |  |
| 20 | Last changed date time | date time |  |  |
| 21 | Creation date time | date time |  |  |
| 22 | Created by | int | 8 |  |
| 23 | Assigned user Id | int | 8 |  |
| 24 | Last Asset assignment Proces Id | int | 8 |  |
| 25 | SAP Cost Center | int | 10 | ANLZ |
| 26 | Original asset number | int | 12 |  |
| 27 | Asset Class | int | 8 | ANLA |
| 28 | PSP – Element | text | 17 | ANLA |
| 29 | IFRS Capitalization date |  |  | ANLA |
| 30 | Assigned workstation Id | text | 8 |  |
| 31 | Asset Purchasing Order Number |  |  |  |


### 1.2 Asset Group Header Table (6 fields)

| # | Field Name | Type | Length |
|---|------------|------|--------|
| 1 | Asset group Id | int | 8 |
| 2 | Asset Group Title | text | 128 |
| 3 | Created by user Id | int | 8 |
| 4 | Created date time | date time |  |
| 5 | Last change user ID | int | 8 |
| 6 | Last change date time | date time |  |


### 1.3 Asset Group Item Table (8 fields)

| # | Field Name | Type | Length |
|---|------------|------|--------|
| 1 | Record ID | int | 8 |
| 2 | Asset group Id | int | 8 |
| 3 | Asset Id | int | 8 |
| 4 | Created by user Id | int | 8 |
| 5 | Created date time | date time |  |
| 6 | deactivated user ID | int | 8 |
| 7 | deactivation date time | date time |  |
| 8 | Deactivation | bool |  |


### 1.4 Asset Retirement Table (42 fields)

| # | Field Name | Type | Length |
|---|------------|------|--------|
| 1 | Id | int | 8 |
| 2 | Asset Id | int | 8 |
| 3 | Requestor Id | int | 8 |
| 4 | Creation date time | date time |  |
| 5 | Reason | text | 512 |
| 6 | Approval From Requestor First Manager | bool |  |
| 7 | Approval From RequestorFirst Manager ID | int | 8 |
| 8 | Approval From RequestorFirst Manager date time | datetime |  |
| 9 | Approval From SL-Engineer | bool |  |
| 10 | Approval From SL-Engineer Id | int | 8 |
| 11 | Approval From SL-Engineer Date time | datetime |  |
| 12 | Approval of Maintenance Manager | bool |  |
| 13 | Approval of Maintenance Manager Id | int | 8 |
| 14 | Approval of Maintenance Manager date time | datetime |  |
| 15 | Approval of Accounting | bool |  |
| 16 | Approval of Accounting Id | int | 8 |
| 17 | Approval of Accounting date time | datetime |  |
| 18 | reevaluation decision | bool |  |
| 19 | reevaluation decision date time | date time |  |
| 20 | reevaluation decision User Id | int | 8 |
| 21 | Reevaluation explanation | text | 256 |
| 22 | Scrapping method | char |  |
| 23 | Document Group Id | int | 8 |
| 24 | SAP data received date time | date time |  |
| 25 | Cost Center | int | 10 |
| 26 | Maintenance Id | int | 8 |
| 27 | Title | text | 128 |
| 28 | IFRS Capitalization date |  |  |
| 29 | SAP Id | int | 12 |
| 30 | IFRS Depreciation key |  |  |
| 31 | IFRS Useful life |  |  |
| 32 | IFRS Currency |  |  |
| 33 | IFRS Current APC | APC transactions |  |
| 34 | IFRS Accumulated depreciation | Ordinary Depreciat. |  |
| 35 | IFRS Current booking Value | Net book value |  |
| 36 | Local Depreciation key |  |  |
| 37 | Local Useful life |  |  |
| 38 | Local Currency |  |  |
| 39 | Local Current APC |  |  |
| 40 | Local Accumulated depreciation |  |  |
| 41 | Local Current booking value |  |  |
| 42 | Record status | integer | 4 |


## 2. Form Fields

### 2.1 Asset Entry Form

The Asset Entry form includes the following fields based on screen designs:

1. **Asset Id**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

2. **Asset Title**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

3. **Asset Description**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

4. **Asset Type**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

5. **Asset Status**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

6. **SRM shopping bucket number**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

7. **SRM Number**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

8. **SRM item number**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

9. **SRM explanation**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

10. **SRM Created By Id**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

11. **SRM Created By name**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

12. **SRM Created By surname**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

13. **SRM Created By department**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

14. **Location**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

15. **Location sub unit 1**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

16. **Location sub unit 2**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

17. **Producer name**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

18. **Producer model name**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

19. **Producer serial number**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

20. **Attchement group ID**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

21. **Attchement ID**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

22. **Attachement type**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

23. **Attachement title**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

24. **Attachement created by Id**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

25. **Attachement created by name**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

26. **Attachement created by Surname**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

27. **Attachement created by department**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

28. **Asset acquirement method**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

29. **Created by Id**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

30. **Created by name**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

31. **Created by surname**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

32. **Created by department**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

33. **Cost Center**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

34. **Asset maintenance number**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓

35. **SAP asset number**
   - Manual Creation: , Assign Maint#: , SAP Creation: ✓, Change: ✓, Documents: ✓

36. **SAP asset title**
   - Manual Creation: , Assign Maint#: , SAP Creation: ✓, Change: ✓, Documents: ✓

37. **Last change Date time**
   - Manual Creation: ✓, Assign Maint#: ✓, SAP Creation: ✓, Change: ✓, Documents: ✓



### 2.2 Form Fields from Sheet 3

1. Asset maintenance number
2. Asset Maintenance Title
3. Asset Description
4. Asset Type
5. Asset Status
6. Producer name
7. Producer model name
8. Producer serial number
9. SAP asset number
10. SAP asset title
11. SAP old asset number
12. SAP asset class
13. SRM Number
14. SRM item number
15. SRM Created by
16. Asset purchasing order number
17. Location
18. Location sub unit 1
19. Location sub unit 2
20. Cost Center
21. Asset acquirement method
22. Calibration requirement
23. Last Calibration done by
24. Last Calibration entered by
25. Assigned Work Station
26. Relevancy to maintenance reviewed
27. Created By
28. Last change by
29. 12345678


## 3. Field Categorization

### 3.1 Readonly Fields (10 fields)

These fields are populated from SAP or system-generated:

1. SAP Id (int)
2. SAP Title (text)
3. SRM Number (int)
4. SRM item number (int)
5. SRM Created by (int)
6. SAP Cost Center (int)
7. Original asset number (int)
8. Asset Class (int)
9. PSP – Element (text)
10. IFRS Capitalization date ()


### 3.2 Editable Fields (21 fields)

These fields can be edited by users:

1. Id (int)
2. Maintenance Id (int)
3. Maintenance Title (text)
4. Asset description (text)
5. Asset Type (int)
6. Asset Status (char)
7. Location (int)
8. Location sub unit (int)
9. Location sub unit (int)
10. Producer name (text)
11. Producer Model Name (text)
12. Producer Serial Number (text)
13. Document Group Id (int)
14. Last changed by (int)
15. Last changed date time (date time)
16. Creation date time (date time)
17. Created by (int)
18. Assigned user Id (int)
19. Last Asset assignment Proces Id (int)
20. Assigned workstation Id (text)


## 4. Integration Points

### 4.1 SAP Integration

The following fields are integrated with SAP:

- SAP Id (int)
- SAP Title (text)
- SAP Cost Center (int)


### 4.2 SRM Integration

The following fields are integrated with SRM:

- SRM Number (int)
- SRM item number (int)
- SRM Created by (int)


## 5. Workflows

### 5.1 Asset Assignment Workflow

Workflow for assigning assets to users. Includes 24 fields.

### 5.2 Asset Retirement Workflow

Workflow for retiring assets with multi-level approval process. Includes 47 fields.

## 6. Business Rules



## 7. Validation Requirements



## 8. UI Requirements



---

**Note:** This report was automatically generated from the official requirements documentation.
