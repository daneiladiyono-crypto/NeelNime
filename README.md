# Neel.Nime

## Deploy ke Vercel
1. Buat repository GitHub `neel-nime`.
2. Upload seluruh isi folder project ini ke repository (bukan ZIP).
3. Vercel → Add New → Project → Import repository.
4. Framework Preset: **Other**. Kosongkan Build Command dan Output Directory.
5. Klik Deploy.

## Endpoint Synox Cloud yang dihubungkan
- Genre: `/api/anime/genre?slug=action&page=1`
- Search: `/api/anime/search?query=naruto`
- Detail: `/api/anime/detail?slug=one-piece`
- Top: `/api/anime/top?page=1`
- Episode: `/api/anime/episode?slug=...`

Proxy meneruskan endpoint Synox Cloud yang kamu berikan. Default key `FREE`. Untuk key pribadi, set Environment Variable `SYNOX_API_KEY` di Vercel lalu redeploy.

## Catatan
- Bentuk JSON respons belum diberikan; UI mencoba mengenali struktur umum dan beberapa field umum. Jika nama field berbeda, penyesuaian kecil mungkin diperlukan.
- Genre/search menggunakan kelompok endpoint Anichin; detail/top menggunakan Animekuindo sesuai endpoint yang kamu kirim.
- Player hanya dapat memutar URL media yang diberikan sumber dan diizinkan untuk ditayangkan. Kualitas 360p–1080p hanya tersedia jika sumber menyediakan varian tersebut atau playlist adaptif.
