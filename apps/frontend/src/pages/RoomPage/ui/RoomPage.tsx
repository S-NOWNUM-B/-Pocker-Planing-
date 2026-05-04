import { ParticipantsList, RoomFooter, RoomHeader, RoomHistory, RoomResults, TaskSidebar } from '@/widgets';
import RoomConnectionNotice from './RoomConnectionNotice';
import RoomMainContent from './RoomMainContent';
import { Card, EmptyState, Spinner } from '@/shared/ui';
import RoomOwnerCard from './RoomOwnerCard';
import { useRoomPageController } from '../model/useRoomPageController';
import { getDeckLabel } from '@/shared/lib/poker';

export function RoomPage() {
  const controller = useRoomPageController();

  if ('redirect' in controller) {
    return controller.redirect;
  }

  if ('loading' in controller) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Spinner size="lg" />
          <EmptyState
            title="Подключаемся к комнате"
            description="Проверяем доступ, загружаем состояние и синхронизируем участников. Обычно это занимает несколько секунд."
          />
        </div>
      </div>
    );
  }

  if ('error' in controller) {
    return controller.error;
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      {!controller.wsConnected && controller.canConnectWs && (
        // вынесено в компонент для читаемости
        <RoomConnectionNotice />
      )}

      <RoomHeader
        roomName={controller.snapshot.room.name}
        roomId={controller.snapshot.room.slug}
        deckName={getDeckLabel(controller.snapshot.room.deck.code)}
        inviteLink={controller.snapshot.room.invite_link}
        onShowHistory={() => controller.setIsHistoryOpen(true)}
      />

      <main className="relative mx-auto grid w-full max-w-7xl min-h-0 flex-1 gap-3 overflow-y-auto px-4 py-3 pb-4 sm:px-6 sm:py-4 sm:pb-5 lg:grid-cols-[20rem_minmax(0,1fr)] lg:overflow-visible lg:px-8">
        <TaskSidebar
          tasks={controller.tasks}
          activeTaskId={controller.activeTaskId}
          isRevealed={controller.isRevealed}
          newTaskTitle={controller.newTaskTitle}
          onNewTaskTitleChange={controller.setNewTaskTitle}
          onAddTask={controller.handleAddTask}
          onSelectTask={controller.handleSelectTask}
          onDeleteTask={controller.isOwner ? controller.handleDeleteTask : undefined}
          onUpdateTask={controller.isOwner ? controller.handleUpdateTask : undefined}
          className="h-auto min-h-0 lg:h-full lg:max-h-full"
        />

          <RoomMainContent controller={controller} />
      </main>

      <RoomFooter
        cards={controller.snapshot.room.deck.cards}
        selectedCard={controller.selectedCard}
        disabled={controller.isRevealed || !controller.activeTask || controller.isBusy}
        onSelectCard={(card) => {
          void controller.handleSelectCard(card);
        }}
      />

      <RoomHistory
        history={controller.snapshot.history}
        isOpen={controller.isHistoryOpen}
        onClose={() => controller.setIsHistoryOpen(false)}
      />
    </div>
  );
}
