import React from 'react';
import { Building2, Phone, UserCheck, Shield, FileSearch } from 'lucide-react';
import { convenios } from '../../data/convenios';
import { convenioCodigos } from '../../data/codigos';

export type MainTab = 'convenios' | 'exames' | 'ramais' | 'medicos';

interface SidebarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  selectedConvenioId: string;
  onSelectConvenio: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  selectedConvenioId,
  onSelectConvenio,
}) => {
  const conveniosComExamesCount = convenios.filter(
    (c) => Boolean(convenioCodigos[c.id] && convenioCodigos[c.id].length > 0)
  ).length;

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <Shield size={20} />
        </div>
        <div className="sidebar-title-group">
          <h1>RCC Central</h1>
          <p>Regras & Atendimento</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="sidebar-nav-tabs">
        <button
          className={`sidebar-nav-btn ${currentTab === 'convenios' ? 'active' : ''}`}
          onClick={() => onSelectTab('convenios')}
        >
          <Building2 size={17} />
          <span>Convênios</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '11px',
              padding: '2px 7px',
              borderRadius: 'var(--radius-full)',
              background: currentTab === 'convenios' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
            }}
          >
            {convenios.length}
          </span>
        </button>

        <button
          className={`sidebar-nav-btn ${currentTab === 'exames' ? 'active' : ''}`}
          onClick={() => onSelectTab('exames')}
        >
          <FileSearch size={17} />
          <span>Seleção de Exame</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '11px',
              padding: '2px 7px',
              borderRadius: 'var(--radius-full)',
              background: currentTab === 'exames' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
            }}
          >
            {conveniosComExamesCount}
          </span>
        </button>

        <button
          className={`sidebar-nav-btn ${currentTab === 'ramais' ? 'active' : ''}`}
          onClick={() => onSelectTab('ramais')}
        >
          <Phone size={17} />
          <span>Ramais</span>
        </button>

        <button
          className={`sidebar-nav-btn ${currentTab === 'medicos' ? 'active' : ''}`}
          onClick={() => onSelectTab('medicos')}
        >
          <UserCheck size={17} />
          <span>Escala Médica / US</span>
        </button>
      </nav>

      {/* Atalho rápido opcional de convênios */}
      {/* <div className="sidebar-convenios-header">
        <span className="sidebar-section-title">Acesso Rápido ({convenios.length})</span>
      </div>

      <div className="sidebar-convenios-list">
        {convenios.map((conv) => {
          const isSelected = conv.id === selectedConvenioId && currentTab === 'convenios';
          return (
            <button
              key={conv.id}
              className={`convenio-item-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                onSelectConvenio(conv.id);
                onSelectTab('convenios');
              }}
              title={`Selecionar ${conv.name} (${conv.resp})`}
            >
              <div className="convenio-item-left">
                <span
                  className="convenio-color-dot"
                  style={{ backgroundColor: conv.color }}
                />
                <span className="convenio-item-name">{conv.name}</span>
              </div>
              <span className="convenio-resp-tag">{conv.resp}</span>
            </button>
          );
        })}
      </div> */}
    </aside>
  );
};
