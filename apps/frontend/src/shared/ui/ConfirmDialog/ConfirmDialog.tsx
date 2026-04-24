/**
 * Модальное окно подтверждения действия.
 *
 * Используется для критичных операций (удаление, сброс и т.д.).
 * Построено на базе компонента Modal.
 *
 * @param isOpen — открыто ли окно
 * @param onClose — обработчик закрытия
 * @param onConfirm — обработчик подтверждения
 * @param title — заголовок окна
 * @param message — текст сообщения
 * @param confirmText — текст кнопки подтверждения (по умолчанию "Подтвердить")
 * @param cancelText — текст кнопки отмены (по умолчанию "Отмена")
 * @param variant — вариант кнопки подтверждения (по умолчанию "destructive")
 */
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  variant = 'danger',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="mt-6 flex gap-3 justify-end">
        <Button type="button" variant="ghost" onClick={onClose}>
          {cancelText}
        </Button>
        <Button type="button" variant={variant} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
