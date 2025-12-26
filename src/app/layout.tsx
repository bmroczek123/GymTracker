import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar" // Importujemy nowy Navbar
import "./globals.css"
import "./gym-tracker.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <div className="gym-tracker">
          <Sidebar />
          <div className="main-container">
            <Navbar /> 
            <main className="content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}