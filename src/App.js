import React, { useState, useEffect } from 'react';
import './App.css';

const initialData = [
    { name: "Juan", age: 25 },
    { name: "María", age: 30 }
];

function App() {
    const [users, setUsers] = useState(initialData);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        // Aquí podrías cargar datos desde un archivo JSON o API
        // Simularemos esto con initialData
        setUsers(initialData);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editIndex !== null) {
            // Actualizar usuario
            const updatedUsers = [...users];
            updatedUsers[editIndex] = { name, age };
            setUsers(updatedUsers);
            setEditIndex(null);
        } else {
            // Agregar nuevo usuario
            setUsers([...users, { name, age }]);
        }
        setName('');
        setAge('');
    };

    const handleEdit = (index) => {
        setName(users[index].name);
        setAge(users[index].age);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    return (
        <div className="App">
            <h1>Ejemplo CRUD con React</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Edad"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <button type="submit">{editIndex !== null ? 'Actualizar' : 'Agregar'}</button>
            </form>

            <h2>Lista de Usuarios</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name} - {user.age} años
                        <button onClick={() => handleEdit(index)}>Editar</button>
                        <button onClick={() => handleDelete(index)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;