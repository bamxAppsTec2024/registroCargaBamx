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

const unidadesCamiones = [
  { id: 1, label: '1', value: '1' },
  { id: 2, label: '2', value: '2' },
  { id: 3, label: '3', value: '3' },
  { id: 4, label: '4', value: '4' },
  { id: 5, label: '5', value: '5' },
  { id: 6, label: '6', value: '6' },
  { id: 7, label: '7', value: '7' },
  { id: 8, label: '8', value: '8' },
  { id: 9, label: '9', value: '9' },
  { id: 10, label: '11', value: '11' },
  { id: 11, label: '12', value: '12' },
  { id: 12, label: '18', value: '18' },
  { id: 13, label: '19', value: '19' }
];
const duracionDeCarga = [
  { id: 1, label: '30 min', value: '30 min' },
  { id: 2, label: '1 hora', value: '1 hora' },
  { id: 3, label: '1 hora 30 min', value: '1 hora 30 min' },
  { id: 4, label: '2 horas', value: '2 horas' },
  { id: 5, label: '2 horas 30 min', value: '2 horas 30 min' },
  { id: 6, label: '3+ horas', value: '3+ horas' }
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
  dataTipoCarga,
  unidadesCamiones,
  duracionDeCarga
};
