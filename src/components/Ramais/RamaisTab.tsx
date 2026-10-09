import React, { useState, useMemo } from 'react';
import { Phone, Search, MapPin, Copy, Check, Building2 } from 'lucide-react';
import { ramaisData } from '../../data/ramais';

export const RamaisTab: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [copiedRamal, setCopiedRamal] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!filter.trim()) return ramaisData;

    const query = filter.toLowerCase();
    const result: typeof ramaisData = {};

    Object.entries(ramaisData).forEach(([area, ramais]) => {
      const matchingRamais = ramais.filter(
        (r) =>
          r.local.toLowerCase().includes(query) ||
          r.numero.toLowerCase().includes(query) ||
          area.toLowerCase().includes(query)
      );

      if (matchingRamais.length > 0) {
        result[area] = matchingRamais;
      }
    });

    return result;
  }, [filter]);

  const handleCopy = (numero: string) => {
    if (!numero) return;
    navigator.clipboard.writeText(numero);
    setCopiedRamal(numero);
    setTimeout(() => setCopiedRamal(null), 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner de Ramais */}
      <div className="convenio-hero-card" style={{ '--card-accent-color': '#10b981' } as React.CSSProperties}>
        <div className="convenio-hero-info">
          <div className="convenio-avatar" style={{ color: '#10b981' }}>
            <Phone size={24} />
          </div>
          <div className="convenio-hero-title">
            <h2>Lista Telefônica de Ramais Internos</h2>
            <div className="convenio-hero-meta">
              <span>
                <MapPin size={14} /> Unidade Principal RCC • Telefonia IP Integrada
              </span>
              <span>
                <Building2 size={14} /> Atendimento Call Center & Faturamento
              </span>
            </div>
          </div>
        </div>

        {/* Campo de Busca de Ramal */}
        <div style={{ position: 'relative', width: '320px' }}>
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
            placeholder="Filtrar por setor, andar ou número..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
      </div>

      {/* Grid de Andares e Setores */}
      <div className="ramais-grid">
        {Object.entries(filteredData).map(([area, ramais]) => (
          <div key={area} className="ramal-floor-card">
            <div className="ramal-floor-header">
              <span>{area}</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {ramais.length} {ramais.length === 1 ? 'ramal' : 'ramais'}
              </span>
            </div>
            <div className="ramal-list">
              {ramais.map((r, index) => (
                <div key={index} className="ramal-row">
                  <span className="ramal-local">{r.local}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="ramal-badge">
                      {r.numero ? r.numero : 'S/N'}
                    </span>
                    {r.numero && (
                      <button
                        className="copy-btn"
                        title="Copiar ramal"
                        onClick={() => handleCopy(r.numero)}
                      >
                        {copiedRamal === r.numero ? (
                          <Check size={14} color="var(--accent-emerald)" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Outras unidades / postos de atendimento */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
          Demais Unidades e Parceiros (Ramais diretos a cadastrar):
        </span>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
            🏥 Unidade RCC 2 (Casa de Saúde)
          </span>
          <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
            🏥 Unidade 3 (COC Barão Geraldo)
          </span>
          <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
            🩺 Clínica Voluta
          </span>
        </div>
      </div>
    </div>
  );
};
