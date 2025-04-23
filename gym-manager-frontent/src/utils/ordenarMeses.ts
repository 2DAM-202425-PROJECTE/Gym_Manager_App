import { PagosPorMes } from "../type/PagoPorMes";

export function ordenarPagosPorMes(pagos: PagosPorMes): PagosPorMes {
  const ordenMeses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Crear un nuevo objeto con las claves ordenadas
  const pagosOrdenados: PagosPorMes = {};
  ordenMeses.forEach((mes) => {
    if (pagos[mes] !== undefined) {
      pagosOrdenados[mes] = pagos[mes];
    }
  });

  return pagosOrdenados;
}