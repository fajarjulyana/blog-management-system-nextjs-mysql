// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Run Bootstrap's JavaScript functionality
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
