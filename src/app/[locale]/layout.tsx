import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { getNavPreviewData } from '@/lib/nav-preview'
import type { Language } from '@/lib/content'
import { getWikiLinks } from '@/lib/wiki-links'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import ClientBody from '../ClientBody'
import Analytics from '@/components/Analytics'
import { SocialBarAd } from '@/components/ads'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

const DEFAULT_SITE_URL = 'https://www.cloverorigins.wiki'
const SITE_NAME = 'Clover Origins Wiki'
const SITE_DESCRIPTION =
	'Clover Origins Wiki covers active codes, grimoire guides, race and broom rolls, quests, stat builds, and beginner tips for the Roblox Black Clover RPG.'
const SITE_KEYWORDS = [
	'Clover Origins',
	'Clover Origins Wiki',
	'Roblox',
	'codes',
	'grimoires',
	'quests',
	'races',
	'brooms',
	'stat build',
]

// 生成静态参数
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
	const localeUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
	const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()

	return {
		metadataBase: new URL(siteUrl),
		title: 'Clover Origins Wiki - Codes, Grimoires & Quests',
		description: SITE_DESCRIPTION,
		keywords: SITE_KEYWORDS,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		openGraph: {
			type: 'website',
			locale: locale,
			url: localeUrl,
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
		icons: {
			icon: [
				{ url: '/favicon.ico', sizes: 'any' },
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			],
			apple: [
				{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
			],
		},
		manifest: '/manifest.json',
		alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
	}
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	// 验证 locale
	if (!routing.locales.includes(locale as Locale)) {
		notFound()
	}

	// 获取翻译消息（不需要 setRequestLocale！）
	const messages = await getMessages()
	const navPreviewData = await getNavPreviewData(locale as Language)
	const wikiLinks = getWikiLinks()

	return (
		<>
			<Script
				crossOrigin="anonymous"
				src="https://unpkg.com/same-runtime@0.0.1/dist/index.global.js"
				strategy="beforeInteractive"
			/>
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7733402184034568"
				crossOrigin="anonymous"
				strategy="lazyOnload"
			/>
			<div className={`${geistSans.variable} ${geistMono.variable}`}>
				<Analytics />
				<NextIntlClientProvider messages={messages}>
					<ClientBody navPreviewData={navPreviewData} wikiLinks={wikiLinks}>{children}</ClientBody>
				</NextIntlClientProvider>
				{/* 社交栏广告 */}
				<SocialBarAd adKey={process.env.NEXT_PUBLIC_AD_SOCIAL_BAR || ''} />
			</div>
		</>
	)
}
