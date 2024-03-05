// Data para radios del formulario
const dataCargaCiega = [
  { label: 'Sí', value: true },
  { label: 'No', value: false },
];
const dataHayDesperdicio = [
  { label: 'Sí', value: true },
  { label: 'No', value: false },
];
const dataTipoCarga = [
  { label: 'Perecedero', value: 'Perecedero' },
  { label: 'No Perecedero', value: 'No Perecedero' },
  { label: 'No Comestible', value: 'No Comestible' },
];
  
  // Función para crear opciones de porcentajes
  // para campo porcentajes desperdicio
const crearArregloPorcentajes = () => {
    const porcentajes = [];
    for (let i = 0; i <= 100; i += 10) {
      // Dar formato para el dropdown
      porcentajes.push({
        label: `${i}%`,
        value: i
      });
    }
    return porcentajes;
  };

  export {
    crearArregloPorcentajes, 
    dataCargaCiega,
    dataHayDesperdicio,
    dataTipoCarga
  };