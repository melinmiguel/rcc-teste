import React, { useState, useMemo } from 'react';
import {
  Building2,
  FileText,
  Hash,
  Filter,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Convenio, RuleSection, CodigoSubArea, CodigoCategoria } from '../../data/types';
import { ConvenioRules } from './ConvenioRules';
import { CodigosTab } from '../Codigos/CodigosTab';

export type ConvenioSubTab = 'regras' | 'codigos';

interface ConveniosMainViewProps {
  convenio: Convenio | null;
  onSelectConvenio: (id: string) => void;
  allConvenios: Convenio[];
  rules: RuleSection[];
  codigosSubAreas: CodigoSubArea[];
  activeSubTab: ConvenioSubTab;
  onChangeSubTab: (subTab: ConvenioSubTab) => void;
}

export const ConveniosMainView: React.FC<ConveniosMainViewProps> = ({
  convenio,
  onSelectConvenio,
  allConvenios,
  rules,
  codigosSubAreas,
  activeSubTab,
  onChangeSubTab,
}) => {

  // Total de regras e códigos para badges informativos
  const totalRules = rules.reduce((acc, sec) => acc + sec.items.length, 0);
  const totalCodes = codigosSubAreas.reduce((acc, sa) => acc + sa.items.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ========================================================
          PAINEL DE SELEÇÃO: 3 CAMPOS DE LISTA SUSPENSA (DROPDOWNS)
         ======================================================== */}
      <section
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Filter size={18} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
            Seleção & Filtros de Convênio
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            (Escolha o convênio para habilitar a consulta)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Campo 1: Convênio (Nome do Convênio) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              1. Convênio
            </label>
            <div style={{ position: 'relative' }}>
              <select
                className="search-input-field"
                value={convenio ? convenio.id : ''}
                onChange={(e) => onSelectConvenio(e.target.value)}
                style={{
                  width: '100%',
                  appearance: 'none',
                  paddingRight: '36px',
                  fontWeight: 600,
                  borderColor: convenio ? 'var(--primary)' : 'var(--border-subtle)',
                  background: 'var(--bg-input)',
                  cursor: 'pointer',
                }}
              >
                <option value="" disabled>
                  -- Selecione o Convênio --
                </option>
                {[...allConvenios]
                  .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Resp: {c.resp})
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
          </div>
        </div>
      </section>

      {/* ========================================================
          SUB-MENUS CENTRAIS: APARECEM APÓS SELECIONAR CONVÊNIO
         ======================================================== */}
      {!convenio ? (
        <div className="empty-state" style={{ padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <Sparkles className="empty-state-icon" size={48} color="var(--primary)" />
          <div className="empty-state-title" style={{ fontSize: '18px' }}>
            Nenhum convênio selecionado
          </div>
          <p className="empty-state-desc">
            Selecione uma operadora no campo <strong>1. Convênio</strong> acima para visualizar os menus de <strong>Regras do Convênio</strong> e <strong>Tabela de Códigos</strong>.
          </p>
        </div>
      ) : (
        <>
          {/* Barra de Sub-Menus Centrais */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >

            <div
              style={{
                display: 'flex',
                alignItems: 'start',
                flexDirection: 'column',
                gap: '8px',
                padding: '0 12px',
                fontSize: '12.5px',
                color: 'var(--text-secondary)',
              }}
            >
              <span>Convênio ativo:</span>
              <span
                style={{
                  color: '#fff',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: convenio.color,
                  }}
                />
                {convenio.name}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              <button
                className={`sidebar-nav-btn ${activeSubTab === 'regras' ? 'active' : ''}`}
                onClick={() => onChangeSubTab('regras')}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: '11px 20px',
                  fontSize: '14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <FileText size={18} />
                <span>Regras do Convênio</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: activeSubTab === 'regras' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {totalRules} itens
                </span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeSubTab === 'codigos' ? 'active' : ''}`}
                onClick={() => onChangeSubTab('codigos')}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: '11px 20px',
                  fontSize: '14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Hash size={18} />
                <span>Tabela de Códigos</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: activeSubTab === 'codigos' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {totalCodes} códigos
                </span>
              </button>
            </div>


          </div>

          {/* ========================================================
              CONTEÚDO RENDERIZADO COM BASE NO SUB-ITEM ATIVO
             ======================================================== */}
          {activeSubTab === 'regras' ? (
            <ConvenioRules
              convenio={convenio}
              rules={rules}
              onGoToCodigos={() => onChangeSubTab('codigos')}
            />
          ) : (
            <CodigosTab
              convenio={convenio}
              subAreas={codigosSubAreas}
              onSelectConvenio={onSelectConvenio}
              allConvenios={allConvenios}
            />
          )}
        </>
      )}
    </div>
  );
};
