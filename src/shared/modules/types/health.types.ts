import { Dispositives } from './dispositives.types';
import { Patology } from './patology.types';

export interface Health {
  patologias: Patology[]; // Assumindo que a interface Patology já foi declarada
  alimentacao: string | null;
  EspectorHumor: string | null;
  comentarios: string;
  dispositivos: Dispositives[]; // Assumindo que a interface Dispositives já foi declarada
  hidratacao: string | null;
}
