"use client"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"

const titles: { [key: string]: string } = {
  "/": "Dziennik treningowy",
  "/dziennik": "Dziennik treningowy",
  "/wykresy": "Statystyki i postępy",
  "/o-aplikacji": "Informacje",
}

export default function Navbar() {
  const pathname = usePathname()


  const currentTitle = titles[pathname] || "GymTracker"

  return (
    <header className="navbar">
      <h2 className="navbar-title">{currentTitle}</h2>
      <div className="navbar-actions">
        <button className="icon-button">
          <User size={20} />
        </button>
      </div>
    </header>
  )
}