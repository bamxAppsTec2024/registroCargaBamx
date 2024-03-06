// Data para radios del formulario
const dataCargaCiega = [
  { id: 1, label: 'Sí', value: true },
  { id: 2, label: 'No', value: false },
];
const dataHayDesperdicio = [
  { id: 1, label: 'Sí', value: true },
  { id: 2, label: 'No', value: false },
];
const dataTipoCarga = [
  { id: 1, label: 'Perecedero', value: 'Perecedero' },
  { id: 2, label: 'No Perecedero', value: 'No Perecedero' },
  { id: 3, label: 'No Comestible', value: 'No Comestible' },
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
