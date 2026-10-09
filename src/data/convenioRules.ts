import type { ConvenioRules } from './types';

export const convenioRules: ConvenioRules = {
  amil: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'Não pode estar escrito ANGIOTOMOGRAFIA DE AORTA TORACICA! Angio CT Coronárias: autorizar somente código 41001230 (PACOTE)', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica. Códigos 41101138 + 41101332' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' },
        { title: 'CT de maxila e mandíbula', body: 'Autorizar como CT de face' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '180 dias corridos', op: true },
        { title: 'Validade da autorização', body: '60 dias. Consultar carteirinha no sistema' }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Não aceita CRO nem CREFITO', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Exames cardíacos', body: 'Agendar com 04 dias úteis', op: true },
        { title: 'Demais exames', body: '03 dias úteis' },
        { title: 'Exame com mais de 02 articulações', body: 'Agendar com 04 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Mesmo médico', body: 'Sendo o mesmo médico solicitante, os exames podem ser pegos juntos no mesmo pedido', op: true },
        { title: 'Raio X', body: 'Não faz Dacryo por Raio X' },
        { title: 'Angio CT de MMII', body: 'Consultar faturamento — sem cobertura' },
        { title: 'Sem cobertura', body: 'Sem cobertura para Primovist, exames de ampliação/magnificação e espectroscopia' },
        { title: 'Documentação do pedido', body: 'Aceitando cópia legível do pedido e pedido digital com assinatura eletrônica' }
      ]
    }
  ],
  bradesco: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'Códigos 41001176 + 41001079 — PRECISA ESTAR ESCRITO NO PEDIDO MÉDICO: ANGIOTOMOGRAFIA DE AORTA TORACICA + TOMOGRAFIA DE TÓRAX PARA ESCORE DE CALCIO', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica. Códigos 41101138 + 41101332' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '28 dias corridos. Pedido deve estar carimbado, assinado e com CID/justificativa. Obrigatório indicação clínica ou CID em todos os exames', op: true },
        { title: 'Prazo de validade da autorização', body: '28 dias corridos', op: true },
        { title: 'Verificação de plano', body: 'Não atende: Sistel, Prata, Rede Nacional Flex, Perfil CPS, Perfil São Paulo, Livre Escolha e Efetivo II. Rede Pleno atende normalmente' }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO desde que conste como CT de face. Não aceita CREFITO. Não tem cobertura para maxila e mandíbula (trocar por CT de seios da face)' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Exames cardíacos', body: '04 dias úteis' },
        { title: 'Demais exames', body: '03 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'RM + Angios', body: 'Solicitar relatório médico complementar', op: true },
        { title: 'Colunas (mais de uma) / articulação bilateral', body: 'Solicitar relatório médico', op: true },
        { title: 'Coluna lombar + bacia', body: 'Solicitar relatório médico', op: true },
        { title: 'RM abdome total', body: 'Desmembrar em RM de abdome superior + RM de pelve' },
        { title: 'CT de maxila e mandíbula', body: 'Sem cobertura. Trocar o pedido para CT de face' },
        { title: 'Angio CT de MMII', body: 'Sem cobertura para Angio CT ilíacas e femoral' },
        { title: 'Pedidos separados', body: 'Se forem do mesmo médico (RM), autorizar todos juntos' },
        { title: 'Documentação do pedido', body: 'Aceitando cópia legível do pedido e assinatura digital' },
        { title: 'Talassemia', body: 'RM Coração + RM Abdome Superior' },
        { title: 'Angio-RM de membro superior', body: 'NÃO TEM COBERTURA' },
        { title: 'Primovist', body: 'NÃO TEM CONTRATO COM PRIMOVIST' }
      ]
    }
  ],
  cassi: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'Pode solicitar somente o pacote 41001230', op: true },
        { title: 'RM Coração', body: 'Códigos 41101138 + 41101332, precisa ter descrição da Angio RM de aorta torácica' },
        { title: 'RM Crânio + Angio RM intracraniana', body: 'Códigos 41101014 + 41101537' },
        { title: 'RM de crânio com fluxo liquórico', body: 'Código 41101235' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '90 dias', op: true },
        { title: 'Prazo de validade da autorização', body: '60 dias' }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Não aceita CRO nem CREFITO', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Exames cardíacos', body: '04 dias úteis', op: true },
        { title: 'Demais exames', body: '03 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Angio CT de MMII', body: 'Tem cobertura para arterial apenas', op: true },
        { title: 'Primovist', body: 'Tem cobertura, cobrança à parte na guia' },
        { title: 'Espectroscopia', body: 'Tem cobertura' },
        { title: 'Hidro RM', body: 'Tem cobertura. Código 41101359' },
        { title: 'Documentação do pedido', body: 'Aceitando cópia legível do pedido' },
        { title: 'Maxila e mandíbula', body: 'Aceita exame de maxila/mandíbula' }
      ]
    }
  ],
  cabesp: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Angiotomografia de coronárias', body: 'Coronárias + CT de tórax (escore de cálcio). Autorizar códigos 41001176 + 41001079. Não tem problema estar escrito CT Coronárias, mas precisa ter a coronária e o tórax', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '90 dias corridos', op: true },
        { title: 'Autorização', body: '30 dias' }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO. CREFITO não aceita' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Exames cardíacos', body: '05 dias úteis' },
        { title: 'Demais exames', body: '03 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Angiotomografia arterial e venosa de MMII', body: 'Tem contrato' }
      ]
    },
    {
      id: 'guia_transcricao', icon: '📄', title: 'Guia e Transcrição', items: [
        { title: 'Guia de transcrição', body: 'É OBRIGATÓRIO transcrever o pedido médico para a guia SP/SADT da Cabesp antes de enviar para autorização', op: true }
      ]
    }
  ],
  proasa: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'Descrever somente coronárias', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' },
        { title: 'Angio RM e Angio CT', body: 'Consultar sempre o contrato antes de autorizar', op: true }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '30 dias corridos', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Todos os exames', body: '05 dias úteis', op: true }
      ]
    },
    {
      id: 'guia_transcricao', icon: '📄', title: 'Guia e Transcrição', items: [
        { title: 'Guia de transcrição', body: 'É OBRIGATÓRIO transcrever o pedido médico para a guia SP/SADT da Proasa antes de enviar para autorização', op: true }
      ]
    }
  ],
  seprev: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'PACOTE (só coronárias). Pedido somente CT Coronária', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '90 dias corridos. Se houver anotação do médico para realização em data futura, válido por 90 dias a partir dessa programação', op: true },
        { title: 'Pedido de múltipla escolha', body: 'Não aceita', op: true },
        { title: 'Pedido médico de outro estado', body: 'Não aceito — sistema importa apenas CRM-SP', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'SOMENTE CRM DO ESTADO DE SÃO PAULO' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Análise/auditoria', body: 'Todos os pedidos vão para análise/auditoria — agendar com 05 dias úteis', op: true }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Primovist', body: 'Sem cobertura', op: true },
        { title: 'RM Mama', body: 'Autorizar como RM Tórax — código 41101120' },
        { title: 'Colangio RM', body: 'Autorizar como RM Abdome Superior, quantidade 2' },
        { title: 'CT de ATM (Temporo Mandibular)', body: 'Não tem cobertura contratual para código 41001044' }
      ]
    }
  ],
  aafresp: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'PACOTE — código 89022845. Não é necessário pedido de tórax separado', op: true },
        { title: 'RM Cardíaca', body: 'Cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: 'Sem prazo de validade. Não aceita pedidos de múltipla escolha (X)', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Somente aceito CRM', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Agendamento geral', body: 'Pode agendar com 2 dias' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'CT maxilar/mandíbula', body: 'Sem cobertura', op: true },
        { title: 'Angio CT arterial de MMII', body: 'Tem contrato' },
        { title: 'Pedidos no receituário da Unimed', body: 'Aceitos, desde que carimbados e assinados' }
      ]
    }
  ],
  assefaz: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Angiotomografia de coronárias', body: 'Coronárias + CT de tórax', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '30 dias corridos', op: true },
        { title: 'Pedido de múltipla escolha', body: 'Não aceita', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Agendamento geral', body: '03 dias úteis' },
        { title: 'Coronárias e RM cardíaca', body: '7 dias', op: true }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Primovist', body: 'Sem cobertura', op: true },
        { title: 'Angiotomografia de MMII', body: 'Tem contrato' }
      ]
    }
  ],
  hapvida: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'RM cardíaca e Angio CT', body: 'Não autoriza', op: true },
        { title: 'Demais angios', body: 'Também não autoriza', op: true }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '60 dias corridos', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Todos os exames', body: '05 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Regra geral de autorização', body: 'Só autoriza se o exame estiver no contrato, com códigos AMB', op: true },
        { title: 'Tabela contratada', body: 'AMB 1992. Contrato assinado em 01/09/2009' }
      ]
    },
    {
      id: 'guia_transcricao', icon: '📄', title: 'Guia e Transcrição', items: [
        { title: 'Guia de transcrição', body: 'É OBRIGATÓRIO transcrever o pedido médico para a guia SP/SADT da Hap Vida', op: true }
      ]
    }
  ],
  careplus: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Informação a atualizar', body: 'Conteúdo a ser preenchido — critérios de exames cardíacos para Care Plus' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '60 dias. Autorização: 30 dias' }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Somente CRM' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Todos os exames', body: '10 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Informação a atualizar', body: 'Conteúdo a ser preenchido com as regras específicas da Care Plus' }
      ]
    }
  ],
  economus: [
    {
      id: 'guia_transcricao', icon: '📄', title: 'Guia e Transcrição', items: [
        { title: 'Transcrever antes de enviar para autorização', body: 'É OBRIGATÓRIO transcrever o pedido médico para a guia SP/SADT da Economus antes de enviar para autorização', op: true }
      ]
    },
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'Pode solicitar somente o pacote 41001230', op: true },
        { title: 'RM Coração', body: 'Códigos 41101138 + 41101332, precisa ter a descrição da Angio RM de aorta torácica' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Documentação', body: 'Somente pedido médico original (não aceita cópia)', op: true },
        { title: 'Validade do pedido e autorização', body: '30 dias' }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO e CRM. Não aceita CREFITO' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Análise da operadora', body: 'ANGIO CT e ANGIO RM: até 21 DIAS ÚTEIS para autorização', op: true },
        { title: 'Exames cardíacos', body: '10 dias úteis' },
        { title: 'Demais exames', body: '05 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Angio CT de MMII', body: 'Sem cobertura', op: true },
        { title: 'Autorização por e-mail', body: 'Enviar e-mail para a Economus com assunto "Autorização exame [nome do exame]". Informar: nome do paciente, exame solicitado, carteirinha, número do prestador e número da operadora, e anexar o pedido médico', op: true }
      ]
    }
  ],
  unafisco: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Angiotomografia de coronárias', body: 'Coronárias + CT de tórax', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '60 dias corridos', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceito somente CRM', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Agendamento geral', body: '05 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Angio CT de MMII', body: 'Sem cobertura', op: true }
      ]
    }
  ],
  petrobras: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Angiotomografia de coronárias', body: 'Coronárias + CT de tórax (escore de cálcio)', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '90 dias corridos', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO inclusive com descrição de maxilar e mandíbula, e também aceita pedido de CREFITO' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Coronárias e RM cardíaca', body: 'Até 5 dias para autorizar', op: true },
        { title: 'Demais exames', body: '03 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Primovist', body: 'Libera o contraste Primovist' },
        { title: 'Tabela de pacotes', body: 'Tem tabela de pacote para RM, CT, angios CT e angios RM' },
        { title: 'Angio CT de MMII', body: 'Tem contrato' }
      ]
    },
    {
      id: 'guia_transcricao', icon: '📄', title: 'Guia e Transcrição', items: [
        { title: 'Guia de transcrição', body: 'É OBRIGATÓRIO transcrever o pedido médico para a guia SP/SADT da Petrobras Saúde', op: true }
      ]
    }
  ],
  cespvivest: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Angiotomografia de coronárias', body: 'Coronárias + CT de tórax', op: true },
        { title: 'RM Coração', body: 'RM cardíaca + angio RM de aorta torácica' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '30 dias corridos', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO. Não aceita CREFITO' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Exames cardíacos e Angio', body: '05 dias úteis' },
        { title: 'Demais exames', body: '03 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Angio CT de MMII', body: 'Sem cobertura', op: true },
        { title: 'Primovist', body: 'Autoriza o contraste Primovist' },
        { title: 'Angio RM e Angio CT', body: 'Verificar sempre se está no contrato antes de autorizar', op: true }
      ]
    }
  ],
  saudecaixa: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Coronárias', body: 'Pacote 41001230. Se tiver no pedido TC de Tórax autorizar junto', op: true },
        { title: 'RM Coração', body: 'Códigos 98324306 + 98322605, precisa ter a descrição da Angio RM de aorta torácica' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '180 dias corridos', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'CRO / CRM', op: true }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Exames cardíacos', body: '10 dias úteis' },
        { title: 'Demais exames', body: '05 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Angio CT de MMII', body: 'Consultar faturamento — tem cobertura', op: true },
        { title: 'Senha para CT', body: 'Não gera senha para CT simples. Para Angio CT gera senha' },
        { title: 'PAAF / Biópsia', body: 'Autoriza somente PAAF ou biópsia na guia' },
        { title: 'Primovist', body: 'Liberado — não precisa autorizar' },
        { title: 'RM de corpo inteiro', body: 'Desmembrar: RM Crânio, RM Tórax, RM Abdome Total, RM Pescoço, RM Pernas, RM Coxas, RM Antebraço. Acrescentar se tiver mais' },
        { title: 'TC de corpo inteiro', body: 'Desmembrar: TC Crânio, TC Tórax, TC Abdome Total, TC Coluna Lombar/Cervical e Dorsal, TC Pernas, TC Coxas, TC Antebraço' }
      ]
    },
    {
      id: 'guia_transcricao', icon: '📄', title: 'Guia e Transcrição', items: [
        { title: 'Guia de transcrição', body: 'É OBRIGATÓRIO transcrever o pedido médico para a guia SP/SADT da Funcef (Saúde Caixa)', op: true }
      ]
    }
  ],
  sulamerica: [
    {
      id: 'criterios', icon: '🫀', title: 'Critérios Específicos', items: [
        { title: 'Angiotomografia de coronárias', body: 'PACOTE — não é necessário pedido de tomografia de tórax separado', op: true },
        { title: 'RM Coração', body: 'Somente cardíaca. NÃO incluir angio RM de aorta torácica junto' },
        { title: 'RM cardíaca com talassemia', body: 'Se houver descrição de abdômen + cardíaca, autoriza múltiplas regiões' },
        { title: 'Escore de cálcio', body: 'Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio' }
      ]
    },
    {
      id: 'validade', icon: '📅', title: 'Validade', items: [
        { title: 'Prazo de validade do pedido médico', body: '90 dias corridos', op: true }
      ]
    },
    {
      id: 'profissionais', icon: '👨⚕️', title: 'Profissionais Aceitos', items: [
        { title: 'Conselhos aceitos', body: 'Aceita CRO para mandíbula/maxilar, face e ATM' }
      ]
    },
    {
      id: 'prazos', icon: '⏱️', title: 'Prazos', items: [
        { title: 'Coronárias', body: 'NÃO AGENDAR ANTES DE AUTORIZAR', op: true },
        { title: 'Demais exames', body: '03 dias úteis' }
      ]
    },
    {
      id: 'observacoes', icon: '📌', title: 'Observações Gerais', items: [
        { title: 'Sem contrato', body: 'NÃO TEMOS CONTRATO para Angio CT de MMII, MMSS, aorta torácica e aorta abdominal', op: true },
        { title: 'Espectroscopia', body: 'Sem contrato', op: true },
        { title: 'Primovist', body: 'Tem contrato. Cobrado junto com pacote da ressonância' },
        { title: 'Tabela de pacotes', body: 'Há tabela de pacotes para CT e RM' },
        { title: 'SulAmérica Clássico 100', body: 'NÃO TEMOS CONTRATO para este plano' },
        { title: 'SulAmérica Especial 100', body: 'Atende este plano' }
      ]
    }
  ],
  mediservice: [
    {
      id: "criterios", icon: "🫀", title: "Critérios de exames cardíacos", items: [
        {
          body: "Conteúdo a ser preenchido — critérios de exames cardíacos para Mediservice.",
          title: "Informação a atualizar"
        }
      ],
    },
    {
      id: "validade",
      icon: "📅",
      title: "Validade do pedido",
      items: [
        {
          body: "Informação a definir — nenhum prazo específico registrado até o momento.",
          title: "Prazo de validade do pedido médico 90 DIAS"
        }
      ],

    },
    {
      id: "profissionais",
      icon: "👨‍⚕️",
      title: "Conselhos profissionais",
      items: [
        {
          body: "Informação a definir.",
          title: "CRM"
        },
        {
          body: "",
          title: "CRO somente para CT SEIOS DA FACE"
        }
      ],

    },
    {
      id: "prazos",
      icon: "⏱️",
      title: "Prazo de agendamento / autorização",
      items: [
        {
          "body": "",
          "title": "AGENDAMENTO COM 05 DIAS ÚTEIS PARA EXAMES CARDÍACOS"
        },
        {
          "body": "<p></p>",
          "title": "PARA DEMAIS EXAMES 03 DIAS ÚTEIS"
        }
      ],

    },
    {
      id: "observacoes",
      icon: "📌",
      title: "Observações e regras específicas",
      items: [
        {
          op: true,
          body: "<p>Este convênio autoriza exames <strong>apenas de Tomografia Computadorizada</strong> no SITE ORIZON.</p>",
          title: "Autorização somente para Tomografia"
        },
        {
          body: "",
          title: "EXCETO ANGIOTOMOGRAFIA CORONARIA"
        },
        {
          body: "",
          title: "PARA OS EXAMES BILATERAIS PRECISA DE RELATÓRIO (SEGUE OS MESMOS CRITÉRIOS DA SAUDE BRADESCO)"
        }
      ],

    }
  ],
  portoseguro: [
    {
      id: "criterios",
      icon: "🫀",
      title: "Critérios de exames cardíacos",
      items: [
        {
          op: true,
          body: "Angiotomografia de coronárias + CT de tórax.",
          title: "Angiotomografia de coronárias"
        },
        {
          body: "RM cardíaca + angio RM de aorta torácica.",
          title: "RM Coração"
        },
        {
          body: "Deve estar sempre descrita a tomografia de tórax para avaliação do escore de cálcio.",
          title: "Escore de cálcio"
        }
      ],
    },
    {
      id: "validade",
      icon: "📅",
      title: "Validade do pedido",
      items: [
        {
          op: true,
          body: "90 dias corridos",
          title: "Prazo de validade do pedido médico"
        },
        {
          body: "",
          title: "PODE ACEITAR CÓPIA DESDE QUE ESTEJA BEM LEGÍVEL"
        }
      ],
    },
    {
      id: "profissionais",
      icon: "👨‍⚕️",
      title: "Conselhos profissionais",
      items: [
        {
          body: "CRO",
          title: "Conselhos aceitos"
        }
      ],
    },
    {
      id: "prazos",
      icon: "⏱️",
      title: "Prazo de agendamento / autorização",
      items: [
        {
          body: "Pode ser agendado com 2 dias",
          title: "Agendamento geral"
        }
      ],
    },
    {
      id: "observacoes",
      icon: "📌",
      title: "Observações e regras específicas",
      items: [
        {
          op: true,
          body: "Sem cobertura.",
          title: "Angio CT de MMII"
        },
        {
          op: true,
          body: "Sem cobertura para ambos.",
          title: "Espectroscopia e contraste Primovist"
        },
        {
          op: true,
          body: "É obrigatório transcrever o pedido médico para a guia SP/SADT da Porto Seguro antes de enviar para autorização.",
          title: "Guia de transcrição (obrigatória)"
        },
        {
          op: true,
          body: "É obrigatório transcrever o pedido médico para a guia SP/SADT da Porto Seguro antes de enviar para autorização.",
          title: "Guia de transcrição (obrigatória)"
        }
      ],
    }
  ],
};
