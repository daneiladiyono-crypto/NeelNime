export default async function handler(req, res) {
  const { slug = "", page = "1" } = req.query || {};
  const key = process.env.SYNOX_API_KEY || "FREE";
  const isGenre = req.url.split("?")[0].endsWith("/genre");
  if (!isGenre && !slug) return res.status(400).json({error:"Parameter slug wajib diisi."});
  const url = new URL(isGenre ? "https://api.synoxcloud.xyz/anime/anichin/genre" : "https://api.synoxcloud.xyz/anime/anichin/episode");
  if (isGenre) { url.searchParams.set("slug", slug); url.searchParams.set("page", page); }
  else url.searchParams.set("slug", slug);
  url.searchParams.set("apikey", key);
  try {
    const r = await fetch(url);
    const body = await r.text();
    res.setHeader("Cache-Control","s-maxage=60, stale-while-revalidate=300");
    res.status(r.status).type("application/json").send(body);
  } catch(e) { res.status(502).json({error:"Gagal menghubungi Synox Cloud",detail:e.message}); }
}