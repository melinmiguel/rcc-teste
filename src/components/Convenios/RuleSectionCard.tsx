import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { RuleSection } from '../../data/types';

interface RuleSectionCardProps {
  section: RuleSection;
  defaultExpanded?: boolean;
}

export const RuleSectionCard: React.FC<RuleSectionCardProps> = ({
  section,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rule-section-card">
      <div
        className="rule-section-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="rule-section-title-group">
          <span className="rule-section-icon">{section.icon}</span>
          <span className="rule-section-title">{section.title}</span>
          <span className="rule-section-badge">{section.items.length} itens</span>
        </div>
        {expanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
      </div>

      {expanded && (
        <div className="rule-items-container">
          {section.items.map((item, index) => (
            <div
              key={index}
              className={`rule-item-box ${item.op ? 'highlight' : ''}`}
            >
              <div className="rule-item-header">
                {item.op && <AlertCircle size={15} color="var(--highlight-text)" />}
                <span className="rule-item-title">{item.title}</span>
                {item.op && <span className="rule-alert-pill">Atenção / Obrigatório</span>}
              </div>
              <div className="rule-item-body">{item.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
