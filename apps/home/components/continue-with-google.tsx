import { Button } from '@/components/button'
import LogoGoogle from '@/icons/logo-google.svg'

import { useTranslation } from 'next-i18next'
import { useEffect } from 'react';

declare global {
  interface Window {
    gapi: any;
  }
}

const ContinueWithGoogle = () => {
  const { t } = useTranslation('common')

  useEffect(() => {
    const loadGoogleSignInScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '930736154470-u2d8i2m2porafajd1lldajq0ih7jor39.apps.googleusercontent.com',
        });
      });
    };

    loadGoogleSignInScript();
  }, []);

  const handleSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  return (
    <Button
      className="w-full flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-600"
      variant="outline"
      size="lg"
      onClick={handleSignIn}
    >
      <LogoGoogle className="w-6 h-6" />
      <span className="text-sm font-medium">
        {t('components.continueWithGoogle.text')}
      </span>
    </Button>
  )
}

export default ContinueWithGoogle