import React, { useState } from 'react';
import {
    Text,
    Card,
    Group,
    Checkbox,
    ActionIcon,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { truncate } from '../utils/strings';

export default function Todo({
    id,
    description,
    // TODO ta bort denna när parametern används igen
    createdAt,
    completedAt,
    // TODO ta bort denna när parametern används igen
    editTodo,
    removeTodo,
}) {
    const [mutating, setMutating] = useState(false);

    const remove = async () => {
        setMutating(true);

        try {
            const result = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
            if (result.ok) {
                removeTodo(id);
            }
        } finally {
            setMutating(false);
        }
    };

    const toggle = async () => {
        setMutating(true);

        try {
            // TODO
            // Använd fetch för att göra en PATCH-request till /api/todos/{id}/toggle
            // Om resultatet returnerar ett OK skicka det uppdaterade statet av todo'n
            // till editTodo. Ta inspiration från funktionen "remove" ovan

            const result = await fetch(`/api/todos/${id}/toggle`, { method: 'PATCH' });
            if (result.ok) {
                editTodo({
                    id,
                    description,
                    createdAt,
                    completedAt: completedAt === null ? new Date() : null,
                });
            }
        } finally {
            setMutating(false);
        }
    };

    return (
        <Card
            mb="sm"
            radius="md"
            shadow="sm"
            padding="sm"
        >
            <Group position="apart" mb="xs">
                <Group>
                    <Checkbox
                        readOnly
                        checked={completedAt !== null}
                        disabled={mutating}
                        indeterminate={mutating}
                        onClick={toggle}
                    />
                    <Text>{truncate(description, 30)}</Text>
                </Group>
                <ActionIcon
                    disabled={mutating}
                    onClick={remove}
                >
                    <IconX size={14} />
                </ActionIcon>
            </Group>
            <Text
                size="xs"
                color="dimmed"
            >
                TODO
                {
                    // Gör en sträng-interpolering som här visar ett meddelande
                    // som skulle se ut ungefär så här
                    // Skapad 2023-05-23 10:54:19. Avklarades 2023-05-23 10:54:21
                    // Där parametrarna skulle vara createdAt och completedAt
                    // Ha i åtanke att completedAt kan vara antingen en
                    // DateTime eller null

                    `Skapad ${createdAt.toLocaleString()}. Avklarades ${completedAt === null ? 'Ej Avklarad' : completedAt.toLocaleString()}`
                }
            </Text>
        </Card>
    );
}
