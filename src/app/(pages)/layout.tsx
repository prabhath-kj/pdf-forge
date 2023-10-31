import Navbar from "@/components/Nav"
import Footer from "@/components/Footer"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body >
    <Navbar/>
    {children}
    <Footer/>
    </body>
    </html>
  )
}
