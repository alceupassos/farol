import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../index.css';

// Import your global styles here if needed
// import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Set the HTML lang attribute based on the current locale
  useEffect(() => {
    document.documentElement.lang = router.locale || 'pt';
  }, [router.locale]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
