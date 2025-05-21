export const metadata = {
  title: 'StateLegis POC',
  description: 'Track state legislation and representatives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
