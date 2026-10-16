# RCC Central — Consulta de Regras de Convênios & Códigos

Sistema interno desenvolvido em **React 18 + TypeScript + Vite** para consulta rápida de regras contratuais, prazos, autorizações e códigos de exames de convênios médicos em clínicas de diagnóstico por imagem.

---

## 🚀 Como Executar o Projeto

No terminal, navegue até a pasta do projeto:

```bash
cd C:\Users\leonardo.miguel\.gemini\antigravity\scratch\consulta-convenios
npm run dev
```

Abra seu navegador no endereço exibido (geralmente `http://localhost:5173`).

Para gerar a versão otimizada de produção:
```bash
npm run build
```

---

## 📁 Estrutura de Pastas

```text
consulta-convenios/
├── src/
│   ├── components/
│   │   ├── Layout/          # Sidebar com 4 menus (Convênios, Seleção de Exame, Ramais, Escala Médica / US) e Header
│   │   ├── Convenios/       # Painel de convênios + sub-menus de Regras e Códigos
│   │   ├── Exames/          # Nova aba de seleção em 2 passos (1º Convênio -> 2º Exame)
│   │   ├── Codigos/         # Tabela de códigos dividida em sub-áreas específicas
│   │   ├── Ramais/          # Telefonia interna agrupada por andar e setor
│   │   └── Medicos/         # Escala médica, exames atendidos e restrições de agendamento
│   ├── data/
│   │   ├── types.ts         # Tipos e interfaces TypeScript
│   │   ├── convenios.ts     # Metadados dos 19 convênios (responsável, cores, etc.)
│   │   ├── convenioRules.ts # Regras limpas (sem códigos misturados e sem HTML quebrado)
│   │   ├── codigos.ts       # Códigos reorganizados por convênio e por sub-áreas
│   │   ├── ramais.ts        # Ramais por andar e setor
│   │   └── medicos.ts       # Médicos e procedimentos
│   ├── hooks/
│   │   ├── useConvenio.ts   # Estado do convênio selecionado e dados correlacionados
│   │   └── useSearch.ts     # Busca global rápida com algoritmo fuzzy (Fuse.js)
│   ├── services/
│   │   └── api.ts           # Camada de abstração para conexão futura com backend
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entrypoint da aplicação
│   └── index.css            # Estilização completa
```

---

## 🔄 Reorganização da Base de Dados

1. **Códigos movidos das regras para a tabela de códigos**:
   - Os procedimentos que antes ficavam espalhados dentro do campo `observacoes` ou `criterios` foram unificados em suas respectivas sub-áreas na aba **Tabela de Códigos**.
   - As regras agora mantêm referências claras, sem poluir a leitura de prazos e critérios de auditoria.

2. **Sub-áreas estruturadas por modalidade**:
   - `rm`: Ressonância Magnética
   - `angio_rm`: Angiorressonância
   - `tc`: Tomografia Computadorizada
   - `angio_tc`: Angiotomografia
   - `us_doppler`: Ultrassonografia e Doppler
   - `pacotes`: Pacotes contratuais específicos (ex: Petrobras, Funcef, SulAmérica)
   - `outros`: Mamografia, biópsia, densitometria, RX, punções

3. **Limpeza de HTML e normalização**:
   - Tags HTML embutidas (`<p>`, `<strong>`, `<button>`) foram tratadas e convertidas em dados puros.

---

## 🔌 Conexão com o Backend (Próximos Passos)

O projeto foi construído com a camada de serviços em [`src/services/api.ts`](file:///C:/Users/leonardo.miguel/.gemini/antigravity/scratch/consulta-convenios/src/services/api.ts).

Hoje ele responde com dados mock locais. Para plugar seu backend real:
1. Abra [`src/services/api.ts`](file:///C:/Users/leonardo.miguel/.gemini/antigravity/scratch/consulta-convenios/src/services/api.ts);
2. Substitua o retorno das funções por chamadas HTTP:
   ```typescript
   export const ApiService = {
     async getConvenios(): Promise<Convenio[]> {
       const res = await fetch('https://seu-backend.com/api/convenios');
       return res.json();
     },
     async getRulesByConvenio(convenioId: string): Promise<RuleSection[]> {
       const res = await fetch(`https://seu-backend.com/api/convenios/${convenioId}/regras`);
       return res.json();
     },
     async getCodigosByConvenio(convenioId: string): Promise<CodigoSubArea[]> {
       const res = await fetch(`https://seu-backend.com/api/convenios/${convenioId}/codigos`);
       return res.json();
     },
     // ...
   };
   ```
As telas e os componentes continuarão funcionando perfeitamente sem precisar alterar a interface visual.
