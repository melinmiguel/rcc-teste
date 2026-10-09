import { useState, useEffect, useMemo } from 'react';
import { ApiService } from '../services/api';
import { Convenio, RuleSection, CodigoSubArea } from '../data/types';
import { convenios as defaultConvenios } from '../data/convenios';

export function useConvenio(initialId: string = 'amil') {
  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [allConvenios, setAllConvenios] = useState<Convenio[]>(defaultConvenios);
  const [rules, setRules] = useState<RuleSection[]>([]);
  const [codigosSubAreas, setCodigosSubAreas] = useState<CodigoSubArea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega lista de convênios via ApiService
  useEffect(() => {
    let mounted = true;
    ApiService.getConvenios().then((data) => {
      if (mounted) {
        setAllConvenios(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Carrega regras e códigos do convênio selecionado via ApiService
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      ApiService.getRulesByConvenio(selectedId),
      ApiService.getCodigosByConvenio(selectedId),
    ])
      .then(([rulesData, codigosData]) => {
        if (mounted) {
          setRules(rulesData);
          setCodigosSubAreas(codigosData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [selectedId]);

  const selectedConvenio: Convenio = useMemo(() => {
    return (
      allConvenios.find((c) => c.id === selectedId) ||
      allConvenios[0] || {
        id: selectedId,
        name: selectedId,
        resp: '-',
        color: '#2FB8C6',
        active: true,
      }
    );
  }, [selectedId, allConvenios]);

  return {
    selectedId,
    setSelectedId,
    selectedConvenio,
    rules,
    codigosSubAreas,
    allConvenios,
    loading,
  };
}
