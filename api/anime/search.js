export default async function handler(req, res) {
  const value = String((req.query || {}).query ?? "");
  const key = process.env.SYNOX_API_KEY || "FREE";

  if (!value) {
    return res.status(400).json({ error: "query wajib diisi." });
  }

  const url = new URL("https://api.synoxcloud.xyz/anime/anichin/search");
  url.searchParams.set("query", value);
  url.searchParams.set("apikey", key);

  try {
    const upstream = await fetch(url);
    const body = await upstream.text();

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = upstream.status;
    return res.end(body);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({
      error: "Tidak dapat menghubungi Synox Cloud.",
      detail: error.message
    }));
  }
}
