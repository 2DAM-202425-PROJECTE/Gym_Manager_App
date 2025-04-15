export function formatDate(dateString: string): string {
    // Convertir la cadena de fecha en un objeto Date
    const date = new Date(dateString);
  
    // Extraer día, mes y año
    const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const year = date.getFullYear();
  
    // Retornar la fecha en formato dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }