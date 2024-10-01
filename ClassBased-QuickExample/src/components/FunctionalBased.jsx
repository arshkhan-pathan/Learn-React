import React, {useState, useEffect} from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Sample API for user data

const FunctionalComponent = () => {
    // State for storing API data, loading state, error, and form inputs
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({name: '', email: ''});

    // Fetching users data when the component mounts (side effect)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false); // Turn off loading state after data is fetched
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers(); // Fetch users when the component mounts
    }, []);

    // Handler for form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewUser({...newUser, [name]: value});
    };

    // Handler for adding a new user to the list
    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email) {
            // Simulate adding the new user
            const updatedUsers = [...users, {id: users.length + 1, ...newUser}];
            setUsers(updatedUsers); // Update the state with the new user
            setNewUser({name: '', email: ''}); // Reset the form
        }
    };

    // Conditional rendering for loading, error, and the list of users
    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Functional Based User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>

            <hr/>

            <h2>Add a New User</h2>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default FunctionalComponent;
