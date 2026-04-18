/**
 * Страница игровой комнаты — основной рабочий экран Planning Poker.
 *
 * Маршрут: /room/:roomId.
 *
 * Функциональность:
 *  - Чтение сессии из localStorage (GameSession)
 *  - Привязка комнаты к создателю (ownerId/ownerName)
 *  - Управление игроками (пока только локальный пользователь + боты)
 *  - Добавление задач для оценки через TaskSidebar
 *  - Выбор карты через VotingCards
 *  - Раскрытие результатов и подсчёт среднего значения
 *  - Копирование ссылки на комнату для приглашения участников
 *
 * Виджеты: RoomHeader, TaskSidebar, RoomResults, ParticipantsList, VotingCards.
 *
 * В будущей реализации сессия будет синхронизироваться через WebSocket
 * и данные будут загружаться с backend через TanStack Query.
 */
import { useEffect, useMemo, useState } from 'react';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Card } from '@/shared/ui';
import {
  DECKS,
  SESSION_STORAGE_KEY,
  createRoomId,
  getAverageVote,
  type DeckType,
  type GameSession,
  type Player,
  type Task,
} from '@/shared/lib/poker';
import { ParticipantsList, RoomFooter, RoomHeader, RoomResults, TaskSidebar } from '@/widgets';
import { useRoomParams } from '../lib/useRoomParams';

function readSession(roomId: string) {
  try {
    const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    const parsed = JSON.parse(rawSession) as Partial<GameSession>;
    if (parsed.roomId !== roomId || !parsed.roomName || !parsed.userName || !parsed.deckType) {
      return null;
    }

    return {
      roomId: parsed.roomId,
      roomName: parsed.roomName,
      userName: parsed.userName,
      deckType: parsed.deckType,
      ownerId: parsed.ownerId || parsed.userName,
      ownerName: parsed.ownerName || parsed.userName,
    } satisfies GameSession;
  } catch {
    return null;
  }
}

function getDeckName(deckType: DeckType) {
  return deckType === 'fibonacci' ? 'Фибоначчи' : 'Чётная';
}

export function RoomPage() {
  const { roomId } = useRoomParams();
  const [session, setSession] = useState<GameSession | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const storedSession = readSession(roomId);

    if (!storedSession) {
      setSession(null);
      return;
    }

    setSession(storedSession);
    setPlayers([
      {
        id: storedSession.ownerId,
        name: storedSession.userName,
        role: 'Создатель',
        vote: null,
        isThinking: false,
        isBot: false,
      },
    ]);
  }, [roomId]);

  const deck = useMemo(() => {
    return session ? DECKS[session.deckType] : DECKS.fibonacci;
  }, [session]);

  const activeTask = activeTaskId ? (tasks.find((task) => task.id === activeTaskId) ?? null) : null;
  const allPlayersVoted = players.every((player) => player.vote !== null);
  const anyPlayerVoted = players.some((player) => player.vote !== null);
  const average = getAverageVote(players);

  const handleSelectCard = (card: string) => {
    if (isRevealed) {
      return;
    }

    if (!activeTask) {
      return;
    }

    setSelectedCard(card);
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => (!player.isBot ? { ...player, vote: card } : player)),
    );
  };

  const handleReveal = () => {
    if (!activeTask) {
      return;
    }

    setIsRevealed(true);

    if (activeTaskId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === activeTaskId ? { ...task, estimate: average } : task,
        ),
      );
    }

    const votes = players
      .map((player) => player.vote)
      .filter((vote): vote is string => vote !== null && vote !== '?' && vote !== '☕');
    if (votes.length > 0 && votes.every((vote) => vote === votes[0])) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 2200);
    }
  };

  const handleClearTable = () => {
    const nextTask = tasks.find((task) => task.id !== activeTaskId && !task.estimate);

    if (nextTask) {
      setActiveTaskId(nextTask.id);
    }

    setIsRevealed(false);
    setSelectedCard(null);
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => ({ ...player, vote: null, isThinking: false })),
    );
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      return;
    }

    const newTask: Task = {
      id: `${createRoomId(newTaskTitle)}-${Date.now()}`,
      title: newTaskTitle.trim(),
      estimate: null,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setActiveTaskId((currentActiveTaskId) => currentActiveTaskId ?? newTask.id);
    setNewTaskTitle('');
  };

  if (!session) {
    return <NotFoundPage />;
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      {celebrate && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-primary/10 animate-pulse" />
      )}

      <RoomHeader
        roomName={session.roomName}
        roomId={roomId}
        deckName={getDeckName(session.deckType)}
      />

      <main className="relative mx-auto grid w-full max-w-7xl min-h-0 flex-1 gap-3 overflow-y-auto px-4 py-3 pb-4 sm:px-6 sm:py-4 sm:pb-5 lg:grid-cols-[20rem_minmax(0,1fr)] lg:overflow-visible lg:px-8">
        <TaskSidebar
          tasks={tasks}
          activeTaskId={activeTaskId}
          isRevealed={isRevealed}
          newTaskTitle={newTaskTitle}
          onNewTaskTitleChange={setNewTaskTitle}
          onAddTask={handleAddTask}
          onSelectTask={setActiveTaskId}
          className="h-auto min-h-0 lg:h-full lg:max-h-full"
        />

        <div className="grid min-w-0 min-h-0 gap-3 lg:grid-rows-[auto_minmax(0,1.8fr)_auto]">
          <Card className="border border-border/70 bg-card/90 p-3 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Создатель комнаты
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {session.ownerName}
                </div>
              </div>
            </div>
          </Card>

          <RoomResults
            activeTaskTitle={activeTask ? activeTask.title : null}
            average={average}
            isRevealed={isRevealed}
            allPlayersVoted={allPlayersVoted}
            anyPlayerVoted={anyPlayerVoted}
            onReveal={handleReveal}
            onNextTask={handleClearTable}
            className="h-auto min-h-48 lg:h-full"
          />

          <ParticipantsList
            players={players}
            isRevealed={isRevealed}
            className="self-start h-auto min-h-5.5rem"
          />
        </div>
      </main>

      <RoomFooter
        cards={deck}
        selectedCard={selectedCard}
        disabled={isRevealed || !activeTask}
        onSelectCard={handleSelectCard}
      />
    </div>
  );
}
