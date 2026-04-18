/**
 * Страница «О приложении».
 *
 * Информация о Poker.Planning приложении.
 */
import { Card, PageShell } from '@/shared/ui';

export function AboutPage() {
  return (
    <PageShell maxWidth="md" className="min-h-[calc(100vh-8.5rem)]">
      <section className="space-y-6 py-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">О приложении</h1>
          <p className="mt-2 text-muted-foreground">Poker.Planning — инструмент для командного планирования</p>
        </div>

        <Card className="border border-border/70 bg-card/90 p-6 shadow-lg backdrop-blur">
          <h2 className="text-lg font-semibold text-foreground">Что это?</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Poker.Planning помогает командам оценивать сложность задач используя Planning Poker — метод голосования,
            при котором каждый участник голосует за сложность задачи независимо. Это помогает выявить разногласия и
            провести обсуждение.
          </p>
        </Card>

        <Card className="border border-border/70 bg-card/90 p-6 shadow-lg backdrop-blur">
          <h2 className="text-lg font-semibold text-foreground">Как начать?</h2>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>1. Создайте новую комнату и пригласите участников</p>
            <p>2. Добавьте задачи для оценки</p>
            <p>3. Каждый участник голосует за сложность</p>
            <p>4. Обсудите результаты и двигайтесь дальше</p>
          </div>
        </Card>

      </section>
    </PageShell>
  );
}
