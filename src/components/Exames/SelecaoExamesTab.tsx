import React, { useState, useMemo, useEffect } from 'react';
import {
  FileSearch,
  Building2,
  Search,
  Copy,
  Check,
  Layers,
  Sparkles,
  X,
  AlertTriangle,
  FileText,
  ShieldCheck,
  UserCheck,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { convenios } from '../../data/convenios';
import { convenioCodigos } from '../../data/codigos';
import { convenioRules } from '../../data/convenioRules';
import { CodigoItem, CodigoSubArea, RuleSection, RuleItem } from '../../data/types';

interface SelecaoExamesTabProps {
  initialConvenioId?: string;
  onNavigateToConvenios?: (convenioId: string, subTab: 'regras' | 'codigos') => void;
}

interface FlatExamItem extends CodigoItem {
  categoria: string;
  categoriaLabel: string;
}

export const SelecaoExamesTab: React.FC<SelecaoExamesTabProps> = ({
  initialConvenioId,
  onNavigateToConvenios,
}) => {
  // Lista de convênios que possuem códigos de exame cadastrados no mock
  const conveniosComExames = useMemo(() => {
    return convenios
      .filter((c) => Boolean(convenioCodigos[c.id] && convenioCodigos[c.id].length > 0))
      .map((c) => {
        const subAreas: CodigoSubArea[] = convenioCodigos[c.id] || [];
        const totalExames = subAreas.reduce((sum, sa) => sum + sa.items.length, 0);
        return {
          ...c,
          totalExames,
          subAreas,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, []);

  // 1. Estado da seleção do convênio (inicia com o initialConvenioId se ele tiver códigos, senão o primeiro da lista)
  const [selectedConvenioId, setSelectedConvenioId] = useState<string>(() => {
    if (initialConvenioId && conveniosComExames.some((c) => c.id === initialConvenioId)) {
      return initialConvenioId;
    }
    return conveniosComExames[0]?.id || 'amil';
  });

  // 2. Estado da seleção do exame (código do exame)
  const [selectedCodigo, setSelectedCodigo] = useState<string>('');

  // Filtros adicionais para facilitar a seleção do exame
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // Feedbacks visuais de cópia
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Convênio ativo
  const selectedConvenio = useMemo(() => {
    return conveniosComExames.find((c) => c.id === selectedConvenioId) || null;
  }, [conveniosComExames, selectedConvenioId]);

  // Lista plana de todos os exames do convênio selecionado
  const allExamesDoConvenio = useMemo<FlatExamItem[]>(() => {
    if (!selectedConvenio) return [];
    const subAreas = convenioCodigos[selectedConvenio.id] || [];
    const list: FlatExamItem[] = [];
    subAreas.forEach((sa) => {
      sa.items.forEach((item) => {
        list.push({
          ...item,
          categoria: sa.categoria,
          categoriaLabel: sa.label,
        });
      });
    });
    return list;
  }, [selectedConvenio]);

  // Categorias / Sub-áreas disponíveis no convênio selecionado
  const availableCategories = useMemo(() => {
    if (!selectedConvenio) return [];
    const subAreas = convenioCodigos[selectedConvenio.id] || [];
    return subAreas.map((sa) => ({
      categoria: sa.categoria,
      label: sa.label,
      count: sa.items.length,
    }));
  }, [selectedConvenio]);

  // Exames filtrados para a seleção (por categoria e por texto de busca)
  const filteredExames = useMemo(() => {
    let list = allExamesDoConvenio;

    if (selectedCategory !== 'all') {
      list = list.filter((ex) => ex.categoria === selectedCategory);
    }

    if (searchText.trim()) {
      const q = searchText.toLowerCase().trim();
      list = list.filter(
        (ex) =>
          ex.codigo.toLowerCase().includes(q) ||
          ex.descricao.toLowerCase().includes(q) ||
          ex.categoriaLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allExamesDoConvenio, selectedCategory, searchText]);

  // Exame atualmente selecionado
  const selectedExam = useMemo(() => {
    if (!selectedCodigo) return null;
    return allExamesDoConvenio.find((ex) => ex.codigo === selectedCodigo) || null;
  }, [allExamesDoConvenio, selectedCodigo]);

  // Quando troca o convênio, reseta o exame se ele não existir no novo convênio
  useEffect(() => {
    if (selectedCodigo && !allExamesDoConvenio.some((ex) => ex.codigo === selectedCodigo)) {
      setSelectedCodigo('');
    }
    setSelectedCategory('all');
    setSearchText('');
  }, [selectedConvenioId, allExamesDoConvenio]);

  // Exames relacionados na mesma sub-área do exame selecionado
  const relatedExams = useMemo(() => {
    if (!selectedExam) return [];
    return allExamesDoConvenio
      .filter((ex) => ex.categoria === selectedExam.categoria && ex.codigo !== selectedExam.codigo)
      .slice(0, 8);
  }, [allExamesDoConvenio, selectedExam]);

  // Regras contratuais do convênio selecionado
  const rulesDoConvenio: RuleSection[] = useMemo(() => {
    if (!selectedConvenio) return [];
    return convenioRules[selectedConvenio.id] || [];
  }, [selectedConvenio]);

  // Identifica regras específicas que mencionam o exame ou termos chave do procedimento
  const { matchedRules, generalRules } = useMemo(() => {
    if (!selectedExam || !rulesDoConvenio.length) {
      return { matchedRules: [], generalRules: rulesDoConvenio };
    }

    const descWords = selectedExam.descricao
      .toLowerCase()
      .replace(/[()\-+,/]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !['para', 'com', 'sem', 'bilateral', 'unilateral'].includes(w));

    const matched: Array<{ sectionTitle: string; sectionIcon: string; item: RuleItem }> = [];

    rulesDoConvenio.forEach((sec) => {
      sec.items.forEach((item) => {
        const itemText = `${item.title} ${item.body}`.toLowerCase();
        const hasMatch =
          itemText.includes(selectedExam.codigo) ||
          descWords.some((word) => itemText.includes(word));

        if (hasMatch) {
          matched.push({
            sectionTitle: sec.title,
            sectionIcon: sec.icon,
            item,
          });
        }
      });
    });

    return { matchedRules: matched, generalRules: rulesDoConvenio };
  }, [selectedExam, rulesDoConvenio]);

  // Ações de cópia
  const handleCopyCode = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiedCode(codigo);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const handleCopySummary = () => {
    if (!selectedConvenio || !selectedExam) return;
    const text = [
      `[RCC CENTRAL - PROCEDIMENTO]`,
      `Convênio: ${selectedConvenio.name} (Resp: ${selectedConvenio.resp})`,
      `Exame: ${selectedExam.descricao}`,
      `Código TUSS/AMB: ${selectedExam.codigo}`,
      `Modalidade: ${selectedExam.categoriaLabel}`,
      `Guia de Transcrição: ${selectedConvenio.guiaTranscricaoObrigatoria ? 'OBRIGATÓRIA' : 'Direta / Padrão'}`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ========================================================
          HERO BANNER - PADRÃO DO PROJETO COM COR DINÂMICA
         ======================================================== */}
      <div
        className="convenio-hero-card"
        style={{ '--card-accent-color': selectedConvenio?.color || 'var(--primary)' } as React.CSSProperties}
      >
        <div className="convenio-hero-info">
          <div
            className="convenio-avatar"
            style={{ color: selectedConvenio?.color || 'var(--primary)' }}
          >
            <FileSearch size={24} />
          </div>
          <div className="convenio-hero-title">
            <h2>Seleção de Exame por Convênio</h2>
            <div className="convenio-hero-meta">
              <span>
                <Building2 size={14} /> Convênios com códigos: <strong>{conveniosComExames.length}</strong>
              </span>
              {selectedConvenio && (
                <>
                  <span>
                    <Layers size={14} /> Exames no convênio: <strong>{allExamesDoConvenio.length}</strong>
                  </span>
                  <span>
                    <UserCheck size={14} /> Responsável: <strong>{selectedConvenio.resp}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Badge Informativo à direita */}
        {selectedConvenio && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: selectedConvenio.color,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Convênio Ativo
              </span>
              <strong style={{ fontSize: '13px', color: '#fff' }}>
                {selectedConvenio.name}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          TELA DE SELEÇÃO: 1º CONVÊNIO -> 2º EXAME
         ======================================================== */}
      <section
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px 26px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
              Painel de Seleção: Convênio & Exame
            </h2>
          </div>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Selecione primeiro o convênio e depois o exame desejado
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {/* ====================================================
              1. SELEÇÃO DO CONVÊNIO
             ==================================================== */}
          <div
            style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: 'var(--accent-cyan)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  1
                </span>
                Seleção do Convênio
              </label>

              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {conveniosComExames.length} operadoras cadastradas
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <select
                className="search-input-field"
                value={selectedConvenioId}
                onChange={(e) => {
                  setSelectedConvenioId(e.target.value);
                  setSelectedCodigo('');
                }}
                style={{
                  width: '100%',
                  appearance: 'none',
                  paddingLeft: '14px',
                  paddingRight: '36px',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  borderColor: selectedConvenio ? selectedConvenio.color : 'var(--border-subtle)',
                  background: 'var(--bg-input)',
                  cursor: 'pointer',
                }}
              >
                <option value="" disabled>
                  -- Selecione o Convênio --
                </option>
                {conveniosComExames.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.totalExames} exames (Resp: {c.resp})
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--text-muted)',
                }}
              />
            </div>

            {/* Informações resumidas do convênio selecionado */}
            {selectedConvenio ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: selectedConvenio.color,
                    }}
                  />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {selectedConvenio.name}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Resp: <strong>{selectedConvenio.resp}</strong>
                  </span>
                </div>

                {selectedConvenio.guiaTranscricaoObrigatoria ? (
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: 'var(--accent-amber)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                    }}
                    title="Exige transcrição de guia obrigatória antes do atendimento"
                  >
                    Guia Obrigatória
                  </span>
                ) : (
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: 'var(--accent-emerald)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                    }}
                  >
                    Transcrição Direta
                  </span>
                )}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Selecione um convênio para carregar os exames disponíveis.
              </div>
            )}
          </div>

          {/* ====================================================
              2. SELEÇÃO DO EXAME
             ==================================================== */}
          <div
            style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: selectedConvenio ? 'var(--primary)' : 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    background: selectedConvenio ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedConvenio ? '#60a5fa' : 'var(--text-muted)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  2
                </span>
                Seleção do Exame
              </label>

              {selectedConvenio && (
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {filteredExames.length} {filteredExames.length === 1 ? 'exame disponível' : 'exames disponíveis'}
                </span>
              )}
            </div>

            {/* Dropdown Principal de Seleção do Exame */}
            <div style={{ position: 'relative' }}>
              <select
                className="search-input-field"
                value={selectedCodigo}
                disabled={!selectedConvenio || allExamesDoConvenio.length === 0}
                onChange={(e) => setSelectedCodigo(e.target.value)}
                style={{
                  width: '100%',
                  appearance: 'none',
                  paddingLeft: '14px',
                  paddingRight: '36px',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  borderColor: selectedExam ? 'var(--primary)' : 'var(--border-subtle)',
                  background: 'var(--bg-input)',
                  cursor: selectedConvenio ? 'pointer' : 'not-allowed',
                  opacity: selectedConvenio ? 1 : 0.6,
                }}
              >
                <option value="">
                  {selectedConvenio
                    ? `-- Selecione o Exame (${filteredExames.length} disponíveis) --`
                    : '-- Selecione primeiro o convênio --'}
                </option>

                {/* Agrupamento por Categoria/Sub-Área */}
                {availableCategories.map((cat) => {
                  const itemsInCat = filteredExames.filter((e) => e.categoria === cat.categoria);
                  if (itemsInCat.length === 0) return null;
                  return (
                    <optgroup key={cat.categoria} label={`${cat.label} (${itemsInCat.length})`}>
                      {itemsInCat.map((item, idx) => (
                        <option key={`${item.codigo}-${idx}`} value={item.codigo}>
                          [{item.codigo}] {item.descricao}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
              <ChevronDown
                size={16}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--text-muted)',
                }}
              />
            </div>

            {/* Filtro Rápido por Texto (Aparece se houver convênio selecionado) */}
            {selectedConvenio && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <Search
                    size={14}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Filtrar por nome do exame ou código (ex: crânio, 41101014)..."
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px 28px 6px 30px',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                    }}
                  />
                  {searchText && (
                    <button
                      onClick={() => setSearchText('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title="Limpar busca"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Chips de filtro por Sub-área / Categoria */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    overflowX: 'auto',
                    paddingBottom: '2px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '11px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: selectedCategory === 'all' ? 'var(--primary)' : 'var(--border-subtle)',
                      background: selectedCategory === 'all' ? 'var(--primary-light)' : 'transparent',
                      color: selectedCategory === 'all' ? '#93c5fd' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Todas ({allExamesDoConvenio.length})
                  </button>
                  {availableCategories.map((cat) => (
                    <button
                      key={cat.categoria}
                      type="button"
                      onClick={() => setSelectedCategory(cat.categoria)}
                      style={{
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '11px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: selectedCategory === cat.categoria ? 'var(--primary)' : 'var(--border-subtle)',
                        background: selectedCategory === cat.categoria ? 'var(--primary-light)' : 'transparent',
                        color: selectedCategory === cat.categoria ? '#93c5fd' : 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cat.label.split(' ')[0]} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          RESULTADO: DETALHES DO EXAME SELECIONADO
         ======================================================== */}
      {selectedExam && selectedConvenio ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card Principal de Destaque do Exame */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--bg-card), var(--bg-card-hover))',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 28px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Faixa colorida lateral */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '5px',
                background: selectedConvenio.color,
              }}
            />

            {/* Cabeçalho do Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--accent-cyan)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Layers size={13} />
                  {selectedExam.categoriaLabel}
                </span>

                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: selectedConvenio.color,
                    }}
                  />
                  {selectedConvenio.name}
                </span>

                {selectedConvenio.guiaTranscricaoObrigatoria && (
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.18)',
                      color: 'var(--accent-amber)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <AlertTriangle size={13} />
                    Guia de Transcrição Obrigatória
                  </span>
                )}
              </div>

              {/* Botões de Ação Rápida */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleCopySummary}
                  className="sidebar-nav-btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-subtle)',
                    padding: '7px 12px',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                  title="Copiar dados formatados para agendamento"
                >
                  {copiedSummary ? (
                    <Check size={14} color="var(--accent-emerald)" />
                  ) : (
                    <FileText size={14} />
                  )}
                  <span>{copiedSummary ? 'Resumo Copiado!' : 'Copiar Resumo'}</span>
                </button>

                <button
                  onClick={() => setSelectedCodigo('')}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '7px 10px',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                  title="Trocar de exame"
                >
                  Limpar
                </button>
              </div>
            </div>

            {/* Nome do Exame e Código TUSS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                paddingTop: '6px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.2px',
                    marginBottom: '4px',
                  }}
                >
                  {selectedExam.descricao}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Procedimento ambulatorial cadastrado na tabela de códigos de <strong>{selectedConvenio.name}</strong>.
                </p>
              </div>

              {/* Box de Destaque do Código */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--bg-app)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Código TUSS / AMB
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    {selectedExam.codigo}
                  </span>
                </div>

                <button
                  className="copy-btn"
                  onClick={() => handleCopyCode(selectedExam.codigo)}
                  title="Copiar código do procedimento"
                  style={{
                    background: copiedCode === selectedExam.codigo ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    padding: '7px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {copiedCode === selectedExam.codigo ? (
                    <Check size={18} color="var(--accent-emerald)" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ====================================================
              REGRAS ESPECÍFICAS CORRESPONDENTES AO EXAME
             ==================================================== */}
          {matchedRules.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <AlertTriangle size={18} color="var(--accent-amber)" />
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fbbf24' }}>
                  Critérios e Regras Específicas para este Procedimento ({matchedRules.length})
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {matchedRules.map((mr, idx) => (
                  <div
                    key={idx}
                    className="rule-item-box highlight"
                    style={{ margin: 0 }}
                  >
                    <div className="rule-item-header">
                      <span style={{ fontSize: '14px' }}>{mr.sectionIcon}</span>
                      <span className="rule-item-title">{mr.item.title}</span>
                      <span className="rule-alert-pill">{mr.sectionTitle}</span>
                    </div>
                    <div className="rule-item-body">{mr.item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====================================================
              DIRETRIZES GERAIS DO CONVÊNIO (PRAZOS, VALIDADE, PROFISSIONAIS)
             ==================================================== */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '20px 22px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--accent-emerald)" />
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                  Diretrizes Contratuais de {selectedConvenio.name}
                </h4>
              </div>

              {onNavigateToConvenios && (
                <button
                  onClick={() => onNavigateToConvenios(selectedConvenio.id, 'regras')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-link)',
                    fontSize: '12.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Ver todas as regras de {selectedConvenio.name}</span>
                  <ExternalLink size={13} />
                </button>
              )}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {generalRules.map((sec) => (
                <div
                  key={sec.id}
                  style={{
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      paddingBottom: '6px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <span>{sec.icon}</span>
                    <span>{sec.title}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sec.items.slice(0, 3).map((item, i) => (
                      <div key={i} style={{ fontSize: '12px', lineHeight: 1.45 }}>
                        <strong style={{ color: item.op ? 'var(--highlight-text)' : 'var(--text-primary)' }}>
                          {item.title}:
                        </strong>{' '}
                        <span style={{ color: 'var(--text-secondary)' }}>{item.body}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ====================================================
              OUTROS PROCEDIMENTOS DA MESMA SUB-ÁREA
             ==================================================== */}
          {relatedExams.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Layers size={16} color="var(--text-muted)" />
                <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Outros procedimentos em {selectedExam.categoriaLabel} ({selectedConvenio.name})
                </h4>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {relatedExams.map((rel, idx) => (
                  <button
                    key={`${rel.codigo}-${idx}`}
                    onClick={() => setSelectedCodigo(rel.codigo)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <span className="codigo-tag" style={{ fontSize: '11px', padding: '2px 5px' }}>
                      {rel.codigo}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {rel.descricao}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================
            ESTADO INICIAL: QUANDO NENHUM EXAME FOI SELECIONADO AINDA
           ======================================================== */
        <div
          className="empty-state"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 24px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(37, 99, 235, 0.12)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}
          >
            <FileSearch size={28} />
          </div>

          <div className="empty-state-title" style={{ fontSize: '17px', color: '#fff', marginBottom: '6px' }}>
            {selectedConvenio
              ? `Convênio ${selectedConvenio.name} selecionado`
              : 'Selecione o convênio e o exame'}
          </div>

          <p className="empty-state-desc" style={{ maxWidth: '500px', marginBottom: '20px' }}>
            {selectedConvenio
              ? `Existem ${allExamesDoConvenio.length} procedimentos cadastrados para ${selectedConvenio.name}. Escolha um exame no campo "2. Seleção do Exame" acima para visualizar o código TUSS, regras de agendamento e critérios de auditoria.`
              : 'Utilize os campos de seleção acima para consultar os códigos e regras de autorização de qualquer exame da clínica.'}
          </p>

          {/* Cards Rápidos de Categorias do Convênio */}
          {selectedConvenio && availableCategories.length > 0 && (
            <div style={{ width: '100%', maxWidth: '750px', marginTop: '10px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' }}>
                Sub-áreas de procedimentos disponíveis neste convênio:
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  textAlign: 'left',
                }}
              >
                {availableCategories.map((cat) => (
                  <div
                    key={cat.categoria}
                    onClick={() => {
                      setSelectedCategory(cat.categoria);
                      const firstExam = allExamesDoConvenio.find((e) => e.categoria === cat.categoria);
                      if (firstExam) setSelectedCodigo(firstExam.codigo);
                    }}
                    style={{
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {cat.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Clique para selecionar um exame
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        background: 'var(--primary-light)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
