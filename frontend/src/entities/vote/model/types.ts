import type { VoteValue } from '@poker/shared';

export type { VoteValue };

export interface Vote {
  participantId: string;
  value: VoteValue;
  timestamp: string;
}

export const VOTE_LABELS: Record<VoteValue, string> = {
  '0': '0',
  '1/2': '½',
  '1': '1',
  '2': '2',
  '3': '3',
  '5': '5',
  '8': '8',
  '13': '13',
  '21': '21',
  '?': '?',
  coffee: '☕',
};
