/**
 * Serviço de abstração de dados (Data Service Layer).
 * Atualmente consome os dados mock locais.
 * Quando o backend estiver pronto, basta alterar as funções abaixo para fazer fetch / axios nas rotas da API:
 *
 * Exemplo futuro:
 * export async function getConvenios(): Promise<Convenio[]> {
 *   const res = await fetch('/api/convenios');
 *   return res.json();
 * }
 */

import { convenios } from '../data/convenios';
import { convenioRules } from '../data/convenioRules';
import { convenioCodigos } from '../data/codigos';
import { ramaisData } from '../data/ramais';
import { medicos } from '../data/medicos';
import {
  Convenio,
  RuleSection,
  CodigoSubArea,
  RamaisData,
  Medico,
} from '../data/types';

export const ApiService = {
  // Lista todos os convênios
  async getConvenios(): Promise<Convenio[]> {
    return Promise.resolve(convenios);
  },

  // Retorna lista de convênios que possuem códigos de exame cadastrados
  async getConveniosComCodigos(): Promise<Convenio[]> {
    const list = convenios.filter(
      (c) => Boolean(convenioCodigos[c.id] && convenioCodigos[c.id].length > 0)
    );
    return Promise.resolve(list);
  },

  // Retorna regras de um convênio específico
  async getRulesByConvenio(convenioId: string): Promise<RuleSection[]> {
    return Promise.resolve(convenioRules[convenioId] || []);
  },

  // Retorna sub-áreas e códigos de um convênio
  async getCodigosByConvenio(convenioId: string): Promise<CodigoSubArea[]> {
    return Promise.resolve(convenioCodigos[convenioId] || []);
  },

  // Retorna lista de ramais
  async getRamais(): Promise<RamaisData> {
    return Promise.resolve(ramaisData);
  },

  // Retorna escala de médicos
  async getMedicos(): Promise<Medico[]> {
    return Promise.resolve(medicos);
  },
};
