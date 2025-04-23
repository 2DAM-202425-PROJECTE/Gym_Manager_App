import { Clase } from "../type/clases";

export function countPersonsClases(clases: Clase[]): number {

    let numberPersons = 0;

  clases.forEach((clase) => {
    numberPersons += clase.total_participantes;
  });

  return numberPersons;
}