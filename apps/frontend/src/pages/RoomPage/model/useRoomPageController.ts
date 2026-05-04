import { createElement, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { useSession } from '@/app/providers';
import { roomApi } from '@/entities/room';
import {
  getRoomVotingView,
  mapSnapshotPlayers,
  mapSnapshotTasks,
  resolveRoomOwnerName,
} from '@/entities/room/lib/roomSnapshotMappers';
import { handleRevealAction, handleSelectCardAction } from '@/features/voting/lib/roomVotingActions';
import {
  handleAddTaskAction,
  handleNextTaskAction,
  handleSelectTaskAction,
} from '@/features/task-management/lib/roomTaskActions';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { formatRoundScoreLabel, getLocalSession, loadRoomSnapshotWithToken, roomRefLooksLikeCode } from '@/shared/lib/room';
import { persistRoomSession } from '@/shared/lib/session/persistRoomSession';
import { SessionManager } from '@/shared/lib/session';
import { useRoomWebSocket } from '@/shared/lib/hooks';
import { useRoomParams } from '../lib/useRoomParams';

export function useRoomPageController() {
  const { roomId: roomRef } = useRoomParams();
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [resolvedRoomRef, setResolvedRoomRef] = useState(roomRef);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const localSession = getLocalSession();
  const roomAccessToken = user ? undefined : localSession?.roomAccessToken;

  useEffect(() => {
    setResolvedRoomRef(roomRef);
  }, [roomRef]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const getRoomQueryKey = () => ['room', resolvedRoomRef, user?.id ?? 'guest', roomAccessToken ?? 'no-token'];

  const roomQuery = useQuery({
    queryKey: getRoomQueryKey(),
    enabled: Boolean(user || roomAccessToken),
    queryFn: () => loadRoomSnapshotWithToken(resolvedRoomRef, roomAccessToken),
    refetchInterval: (query) => {
      const snapshot = query.state.data;
      return snapshot ? 10000 : 4000;
    },
  });

  const snapshot = roomQuery.data;
  const roomId = snapshot?.room.id;

  const wsToken = user ? SessionManager.getToken() : roomAccessToken;
  const canConnectWs = Boolean(roomId && wsToken);

  const { isConnected: wsConnected } = useRoomWebSocket({
    roomId: roomId || '',
    roomRef: resolvedRoomRef,
    token: wsToken || '',
    userId: user?.id ?? 'guest',
    enabled: canConnectWs,
  });

  const refreshRoomData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getRoomQueryKey() }),
      queryClient.invalidateQueries({ queryKey: ['rooms'] }),
      queryClient.invalidateQueries({ queryKey: ['room-history', roomId] }),
    ]);
  };

  const createTaskMutation = useMutation({
    mutationFn: (title: string) => roomApi.createTask(roomId as string, title, roomAccessToken),
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: getRoomQueryKey() });
      const previousSnapshot = queryClient.getQueryData(getRoomQueryKey());

      queryClient.setQueryData(getRoomQueryKey(), (old: any) => {
        if (!old) return old;

        const tempTask = {
          id: `temp-${Date.now()}`,
          title,
          status: 'backlog' as const,
          estimate_value: null,
          position: old.tasks.length,
        };

        return {
          ...old,
          tasks: [...old.tasks, tempTask],
        };
      });

      return { previousSnapshot };
    },
    onError: (error: any, variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(getRoomQueryKey(), context.previousSnapshot);
      }
    },
    onSettled: () => {
      void refreshRoomData();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, title }: { taskId: string; title: string }) =>
      roomApi.updateTask(roomId as string, taskId, title, roomAccessToken),
    onMutate: async ({ taskId, title }) => {
      await queryClient.cancelQueries({ queryKey: getRoomQueryKey() });
      const previousSnapshot = queryClient.getQueryData(getRoomQueryKey());

      queryClient.setQueryData(getRoomQueryKey(), (old: any) => {
        if (!old) return old;

        return {
          ...old,
          tasks: old.tasks.map((task: any) =>
            task.id === taskId ? { ...task, title } : task
          ),
        };
      });

      return { previousSnapshot };
    },
    onError: (error: any, variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(getRoomQueryKey(), context.previousSnapshot);
      }
    },
    onSettled: () => {
      void refreshRoomData();
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => roomApi.deleteTask(roomId as string, taskId, roomAccessToken),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: getRoomQueryKey() });
      const previousSnapshot = queryClient.getQueryData(getRoomQueryKey());

      queryClient.setQueryData(getRoomQueryKey(), (old: any) => {
        if (!old) return old;

        return {
          ...old,
          tasks: old.tasks.filter((task: any) => task.id !== taskId),
        };
      });

      return { previousSnapshot };
    },
    onError: (error: any, variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(getRoomQueryKey(), context.previousSnapshot);
      }
    },
    onSettled: () => {
      void refreshRoomData();
    },
  });

  const selectTaskMutation = useMutation({
    mutationFn: (taskId: string) => roomApi.selectTask(roomId as string, taskId, roomAccessToken),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: getRoomQueryKey() });
      const previousSnapshot = queryClient.getQueryData(getRoomQueryKey());

      queryClient.setQueryData(getRoomQueryKey(), (old: any) => {
        if (!old) return old;

        const prevTaskId = old.room.current_task_id;

        return {
          ...old,
          room: {
            ...old.room,
            current_task_id: taskId,
          },
          tasks: old.tasks.map((task: any) => {
            if (task.id === taskId) {
              return { ...task, status: 'active' };
            }
            if (task.id === prevTaskId) {
              return { ...task, status: 'backlog' };
            }
            return task;
          }),
          active_round: null,
        };
      });

      return { previousSnapshot };
    },
    onError: (error: any, variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(getRoomQueryKey(), context.previousSnapshot);
      }
    },
    onSettled: () => {
      void refreshRoomData();
    },
  });

  const startRoundMutation = useMutation({
    mutationFn: (taskId: string) => roomApi.startRound(roomId as string, taskId, roomAccessToken),
    onSuccess: () => {
      void refreshRoomData();
    },
  });

  const voteMutation = useMutation({
    mutationFn: ({ roundId, value }: { roundId: string; value: string }) =>
      roomApi.submitVote(roomId as string, roundId, value, roomAccessToken),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: getRoomQueryKey() });
      const previousSnapshot = queryClient.getQueryData(getRoomQueryKey());

      queryClient.setQueryData(getRoomQueryKey(), (old: any) => {
        if (!old?.active_round || !old?.self_participant_id) return old;

        return {
          ...old,
          active_round: {
            ...old.active_round,
            self_vote_value: variables.value,
            votes_submitted: old.active_round.votes_submitted + 1,
            votes: old.active_round.votes.map((vote: any) =>
              vote.participant_id === old.self_participant_id
                ? { ...vote, value: variables.value, has_voted: true }
                : vote
            ),
          },
          participants: old.participants.map((participant: any) =>
            participant.id === old.self_participant_id ? { ...participant, has_voted: true } : participant
          ),
        };
      });

      return { previousSnapshot };
    },
    onError: (error: any, variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(getRoomQueryKey(), context.previousSnapshot);
      }
    },
    onSettled: () => {
      void refreshRoomData();
    },
  });

  const revealMutation = useMutation({
    mutationFn: (roundId: string) => roomApi.revealRound(roomId as string, roundId, roomAccessToken),
    onSuccess: () => {
      void refreshRoomData();
    },
  });

  const resetRoundMutation = useMutation({
    mutationFn: (roundId: string) => roomApi.resetRound(roomId as string, roundId, roomAccessToken),
    onSuccess: () => {
      void refreshRoomData();
    },
  });

  const finalizeMutation = useMutation({
    mutationFn: ({ roundId, resultValue }: { roundId: string; resultValue?: string }) =>
      roomApi.finalizeRound(roomId as string, roundId, resultValue, roomAccessToken),
    onSuccess: () => {
      void refreshRoomData();
    },
  });

  useEffect(() => {
    if (!snapshot) {
      return;
    }

    if (roomRefLooksLikeCode(resolvedRoomRef) && snapshot.room.id !== resolvedRoomRef) {
      setResolvedRoomRef(snapshot.room.id);
    }

    persistRoomSession({
      snapshot,
      authUserName: user?.name,
      localUserName: localSession?.userName,
      roomAccessToken,
    });
  }, [localSession?.userName, resolvedRoomRef, roomAccessToken, snapshot, user?.name]);

  if (!user && !roomAccessToken) {
    return { redirect: createElement(Navigate, { to: '/login', replace: true }) };
  }

  if (roomQuery.isLoading) {
    return {
      loading: true,
    };
  }

  if (roomQuery.isError || !snapshot) {
    return {
      error: createElement(NotFoundPage),
    };
  }

  const selfParticipant = snapshot.self_participant_id
    ? snapshot.participants.find((participant) => participant.id === snapshot.self_participant_id)
    : null;
  const isOwner = selfParticipant?.role === 'owner';
  const currentUserName = user?.name || selfParticipant?.name || localSession?.userName || 'Гость';
  const tasks = mapSnapshotTasks(snapshot);
  const players = mapSnapshotPlayers(snapshot);
  const { activeTaskId, activeTask, isRevealed, allPlayersVoted, anyPlayerVoted, selectedCard } =
    getRoomVotingView(snapshot, tasks);
  const roomOwnerName = resolveRoomOwnerName(snapshot);
  const scoreLabel = formatRoundScoreLabel(snapshot.active_round?.average_score, snapshot.active_round?.suggested_result);
  const scoreTitle = snapshot.active_round?.average_score === null || snapshot.active_round?.average_score === undefined
    ? 'Оценка'
    : 'Среднее';
  const scoreSubtitle = snapshot.active_round?.average_score === null || snapshot.active_round?.average_score === undefined
    ? 'Размер'
    : 'Story Points';

  const isBusy =
    createTaskMutation.isPending ||
    updateTaskMutation.isPending ||
    deleteTaskMutation.isPending ||
    selectTaskMutation.isPending ||
    startRoundMutation.isPending ||
    voteMutation.isPending ||
    revealMutation.isPending ||
    resetRoundMutation.isPending ||
    finalizeMutation.isPending;

  return {
    roomRef: resolvedRoomRef,
    snapshot,
    wsConnected,
    canConnectWs,
    tasks,
    players,
    activeTaskId,
    activeTask,
    isRevealed,
    allPlayersVoted,
    anyPlayerVoted,
    selectedCard,
    roomOwnerName,
    scoreLabel,
    scoreTitle,
    scoreSubtitle,
    currentUserName,
    isOwner,
    isBusy,
    isHistoryOpen,
    setIsHistoryOpen,
    newTaskTitle,
    setNewTaskTitle,
    handleSelectCard: async (card: string) => {
      await handleSelectCardAction({
        card,
        activeTask,
        isBusy,
        snapshot,
        isOwner,
        startRound: (taskId) => startRoundMutation.mutateAsync(taskId),
        vote: (payload) => voteMutation.mutateAsync(payload),
      });
    },
    handleReveal: async () => {
      await handleRevealAction({
        snapshot,
        isOwner,
        isBusy,
        revealRound: (roundId) => revealMutation.mutateAsync(roundId),
      });
    },
    handleResetRound: async () => {
      if (!isOwner || isBusy || !snapshot.active_round) {
        return;
      }

      try {
        await resetRoundMutation.mutateAsync(snapshot.active_round.id);
      } catch (error) {
        console.error('Failed to reset round:', error);
      }
    },
    handleNextTask: async () => {
      await handleNextTaskAction({
        snapshot,
        isOwner,
        isBusy,
        finalizeRound: (payload) => finalizeMutation.mutateAsync(payload),
        selectTask: (taskId) => selectTaskMutation.mutateAsync(taskId),
      });
    },
    handleAddTask: async () => {
      const isTaskCreated = await handleAddTaskAction({
        title: newTaskTitle,
        roomId,
        isOwner,
        isBusy,
        createTask: (title) => createTaskMutation.mutateAsync(title),
      });

      if (isTaskCreated) {
        setNewTaskTitle('');
      }
    },
    handleSelectTask: async (taskId: string) => {
      await handleSelectTaskAction({
        taskId,
        snapshot,
        isOwner,
        isBusy,
        selectTask: (id) => selectTaskMutation.mutateAsync(id),
      });
    },
    handleDeleteTask: async (taskId: string) => {
      if (!isOwner || isBusy) {
        return;
      }

      try {
        await deleteTaskMutation.mutateAsync(taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    handleUpdateTask: async (taskId: string, newTitle: string) => {
      if (!isOwner || isBusy) {
        return;
      }

      try {
        await updateTaskMutation.mutateAsync({ taskId, title: newTitle });
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
  };
}