import React, { useState, useMemo } from 'react';
import { UserCheck, Search, AlertTriangle, Stethoscope } from 'lucide-react';
import { medicos } from '../../data/medicos';

export const MedicosTab: React.FC = () => {
  const [filter, setFilter] = useState('');

  const filteredMedicos = useMemo(() => {
    if (!filter.trim()) return medicos;

    const query = filter.toLowerCase();
    return medicos.filter(
      (m) =>
        m.nome.toLowerCase().includes(query) ||
        m.exames.some((e) => e.toLowerCase().includes(query)) ||
        (m.observacao && m.observacao.toLowerCase().includes(query))
    );
  }, [filter]);

  // 1. Criar uma função para limpar o nome tirando o Dr. ou Dra.
  const removerPrefixoDr = (nome: string) => {
    // Remove "Dr. ", "Dra. ", "Dr ", "Dra " (com ou sem ponto, ignorando maiúsculas/minúsculas)
    return nome.replace(/^(dr|dra)\.?\s+/i, '');
  };

  // 2. Ordenar os médicos usando a função de limpeza
  const medicosOrdenados = useMemo(() => {
    return [...filteredMedicos].sort((a, b) => {
      const nomeA = removerPrefixoDr(a.nome);
      const nomeB = removerPrefixoDr(b.nome);

      return nomeA.localeCompare(nomeB);
    });
  }, [filteredMedicos]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner de Médicos */}
      <div className="convenio-hero-card" style={{ '--card-accent-color': '#8b5cf6' } as React.CSSProperties}>
        <div className="convenio-hero-info">
          <div className="convenio-avatar" style={{ color: '#8b5cf6' }}>
            <UserCheck size={24} />
          </div>
          <div className="convenio-hero-title">
            <h2>Corpo Clínico & Regras de Agendamento (US / Doppler)</h2>
            <div className="convenio-hero-meta">
              <span>
                <Stethoscope size={14} /> Total de profissionais: <strong>{medicos.length}</strong>
              </span>
              <span>
                Restrições operacionais sinalizadas
              </span>
            </div>
          </div>
        </div>

        {/* Campo de Busca de Médico */}
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
            placeholder="Buscar por médico ou exame..."
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

      {/* Grid de Cards de Médicos */}
      <div className="medicos-grid">
        {medicosOrdenados.map((medico, index) => (
          <div key={index} className="medico-card">
            <div className="medico-header">
              {/* O nome original (com Dr./Dra.) continua sendo exibido na tela */}
              <span className="medico-name">{medico.nome}</span>
              {medico.obs ? (
                <span className="medico-obs-badge warning">Com Observação</span>
              ) : (
                <span className="medico-obs-badge ok">Sem Restrições</span>
              )}
            </div>

            {medico.observacao && (
              <div className="medico-note-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginBottom: '2px' }}>
                  <AlertTriangle size={14} />
                  <span>Atenção no Agendamento:</span>
                </div>
                <span>{medico.observacao}</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                Exames Realizados ({medico.exames.length}):
              </span>
              <div className="medico-exams-list">
                {medico.exames.map((exame, exIdx) => (
                  <span key={exIdx} className="exam-pill">
                    {exame}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
