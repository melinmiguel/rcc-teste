import type { Medico } from './types';

export const medicos: Medico[] = [
  { nome: 'Dr. Ighor', obs: true, exames: ['Bolsa Escrotal', 'Tireoide', 'Abdome Total/superior/inferior', 'Próstata', 'Vias Urinárias'] },
  { nome: 'Dra. Sofia Devito', obs: true, exames: ['Bolsa Escrotal c/ e s/ doppler', 'Tireoide com Doppler', 'Abdome Total/superior/inferior', 'Próstata via Abdominal', 'Vias Urinárias', 'Doppler de membros inferiores (não avalia varizes)', 'Agendar 1 US Mamas e 1 US Transvaginal por período'] },
  { nome: 'Dra. Kátia Sanday', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Mamas Masculina', 'Aparelho Urinário', 'Próstata Via Abdominal', 'Axilas', 'Parótidas', 'Cervical'] },
  { nome: 'Dra. Isabelle Meloni', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Axilas', 'Aparelho Urinário', 'Próstata Via Abdominal'] },
  { nome: 'Dr. Gustavo Skaf Kalaf', obs: true, exames: ['Parede Abdominal', 'Bolsa Escrotal', 'Inguinal', 'Pescoço', 'Tireoide', 'Cervical', 'Ombro/Cotovelo', 'Abdome Total/superior/inferior', 'Próstata', 'Vias Urinárias'] },
  { nome: 'Dra. Eveline Skaf Kalaf', obs: true, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Próstata Via Abdominal', 'Aparelho Urinário'] },
  { nome: 'Dra. Fabiana Gavino Gomes', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Cervical', 'Aparelho Urinário', 'Próstata Via Abdominal', 'Glândulas Salivares', 'Parótidas'] },
  { nome: 'Dra. Vanessa Gavino Gomes', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Aparelho Urinário', 'Próstata Via Abdominal'] },
  { nome: 'Dra. Bruna de Paula Sickler', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Mamas Masculina', 'Aparelho Urinário', 'Próstata Via Abdominal', 'Axilas', 'Eco mamaria com doppler'] },
  { nome: 'Dra. Grace Schneider Santos', obs: true, exames: ['Articulação/Músculo (exceto crianças)', 'Abdome Total/superior/inferior', 'Aparelho Urinário', 'Próstata Via Abdominal', 'Transvaginal'], observacao: 'NÃO AGENDAR A PARTIR DE 18 ANOS' },
  { nome: 'Dra. Lílian Seixas Yoshida', obs: false, exames: ['Doppler de carótidas', 'Doppler de Membros inferiores', 'Doppler de Membros Superiores', 'Doppler Renal', 'Doppler Abdominal'] },
  { nome: 'Dra. Adriana Cristina Correa', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Mamas Masculina', 'Aparelho Urinário', 'Próstata Via Abdominal', 'Axilas'] },
  { nome: 'Dra. Fernanda Piedade Bacchi', obs: false, exames: ['Abdome Total/superior/inferior', 'Mamas', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Paratireóide', 'Aparelho Urinário', 'Próstata Via Abdominal', 'Glândulas Salivares'] },
  { nome: 'Dr. Leandro Martins Yoshida', obs: false, exames: ['Doppler de carótidas', 'Doppler de Membros inferiores', 'Doppler de Membros Superiores', 'Doppler Renal', 'Doppler Abdominal'] },
  { nome: 'Dra. Ana Olivia Cardoso Borba Kalaf', obs: false, exames: ['Abdome Total/superior/inferior', 'Próstata Via Abdominal', 'Tireoide/Tireoide com Doppler', 'Transvaginal', 'Aparelho Urinário', 'Mama'] },
  { nome: 'Dra. Amanda Lima', obs: true, exames: ['Transvaginal', 'Mamas', 'Tireóide', 'Abdome Total', 'Aparelho Urinário'], observacao: 'Atende quartas das 18:00 às 21:30' }
];
