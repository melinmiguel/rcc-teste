import React, { useState } from 'react';
import { Sidebar, MainTab } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { ConveniosMainView, ConvenioSubTab } from './components/Convenios/ConveniosMainView';
import { RamaisTab } from './components/Ramais/RamaisTab';
import { MedicosTab } from './components/Medicos/MedicosTab';
import { useConvenio } from './hooks/useConvenio';
import { GlobalSearchResult } from './hooks/useSearch';

export const App: React.FC = () => {
  // Menu principal da Sidebar: Convênios | Ramais | Escala Médica / US
  const [currentTab, setCurrentTab] = useState<MainTab>('convenios');

  // Sub-menu central para Convênios: Regras do Convênio | Tabela de Códigos
  const [convenioSubTab, setConvenioSubTab] = useState<ConvenioSubTab>('regras');

  const {
    selectedId,
    setSelectedId,
    selectedConvenio,
    rules,
    codigosSubAreas,
    allConvenios,
  } = useConvenio('amil');

  // Handler para navegação via busca rápida global do Header
  const handleSelectSearchResult = (result: GlobalSearchResult) => {
    if (result.targetId) {
      setSelectedId(result.targetId);
    }

    if (result.tab === 'ramais') {
      setCurrentTab('ramais');
    } else if (result.tab === 'medicos') {
      setCurrentTab('medicos');
    } else if (result.tab === 'codigos') {
      setCurrentTab('convenios');
      setConvenioSubTab('codigos');
    } else {
      setCurrentTab('convenios');
      setConvenioSubTab('regras');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Lateral com os 3 menus principais: Convênios - Ramais - Escala Médica / US */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        selectedConvenioId={selectedId}
        onSelectConvenio={(id) => {
          setSelectedId(id);
          setCurrentTab('convenios');
        }}
      />

      {/* Área Central de Conteúdo */}
      <div className="main-wrapper">
        <Header onSelectResult={handleSelectSearchResult} />

        <main className="content-scrollable">
          {/* Aba 1: Convênios (3 dropdowns + sub-menus de Regras e Códigos) */}
          {currentTab === 'convenios' && (
            <ConveniosMainView
              convenio={selectedConvenio}
              onSelectConvenio={setSelectedId}
              allConvenios={allConvenios}
              rules={rules}
              codigosSubAreas={codigosSubAreas}
              activeSubTab={convenioSubTab}
              onChangeSubTab={setConvenioSubTab}
            />
          )}

          {/* Aba 2: Ramais Internos */}
          {currentTab === 'ramais' && <RamaisTab />}

          {/* Aba 3: Escala Médica / US */}
          {currentTab === 'medicos' && <MedicosTab />}
        </main>
      </div>
    </div>
  );
};

export default App;
