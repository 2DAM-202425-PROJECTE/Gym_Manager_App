import Link from "next/link"

export default function Header() {
  const userName = "Juan Pérez" // Esto se obtendrá del backend

  return (
    <header className="bg-secondary shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">GymManager</h1>
        <div className="flex items-center space-x-4">
          <span className="text-white">{userName}</span>
          <Link href="/profile" className="w-10 h-10 bg-blue-soft rounded-full flex items-center justify-center text-white font-bold">
            {userName.split(' ').map(n => n[0]).join('')}
          </Link>
        </div>
      </div>
    </header>
  )
}
