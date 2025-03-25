import React, { Suspense } from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import './i18n';
import { HelmetProvider } from 'react-helmet-async';
import { AnimationWrapper } from './components/animation-wrapper/AnimationWrapper';

const queryClient = new QueryClient();

function App() {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <BrowserRouter>
                        <AnimationWrapper>
                            <AppRouter />
                        </AnimationWrapper>
                    </BrowserRouter>
                </Provider>
            </QueryClientProvider>
        </HelmetProvider>
    );
}

export default App;
