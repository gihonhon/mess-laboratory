
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-red-500 bg-green-500">{children}</body>
    </html>
  )
}
