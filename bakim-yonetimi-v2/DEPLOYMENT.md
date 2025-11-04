# Maximo V2 - Deployment Guide

## GitHub'a Push Etme

### 1. GitHub'da Repository Oluşturun
1. https://github.com/new adresine gidin
2. Repository name: `maximo_v2`
3. Description: "Maximo V2 - Complete Maintenance Management System"
4. Public seçin
5. "Create repository" butonuna tıklayın

### 2. Local Repository'yi Push Edin

```bash
# Repository klasörüne gidin
cd /Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2

# Remote ekleyin (KULLANICI_ADINIZ'ı kendi GitHub kullanıcı adınızla değiştirin)
git remote add origin https://github.com/KULLANICI_ADINIZ/maximo_v2.git

# Branch'i main olarak ayarlayın
git branch -M main

# Push edin
git push -u origin main
```

## Vercel'e Deploy Etme

### Yöntem 1: Vercel Dashboard (Önerilen)

1. https://vercel.com adresine gidin ve giriş yapın
2. "Add New..." → "Project" seçin
3. GitHub repository'nizi import edin (`maximo_v2`)
4. **Framework Preset**: Vite seçin
5. **Root Directory**: `packages/frontend` seçin
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Install Command**: `npm install`
9. "Deploy" butonuna tıklayın

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI'ı yükleyin (eğer yüklü değilse)
npm install -g vercel

# Project klasörüne gidin
cd /Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2

# Vercel'e login olun
vercel login

# Deploy edin
vercel --prod

# Deploy sırasında sorulan sorular:
# ? Set up and deploy "~/bakim-yonetimi-v2"? [Y/n] Y
# ? Which scope do you want to deploy to? [Kendi hesabınızı seçin]
# ? Link to existing project? [N]
# ? What's your project's name? maximo-v2
# ? In which directory is your code located? packages/frontend
```

### Vercel Ayarları

Deploy ettikten sonra Vercel Dashboard'da şu ayarları yapın:

1. **Settings** → **General**:
   - Framework Preset: Vite
   - Root Directory: `packages/frontend`

2. **Settings** → **Environment Variables**:
   ```
   VITE_API_URL=http://localhost:3001
   ```

3. **Settings** → **Build & Development Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Post-Deployment

Deploy tamamlandığında:

1. Vercel size bir URL verecek (örn: `https://maximo-v2.vercel.app`)
2. Bu URL'i tarayıcınızda açın
3. Giriş bilgileri:
   - Email: admin@example.com
   - Password: admin123

## Güncelleme

Kodda değişiklik yaptığınızda:

```bash
# Değişiklikleri commit edin
git add .
git commit -m "Update: [değişiklik açıklaması]"

# GitHub'a push edin
git push

# Vercel otomatik olarak yeni deployment başlatacak
```

## Sorun Giderme

### Build Hatası
- Vercel Dashboard → Deployments → Hatalı deployment → View Build Logs
- Hata mesajını kontrol edin

### Import Hatası
- `packages/frontend/src` içindeki tüm importların doğru olduğundan emin olun
- Relative path'ler kullanın

### 404 Hatası
- `vercel.json` dosyasının rewrites ayarını kontrol edin
- SPA routing için tüm route'lar `/index.html`'e yönlendirilmeli

## Demo Credentials

```
Email: admin@example.com
Password: admin123
```

## Önemli Notlar

- ⚠️ Backend şu anda local'de çalışıyor (localhost:3001)
- ⚠️ Production için backend'i ayrı deploy etmeniz gerekiyor
- ⚠️ Mock data kullanılıyor, gerçek API entegrasyonu yapılmadı
- ✅ Tüm sayfalar Türkçe
- ✅ Responsive design
- ✅ Modern UI/UX
