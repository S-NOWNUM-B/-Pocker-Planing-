/**
 * Компактный спиннер для использования внутри кнопок и inline элементов.
 *
 * Является alias для Spinner и сохранён для обратной совместимости.
 * Подходит для встраивания в Button, текст и другие компоненты.
 *
 * @param className — дополнительные CSS-классы
 */
import { Spinner } from '../Spinner/Spinner';

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className = 'h-4 w-4' }: LoadingSpinnerProps) {
  return <Spinner className={className} />;
}
