import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useActionData, useNavigation, useSubmit } from 'react-router-dom';
import { Button, Input } from '@/shared/ui';
import { LoginSchema, RegisterSchema } from '../../../model/schemas';
import { PasswordInput } from '../../PasswordInput';

interface AuthFormProps {
  mode: 'login' | 'register';
}

type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

const loginDefaults = {
  email: '',
  password: '',
};

const registerDefaults = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

export function AuthForm({ mode }: AuthFormProps) {
  const navigation = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData() as { error?: string } | undefined;

  const schema = useMemo(() => (mode === 'login' ? LoginSchema : RegisterSchema), [mode]);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: mode === 'login' ? loginDefaults : registerDefaults,
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const isRegister = mode === 'register';
  const isSubmitting = navigation.state === 'submitting';

  const onSubmit = (data: AuthFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    submit(formData, { method: 'post' });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        autoComplete="off"
        placeholder="you@example.com"
        error={form.formState.errors.email?.message}
        disabled={isSubmitting}
        {...form.register('email')}
      />

      {isRegister && (
        <Input
          label="Имя пользователя"
          type="text"
          autoComplete="off"
          placeholder="Иван Петров"
          error={form.formState.errors.name?.message}
          disabled={isSubmitting}
          {...form.register('name')}
        />
      )}

      <PasswordInput
        label="Пароль"
        autoComplete="off"
        placeholder="••••••••"
        error={form.formState.errors.password?.message}
        disabled={isSubmitting}
        showRequirements={isRegister}
        {...form.register('password')}
      />

      {isRegister && (
        <PasswordInput
          label="Подтверждение пароля"
          autoComplete="off"
          placeholder="••••••••"
          error={form.formState.errors.confirmPassword?.message}
          disabled={isSubmitting}
          showRequirements={false}
          {...form.register('confirmPassword')}
        />
      )}

      {actionData?.error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {mode === 'login' ? 'Неверный логин или пароль' : actionData.error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
        <Link
          to={isRegister ? '/login' : '/register'}
          className="font-medium text-primary hover:text-primary/80"
        >
          {isRegister ? 'Войти' : 'Зарегистрироваться'}
        </Link>
      </p>
    </form>
  );
}
