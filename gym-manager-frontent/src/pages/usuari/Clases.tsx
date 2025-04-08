import { useState, useEffect, useContext } from "react"
import { Calendar, User } from 'lucide-react'
import Sidebar from "../../components/sidebar/sidebar"
import Footer from "../../components/footer/footer"
import apiClient from "../../api/prefijo"
import { Clase } from "../type/clases"
import { UserContext } from "../../context/userContext"
import { toast } from "react-toastify"
import ClassActionButton from "../../components/buttons/Inscribirse"


export default function ClassesPage() {


  const { userContext, setUser } = useContext(UserContext)
  const user_id = userContext.user?.id
  const [classes, setClasses] = useState<Clase[]>([])
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await apiClient.get("/clases")
        setClasses(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching classes:", error)
      }
    }
    fetchClasses()
  }, [])

  const handleInscribirse = async (id: number) => {
    try {
      console.log(`Inscribiendose a la clase, ${user_id}`)
      const response = await apiClient.post(`clases/inscribir/${id}`, {user_id: user_id})
//      window.location.reload()
      console.log(response)
      setUser(response.data?.user)
      toast("Inscripción exitosa")
    } catch (error) {
      console.error("Error inscribiendose a la clase:", error)
      toast.error("Error inscribiendose a la clase")
    }
  }

  const handleDesinscribirse = async (id: number) => {
    try {
      console.log(`Desinscribiendose de la clase, ${user_id}`)
      const response = await apiClient.post(`clases/desinscribir/${id}`, {user_id: user_id})
      //window.location.reload()
      console.log(response)
      setUser(response.data?.user)
      console.log(userContext.user)
      toast("Desinscripción exitosa")
    } catch (error) {
      console.error("Error desinscribiendose de la clase:", error)
      toast.error("Error desinscribiendose de la clase")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Clases Disponibles</h2>
          </header>

          {/* Classes Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
            {classes.map((classItem) => {
              const isEnrolled = userContext.user?.clases.some((userClass: Clase) => userClass.id === classItem.id)
              return (
                <div key={classItem.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-maroon-600">{classItem.nombre}</h3>
                    <div className="bg-maroon-100 text-maroon-600 px-3 py-1 rounded-full text-sm">
                      {classItem.participantes.length}/{classItem.maximo_participantes}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <User className="h-5 w-5 mr-2" />
                      <span>{classItem.entrenador.name}</span>
                    </div>
                    <div className="mt-3 mb-2">
                      <div className="flex items-start text-gray-600">
                        <Calendar className="h-5 w-5 mr-2 mt-1" />
                        <div className="flex flex-wrap gap-2">
                          {classItem.horarios.map((session, index) => (
                            <div
                              key={index}
                              className="bg-gray-100 border border-gray-300 rounded-xl px-3 py-1.5 text-sm"
                            >
                              <span className="font-medium text-maroon-700">{session.dia}</span>
                              <div className="flex items-center mt-1">
                                <div className="h-2 w-2 bg-maroon-500 rounded-full mr-1.5"></div>
                                <span className="text-maroon-600 text-xs">
                                  {session.hora_inicio} - {session.hora_fin}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span style={{ textAlign: "justify" }}>{classItem.descripcion}</span>
                    </div>
                  </div>
                  <ClassActionButton
                    isEnrolled={isEnrolled}
                    onClick={() =>
                      isEnrolled
                        ? handleDesinscribirse(classItem.id)
                        : handleInscribirse(classItem.id)
                    }
                  />
                </div>
              )
            })}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}