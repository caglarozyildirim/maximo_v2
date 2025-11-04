# BAKIM YÖNETİMİ SİSTEMİ - KAPSAMLI ANALİZ RAPORU
## Requirement Dökümanları vs Mevcut HTML Implementasyonu
**Analiz Tarihi:** /Users/caglarozyildirim/WebstormProjects/Deneme
---

## 1. MEVCUT HTML SAYFALAR
**Toplam:** 23 sayfa

1. assets.html
2. maintenance-detail.html
3. asset-retirement-create.html
4. periodic-maintenance.html
5. cost-center-changes.html
6. asset-create.html
7. incident-detail.html
8. asset-assignment-detail.html
9. job-request-detail.html
10. asset-groups.html
11. asset-retirements.html
12. asset-retirement-detail.html
13. maintenance-create.html
14. incidents.html
15. job-requests.html
16. asset-assignments.html
17. maintenance-visit.html
18. asset-assignment-create.html
19. job-request-create.html
20. incident-create.html
21. maintenance.html
22. asset-detail.html
23. reports.html

## 2. EKRAN TASARIMLARI (Screen Designs.xlsx)

### Info
**Satır Sayısı:** 13

-  | Screen designes of "Maintenance Management Application" | 
-  | Introduction of the pages on the document | 
-  | Pages | Purpose
-  | Activities X Screens | This excel page has functions and activities listed and shows which web page activits is going to handled.
-  | Log-in | Shows how log-in screens is going to appear
-  | User Menu Visual | Show how user menu is going to be seen
-  | User Menu functional | Showhs which web page is going to be called when a user menu item selected
-  | View user info | Show how user info web page is going to be seen when user click its name on top ofthe page
-  | Numbered pages with initials | These initials are from the web pages names initials and numbers are the numbers assigned this pages on the "Activities x screens"
-  | Numbered pages with initials | These pages lists the fileds should be included in page and also a draft of the page

### Activities X Screens
**Satır Sayısı:** 140

-  |  |  | CVCD: Create, View,Change, Delete |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27
-  |  |  | Screen Name | Job Request | Job Request List | Asset Entry | Asset List | Asset Assigment | Asset Assigment List | Asset Assignmet Printout | Periodic Maintenance Requirement | Measure record | Asset Group | Maintenance duty | Maintenance Duty visit | Periodic Maintenance Requirement list | Measure Records List | Asset group List | Maintenance Dutly List | Task Completion list | Visit list | Changes Log | Incidents | Incident List | Consumed Material | Cost Center Change | Cost Center Change list | Asset Retirement | Asset retirement printout | Asset Retirement List
-  |  |  | Screen Variant | CVCD | List | CVCD | List | CVCD |  |  | CVCD | CVCD | CVCD | CVCD | CVCD |  |  |  |  |  |  |  | CVCD |  |  | CVCD |  | CVCD |  | 
- Process | object | Screen Requirement | Title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- Job Request | Function |  | 1.       Collect the Request |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- Job Request | Activity | Yes | a.       Create Job Request | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- Job Request | Activity | Yes | b.       Detail the Requests | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- Job Request | Activity | Yes |                                                                i.      Adding details | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- Job Request | Activity | Yes |                                                              ii.      Adding attachments | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### Log-in
**Satır Sayısı:** 5

-  |  | log-in failed. You may report this incident with the user id below to resolve the problem. |  |  |  |  |  |  |  |  |  | Text Font | Calibri
-  |  |  |  |  |  |  |  |  |  |  |  | Font Size | 11
-  |  | User Id: |  |  |  |  |  |  |  |  |  |  | 
-  |  | Password:  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Login |  |  |  |  |  |  |  |  |  |  | 

### User Menu Visual
**Satır Sayısı:** 10

-  | Yasin Taşdelen |  |  | Maintenance Management Application |  | Log-off |  | Text Font | Calibri
-  | FIPC |  |  |  |  |  |  | Font Size | 11
-  | User Menu |  |  |  |  |  |  |  | 
-  | Job Requests |  |  |  |  |  |  |  | 
-  | Assets |  |  |  |  |  |  |  | 
-  | Embezzlements |  |  |  |  |  |  |  | 
-  | Maintenance Requirements |  |  |  |  |  |  |  | 
-  | Incidents |  |  |  |  |  |  |  | 
-  | Scrappings |  |  |  |  |  |  |  | 
-  | View User info |  |  |  |  |  |  |  | 

### User Menu Functional
**Satır Sayısı:** 30

-  | User Menu |  |  |  |  |  |  |  |  | 
-  | Job Requests | Cascaded menu item |  | Job Request | Called Screen | Screen variant |  |  |  | View User info
-  | Assets |  |  | Create | Job Request | Create |  |  |  | 
-  | Embezzlements |  |  | List Open | Job Request List | List |  |  |  | 
-  | Maintenance Requirements |  |  | List All | Job Request List | List |  |  |  | 
-  | Incidents |  |  |  |  |  |  |  |  | 
-  | Scrappings |  |  |  |  |  |  |  |  | 
-  |  |  |  | Asset Entry | Called Screen | Screen variant |  |  |  | 
-  | View User info | Link |  | Create | Assets | Create |  |  |  | 
-  |  |  |  | List Active | Assets | List |  |  |  | 

### View User Info
**Satır Sayısı:** 10

-  | Name | Yasin |  | Switch to Common User |  |  | 
-  | Surname | Taşdelen |  |  |  |  | 
-  | User System ID | 12345678 |  |  |  |  | 
-  | User Windows ID | Ad714 |  |  |  |  | 
-  | User Company Id | 13012345 |  |  |  |  | 
-  | Last Login | 2025-09-18 17:11:00 |  |  |  |  | 
-  | User Department assigments |  |  |  |  |  | 
-  | Department Code | FIPC | FID | FIDA |  |  | 
-  | Department Title | Business Applications | Endineering | Endineering |  |  | 
-  | Role in department | Member | Manager | GL |  |  | 

### 1 JR
**Satır Sayısı:** 89

-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Job Request |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | a. Create Job Request | a. Detail the Requests | i.  Adding attachment | ii. Business Manager Request approval | iv. Cost calculation | i.  SL or Engineer technical approval | iii. Business manager Cost Approval | İV. Solution Approval | v. Rejection | 3.a. Taken over of request responsibility by SL-Engineer | 3.b. Solution responsible assignment |  |  |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Job Request |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Id | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  | Request Id |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Technical approval |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Description | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  | Request Title |  |  |  |  |  |  |  |  | New meeting room for IT |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Id | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  | Request Description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus. himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus. odio phasellus non purus est efficitur laoreet mauris ph |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP Id | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP Title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 1
**Satır Sayısı:** 61

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Select a Person |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Job Request |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Name |  |  |  |  | Yasin |  |  |  |  |  |  |  |  |  |  |  |  |  |  | At least two field must be filled with minimum 2 character
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Surname |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Id |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Technical approval |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Department |  |  |  |  | FI |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Title |  |  |  |  |  |  |  |  | New meeting room for IT |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus. himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus. odio phasellus non purus est efficitur laoreet mauris ph |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Text field extend according to content up to 512 char |  |  |  |  |  |  |  | Department |  |  |  | Name |  |  |  |  |  |  | Surname |  |  |  |  |  | Id |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | FIPC |  |  |  | Yasin |  |  |  |  |  |  | Taşdelen |  |  |  |  |  | **23 |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | FIPC |  |  |  | Aleynanur |  |  |  |  |  |  | Kutlu |  |  |  |  |  | **24 |  |  | 

### 2 JRL
**Satır Sayısı:** 86

-  | Job request List
-  | Request Id
-  | Request Title
-  | Request Description
-  | Asset Id
-  | Asset SAP Id
-  | Asset SAP Title
-  | Asset Maintenance Id
-  | Asset Maintenance Title
-  | Location

### 3 AE
**Satır Sayısı:** 41

-  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2
-  | Asset Entry |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Manual asset Creation | Assigning maintenance asset number | Asset creation by SAP | Asset change | Assigning and keeping Process Documents |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Entry |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Id | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Asset maintenance number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Description | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Asset Title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Type | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Status | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Asset Description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus m |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SRM shopping bucket number | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 3
**Satır Sayısı:** 37

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Entry |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset maintenance number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset maintenance old number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance Title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus m |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Type |  |  |  |  |  |  |  |  | Hand tool |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Status |  |  |  |  |  |  |  |  | Passive |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer name |  |  |  |  |  |  |  |  | Heinkel |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 4 AL
**Satır Sayısı:** 49

-  | Asset Entry List | 
-  |  | a.       List of assets
-  | Asset Id | 
-  | Asset Title | 
-  | Asset Description | 
-  | Asset Type | 
-  | Asset Status | 
-  | SRM shopping bucket number | 
-  | SRM Number | 
-  | SRM item number | 

### 5 AA
**Satır Sayısı:** 70

-  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Asset Assignment |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | a. Create a Request assignment of an Asset | b. Approval of Current Asset assigned user | c. Approval of receiving users first manager | d. Approval of Current Asset assigned user first manager | e. Rejection by any user |  |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Assignment |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Id | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP number | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Asset Maintenance number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Asset maintenance title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance number | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset maintenance title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Asset SAP number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Asset SAP title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 5
**Satır Sayısı:** 42

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Assignment |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset maintenance title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Model |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 6 AAL
**Satır Sayısı:** 68

-  | Asset Assignment list |  | 
-  |  | a. See the history of asset assignment of multiple assets | b. List asset assigned assets for selected departments
-  | Asset Id | 1 | 1
-  | Asset SAP number | 1 | 1
-  | Asset SAP title | 1 | 1
-  | Asset Maintenance number | 1 | 1
-  | Asset maintenance title | 1 | 1
-  | Producer | 1 | 1
-  | Model | 1 | 1
-  | Producer Serial number | 1 | 1

### 7 AAP
**Satır Sayısı:** 69

-  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2
-  | Asset Assignment Printout |  |  |  | Asset Assignment Printout |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Asset Assignmet Printout |  |  | Asset SAP number |  |  |  |  |  |  | 12345678 |  |  |  | Asset Id |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Id | 1 |  |  | Asset SAP title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP number | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP title | 1 |  |  | Asset Maintenance No |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance number | 1 |  |  | Asset maintenance title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset maintenance title | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer | 1 |  |  | Producer |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Model | 1 |  |  | Model |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 7P
**Satır Sayısı:** 66

-  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2
-  | Asset Assignment Printout |  |  |  | Asset Assignment Printout |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Asset Assignmet Printout |  |  | Asset SAP number |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Id | 1 |  |  | Asset SAP title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP number | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP title | 1 |  |  | Asset Maintenance No |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance number | 1 |  |  | Asset maintenance title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset maintenance title | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Current Asset assigned user number | 1 |  |  | Asset Location |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Current Asset assigned user name | 1 |  |  | Asset Location sub unit 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 8 PMR
**Satır Sayısı:** 50

-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  |  |  |  |  |  |  |  |  | 
-  | Periodic Maintenance Requirement |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  | a. Creation of task list | a. Creation of task list |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Select Asset / Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Edit Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | i. Periodic Maintenance Requirement Planning | 1. Period Planning | 2. Adding maintenance document | 3. Periodic measure planning for measured maintenance | a. Set measurement requirement | b. Measure method, communication person could be added | i. Copy from a maintenance requirement | ii. Manual creation | 2. Assign asset list to a maintenance requirement |  |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Periodic Maintenance Requirement |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Periodic Maintenance requirement number |  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Group Id: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Maintenance Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Id |  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Requirement no |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Group Title: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Maintenance Title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset group number |  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset SAP Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Period indicator |  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Search Assets |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset SAP Title |  |  |  |  |  |  |  | *hand tools no 12* |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Period value |  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  | Description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Starting date |  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | A. Group Id: |  |  |  | Asset Group Title: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Search Assets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 8
**Satır Sayısı:** 44

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Select Asset / Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Edit Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Periodic Maintenance Requirement |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Group Id: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Maintenance Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Requirement no |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Group Title: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Maintenance Title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset SAP Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Search Assets |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset SAP Title |  |  |  |  |  |  |  | *hand tools no 12* |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | A. Group Id: |  |  |  | Asset Group Title: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Search Assets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 9 MR
**Satır Sayısı:** 2

-  | Measure record
-  | The need of this screen will be handled on 11- Maintenance duty screen.

### 10 AG
**Satır Sayısı:** 47

-  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | 1. Creating and maintaining a list of assets |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Group Maintenance |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | a.       Asset group number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | b.       Asset group title |  |  |  |  |  |  | Select Asset / Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | c.       Assets Ids that have been assigned |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | d.       Assets titles that have been assigned |  |  |  |  |  |  | Asset Group Id: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | e.       Asset cost center |  |  |  |  |  |  | Asset Group Title: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | f.        Asset location |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 10
**Satır Sayısı:** 41

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Group Maintenance |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Select Asset / Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Group Id: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Group Title: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Search  Assets Group |  |  |  |  |  |  |  |  |  |  | Create New Asset Group |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Search Result: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Will be visible is search Asset Group
-  | Asset Id |  |  |  | Asset Group Title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 11 MD
**Satır Sayısı:** 76

-  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance Duty |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | 2.       Manual Creation of maintenance duty | i.      Assign for a maintenance responsible | ii.      Measure Records | 1.       Which tasks has been done and which tasks are left aside for each visit should be able to see. | i.      Rejection reason should be entered from SL or Engineers |  |  |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Maintenance Duty |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty id | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  | Duty Id |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty description | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  | Duty title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Extends with the data inside |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance date | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset number | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  | Duty description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Extends with the data inside |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 11
**Satır Sayısı:** 62

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Maintenance Duty |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty Id |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Extends with the data inside |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Extends with the data inside |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Measured maintenance indicator |  |  |  |  |  |  |  |  | X |  |  |  |  |  |  |  |  |  | Measure unit |  |  |  |  |  |  |  |  | Hour |  |  |  |  |  |  |  |  |  |  |  |  | If its a measure Duty. Only this field and above visible. If"Result of measure > Milestone + Last measure value then below fields visible else.End duty |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Milestone value |  |  |  |  |  |  |  |  | 100000 |  |  |  |  |  |  |  |  |  | Last Measurement Value |  |  |  |  |  |  |  |  | 125000 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Result of measure |  |  |  |  |  |  |  |  | 300000 |  |  |  |  |  |  |  |  |  | Last measure date |  |  |  |  |  |  |  |  | 2024-09-19 00:00:00 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 12 MDV
**Satır Sayısı:** 58

-  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Maintenance Duty Visit |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | 1. Mark tasks as finished | 2. Tasks should be able to approved altogether | 3.       Enter comment to unfinished tasks that why they haven’t been handled | 4.       Add file to tasks, it will be used as additional entry to explain the situation that why task couldn’t be finished in time. | 5.       Start of the visit of the duty and end of the duty visit should be entered as date and time | 6.       Materials that have been used at the visit can be added to the record as material number, quantity and unit of measure | a.       Material numbers should supplied before hand to the system ad should be selected from a list | b.       Unit of measure should be suggested automatically |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Maintenance Duty Visit |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty id | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  | Duty Id |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty description | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  | Duty title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance date | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  SAP Asset number | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  | Duty description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 12
**Satır Sayısı:** 43

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Maintenance Duty Visit |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty Id |  |  |  |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty title |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Duty description |  |  |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Current Assignee |  |  |  |  |  |  |  |  | **23 |  | Yasin Taşdelen - FIPC |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Created By |  |  |  |  |  |  |  |  | **24 |  | Emre Kunduroğlu - FIPC |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance Responsible |  |  |  |  |  |  |  |  | **23 |  | Yasin Taşdelen - FIPC |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 13 PMRL
**Satır Sayısı:** 1

-  | Periodic Maintenance Requirement List

### 14 MRL
**Satır Sayısı:** 0


### 15 AGL
**Satır Sayısı:** 0


### 16 MDL
**Satır Sayısı:** 2

-  | Maintenance Duty List |  |  |  | 
-  |  | i.      Check assignments received by user | a.       How much duty, visits and tasks have been done by users | b.       List maintenance took place for a selected assets | c.       List awaited maintenance duties for selected assets

### 17 TCL
**Satır Sayısı:** 2

-  | Task Completion List | 
-  |  | a.       How much duty, visits and tasks have been done by users

### 18 VL
**Satır Sayısı:** 2

-  | Visit List | 
-  |  | a.       How much duty, visits and tasks have been done by users

### 19 CL
**Satır Sayısı:** 2

-  | Change Log | 
-  |  | d.       There must be log data for all changes, creations, deletion but not views.

### 20 I
**Satır Sayısı:** 82

-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Incident |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | a. Create incident | a. Handing over the asset to a maintenance responsible | b. Assignment to a solution responsible by one of SL-TL group | c. Sending asset to an outsource service | d. Enter delay reason | e. Solution explanation entered | f.  Consumed materials and quantities entered |   i.  Manual approval | ii. manual approval without solution approval from SL & TL |  iii.  Rejection | j. Solution approval from creator first manager or alternative approver |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Incident |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset number | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Incident Id |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance asset number | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Incident Title |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance asset title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Incident Title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Incident description | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Incident description |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 20
**Satır Sayısı:** 53

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Incident |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Incident Id |  |  |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Incident Title |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Incident description |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus iLorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Created By |  |  |  |  |  | **24 |  | Emre Kunduroğlu - FIPC |  |  |  |  |  |  |  |  |  |  | at |  |  |  | 2025-09-19 10:10:00 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset title |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 21 IL
**Satır Sayısı:** 0


### 22 CM
**Satır Sayısı:** 2

-  | Consumed Material |  | 
-  |  |  | not required any more

### 23 CCC
**Satır Sayısı:** 57

-  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Cost Center Change |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | 1.       Requesting a cost center change | 2.       Approval of receiving cost center asset responsible | 3.       Approval of current cost center responsible | 4.       Approval of current cost center director | 6.       Approval of changes done on SAP |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Cost Center Change |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset id | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP Id | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Request Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset SAP Title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | SAP Asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Id |  |  |  | 12345678 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance Id | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | SAP Asset title |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Maintenance title | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer Company | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | M. asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 23
**Satır Sayısı:** 45

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Cost Center Change |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP Asset title |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | M. asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | M. asset title |  |  |  |  |  |  | Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus i |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Asset Type |  |  |  |  |  |  | Hand tool |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 24 CCCL
**Satır Sayısı:** 2

-  | Cost Center Change List | 
-  |  | 7.       Report

### 25 AR
**Satır Sayısı:** 80

-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  | Asset Retirement |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | 1.       Creating an asset retirement request | a.       Asset retirement method selection | a.       Approval from cost center responsible | b.       Approval from SL – Engineer group | c.       Approval of Maintenance manager | i.	Asset Retirement Accounting Approval | ii.      Reevaluate date set and postpone with an explanation | 3.       Physical Retirement | a.       Adding attachment as proof |  |  |  |  |  |  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Retirement |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP asset number | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP asset title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Request Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance asset ID | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | SAP asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance asset title | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | SAP asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer model name | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Maintenance asset ID |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer name | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  | Maintenance asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 25
**Satır Sayısı:** 66

- 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 
-  |  |  |  |  |  |  |  |  |  |  | Maintenance Management Application |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Yasin Taşdelen |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | FIPC |  |  |  |  |  |  |  |  |  |  | Asset Retirement |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Request Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | SAP asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance asset ID |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Maintenance asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Producer model name |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 26 ARP
**Satır Sayısı:** 55

-  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2
-  |  | 4.       Asset retirement result printout |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Retirement Printout |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Request Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | SAP asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | SAP asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Maintenance asset ID |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Maintenance asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Producer model name |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Producer name |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Producer serial number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 26P
**Satır Sayısı:** 55

-  |  |  |  |  |  |  |  |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |  | 1 | 2
-  |  | 4.       Asset retirement result printout |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Asset Retirement Printout |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Request Id |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Status |  |  |  |  | Waiting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | SAP asset number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | SAP asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Maintenance asset ID |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Maintenance asset title |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Producer model name |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Producer name |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  |  |  |  |  |  |  |  |  | Producer serial number |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### 27 ARL
**Satır Sayısı:** 2

-  | Asset Retirement List | 
-  |  | a.       List of retired assets

## 3. VERİ YAPILARI (Data Structure.xlsx)

### M
**Toplam Alan:** 24

**Alanlar:**
-  | Job Request list | List |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Job Reqest View | Create |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | View |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Change |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Assets | Create |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Change |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | View |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  | Embezzlement | List |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Create |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
-  |  | Change |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### Job Req.
**Toplam Alan:** 37

**Alanlar:**
-  | Fields | Type | Length | other
-  | Request Id | integer | 8 | 
-  | Request Title | text | 128 | 
-  | Request Description | text | 1024 | 
-  | Asset Id | integer | 8 | 
-  | Cost | float | 16 | 
-  | Cost Currency | text | 3 | 
-  | Business Approval | bool | 1 | 
-  | Cost Approval | bool | 1 | 
-  | Technical Approval | bool | 1 | 

### Asset
**Toplam Alan:** 33

**Alanlar:**
-  | Field name | Type | Length | other |  |  |  | 
-  | Id | int | 8 |  |  |  |  | 
-  | Maintenance Id | int | 8 |  |  |  |  | 
-  | Maintenance Title | text | 128 |  |  |  |  | 
-  | SAP Id | int | 12 |  | Anla | ANLN1 |  | 
-  | SAP Title | text | 100 |  | Anla | TXT50 | TXA50 | 
-  | Asset description | text | 512 |  |  |  |  | 
-  | Asset Type | int | 4 |  |  |  |  | 
-  | Asset Status | char | 1 |  |  |  |  | 
-  | SRM Number | int | 10 |  |  |  |  | 

### Assigment
**Toplam Alan:** 28

**Alanlar:**
-  | Field name | Type | Length | other
-  | Request Id | int | 8 | 
-  | Asset Id | int | 8 | 
-  | Current holder user | int | 8 | 
-  | Current holder first manager | int | 8 | 
-  | Requested User Id | int | 8 | 
-  | Requestor first manager Id | int | 8 | 
-  | Change Reason explanation | text | 512 | 
-  | Exchange date | date |  | 
-  | Creation date | date time |  | 

### M. Req.
**Toplam Alan:** 25

**Alanlar:**
-  | Field name | Type | Length | other | 
-  | Id | int | 8 |  | 
-  | Asset Id | int | 8 |  | 
-  | Asset Group Id | int | 4 |  | 
-  | Period indicator | char |  |  | 
-  | Perion value | int | 4 |  | 
-  | Starting date | date |  |  | 
-  | Title | text | 128 |  | 
-  | Description | text | 256 |  | 
-  | Document Group Id | int | 8 |  | 

### M. Duty
**Toplam Alan:** 23

**Alanlar:**
-  | Field name | Type | Length | other
-  | Id | int | 8 | 
-  | Title | text | 256 | 
-  | Descriptipon | text | 256 | 
-  | Maintenance final day | date |  | 
-  | Asset Id | int | 8 | 
-  | Task List Id | int | 8 | 
-  | Document Group Id | int | 8 | 
-  | Responsible User Id | int | 8 | 
-  | Record status | int | 4 | 

### M. Task
**Toplam Alan:** 13

**Alanlar:**
-  | Field name | Type | Length | other
-  | Id | int | 8 | 
-  | Process | char |  | 
-  | Process Id | int | 8 | 
-  | Item number | int | 3 | 
-  | Title | text | 128 | 
-  | check | bool |  | 
-  | check date time | date time |  | 
-  | checked by | int | 8 | 
-  | Inactivated | bool |  | 

### Visit
**Toplam Alan:** 8

**Alanlar:**
-  | Field name | Type | Length | other
-  | Id | int | 8 | 
-  | Starting date time | date time |  | 
-  | Finish date time | date time |  | 
-  | Duration Time | time |  | 
-  | User Id | int | 8 | 
-  | Duty Id | int | 8 | 

### Consumed Materials
**Toplam Alan:** 8

**Alanlar:**
-  | Field name | Type | Length | other
-  | Id | int | 16 | 
-  | Process type | char |  | visit, incident
-  | Process Id | int | 8 | 
-  | Material | char | 13 | 
-  | Unit of Measure | text | 3 | 
-  | Value | float |  | 

### Asset Group header
**Toplam Alan:** 8

**Alanlar:**
-  | Field name | Type | Length | other
-  | Asset group Id | int | 8 | 
-  | Asset Group Title | text | 128 | 
-  | Created by user Id | int | 8 | 
-  | Created date time | date time |  | 
-  | Last change user ID | int | 8 | 
-  | Last change date time | date time |  | 

### Asset Group item
**Toplam Alan:** 10

**Alanlar:**
-  | Field name | Type | Length | other
-  | Record ID | int | 8 | Primary
-  | Asset group Id | int | 8 | 
-  | Asset Id | int | 8 | 
-  | Created by user Id | int | 8 | 
-  | Created date time | date time |  | 
-  | deactivated user ID | int | 8 | 
-  | deactivation date time | date time |  | 
-  | Deactivation | bool |  | 

### Incident
**Toplam Alan:** 34

**Alanlar:**
-  | Field name | Type | Length | other
-  | Id | int | 8 | 
-  | Asset Id | int | 8 | 
-  | Title | Text | 128 | 
-  | Description | text | 512 | 
-  | Document Group Id | int | 8 | 
-  | Solution responsible Id | int | 8 | 
-  | Responsible SL-TL | int | 8 | 
-  | Asset recived by User Id | int | 8 | 
-  | Asset recived date time | date time |  | 

### Cost Center Change
**Toplam Alan:** 8

**Alanlar:**
-  | Field name | Type | Length | other
-  | Id | int | 8 | 
-  | New cost center | int | 10 | 
-  | Exchange date | datetime |  | 
-  | created by id | int | 8 | 
-  | creation date time | datetime |  | 
-  | Record status | integer | 4 | 

### Asset Retirement
**Toplam Alan:** 44

**Alanlar:**
-  | Field name | Type | Length | other | Table | field | field 2 | foreing key | 
-  | Id | int | 8 |  |  |  |  |  | 
-  | Asset Id | int | 8 |  |  |  |  |  | 
-  | Requestor Id | int | 8 |  |  |  |  |  | 
-  | Creation date time | date time |  |  |  |  |  |  | 
-  | Reason | text | 512 |  |  |  |  |  | 
-  | Approval From Requestor First Manager | bool |  |  |  |  |  |  | 
-  | Approval From RequestorFirst Manager ID | int | 8 |  |  |  |  |  | 
-  | Approval From RequestorFirst Manager date time | datetime |  |  |  |  |  |  | 
-  | Approval From SL-Engineer | bool |  |  |  |  |  |  | 

### User
**Toplam Alan:** 7

**Alanlar:**
-  | Field name | Type | Length | other
-  | ID | int | primary ID | 
-  | User Windows authorization ID | Text | 5 | 
-  | User company Id | int | 8 | 
-  | Name | Text | 64 | 
-  | Surname | Text | 64 | 

### Department
**Toplam Alan:** 6

**Alanlar:**
-  | Field name | Type | Length | other
-  | ID | int | primary ID | 
-  | Departmant Code | Text | 8 | 
-  | Department title | Text | 64 | 
-  | Assigned department code | Text | 8 | 

### User Department assigment
**Toplam Alan:** 12

**Alanlar:**
-  | Field name | Type | Length | other
-  | ID | int | primary ID | 
-  | User company Id | int | 8 | 
-  | Assigned as manager | bool |  | 
-  | assigned department code | Text | 8 | 
-  | temporary assigment | bool |  | 
-  | Temporary assigment starts | datetime |  | 
-  | Temporary assigment Ends | datetime |  | 
-  | deactive | bool |  | 
-  | last change by user Id | int | 8 | 

### Cost Center
**Toplam Alan:** 4

**Alanlar:**
-  | Field name | Type | Length | other |  |  |  |  | Cost Center responsibles maintained in other table
-  | Cost Center | int | 10 |  | CSKT | KOSTL |  |  | 
-  | Cost Center Name | Text | 20 |  | CSKT | KTEXT |  |  | 

### User Group
**Toplam Alan:** 9

**Alanlar:**
-  | Title
-  | User ID
-  | Activation status
-  | Active from
-  | Active to
-  | Created by
-  | Creted date time
-  | Search Key

### Auth.
**Toplam Alan:** 11

**Alanlar:**
-  | Authorization name |  |  |  | 
-  | Authorization type | Screen, field, User |  |  | Screen, field, user group
-  | Allowed object | screen name, field name, user id or group name |  |  | 
-  | Active |  |  |  | 
-  | Active from |  |  |  | 
-  | Active to |  |  |  | 
-  | Created by |  |  |  | 
-  | Created date time |  |  |  | 
-  | Search key |  |  |  | 
-  | Title |  |  |  | 

### Auth Group
**Toplam Alan:** 10

**Alanlar:**
-  | Authorization Group no
-  | Included Authorization
-  | Activation status
-  | Active from
-  | Active to
-  | Created by
-  | Creted date time
-  | Title
-  | Search key

### Language support
**Toplam Alan:** 3

**Alanlar:**
-  | Language
-  | Text

### on behalf
**Toplam Alan:** 7

**Alanlar:**
-  | User Id
-  | User Id that action taken on behalf
-  | on behalf reason
-  | start date time
-  | finish date time
-  | details

### on behalf log
**Toplam Alan:** 9

**Alanlar:**
-  | User Id
-  | User Id that action taken on behalf
-  | on behalf reason
-  | creation date
-  | Process Type
-  | Process Id
-  | Approval Type
-  | Rejection

### Document Group
**Toplam Alan:** 4

**Alanlar:**
-  | Assigned Entity Type | Key | 
-  | Assigned Entity number | Key | 
-  | Document Id |  | 8

### Document
**Toplam Alan:** 11

**Alanlar:**
-  | Document ID | int | 8
-  | Document Type | int | 4
-  | Document Title | text | 32
-  | Document Description |  | 
-  | Document Link |  | 
-  | Creation date time |  | 
-  | Created By User ID |  | 
-  | Deactivation |  | 
-  | Deactivated by User Id |  | 
-  | Deactivation date time |  | 

### Document Types
**Toplam Alan:** 5

**Alanlar:**
-  | Text | text | 16 |  |  |  | User Manual
-  | Deactivation | bool |  |  |  |  | Maintenance Manual
-  | deactivation date time | date time |  |  |  |  | Asset Retirement Proof
-  | Deactivated by user Id | int | 8 |  |  |  | 

### Comment
**Toplam Alan:** 8

**Alanlar:**
-  | Process Type | Foreing Key
-  | Process Id | Foreing Key
-  | Status | Foreing Key
-  | status change date time | 
-  | Text | 
-  | Created by | 
-  | Created date time | 

### Priority
**Toplam Alan:** 7

**Alanlar:**
-  | Text | text | 16
-  | created by | int | 8
-  | creation date time | datetime | 
-  | inactive | bool | 
-  | inactivation date time | date time | 
-  | inactivated by | int | 8

### Location
**Toplam Alan:** 11

**Alanlar:**
-  | Title |  | 
-  | Description |  | 
-  | Created by |  | 
-  | Creation time |  | 
-  | inactivation |  | 
-  | inactivation date time |  | 
-  | inactivated by |  | 
-  | Upper location | int | 4
-  | Location assigment changed by |  | 
-  | Location assigment changed date time |  | 

### Record Status
**Toplam Alan:** 2

**Alanlar:**
-  | Text | text | 32

### Asset Type
**Toplam Alan:** 7

**Alanlar:**
-  | Text
-  | Created by
-  | Creation date time
-  | inactivation
-  | inactivation date time
-  | inactivated by

### Asset Status
**Toplam Alan:** 2

**Alanlar:**
-  | Text | text | 16

### Measure unit
**Toplam Alan:** 3

**Alanlar:**
-  | Char
-  | Text

### Process
**Toplam Alan:** 15

**Alanlar:**
-  | Primary id | int | 4 |  |  | Primary id | Key | title
-  | key | char |  |  |  | 1 | a | Job Request
-  | title | text | 32 |  |  | 2 | b | Asset Entry
-  |  |  |  |  |  | 3 | c | Asset Asignment
-  |  |  |  |  |  | 4 | d | Maintenance Requirement
-  |  |  |  |  |  | 5 | e | Maintenance duty
-  |  |  |  |  |  | 6 | f | Maintenance visit
-  |  |  |  |  |  | 7 | g | Maintenance tasks
-  |  |  |  |  |  | 8 | h | Cost Center Change
-  |  |  |  |  |  | 9 | i | Incident record

### Asset Retiring method
**Toplam Alan:** 3

**Alanlar:**
-  | key | char | 1
-  | text | tex | 32

### Cost center responsible
**Toplam Alan:** 8

**Alanlar:**
-  | Id | int | 8 |  |  |  |  | a | Cost Center Asset Responsible
-  | inactive | bool |  |  |  |  |  | b | Cost Center Responsible
-  | inactivated by user id | int | 8 |  |  |  |  | c | Cost center Director
-  | inactivation date time | datetime |  |  |  |  |  | d | Cost Center Asset Responsible Backup
-  | cost center | ??? |  |  |  |  |  |  | 
-  | responsibility | char |  |  |  |  |  |  | 
-  | User Id | int | 8 |  |  |  |  |  | 

### Asset Class Description
**Toplam Alan:** 20

**Alanlar:**
-  | Asset Class | int | 8 |  |  |  |  |  |  |  |  |  | 2100 | Massive factory buildings TR
-  | Asset Class Description | text | 50 |  |  |  |  |  |  |  |  |  | 2200 | Light factory buildings TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 2300 | Outdoor facilities TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 2600 | Buildings on leased Land - Massive Buildings TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 2700 | Construction in rented buildings TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 3100 | Cranes and crane assembly TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 3200 | Machinery and Equipment TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 3300 | Small Maschinery TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 3400 | Other technical Assets TR
-  |  |  |  |  |  |  |  |  |  |  |  |  | 3410 | Vehicles TR

### Workstation list
**Toplam Alan:** 8

**Alanlar:**
-  | Id | text | 8
-  | Desctiption | Text | 64
-  | Created by |  | 
-  | Creation time |  | 
-  | inactivation |  | 
-  | inactivation date time |  | 
-  | inactivated by |  | 

## 4. ANA REQUIREMENT DÖKÜMAN ANALİZİ

### Ana Başlıklar:
- **Normal**: Requirement Analysis Document
- **Normal**: Version 1
- **Normal**: October, 2025
- **Normal**: Maintenance Management Application
- **Heading 1**: Change Tracking
- **Heading 2**: Release Details
- **GrundText**: This document is still in draft
- **Heading 2**: Change History
- **Heading 1**: Introduction
- **Heading 2**:  Management Summary
- **Normal**: The main functions to be implemented are listed below
- **List Paragraph**: Request Management
- **List Paragraph**: Fixed Asset Management
- **List Paragraph**: Asset Entry
- **List Paragraph**: Asset Assignment Process
- **List Paragraph**: Maintenance
- **List Paragraph**: Regular Maintenance
- **List Paragraph**: Mass Maintenance
- **List Paragraph**: Incident Management
- **List Paragraph**: Cost Center Change Process
- **List Paragraph**: Asset Retirement
- **List Paragraph**: Reports
- **List Paragraph**: Operational Requirements
- **Heading 2**:  Purpose and Objectives
- **List Paragraph**: Track processes and responsible
- **List Paragraph**: Keep record for sensitive decision and information (approvals and cost)
- **Heading 2**: Scope 
- **Heading 2**: Out of Scope Items
- **Normal**: Out of scope Information are mentioned under Process details
- **Heading 1**: Functional Requirements 
- **Heading 2**: Requirements
- **Heading 3**: Job request 	
- **Normal**: The requirement is to gather requests, manage approval process and track the whole process. 
- **Normal**: Objectives
- **List Paragraph**: Collect the requests
- **List Paragraph**: Manage Approval Process
- **List Paragraph**: Manage Solution Process
- **List Paragraph**: Consuming of used indirect materials
- **List Paragraph**: Reports
- **Normal**: Processes and activities
- **List Paragraph**: Collect the Request
- **List Paragraph**: Create Job Request
- **List Paragraph**: Detail the Requests
- **List Paragraph**: Adding details
- **List Paragraph**: Adding attachments

### Tablolar: 6 adet

## 5. VARLIK HURDAYA ÇIKARMA (Asset Retirement)

**İçerik Özeti:**

## 6. VARLIK ZİMMETİ (Asset Assignment)

**İçerik Özeti:**

## 7. LOKASYONLAR VE KULLANICI GRUPLARI

### Konum
- MAN TÜRKİYE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- Merkez Kampüs |  |  |  |  |  |  |  |  |  |  |  |  |  | PDC Yerleşkesi |  |  |  |  |  | 
-  | Ü1 | Ü2 | Ü3 | Yönetim Binası | Yemekhane Binası | Cam Montaj | Ambarlar | Güvenlik Binaları | Haberleşme | Otopark Alanları | Kazan Dairesi | Dış Alanlar | Laboratuvar |  |  |  |  |  |  | 
- 1 | İskelet | Kablo | Customer Center | IT | 1 numaralı Bölüm | Eski Cam Montaj | Ana Ambar | İzleme Binası | Haberleşme Ofis | Servis Araç Parkı | Kazan Dairesi | Atık Alanı | Laboratuvar binası |  |  |  |  |  |  | 
- 2 | Dış Saclama | Ü2 Ambar | Ü3-Boyahane | Personel | 2 numaralı Bölüm | Yeni Cam Montaj | Tesellüm | İç Nizamiye |  | Alt Otopark | Araç Yıkama | Biofiltre |  |  |  |  |  |  |  | 
- 3 | Boyahane | Araç Bitiş | Satın Alma | IK | 3 numaralı Bölüm |  | Gümrük | Dış Nizamiye |  |  | Arıtma | Su Deposu |  |  |  |  |  |  |  | 
- 4 | Mekanik Montaj | Arge- İş Hazırlama Binası | Sno Ofis | Muhasebe | 4 numaralı Bölüm |  | Cam Ambarı | B Kapı |  |  |  | Jurassic Park |  |  |  |  |  |  |  | 
- 5 | Montaj | Bem | Gümrük Alanı | Controlling | Misafir Yemekhanesi |  | Kamyon Kablo |  |  |  |  | Man Cafe |  |  |  |  |  |  |  | 
- 6 | Ü1-Ambar | Kamyon Satış |  | Üst Yönetim | Mutfak Alanı |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- 7 | KTL | Pilothall ( Kalıphane) |  | Arsiv Depo  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- 8 | Lojistik Ofis | Puantörlük |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- 9 | MNPS Ofis | BMC |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- 10 | Kalite Ofis |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- 11 | İSG Ofis |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 
- 12 | Revir |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 

### Liste
-  | Yatırım Sorumluları | Çözüm Sorumlusu | Arıza Yönlendiren |  | 
-  | Bakım Onarım Mühendis-SL | Bakım Onarım İşçi | Bakım Onarım SL-TL | Bakım Onarım Yöneticisi | Sabit Kıymet Sorumlusu
- 1 | Burak Cenkış | MUSTAFA EKŞİ | Metin Kaya | Osman Ş.Özkan | Nazan Sahan Olgun
- 2 | Burak Çelebi | UĞUR KEMAL KÖKSALAN | İdiris Kılıç |  | 
- 3 | Güneri Baş | FATİH DEMİRCİ | Cemil Selvi |  | 
- 4 | Mesut Yıldız | ÖMER FARUK ZAİM | Tuncay Uçar |  | 
- 5 | Sefa Kahriman | HİDAYET ÖZCAN | Kemal Kaya |  | 
- 6 | Muhammet Hasan Işık | SİNAN YÜZÜCÜ | Bilal Kara |  | 
- 7 | Metin Kaya | SERDAR KARAARSLAN |  |  | 
- 8 | İdiris Kılıç | OSMAN AYGÜN |  |  | 
- 9 |  | KENAN ERDOĞAN |  |  | 
- 10 |  | İSMAİL KIZILÖZ |  |  | 
- 11 |  | RECEP EKŞİ |  |  | 
- 12 |  | SATILMIŞ ÖZDEMİR |  |  | 
- 13 |  | MUSTAFA TİNKİR |  |  | 

