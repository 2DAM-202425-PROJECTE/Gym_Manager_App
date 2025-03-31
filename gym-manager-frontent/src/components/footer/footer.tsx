import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
<footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">POWER GYM</h4>
              <p className="text-sm">Tu camino hacia una vida más saludable y en forma comienza aquí.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-gray-300">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-gray-300">
                    Clases
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-gray-300">
                    Entrenadores
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-gray-300">
                    Membresías
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">123 Calle Fitness, Ciudad</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">+1 234 567 890</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">info@powergym.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-300">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">&copy; 2023 POWER GYM. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
  );
}
