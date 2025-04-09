interface ClassActionButtonProps {
    isEnrolled: boolean
    onClick: () => void
  }
  
  export default function ClassActionButton({ isEnrolled, onClick }: ClassActionButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`w-full mt-4 py-2 px-4 rounded transition-colors ${
          isEnrolled
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-maroon-600 text-white hover:bg-maroon-700"
        }`}
      >
        {isEnrolled ? "Desinscribirse" : "Reservar Clase"}
      </button>
    )
  }