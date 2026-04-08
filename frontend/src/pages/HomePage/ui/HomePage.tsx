import { Card } from '@/shared/ui';
import { CreateRoomForm } from '@/features/create-room';
import { JoinRoomForm } from '@/features/join-room';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-800px] mx-auto p-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Planning Poker</h1>
          <p className="text-lg text-gray-500">Estimate your tasks efficiently with your team</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Create New Room</h2>
            <CreateRoomForm />
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Join Existing Room</h2>
            <JoinRoomForm />
          </Card>
        </div>
      </main>
    </div>
  );
}
