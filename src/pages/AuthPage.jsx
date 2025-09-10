import { Paper, Typography } from '@mui/material';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Verification from '../components/auth/Verification';

export default function AuthPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('login');
  const [pendingEmail, setPendingEmail] = useState('');
  const [hidden, setHidden] = useState('hidden')
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Paper className="w-full max-w-md p-6 space-y-4">
        <Typography variant="h5" fontWeight={600} className="text-gray-800 dark:text-gray-100">
          {mode === 'login' ? t('login') : mode === 'register' ? t('register') : t('Verification')}
        </Typography>

        {mode === 'login' && (
          <>
            <Login t={t} />
            <button className="text-sm hover:underline cursor-pointer" onClick={()=>setMode('register')}>{t('needAccount')}</button>
          </>
        )}

        {mode === 'register' && (
          <>
            <Register t={t} onGoVerify={(email)=>{ setPendingEmail(email); setMode('verify'); }} />
            <button className="text-sm hover:underline cursor-pointer" onClick={()=>setMode('login')}>{t('haveAccount')}</button>
          </>
        )}

        {mode === 'verify' && (
          <>
            <Verification t={t} email={pendingEmail} onVerified={()=>setMode('login')} />
            <button className="text-sm underline" onClick={()=>setMode('login')}>{t('Back to login')}</button>
          </>
        )}

        <div className="relative text-center h-[40px] flex flex-col justify-between gap-5">
          <div className="inset-x-0 border-t dark:border-gray-700" />
          <span className="text-md text-gray-500">{t('or')}</span>
        </div>

        <GoogleLoginButton />
      </Paper>
    </div>
  );
}
