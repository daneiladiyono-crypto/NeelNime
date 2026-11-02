export default async function handler(req, res) {
  const value = String((req.query || {}).get?.("slug") ?? (req.query || {}).slug ?? "");
  const key = process.env.SYNOX_API_KEY || "FREE";
  const url = new URL("https://api.synoxcloud.xyz/anime/animekuindo/detail");
  if (!value) return res.status(400).json({ error: "slug wajib diisi." });
  url.searchParams.set("slug", value);
  url.searchParams.set("apikey", key);
  try {
    const upstream = await fetch(url, { headers: { accept: "application/json" } });
    const body = await upstream.text();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(upstream.status).type("application/json").send(body);
  } catch (error) {
    res.status(502).json({ error: "Tidak dapat menghubungi Synox Cloud.", detail: error.message });
  }
}
