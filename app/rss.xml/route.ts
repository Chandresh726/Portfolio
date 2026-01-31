import { NextResponse } from 'next/server'
import projectsData from '@/content/projects.json'

export async function GET() {
  const baseUrl = 'https://portfolio.slope726.in'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Chandresh Kumar - Portfolio</title>
    <link>${baseUrl}</link>
    <description>Portfolio projects and updates from Chandresh Kumar</description>
    ${projectsData.map(project => `
    <item>
      <title>${project.title}</title>
      <description>${project.description}</description>
      <link>${project.liveUrl || baseUrl}</link>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
