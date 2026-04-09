import { Button } from '@/shared/ui';
import { CoffeeIcon, HelpCircleIcon } from '@/shared/ui/icons';

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
    <section className="sticky bottom-0 z-20 border-t border-border/70 bg-card/92 shadow-[0_-8px_30px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-foreground">Карты голосования</div>
          <div className="text-xs text-muted-foreground">
            {selectedCard ? `Выбрано: ${selectedCard}` : 'Карта не выбрана'}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(2.75rem,1fr))] gap-2 justify-items-center sm:gap-3">
          {cards.map((card) => (
            <Button
              key={card}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCard(card)}
              variant={selectedCard === card ? 'primary' : 'outline'}
              className="flex h-14 w-11 rounded-xl text-base font-black shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:h-16 sm:w-12 sm:text-lg"
            >
              {card === '☕' ? (
                <CoffeeIcon className="h-5 w-5" />
              ) : card === '?' ? (
                <HelpCircleIcon className="h-5 w-5" />
              ) : (
                card
              )}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
