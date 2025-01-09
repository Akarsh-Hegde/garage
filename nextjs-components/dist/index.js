'use strict';

var React = require('react');

const Button = ({ label, onClick }) => {
    return React.createElement("button", { onClick: onClick }, label);
};

const Card = ({ title, content }) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, title),
        React.createElement("p", null, content)));
};

const WeatherWidget = ({ location, temperature, description, style = {}, // Default to an empty object
iconStyle = {}, // Default to an empty object
contentStyle = {}, // Default to an empty object
 }) => {
    const defaultWidgetStyles = {
        display: "flex",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        gap: "16px",
        backgroundColor: "#4299e1",
        ...style, // Override with user-provided styles
    };
    const defaultIconStyles = {
        fontSize: "24px",
        backgroundColor: "white",
        color: "#4299e1",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...iconStyle, // Override with user-provided icon styles
    };
    const defaultContentStyles = {
        flex: 1,
        ...contentStyle, // Override with user-provided content styles
    };
    const titleStyles = {
        margin: 0,
        fontSize: "18px",
    };
    const temperatureStyles = {
        fontSize: "24px",
        fontWeight: "bold",
        margin: "4px 0",
    };
    const descriptionStyles = {
        margin: 0,
        fontSize: "14px",
        opacity: 0.8,
    };
    return (React.createElement("div", { style: defaultWidgetStyles },
        React.createElement("div", { style: defaultIconStyles }, "\u26C5"),
        React.createElement("div", { style: defaultContentStyles },
            React.createElement("h2", { style: titleStyles }, location),
            React.createElement("p", { style: temperatureStyles },
                temperature,
                "\u00B0C"),
            React.createElement("p", { style: descriptionStyles }, description))));
};

const ListView = () => {
    const [users, setUsers] = React.useState([]);
    const API_URL = 'http://localhost:5000/api/users';
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setUsers(data);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const onAdd = async () => {
        const newUser = {
            name: 'New User',
            email: `newuser${Math.random()}@example.com`,
            role: 'viewer',
            status: 'active',
        };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                fetchUsers();
            }
        }
        catch (error) {
            console.error('Error adding user:', error);
        }
    };
    const onEdit = async (user) => {
        const updatedUser = { ...user, role: 'editor' };
        try {
            const response = await fetch(`${API_URL}/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                fetchUsers();
            }
        }
        catch (error) {
            console.error('Error editing user:', error);
        }
    };
    const onDelete = async (user) => {
        try {
            const response = await fetch(`${API_URL}/${user._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchUsers();
            }
        }
        catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    React.useEffect(() => {
        fetchUsers();
    }, []);
    return (React.createElement("div", { style: styles.container },
        React.createElement("div", { style: styles.header },
            React.createElement("h2", { style: styles.title }, "User Management"),
            React.createElement("button", { style: styles.addButton, onClick: onAdd }, "Add New User")),
        React.createElement("p", { style: styles.subtitle }, "A list of all users in the system."),
        React.createElement("table", { style: styles.table },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { style: styles.th }, "Name"),
                    React.createElement("th", { style: styles.th }, "Role"),
                    React.createElement("th", { style: styles.th }, "Status"),
                    React.createElement("th", { style: styles.th }, "Actions"))),
            React.createElement("tbody", null, users.map((user, index) => (React.createElement("tr", { key: index, style: styles.tr },
                React.createElement("td", { style: styles.td },
                    React.createElement("div", { style: styles.nameContainer },
                        React.createElement("img", { src: "https://via.placeholder.com/40", alt: "User Avatar", style: styles.avatar }),
                        React.createElement("div", null,
                            React.createElement("div", { style: styles.name }, user.name),
                            React.createElement("div", { style: styles.email }, user.email)))),
                React.createElement("td", { style: styles.td }, user.role),
                React.createElement("td", { style: styles.td },
                    React.createElement("span", { style: {
                            ...styles.status,
                            backgroundColor: user.status === 'active' ? '#d1e7dd' : '#f8d7da',
                            color: user.status === 'active' ? '#0f5132' : '#842029',
                        } }, user.status)),
                React.createElement("td", { style: styles.td },
                    React.createElement("button", { style: styles.actionButton, onClick: () => onEdit(user) }, "Edit"),
                    React.createElement("button", { style: {
                            ...styles.actionButton,
                            backgroundColor: '#f8d7da',
                            color: '#842029',
                        }, onClick: () => onDelete(user) }, "Delete")))))))));
};
const styles = {
    container: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 600,
    },
    addButton: {
        backgroundColor: '#0d6efd',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
    },
    subtitle: {
        color: '#6c757d',
        fontSize: '14px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '16px',
    },
    th: {
        textAlign: 'left',
        padding: '8px',
        borderBottom: '2px solid #e0e0e0',
        fontSize: '14px',
        color: '#495057',
    },
    td: {
        padding: '8px',
        borderBottom: '1px solid #e0e0e0',
        fontSize: '14px',
        color: '#495057',
    },
    tr: {
        transition: 'background-color 0.2s',
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '8px',
    },
    name: {
        fontWeight: 600,
    },
    email: {
        fontSize: '12px',
        color: '#6c757d',
    },
    status: {
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-block',
    },
    actionButton: {
        marginRight: '8px',
        padding: '6px 12px',
        fontSize: '12px',
        color: '#fff',
        backgroundColor: '#0d6efd',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

exports.Button = Button;
exports.Card = Card;
exports.ListView = ListView;
exports.WeatherWidget = WeatherWidget;
