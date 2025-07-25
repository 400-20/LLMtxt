import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Use a free web scraping service or CORS proxy
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`

    const response = await fetch(proxyUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch website")
    }

    const data = await response.json()
    const html = data.contents

    // Extract basic information from HTML
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)

    // Extract text content (remove HTML tags)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 5000) // Limit content length

    return NextResponse.json({
      title: titleMatch ? titleMatch[1].trim() : "Unknown Project",
      description: descriptionMatch ? descriptionMatch[1].trim() : "No description available",
      content: textContent,
      url: url,
    })
  } catch (error) {
    console.error("Crawl error:", error)
    return NextResponse.json({ error: "Failed to crawl website" }, { status: 500 })
  }
}
