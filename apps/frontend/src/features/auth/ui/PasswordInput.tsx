/**
 * PasswordInput — поле для ввода пароля с требованиями.
 *
 * Показывает требования к паролю в реальном времени:
 *  ✓ Минимум 8 символов
 *  ✓ Содержит буквы
 *  ✓ Содержит цифры
 *  ✓ Содержит спец символы (!@#$%^&*)
 *
 * Требования отмечаются зелёным (✓) когда выполнены,
 * или красным (✗) когда не выполнены.
 */
import { Input, type InputProps } from '@/shared/ui/Input';
import { useState } from 'react';

interface PasswordRequirement {
  name: string;
  regex: RegExp;
  met: boolean;
}

interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showRequirements?: boolean;
  value?: string;
}

export function PasswordInput({
  showRequirements = true,
  value = '',
  ...props
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const requirements: PasswordRequirement[] = [
    { name: 'Минимум 8 символов', regex: /.{8,}/, met: value.length >= 8 },
    { name: 'Содержит буквы', regex: /[a-zA-Z]/, met: /[a-zA-Z]/.test(value) },
    { name: 'Содержит цифры', regex: /\d/, met: /\d/.test(value) },
    { name: 'Спец символы (!@#$%^&*)', regex: /[!@#$%^&*]/, met: /[!@#$%^&*]/.test(value) },
  ];

  const allMet = requirements.every((req) => req.met);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="password"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {showRequirements && isFocused && (
        <div className="rounded-lg border border-muted-foreground/20 bg-card p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Требования к паролю:</p>
          <ul className="space-y-1">
            {requirements.map((req) => (
              <li key={req.name} className="flex items-center gap-2 text-xs">
                <span className={req.met ? 'text-green-500' : 'text-destructive'}>
                  {req.met ? '✓' : '✗'}
                </span>
                <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                  {req.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showRequirements && value && !allMet && (
        <p className="text-xs text-destructive">Пароль не соответствует требованиям</p>
      )}
    </div>
  );
}
