# Kurts Hukuk ve Danışmanlık

Av. Muhammed Elber Kurt — kurumsal web sitesi  
Domain: `kurtshukukvedanismanlik.com`

## Yerel önizleme

`index.html` dosyasını tarayıcıda açın veya:

```bash
npx --yes serve .
```

## GitHub Pages

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Kaydet; birkaç dakika içinde `https://<kullanici>.github.io/<repo>/` açılır

## Özel domain (Natro)

1. Repo köküne `CNAME` dosyası ekleyin (içerik: `kurtshukukvedanismanlik.com`)
2. Natro DNS:
   - `A` kayıtları (GitHub Pages IP) veya `CNAME` → `mcp25-eng.github.io` (kullanıcı adına göre)
3. Pages ayarlarında Custom domain olarak `kurtshukukvedanismanlik.com` yazın
4. HTTPS’i etkinleştirin

## İletişim formu

Form gönderimleri `mailto:kurtshukuk@gmail.com` ile yönlendirilir.

## Sayfalar

- `index.html` — Ana sayfa
- `hakkimizda.html` — Profil / büro
- `uzmanlik.html` — Uzmanlık alanları
- `iletisim.html` — Adres, harita, form
