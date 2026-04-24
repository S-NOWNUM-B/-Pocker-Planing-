/**
 * Боковая панель задач в игровой комнате.
 *
 * Левая колонка RoomPage (на десктопе). Содержит:
 *  - Список задач с отметкой оценённых (SP)
 *  - Счётчик оценённых/всего задач
 *  - Поле ввода для добавления новой задачи
 *
 * При клике на задачу — она становится активной для голосования.
 * Оценённые задачи визуально отличаются (приглушённый цвет + бейдж SP).
 *
 * @param tasks — массив задач
 * @param activeTaskId — ID текущей активной задачи
 * @param isRevealed — раскрыты ли результаты (блокирует переключение)
 * @param newTaskTitle — значение поля ввода новой задачи
 * @param onNewTaskTitleChange — обработчик изменения поля
 * @param onAddTask — добавление задачи (Enter или кнопка)
 * @param onSelectTask — выбор активной задачи
 * @param onDeleteTask — удаление задачи
 * @param onUpdateTask — редактирование задачи
 * @param className — дополнительный CSS-класс
 */
import { useState } from 'react';
import { Input } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';
import type { Task } from '@/shared/lib/poker';

interface TaskSidebarProps {
  tasks: Task[];
  activeTaskId: string | null;
  isRevealed: boolean;
  newTaskTitle: string;
  onNewTaskTitleChange: (value: string) => void;
  onAddTask: () => void;
  onSelectTask: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateTask?: (taskId: string, newTitle: string) => void;
  className?: string;
}

export function TaskSidebar({
  tasks,
  activeTaskId,
  isRevealed,
  newTaskTitle,
  onNewTaskTitleChange,
  onAddTask,
  onSelectTask,
  onDeleteTask,
  onUpdateTask,
  className,
}: TaskSidebarProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'estimated'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartEdit = (task: Task) => {
    if (task.estimate) return; // Нельзя редактировать оценённые задачи
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = () => {
    if (editingTaskId && editingTitle.trim() && onUpdateTask) {
      onUpdateTask(editingTaskId, editingTitle.trim());
      setEditingTaskId(null);
      setEditingTitle('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTitle('');
  };

  const filteredTasks = tasks.filter((task) => {
    // Фильтр по статусу
    if (filter === 'pending' && task.estimate) return false;
    if (filter === 'estimated' && !task.estimate) return false;

    // Поиск по названию
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });
  return (
    <aside
      className={cn(
        'flex h-full min-h-0 w-full shrink-0 flex-col rounded-3xl border border-border/70 bg-card/95 p-4 shadow-lg lg:w-80',
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-lg font-bold text-foreground">Задачи</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {filteredTasks.filter((task) => task.estimate).length}/{filteredTasks.length}
        </span>
      </div>

      <div className="mb-3 space-y-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск задач..."
          className="h-9 text-sm"
        />

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={cn(
              'flex-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors',
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary',
            )}
          >
            Все ({tasks.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={cn(
              'flex-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors',
              filter === 'pending'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary',
            )}
          >
            Не оценённые ({tasks.filter((t) => !t.estimate).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('estimated')}
            className={cn(
              'flex-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors',
              filter === 'estimated'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary',
            )}
          >
            Оценённые ({tasks.filter((t) => t.estimate).length})
          </button>
        </div>
      </div>

      <div className="mb-3 max-h-58 space-y-2 overflow-y-auto pr-1 lg:min-h-0 lg:flex-1 lg:max-h-none">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground">
            {searchQuery ? 'Задачи не найдены' : 'Добавьте первую задачу, чтобы начать оценку'}
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isActive = task.id === activeTaskId;
            const isEditing = editingTaskId === task.id;

            if (isEditing) {
              return (
                <div key={task.id} className="rounded-2xl border border-primary/70 bg-card/95 p-3">
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit();
                      } else if (e.key === 'Escape') {
                        handleCancelEdit();
                      }
                    }}
                    autoFocus
                    className="mb-2"
                    maxLength={240}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleSaveEdit}
                      disabled={!editingTitle.trim()}
                      className="h-8 flex-1 text-xs"
                    >
                      Сохранить
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelEdit}
                      variant="ghost"
                      className="h-8 flex-1 text-xs"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <div key={task.id} className="group relative">
                <Button
                  type="button"
                  onClick={() => !isRevealed && onSelectTask(task.id)}
                  onDoubleClick={() => !task.estimate && onUpdateTask && handleStartEdit(task)}
                  variant="ghost"
                  className={`w-full border p-3 text-left ${
                    isActive
                      ? 'border-primary/70 bg-primary/12 shadow-sm'
                      : task.estimate
                        ? 'border-border bg-secondary/45 text-muted-foreground'
                        : 'border-border/80 bg-card/80 hover:border-primary/50 hover:bg-card'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-2 text-sm font-medium">{task.title}</span>
                    <div className="flex items-center gap-1.5">
                      {task.estimate && (
                        <span className="shrink-0 rounded-lg bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                          {task.estimate} SP
                        </span>
                      )}
                    </div>
                  </div>
                </Button>
                {!task.estimate && (
                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    {onUpdateTask && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(task);
                        }}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        title="Редактировать задачу"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </button>
                    )}
                    {onDeleteTask && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Удалить задачу "${task.title}"?`)) {
                            onDeleteTask(task.id);
                          }
                        }}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        title="Удалить задачу"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="relative pt-1">
        <Input
          value={newTaskTitle}
          onChange={(event) => onNewTaskTitleChange(event.target.value)}
          placeholder="Новая задача"
          className="h-11 w-full"
          style={{ paddingRight: '2.75rem' }}
          maxLength={240}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onAddTask();
            }
          }}
        />
        {newTaskTitle.length > 0 && (
          <div
            className={`mt-1 text-right text-xs ${
              newTaskTitle.length > 220
                ? 'text-destructive'
                : newTaskTitle.length > 200
                  ? 'text-amber-500'
                  : 'text-muted-foreground'
            }`}
          >
            {newTaskTitle.length}/240
          </div>
        )}
      </div>
    </aside>
  );
}
