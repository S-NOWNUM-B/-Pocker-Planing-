import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/lib';

interface RoomResultsProps {
  activeTaskTitle: string | null;
  average: string;
  isRevealed: boolean;
  allPlayersVoted: boolean;
  anyPlayerVoted: boolean;
  statusMessage: string;
  onReveal: () => void;
  onNextTask: () => void;
  className?: string;
}

export function RoomResults({
  activeTaskTitle,
  average,
  isRevealed,
  allPlayersVoted,
  anyPlayerVoted,
  statusMessage,
  onReveal,
  onNextTask,
  className,
}: RoomResultsProps) {
  return (
    <section
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-2xl backdrop-blur',
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-table/95 via-table/90 to-table" />
      <div className="absolute inset-3 rounded-[1.45rem] border border-table-border/55" />

      <div className="relative z-10 flex h-full flex-col p-3 sm:p-5">
        <Card className="border border-border/70 bg-card/95 p-4 shadow-lg">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Активная задача
              </div>
              <div className="mt-1 line-clamp-2 text-lg font-bold text-foreground">
                {activeTaskTitle ?? 'Добавьте задачу для оценки'}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/45 px-4 py-3 text-right">
              <div className="text-xs text-muted-foreground">Среднее</div>
              <div className="text-xl font-black text-foreground">{average} SP</div>
            </div>
          </div>
        </Card>

        <div className="mt-3 min-h-11 rounded-2xl border border-border/80 bg-card/90 px-4 py-3 text-sm text-muted-foreground shadow-sm">
          {statusMessage || 'Выберите карточку и дождитесь команды на вскрытие'}
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-4 sm:py-5">
          {isRevealed ? (
            <Card className="w-full max-w-xs border border-primary/50 bg-card/95 p-6 text-center shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Финальная оценка
              </div>
              <div className="mt-2 text-6xl font-black text-primary">{average}</div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">Story Points</div>
            </Card>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-sm text-card-foreground/90">
                {allPlayersVoted
                  ? 'Все участники проголосовали. Можно показывать результат.'
                  : anyPlayerVoted
                    ? 'Часть голосов уже есть. Можно вскрыть сейчас или подождать остальных.'
                    : 'Пока нет голосов. Выберите карту, чтобы начать раунд.'}
              </div>
              <Button
                type="button"
                onClick={onReveal}
                disabled={!allPlayersVoted && !anyPlayerVoted}
                className="h-12 rounded-2xl px-8 text-base font-semibold shadow-lg"
              >
                Вскрыть карты
              </Button>
            </div>
          )}
        </div>

        <div className="pb-1 text-center">
          {isRevealed ? (
            <Button type="button" onClick={onNextTask} className="h-11 rounded-2xl px-8 text-base font-semibold">
              Следующая задача
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
