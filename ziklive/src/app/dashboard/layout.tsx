"use client";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/protected_route";
import { useAuth } from "@/context/auth_context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, Ticket, Headphones, MicVocal } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  function navLink(path: string) {
    const isActive = pathname === path;
    return `w-full flex items-center gap-2 px-3 py-2 transition-colors ${
      isActive ? "bg-purple-100 text-purple-700" : "hover:bg-purple-50 text-gray-700"
    }`;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-100 w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 space-y-6">
          <h1 className="text-xl font-bold text-purple-700">ZikLive Pro</h1>
          <nav className="space-y-2 text-sm">
            <Link href="/dashboard">
              <div className={navLink("/dashboard")}>
                <LayoutDashboard size={18} /> Tableau de bord
              </div>
            </Link>
            <Link href="/dashboard/events">
              <div className={navLink("/dashboard/events")}>
                <MicVocal size={18} /> Mes événements
              </div>
            </Link>
            <Link href="/dashboard/events/create">
              <div className={navLink("/dashboard/events/create")}>
                <PlusCircle size={18} /> Créer un événement
              </div>
            </Link>
            <Link href="/dashboard/tickets">
              <div className={navLink("/dashboard/tickets")}>
                <Ticket size={18} /> Tickets vendus
              </div>
            </Link>
            <Link href="/dashboard/artists">
              <div className={navLink("/dashboard/artists")}>
                <MicVocal size={18} /> Artistes
              </div>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <UserHeader />
          </header>

          <main className="p-6 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function UserHeader() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <Headphones size={18} />
        Bienvenue, {user?.name || "Promoteur"}
      </div>
      <button
        type="button"
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
}