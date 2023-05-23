import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';

export default function App() {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
        >
            <Layout>
                <Routes>
                    <Route
                        index
                        element={<Home />}
                    />
                </Routes>
            </Layout>
        </MantineProvider>
    );
}
