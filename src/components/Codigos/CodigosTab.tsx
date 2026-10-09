import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Hash, Layers, FileDown } from 'lucide-react';
import { Convenio, CodigoSubArea } from '../../data/types';

interface CodigosTabProps {
  convenio: Convenio;
  subAreas: CodigoSubArea[];
  onSelectConvenio: (id: string) => void;
  allConvenios: Convenio[];
}

export const CodigosTab: React.FC<CodigosTabProps> = ({
  convenio,
  subAreas,
  onSelectConvenio,
  allConvenios,
}) => {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('all');
  const [filterText, setFilterText] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Se houver subáreas disponíveis e ainda não selecionou ou categoria mudou
  const activeSubArea = useMemo(() => {
    if (selectedCategoria === 'all') return null;
    return subAreas.find((sa) => sa.categoria === selectedCategoria);
  }, [selectedCategoria, subAreas]);

  // Lista de itens filtrados
  const filteredItems = useMemo(() => {
    let itemsToFilter: Array<{ codigo: string; descricao: string; categoriaLabel: string }> = [];

    if (selectedCategoria === 'all') {
      subAreas.forEach((sa) => {
        sa.items.forEach((item) => {
          itemsToFilter.push({
            ...item,
            categoriaLabel: sa.label,
          });
        });
      });
    } else if (activeSubArea) {
      activeSubArea.items.forEach((item) => {
        itemsToFilter.push({
          ...item,
          categoriaLabel: activeSubArea.label,
        });
      });
    }

    if (!filterText.trim()) return itemsToFilter;

    const query = filterText.toLowerCase();
    return itemsToFilter.filter(
      (item) =>
        item.codigo.toLowerCase().includes(query) ||
        item.descricao.toLowerCase().includes(query)
    );
  }, [subAreas, selectedCategoria, activeSubArea, filterText]);

  // Total de códigos do convênio
  const totalCodesCount = useMemo(() => {
    return subAreas.reduce((sum, sa) => sum + sa.items.length, 0);
  }, [subAreas]);

  const handleCopyCode = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiedCode(codigo);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const handleCopyAllVisible = () => {
    let text = `CÓDIGOS - ${convenio.name.toUpperCase()}\n`;
    filteredItems.forEach((item) => {
      text += `${item.codigo} - ${item.descricao}\n`;
    });
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="codigos-view">
      {/* Top Banner de Contexto de Códigos */}
      <div
        className="convenio-hero-card"
        style={{ '--card-accent-color': convenio.color } as React.CSSProperties}
      >
        <div className="convenio-hero-info">
          <div className="convenio-avatar">
            <Hash size={24} />
          </div>
          <div className="convenio-hero-title">
            <h2>Tabela de Códigos — {convenio.name}</h2>
            <div className="convenio-hero-meta">
              <span>
                <Layers size={14} /> Procedimentos cadastrados: <strong>{totalCodesCount}</strong>
              </span>
              <span>
                Sub-áreas mapeadas: <strong>{subAreas.length}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Seletor rápido de convênio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Convênio:</span>
          <select
            value={convenio.id}
            onChange={(e) => {
              onSelectConvenio(e.target.value);
              setSelectedCategoria('all');
            }}
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {allConvenios.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {subAreas.length === 0 ? (
        <div className="empty-state">
          <Hash className="empty-state-icon" size={44} />
          <div className="empty-state-title">Nenhum código cadastrado para este convênio</div>
          <p className="empty-state-desc">
            Este convênio utiliza códigos padrão TUSS/AMB sem pacotes customizados específicos cadastrados nesta clínica.
          </p>
        </div>
      ) : (
        <>
          {/* Navegação por Sub-Áreas */}
          <div className="subarea-tabs-nav">
            <button
              className={`subarea-tab-btn ${selectedCategoria === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategoria('all')}
            >
              <span>Todas as Sub-áreas</span>
              <span className="subarea-count-pill">{totalCodesCount}</span>
            </button>

            {subAreas.map((sa) => (
              <button
                key={sa.categoria}
                className={`subarea-tab-btn ${selectedCategoria === sa.categoria ? 'active' : ''}`}
                onClick={() => setSelectedCategoria(sa.categoria)}
              >
                <span>{sa.label}</span>
                <span className="subarea-count-pill">{sa.items.length}</span>
              </button>
            ))}
          </div>

          {/* Barra de Filtro de Códigos e Ações */}
          <div className="codigos-filter-bar">
            <div style={{ position: 'relative', width: '380px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Filtrar por código ou descrição nesta sub-área..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px 8px 36px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Mostrando <strong>{filteredItems.length}</strong> de {totalCodesCount} códigos
              </span>

              {filteredItems.length > 0 && (
                <button
                  className="sidebar-nav-btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onClick={handleCopyAllVisible}
                  title="Copiar lista de códigos visíveis"
                >
                  {copiedAll ? (
                    <Check size={14} color="var(--accent-emerald)" />
                  ) : (
                    <FileDown size={14} />
                  )}
                  <span>{copiedAll ? 'Copiados!' : 'Copiar Lista'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Tabela de Códigos */}
          <div className="codigos-table-card">
            <table className="codigos-table">
              <thead>
                <tr>
                  <th style={{ width: '150px' }}>Código</th>
                  <th>Descrição do Procedimento / Exame</th>
                  {selectedCategoria === 'all' && <th style={{ width: '240px' }}>Sub-área</th>}
                  <th style={{ width: '90px', textAlign: 'center' }}>Copiar</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={selectedCategoria === 'all' ? 4 : 3} style={{ textAlign: 'center', padding: '32px' }}>
                      Nenhum código encontrado com o filtro aplicado.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => (
                    <tr key={`${item.codigo}-${index}`}>
                      <td>
                        <span className="codigo-tag">{item.codigo}</span>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {item.descricao}
                        </strong>
                      </td>
                      {selectedCategoria === 'all' && (
                        <td>
                          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                            {item.categoriaLabel}
                          </span>
                        </td>
                      )}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="copy-btn"
                          title="Copiar código"
                          onClick={() => handleCopyCode(item.codigo)}
                        >
                          {copiedCode === item.codigo ? (
                            <Check size={16} color="var(--accent-emerald)" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
