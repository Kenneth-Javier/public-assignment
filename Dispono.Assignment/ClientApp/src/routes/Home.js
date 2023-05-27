import React, { useEffect, useState } from 'react';
import { Text, Title, Divider } from '@mantine/core';
import Todo from '../components/Todo';
import AddTodo from '../components/AddTodo';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [todos, setTodos] = useState(null);

    const addTodo = (todo) => {
        setTodos((previousTodos) => ([todo, ...previousTodos]));
    };

    const editTodo = (todo) => {
        setTodos((previousTodos) => ([todo, ...previousTodos.filter((t) => t.id !== todo.id)]));
    };

    const removeTodo = (todoId) => {
        setTodos((previousTodos) => previousTodos.filter((t) => t.id !== todoId));
    };

    useEffect(() => {
        async function getTodos() {
            try {
                const result = await fetch('/api/todos');
                if (result.ok) {
                    const data = await result.json();

                    setTodos(data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (_) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getTodos();
    }, []);

    // TODO
    // Sortera alla todo's efter id, det vill säga så att den med störst id alltid hamnar
    // först i listan. Ha i åtanke att initialState är null

    if (todos !== null) {
        const sortedTodos = todos.sort((a, b) => b.id - a.id);
    }

    return (
        <>
            <Title mb="md">Att göra</Title>
            <AddTodo addTodo={addTodo} />
            <Divider my="md" />
            {todos !== null && !loading && !error && (
                <>
                    {todos.length === 0 && (
                        <Text>Du har inga sparade uppgifter</Text>
                    )}
                    {todos.length > 0 && sortedTodos.map((todo) => (
                        <Todo
                            key={`todo-${todo.id}`}
                            id={todo.id}
                            editTodo={editTodo}
                            removeTodo={removeTodo}
                            createdAt={todo.createdAt}
                            completedAt={todo.completedAt}
                            description={todo.description}
                        />
                    ))}
                </>
            )}
            {loading && (
                <Text>Hämtar sparade uppgifter ...</Text>
            )}
            {error && (
                <Text color="red">Gick inte att hämta uppgifter</Text>
            )}
        </>
    );
}
