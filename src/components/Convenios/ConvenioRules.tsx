import React, { useState, useMemo } from 'react';
import {
  User,
  ShieldCheck,
  ArrowRight,
  FileQuestion,
  FileText,
  AlertTriangle,
  Search,
  Copy,
  Check,
} from 'lucide-react';
import { Convenio, RuleSection } from '../../data/types';
import { RuleSectionCard } from './RuleSectionCard';
import { RedesBradescoCard } from './RedesBradescoCard';

interface ConvenioRulesProps {
  convenio: Convenio;
  rules: RuleSection[];
  onGoToCodigos: () => void;
}

export const ConvenioRules: React.FC<ConvenioRulesProps> = ({
  convenio,
  rules,
  onGoToCodigos,
}) => {
  const [filterText, setFilterText] = useState('');
  const [copied, setCopied] = useState(false);

  // Filtra regras locais por palavra-chave
  const filteredRules = useMemo(() => {
    if (!filterText.trim()) return rules;
    const query = filterText.toLowerCase();

    return rules
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.body.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [rules, filterText]);

  // Copia resumo das regras para área de transferência
  const handleCopyRules = () => {
    let summary = `📋 REGRAS DE CONVÊNIO: ${convenio.name} (Resp: ${convenio.resp})\n\n`;
    rules.forEach((sec) => {
      summary += `▶ ${sec.title.toUpperCase()}\n`;
      sec.items.forEach((item) => {
        summary += `• ${item.title}: ${item.body}\n`;
      });
      summary += '\n';
    });

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="convenio-rules-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Hero Card do Convênio */}
      <div
        className="convenio-hero-card"
        style={{ '--card-accent-color': convenio.color } as React.CSSProperties}
      >
        <div className="convenio-hero-info">
          <div className="convenio-avatar">
            {convenio.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="convenio-hero-title">
            <h2>{convenio.name}</h2>
            <div className="convenio-hero-meta">
              <span>
                <User size={14} /> Responsável: <strong>{convenio.resp}</strong>
              </span>
              <span>
                <ShieldCheck size={14} /> Atendimento ativo
              </span>
              {convenio.guiaTranscricaoObrigatoria && (
                <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>
                  <FileText size={14} /> Transcrição de Guia SP/SADT Obrigatória
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="sidebar-nav-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-light)',
              padding: '8px 14px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={handleCopyRules}
            title="Copiar resumo das regras para colar no WhatsApp ou sistema"
          >
            {copied ? <Check size={15} color="var(--accent-emerald)" /> : <Copy size={15} />}
            <span>{copied ? 'Copiado!' : 'Copiar Regras'}</span>
          </button>

          <button
            className="sidebar-nav-btn"
            style={{
              background: 'var(--primary)',
              border: 'none',
              padding: '8px 16px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600,
            }}
            onClick={onGoToCodigos}
          >
            <span>Tabela de Códigos</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Alerta de Guia de Transcrição Obrigatória quando aplicável */}
      {convenio.guiaTranscricaoObrigatoria && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid var(--accent-amber)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <AlertTriangle size={22} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '13px', color: '#fef3c7' }}>
            <strong>Atenção obrigatória:</strong> Para o convênio <strong>{convenio.name}</strong>, é obrigatório transcrever o pedido médico para a guia oficial SP/SADT da operadora antes de submeter ao setor de autorização.
          </div>
        </div>
      )}

      {/* Barra de Filtro de Regras */}
      {rules.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ position: 'relative', width: '380px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              className="search-input-field"
              placeholder="Filtrar regras deste convênio (ex: cálcio, primovist, validade)..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Exibindo <strong>{filteredRules.length}</strong> seções
          </span>
        </div>
      )}

      {/* Card Especial de Redes para Bradesco Saúde */}
      {convenio.id === 'bradesco' && <RedesBradescoCard />}

      {/* Grid de Seções de Regras */}
      {rules.length === 0 ? (
        <div className="empty-state">
          <FileQuestion className="empty-state-icon" size={44} />
          <div className="empty-state-title">Sem regras específicas cadastradas</div>
          <p className="empty-state-desc">
            Este convênio ainda não possui parâmetros particulares de auditoria ou prazos documentados na base. Consulte o setor de faturamento.
          </p>
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="empty-state">
          <Search className="empty-state-icon" size={44} />
          <div className="empty-state-title">Nenhuma regra encontrada</div>
          <p className="empty-state-desc">
            Nenhuma regra corresponde ao termo &quot;{filterText}&quot;. Tente outro termo ou limpe o campo de busca.
          </p>
        </div>
      ) : (
        <div className="rules-grid">
          {filteredRules.map((section) => (
            <RuleSectionCard key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
};
