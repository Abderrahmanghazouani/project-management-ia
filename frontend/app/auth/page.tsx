'use client';
import { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const toggle = () => setMode(m => m === 'login' ? 'register' : 'login');

  return (
    <AuthLayout mode={mode} onToggle={toggle}>
      {mode === 'login' ? <LoginForm /> : <RegisterForm />}
    </AuthLayout>
  );
}