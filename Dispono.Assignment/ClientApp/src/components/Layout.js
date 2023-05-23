import React from 'react';
import { AppShell, Container } from '@mantine/core';

export default function Layout({ children }) {
    return (
        <AppShell padding="md">
            <Container size="xs" p={0}>
                {children}
            </Container>
        </AppShell>
    );
}
