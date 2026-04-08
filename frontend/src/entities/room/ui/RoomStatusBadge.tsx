import { Badge } from '@/shared/ui';
import type { RoomStatus } from '@poker/shared';
import { statusLabels } from '../model/selectors';

const statusColorMap: Record<RoomStatus, 'blue' | 'yellow' | 'green'> = {
  waiting: 'blue',
  voting: 'yellow',
  revealed: 'green',
};

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
  const color = statusColorMap[status];
  const label = statusLabels[status];

  return <Badge label={label} color={color} />;
}
