import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { convenios } from '../data/convenios';
import { convenioRules } from '../data/convenioRules';
import { convenioCodigos } from '../data/codigos';
import { ramaisData } from '../data/ramais';
import { medicos } from '../data/medicos';
import { redesBradesco } from '../data/redesBradesco';

export interface GlobalSearchResult {
  type: 'regra' | 'codigo' | 'ramal' | 'medico' | 'convenio' | 'rede';
  title: string;
  subtitle: string;
  badge?: string;
  targetId?: string; // convenio id, floor, etc.
  tab?: 'convenios' | 'codigos' | 'ramais' | 'medicos';
}

export function useGlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  // Unifica todos os registros para busca global
  const searchableIndex = useMemo(() => {
    const list: Array<{
      type: 'regra' | 'codigo' | 'ramal' | 'medico' | 'convenio' | 'rede';
      title: string;
      subtitle: string;
      keywords: string;
      badge?: string;
      targetId?: string;
      tab: 'convenios' | 'codigos' | 'ramais' | 'medicos';
    }> = [];

    // 1. Convênios
    convenios.forEach((c) => {
      list.push({
        type: 'convenio',
        title: c.name,
        subtitle: `Responsável: ${c.resp} — Clique para consultar regras e códigos`,
        keywords: `${c.name} ${c.id} ${c.resp}`,
        badge: 'Convênio',
        targetId: c.id,
        tab: 'convenios',
      });
    });

    // 2. Regras por convênio
    Object.entries(convenioRules).forEach(([convId, sections]) => {
      const conv = convenios.find((c) => c.id === convId);
      const convName = conv ? conv.name : convId;

      sections.forEach((sec) => {
        sec.items.forEach((item) => {
          list.push({
            type: 'regra',
            title: `${item.title} (${convName})`,
            subtitle: `${sec.title}: ${item.body}`,
            keywords: `${convName} ${sec.title} ${item.title} ${item.body}`,
            badge: sec.title,
            targetId: convId,
            tab: 'convenios',
          });
        });
      });
    });

    // 3. Códigos por convênio
    Object.entries(convenioCodigos).forEach(([convId, subareas]) => {
      const conv = convenios.find((c) => c.id === convId);
      const convName = conv ? conv.name : convId;

      subareas.forEach((sa) => {
        sa.items.forEach((item) => {
          list.push({
            type: 'codigo',
            title: `${item.codigo} — ${item.descricao}`,
            subtitle: `${convName} • ${sa.label}`,
            keywords: `${item.codigo} ${item.descricao} ${convName} ${sa.label}`,
            badge: item.codigo,
            targetId: convId,
            tab: 'codigos',
          });
        });
      });
    });

    // 4. Redes credenciadas (Bradesco)
    redesBradesco.forEach((rede) => {
      list.push({
        type: 'rede',
        title: `Rede: ${rede}`,
        subtitle: 'Plano / Rede Credenciada autorizada para Bradesco Saúde',
        keywords: `${rede} bradesco rede plano credenciado`,
        badge: 'Rede Bradesco',
        targetId: 'bradesco',
        tab: 'convenios',
      });
    });

    // 5. Ramais
    Object.entries(ramaisData).forEach(([area, ramais]) => {
      ramais.forEach((r) => {
        list.push({
          type: 'ramal',
          title: `${r.local}: Ramal ${r.numero || 'S/N'}`,
          subtitle: `Localização: ${area}`,
          keywords: `${r.local} ${r.numero} ${area}`,
          badge: area,
          tab: 'ramais',
        });
      });
    });

    // 6. Médicos
    medicos.forEach((m) => {
      list.push({
        type: 'medico',
        title: m.nome,
        subtitle: `Exames: ${m.exames.join(', ')}${m.observacao ? ` • Obs: ${m.observacao}` : ''}`,
        keywords: `${m.nome} ${m.exames.join(' ')} ${m.observacao || ''}`,
        badge: m.obs ? 'Com Restrições' : 'Disponível',
        tab: 'medicos',
      });
    });

    return list;
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(searchableIndex, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'keywords', weight: 0.3 },
        { name: 'subtitle', weight: 0.2 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [searchableIndex]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return fuse.search(searchTerm, { limit: 15 }).map((res) => res.item);
  }, [searchTerm, fuse]);

  return {
    searchTerm,
    setSearchTerm,
    results,
  };
}
