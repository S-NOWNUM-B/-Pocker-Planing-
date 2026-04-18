/**
 * Панель выбора карт для голосования.
 *
 * Нижняя панель RoomPage. Отображает все карты выбранной колоды
 * в виде кнопок. Поддерживает:
 *  - Выбор карты (подсветка активного варианта)
 *  - Специальные карты: «?» (не знаю), «☕» (перерыв)
 *  - Блокировку при раскрытых результатах
 *
 * При клике вызывает onSelectCard(card) для отправки голоса.
 *
 * @param cards — массив значений карт (из DECKS)
 * @param selectedCard — выбранная карта (null если не выбрана)
 * @param disabled — заблокирована ли панель
 * @param onSelectCard — выбор карты
 */
import { Button } from '@/shared/ui';
import { CheckIcon, CoffeeIcon, HelpCircleIcon, TrophyIcon } from '@/shared/ui/icons';

interface VotingCardsProps {
  cards: string[];
  selectedCard: string | null;
  disabled?: boolean;
  onSelectCard: (card: string) => void;
}

export function VotingCards({
  cards,
  selectedCard,
  disabled = false,
  onSelectCard,
}: VotingCardsProps) {
  return (
    <section className="relative z-20 border-t border-border/70 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 pb-3 pt-2 sm:px-6 lg:px-8">
        <div className="rounded-t-3xl border border-border/70 bg-card/88 p-3 shadow-[0_-12px_38px_-26px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <TrophyIcon className="h-3.5 w-3.5" />
              Карты голосования
            </div>
            <div className="flex items-center gap-1.5 text-[0.72rem] text-muted-foreground">
              <CheckIcon className="h-3.5 w-3.5" />
              {selectedCard ? `Выбрано: ${selectedCard}` : 'Карта не выбрана'}
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(2.85rem,1fr))] gap-2 justify-items-center sm:grid-cols-[repeat(auto-fit,minmax(3.15rem,1fr))] sm:gap-3">
            {cards.map((card) => (
              <Button
                key={card}
                type="button"
                disabled={disabled}
                onClick={() => onSelectCard(card)}
                variant={selectedCard === card ? 'primary' : 'outline'}
                className="flex h-14 w-11 rounded-xl border text-sm font-black shadow-sm transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 sm:h-16 sm:w-12 sm:text-base"
              >
                {card === '☕' ? (
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      selectedCard === card
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <CoffeeIcon className="h-5 w-5" strokeWidth={2.8} />
                  </span>
                ) : card === '?' ? (
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      selectedCard === card
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <HelpCircleIcon className="h-5 w-5" strokeWidth={2.8} />
                  </span>
                ) : (
                  card
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
