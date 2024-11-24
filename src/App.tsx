import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@components/Layout';
import { StoreProvider } from '@components/StoreProvider';
import { CelebPage } from '@pages/CelebPage';
import { HomePage } from '@pages/HomePage';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/celebs/:id" element={<CelebPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </StoreProvider>
    </QueryClientProvider>
  );
};
