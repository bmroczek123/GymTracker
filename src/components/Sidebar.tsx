"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, LineChart, Info } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const menu = [
    { name: "Dziennik", href: "/dziennik", icon: Dumbbell },
    { name: "Wykresy", href: "/wykresy", icon: LineChart },
    { name: "O aplikacji", href: "/o-aplikacji", icon: Info },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header"><h1>GymTracker</h1></div>
      <nav className="sidebar-nav">
        {menu.map((item) => (
          <Link key={item.href} href={item.href} 
            className={`nav-button ${pathname === item.href ? "active" : ""}`}>
            <item.icon className="nav-icon" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}