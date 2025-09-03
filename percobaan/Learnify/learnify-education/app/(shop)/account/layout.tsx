
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-red-500 bg-blue-600">{children}</body>
    </html>
  )
}
