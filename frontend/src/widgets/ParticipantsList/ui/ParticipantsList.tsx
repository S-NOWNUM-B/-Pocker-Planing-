import { Card } from '@/shared/ui';
import { CoffeeIcon, HelpCircleIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/lib';
import type { Player } from '@/shared/lib/poker';

interface ParticipantsListProps {
  players: Player[];
  isRevealed: boolean;
  className?: string;
}

export function ParticipantsList({ players, isRevealed, className }: ParticipantsListProps) {
  if (players.length === 0) {
    return null;
  }

  return (
    <section className={cn('w-full', className)}>
      <Card className="h-full border border-border/70 bg-card/90 p-4 shadow-lg backdrop-blur">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-foreground">Участники</h2>
          <span className="text-sm text-muted-foreground">{players.length}</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {players.map((player) => {
            const voteIsVisible = isRevealed && player.vote !== null;

            return (
              <div
                key={player.id}
                className="flex min-w-8.5rem flex-col items-center gap-2 rounded-2xl border border-border/80 bg-secondary/35 px-3 py-3"
              >
                <div
                  className={`flex h-16 w-12 items-center justify-center rounded-xl border-2 text-xl font-black shadow-sm transition ${
                    player.vote && !isRevealed
                      ? 'border-primary bg-primary text-primary-foreground'
                      : player.vote && isRevealed
                        ? 'border-primary bg-card/90 text-foreground'
                        : 'border-border bg-card/70 text-muted-foreground'
                  }`}
                >
                  {voteIsVisible ? (
                    player.vote === '☕' ? (
                      <CoffeeIcon className="h-5 w-5" />
                    ) : player.vote === '?' ? (
                      <HelpCircleIcon className="h-5 w-5" />
                    ) : (
                      player.vote
                    )
                  ) : player.vote ? (
                    '✓'
                  ) : (
                    '?'
                  )}
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
                  {player.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="max-w-full truncate rounded-full bg-card/85 px-3 py-1 text-sm font-semibold text-card-foreground shadow-sm">
                  {player.name}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
