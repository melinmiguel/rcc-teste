import React, { useState, useMemo } from 'react';
import { Globe, Search, CheckCircle2 } from 'lucide-react';
import { redesBradesco } from '../../data/redesBradesco';

export const RedesBradescoCard: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredRedes = useMemo(() => {
    if (!search.trim()) return redesBradesco;
    const query = search.toLowerCase();
    return redesBradesco.filter((r) => r.toLowerCase().includes(query));
  }, [search]);

  return (
    <div className="rule-section-card" style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}>
      <div className="rule-section-header" style={{ cursor: 'default' }}>
        <div className="rule-section-title-group">
          <span className="rule-section-icon">🌐</span>
          <span className="rule-section-title">Redes Credenciadas Atendidas (Bradesco Saúde)</span>
          <span className="rule-section-badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            {redesBradesco.length} redes cadastradas
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Consulte rapidamente se o plano/rede do paciente consta na lista de atendimento da clínica:
        </p>

        {/* Input de busca rápida */}
        <div style={{ position: 'relative', maxWidth: '420px' }}>
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
            className="search-input-field"
            placeholder="Pesquisar rede (ex: FLEURY, SANTANDER, IBM)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Estatística */}
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={14} color="var(--accent-emerald)" />
          <span>
            Mostrando <strong>{filteredRedes.length}</strong> de {redesBradesco.length} redes autorizadas
          </span>
        </div>

        {/* Nuvem de tags / pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '4px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {filteredRedes.length === 0 ? (
            <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', width: '100%', textAlign: 'center' }}>
              Nenhuma rede encontrada para &quot;{search}&quot;. Verificar se não pertence às redes não aceitas (Sistel, Prata, Flex, Perfil CPS/SP).
            </div>
          ) : (
            filteredRedes.map((rede, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11.5px',
                  fontFamily: 'var(--font-mono)',
                  background: search.trim() ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  color: search.trim() ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: search.trim() ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.15s ease',
                }}
              >
                {rede}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
