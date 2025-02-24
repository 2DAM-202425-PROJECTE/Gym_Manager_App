import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GymManager</h3>
            <p className="text-sm">Tu solución completa para la gestión de gimnasios.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-300">Inicio</Link></li>
              <li><Link href="/profile" className="hover:text-blue-300">Perfil</Link></li>
              <li><Link href="/pago" className="hover:text-blue-300">Pagos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-sm">Email: info@gymmanager.com</p>
            <p className="text-sm">Teléfono: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {currentYear} GymManager. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
