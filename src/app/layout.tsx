import './globals.css'
import { getLocale } from 'next-intl/server'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const locale = await getLocale()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body suppressHydrationWarning className="antialiased">
				{children}
			</body>
		</html>
	)
}
