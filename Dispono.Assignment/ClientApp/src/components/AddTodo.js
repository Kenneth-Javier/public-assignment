import React, { useState } from 'react';
import {
    Text,
    Group,
    Button,
    TextInput,
} from '@mantine/core';

export default function AddTodo({ addTodo }) {
    const [adding, setAdding] = useState(false);
    const [description, setDescription] = useState('');

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const add = async () => {
        setAdding(true);

        try {
            const result = await fetch('/api/todos', {
                method: 'POST',
                body: JSON.stringify({ description }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (result.ok) {
                const todo = await result.json();

                addTodo(todo);
                setError(false);
                setErrorMessage('');
                setDescription('');
            } else {
                // TODO
                // Hämta ut felmeddelandena från varje fält som innehåller fel
                // I det här fallet så är det bara ett fält som kan innehålla fel
                // men gör det generiskt så att om det skulle vara fler fält som innehöll
                // fel så skulle de också visas. Ta alla fel och slå ihop till en sträng
                // med separator ", "
                // Ledning: använd Object.keys(details.errors) för att ta fram alla keys med fel
                // Vi vet också att det är JSON som returneras så titta på if (result.ok)-blocket
                // för att se hur vi gjort
                const message = '';

                setError(true);
                setErrorMessage(message);
            }
        } catch (_) {
            setError(true);
            setErrorMessage('Ett oväntat fel uppstod');
        } finally {
            setAdding(false);
        }
    };

    return (
        <>
            <TextInput
                mb="md"
                disabled={adding}
                placeholder="Beskrivning"
                value={description}
                error={error ? <Text color="red" mb="md" size="xs">{errorMessage}</Text> : null}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Group position="apart">
                <Button
                    variant="light"
                    onClick={add}
                    disabled={adding}
                    loading={adding}
                >
                    Lägg till
                </Button>
                <Button
                    color="gray"
                    variant="outline"
                    disabled={adding}
                    onClick={() => setDescription('')}
                >
                    Rensa
                </Button>
            </Group>
        </>
    );
}
