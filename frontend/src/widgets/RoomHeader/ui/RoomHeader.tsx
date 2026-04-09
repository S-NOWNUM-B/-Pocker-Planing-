import { Button, Card } from '@/shared/ui';
import { LinkIcon, LogOutIcon, MoonIcon, SparklesIcon, SunIcon } from '@/shared/ui/icons';
import type { Theme } from '@/shared/lib/poker';

interface RoomHeaderProps {
  roomName: string;
  roomId: string;
  deckName: string;
  theme: Theme;
  copyLabel: string;
  onToggleTheme: () => void;
  onCopyLink: () => void;
  onExit: () => void;
}

export function RoomHeader({
  roomName,
  roomId,
  deckName,
  theme,
  copyLabel,
  onToggleTheme,
  onCopyLink,
  onExit,
}: RoomHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-card/85 backdrop-blur-xl">
      <Card className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-none border-0 bg-transparent px-4 py-4 shadow-none sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-lg font-bold text-foreground">{roomName}</div>
            <div className="truncate text-sm text-muted-foreground">/{roomId}</div>
            <div className="truncate text-xs text-muted-foreground">{deckName}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onToggleTheme} className="rounded-xl">
            {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="hidden sm:inline">Тема</span>
          </Button>
          <Button type="button" variant="outline" onClick={onCopyLink} className="rounded-xl">
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{copyLabel}</span>
          </Button>
          <Button type="button" variant="ghost" onClick={onExit} className="rounded-xl">
            <LogOutIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Выйти</span>
          </Button>
        </div>
      </Card>
    </header>
  );
}
