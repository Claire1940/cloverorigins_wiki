import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

const DEFAULT_SITE_URL = 'https://www.cloverorigins.wiki'
const SITE_NAME = 'Clover Origins Wiki'
const SITE_DESCRIPTION =
  'Clover Origins Wiki covers active codes, grimoire guides, race and broom rolls, quests, stat builds, and beginner tips for the Roblox Black Clover RPG.'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()

  return {
    title: 'Clover Origins Wiki - Codes, Grimoires & Quests',
    description: SITE_DESCRIPTION,
    keywords: [
      'Clover Origins',
      'Clover Origins Wiki',
      'Roblox',
      'codes',
      'grimoires',
      'quests',
      'races',
      'brooms',
      'stat build',
    ],
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      url: pageUrl,
      siteName: SITE_NAME,
      title: 'Clover Origins Wiki - Codes, Grimoires & Quests',
      description: SITE_DESCRIPTION,
      images: [
        {
          url: heroImageUrl,
          width: 1920,
          height: 1080,
          alt: 'Clover Origins Wiki Hero Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Clover Origins Wiki - Codes, Grimoires & Quests',
      description: SITE_DESCRIPTION,
      images: [heroImageUrl],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const logoUrl = new URL('/android-chrome-512x512.png', siteUrl).toString()

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": SITE_NAME,
        "description": SITE_DESCRIPTION,
        "image": heroImageUrl,
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": SITE_NAME,
        "url": siteUrl,
        "logo": logoUrl,
        "image": heroImageUrl,
        "sameAs": [
          'https://www.roblox.com/games/134963296781989/Clover-Origins',
          'https://www.roblox.com/communities/34007786/Funzy-Labs',
          'https://discord.com/invite/PJ73fSRAGQ',
          'https://www.youtube.com/@gamefunzy',
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient latestArticles={latestArticles} moduleLinkMap={moduleLinkMap} locale={locale} />
    </>
  )
}
