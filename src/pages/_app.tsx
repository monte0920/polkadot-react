import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import dynamic from 'next/dynamic';

import dark from 'theme/dark';
import createEmotionCache from '../utils/createEmotionCache';
import { PolkadotProvider } from 'contexts/Polkadot';

import 'assets/styles/index.css';

const clientSideEmotionCache = createEmotionCache();

const Header = dynamic(() => import('components/Header'), { ssr: false });

const MyApp = (props: any) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <PolkadotProvider>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={dark}>
                    <CssBaseline />
                    <Header />
                </ThemeProvider>
            </CacheProvider>
        </PolkadotProvider>
    );
};

export default MyApp;
