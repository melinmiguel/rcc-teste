// ========== Convênios ==========
export interface Convenio {
  id: string;
  name: string;
  resp: string;
  color: string;
  active: boolean;
  guiaTranscricaoObrigatoria?: boolean;
}

// ========== Regras por Convênio ==========
export interface RuleItem {
  title: string;
  body: string;
  op?: boolean; // destaque
}

export interface RuleSection {
  id: string;
  icon: string;
  title: string;
  items: RuleItem[];
}

export type ConvenioRules = Record<string, RuleSection[]>;

// ========== Códigos ==========
export type CodigoCategoria =
  | 'rm'
  | 'angio_rm'
  | 'tc'
  | 'angio_tc'
  | 'us_doppler'
  | 'pacotes'
  | 'outros';

export const CATEGORIA_LABELS: Record<CodigoCategoria, string> = {
  rm: 'Ressonância Magnética (RM)',
  angio_rm: 'Angiorressonância (Angio-RM)',
  tc: 'Tomografia (TC)',
  angio_tc: 'Angiotomografia (Angio-TC)',
  us_doppler: 'Ultrassonografia / Doppler',
  pacotes: 'Pacotes',
  outros: 'Outros',
};

export interface CodigoItem {
  codigo: string;
  descricao: string;
}

export interface CodigoSubArea {
  categoria: CodigoCategoria;
  label: string;
  items: CodigoItem[];
}

export type ConvenioCodigos = Record<string, CodigoSubArea[]>;

// ========== Ramais ==========
export interface Ramal {
  local: string;
  numero: string;
}

export type RamaisData = Record<string, Ramal[]>;

// ========== Médicos ==========
export interface Medico {
  nome: string;
  obs: boolean;
  exames: string[];
  observacao?: string;
}
