import type { NextRequest } from "next/server"

async function fetchGitHub(url: string, useToken: boolean) {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "aryan-portfolio-app",
  }
  if (useToken && process.env.GITHUB_TOKEN) {
    headers["authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return fetch(url, { headers })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")
  const per_page = searchParams.get("per_page") || "10"
  const sort = searchParams.get("sort") || "updated"

  if (!username) {
    return new Response(JSON.stringify({ error: "Missing username" }), { status: 400 })
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=${encodeURIComponent(
    sort,
  )}&per_page=${encodeURIComponent(per_page)}`

  // 1st try: with token if available
  let res = await fetchGitHub(url, true)

  // If 401 Unauthorized (common with an invalid/expired token), retry unauthenticated
  if (res.status === 401) {
    res = await fetchGitHub(url, false)
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    const msg =
      res.status === 403
        ? "Forbidden (403) or rate-limited. Add a valid GITHUB_TOKEN to increase limits."
        : res.status === 404
          ? "User not found (404)."
          : `GitHub request failed with status ${res.status}.`
    return new Response(JSON.stringify({ error: msg, status: res.status, body }), {
      status: res.status,
      headers: { "content-type": "application/json" },
    })
  }

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  })
}
