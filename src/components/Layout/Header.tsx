import React, { useRef, useEffect } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useGlobalSearch, GlobalSearchResult } from '../../hooks/useSearch';

interface HeaderProps {
  onSelectResult: (result: GlobalSearchResult) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectResult }) => {
  const { searchTerm, setSearchTerm, results } = useGlobalSearch();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchTerm('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSearchTerm]);

  return (
    <header className="top-header">
      {/* Busca Rápida Global */}
      <div className="search-box-wrapper" ref={searchContainerRef}>
        <Search className="search-icon" size={17} />
        <input
          type="text"
          className="search-input-field"
          placeholder="Pesquisar por código (ex: 41101537), convênio, regra, exame ou ramal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        )}

        {/* Dropdown de Resultados */}
        {searchTerm.trim().length > 1 && (
          <div className="search-results-dropdown">
            {results.length === 0 ? (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                Nenhum resultado encontrado para &quot;{searchTerm}&quot;
              </div>
            ) : (
              results.map((item, idx) => (
                <div
                  key={idx}
                  className="search-result-item"
                  onClick={() => {
                    onSelectResult(item);
                    setSearchTerm('');
                  }}
                >
                  <div className="search-result-header">
                    <span className="search-result-title">{item.title}</span>
                    {item.badge && (
                      <span className="search-result-type-badge">{item.badge}</span>
                    )}
                  </div>
                  <div className="search-result-subtitle">{item.subtitle}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Status da Clínica */}
      <div className="header-status-badge">
        <span className="status-indicator-dot" />
        <span>Base de Regras Atualizada (Mock)</span>
      </div>
    </header>
  );
};
