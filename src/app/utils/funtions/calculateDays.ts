export const CalculateDiferenceOfDays =(AnalizedDate: string): number => {
  const CurrentDate = new Date();
  const MovieDate = new Date(AnalizedDate);
  // Calculamos la diferencia en milisegundos entre las dos fechas
  const Diference = MovieDate.getTime() - CurrentDate.getTime();
  // Convertimos la diferencia en días
  return Math.ceil(Diference / (1000 * 3600 * 24));
}
