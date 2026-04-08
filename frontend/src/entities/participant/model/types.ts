import type { Participant } from '@poker/shared';

export type { Participant };

export interface ParticipantWithVote extends Participant {
  vote?: string;
  isRevealed?: boolean;
}
