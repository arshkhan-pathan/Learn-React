import React from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Sample API for user data

export class ClassBasedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            error: null,
            filterText: '',
            filteredUsers: [],
            newUser: { name: '', email: '' },
            timer: 0
        };

        this.timerID = null; // Timer ID for setInterval
        console.log('Constructor: Component Initialized');
    }

    // Fetch users when the component mounts
    componentDidMount() {
        console.log('Component Did Mount: Fetching Data');
        this.fetchUsers();

        // Start a timer to simulate some periodic updates (e.g., polling)
        this.timerID = setInterval(() => {
            this.setState((prevState) => ({ timer: prevState.timer + 1 }));
            console.log('Timer Updated:', this.state.timer);
        }, 1000);
    }

    // Called when the component is about to be removed from the DOM
    componentWillUnmount() {
        console.log('Component Will Unmount: Cleaning Up');
        clearInterval(this.timerID); // Clean up the timer
    }

    // Control if the component should update based on specific conditions
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Should Component Update?', nextState);

        // Prevent unnecessary updates if only the timer is updated
        if (this.state.timer !== nextState.timer) {
            return false; // Skip re-render for timer updates
        }

        return true; // Allow other state updates to re-render the component
    }

    // Called after an update occurs, e.g., state/props change
    componentDidUpdate(prevProps, prevState) {
        console.log('Component Did Update', prevProps, prevState);

        // Re-filter users if the filterText state has changed
        if (prevState.filterText !== this.state.filterText) {
            this.filterUsers();
        }
    }

    // Simulate API call to fetch users
    fetchUsers = async () => {
        try {
            this.setState({ loading: true });
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            this.setState({ users: data, filteredUsers: data, loading: false });
        } catch (err) {
            this.setState({ error: err.message, loading: false });
        }
    };

    // Filter users based on filterText
    filterUsers = () => {
        const { users, filterText } = this.state;
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(filterText.toLowerCase())
        );
        this.setState({ filteredUsers });
    };

    // Handle filter input change
    handleFilterChange = (e) => {
        this.setState({ filterText: e.target.value });
    };

    // Handle input changes for adding a new user
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ newUser: { ...this.state.newUser, [name]: value } });
    };

    // Simulate adding a new user to the list
    handleAddUser = (e) => {
        e.preventDefault();
        const { newUser, users } = this.state;
        if (newUser.name && newUser.email) {
            const updatedUsers = [...users, { id: users.length + 1, ...newUser }];
            this.setState({ users: updatedUsers, newUser: { name: '', email: '' }, filteredUsers: updatedUsers });
        }
    };

    render() {
        const { loading, error, filteredUsers, newUser, filterText, timer } = this.state;

        return (
            <div>
                <h1>Class based List Component</h1>
                {loading && <p>Loading data...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <p>Component Timer: {timer}</p>

                <div>
                    <input
                        type="text"
                        placeholder="Filter users by name"
                        value={filterText}
                        onChange={this.handleFilterChange}
                    />
                </div>

                <ul>
                    {filteredUsers.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                        </li>
                    ))}
                </ul>

                <hr />

                <h2>Add New User</h2>
                <form onSubmit={this.handleAddUser}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={this.handleInputChange}
                        required
                    />
                    <button type="submit">Add User</button>
                </form>
            </div>
        );
    }
}

export default ClassBasedComponent;
