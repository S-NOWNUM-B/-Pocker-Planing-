import { Button } from '@/shared/ui';
import { CoffeeIcon, HelpCircleIcon } from '@/shared/ui/icons';

interface VotingCardsProps {
  cards: string[];
  selectedCard: string | null;
  disabled?: boolean;
  onSelectCard: (card: string) => void;
}

export function VotingCards({ cards, selectedCard, disabled = false, onSelectCard }: VotingCardsProps) {
  return (
    <section className="sticky bottom-0 border-t border-border/70 bg-card/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3 justify-items-center">
          {cards.map((card) => (
            <Button
              key={card}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCard(card)}
              variant={selectedCard === card ? 'primary' : 'outline'}
              className="flex h-16 w-12 rounded-2xl text-lg font-black shadow-sm transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
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
