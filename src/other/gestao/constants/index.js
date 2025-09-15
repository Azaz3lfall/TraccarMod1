// URLs da API
export const API_TRACCAR_URL = '/api/devices';
export const API_GESTAO_URL = '/gestao';

// Configuração da API
export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Estilos para modais
export const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Opções de período para relatórios
export const REPORT_PERIODS = {
  MENSAL: 'mensal',
  SEMANAL: 'semanal',
  ANUAL: 'anual',
  PERSONALIZADO: 'personalizado'
};

// Tipos de custo
export const COST_TYPES = [
  'Combustível',
  'Manutenção',
  'Pedágio',
  'Estacionamento',
  'Multa',
  'Outros'
];

// Categorias de CNH
export const CNH_CATEGORIES = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'AB',
  'AC',
  'AD',
  'AE'
];

// Configurações de exportação
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv'
};
