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

const EditUserModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = React.useState(user);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
    };
    return (React.createElement("div", { style: styles$2.modal },
        React.createElement("div", { style: styles$2.modalContent },
            React.createElement("h2", null, "Edit User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "name" }, "Name:"),
                    React.createElement("input", { type: "text", id: "name", name: "name", value: editedUser.name, onChange: handleChange, required: true })),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "email" }, "Email:"),
                    React.createElement("input", { type: "email", id: "email", name: "email", value: editedUser.email, onChange: handleChange, required: true })),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "role" }, "Role:"),
                    React.createElement("select", { id: "role", name: "role", value: editedUser.role, onChange: handleChange, required: true },
                        React.createElement("option", { value: "viewer" }, "Viewer"),
                        React.createElement("option", { value: "editor" }, "Editor"),
                        React.createElement("option", { value: "admin" }, "Admin"))),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "status" }, "Status:"),
                    React.createElement("select", { id: "status", name: "status", value: editedUser.status, onChange: handleChange, required: true },
                        React.createElement("option", { value: "active" }, "Active"),
                        React.createElement("option", { value: "inactive" }, "Inactive"))),
                React.createElement("div", { style: styles$2.buttonGroup },
                    React.createElement("button", { type: "submit", style: styles$2.saveButton }, "Save"),
                    React.createElement("button", { type: "button", onClick: onClose, style: styles$2.cancelButton }, "Cancel"))))));
};
const styles$2 = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    saveButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

const NewUserModal = ({ onClose, onSave }) => {
    const [newUser, setNewUser] = React.useState({
        name: '',
        email: '',
        role: 'viewer',
        status: 'active',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newUser);
    };
    return (React.createElement("div", { style: styles$1.modal },
        React.createElement("div", { style: styles$1.modalContent },
            React.createElement("h2", null, "Add New User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "name" }, "Name:"),
                    React.createElement("input", { type: "text", id: "name", name: "name", value: newUser.name, onChange: handleChange, required: true })),
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "email" }, "Email:"),
                    React.createElement("input", { type: "email", id: "email", name: "email", value: newUser.email, onChange: handleChange, required: true })),
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "role" }, "Role:"),
                    React.createElement("select", { id: "role", name: "role", value: newUser.role, onChange: handleChange, required: true },
                        React.createElement("option", { value: "viewer" }, "Viewer"),
                        React.createElement("option", { value: "editor" }, "Editor"),
                        React.createElement("option", { value: "admin" }, "Admin"))),
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "status" }, "Status:"),
                    React.createElement("select", { id: "status", name: "status", value: newUser.status, onChange: handleChange, required: true },
                        React.createElement("option", { value: "active" }, "Active"),
                        React.createElement("option", { value: "inactive" }, "Inactive"))),
                React.createElement("div", { style: styles$1.buttonGroup },
                    React.createElement("button", { type: "submit", style: styles$1.saveButton }, "Add User"),
                    React.createElement("button", { type: "button", onClick: onClose, style: styles$1.cancelButton }, "Cancel"))))));
};
const styles$1 = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    saveButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

const ListView = () => {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [editingUser, setEditingUser] = React.useState(null);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false);
    const API_URL = 'http://localhost:5000/api/users';
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setError(null); // Clear any previous errors
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }
            const data = await response.json();
            setUsers(data || []); // Ensure data is always an array
        }
        catch (err) {
            setError(err.message || 'An error occurred while fetching users.');
            console.error('Error fetching users:', err);
        }
        finally {
            setIsLoading(false);
        }
    };
    const onAdd = () => {
        setIsNewUserModalOpen(true);
    };
    const onEdit = (user) => {
        setEditingUser(user);
    };
    const onDelete = async (user) => {
        try {
            const response = await fetch(`${API_URL}/${user._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchUsers();
            }
            else {
                throw new Error(`Error deleting user: ${response.statusText}`);
            }
        }
        catch (err) {
            setError(err.message || 'An error occurred while deleting the user.');
            console.error('Error deleting user:', err);
        }
    };
    const onToggleStatus = async (user) => {
        const updatedUser = { ...user, status: user.status === 'active' ? 'inactive' : 'active' };
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
            else {
                throw new Error(`Error updating user status: ${response.statusText}`);
            }
        }
        catch (err) {
            setError(err.message || 'An error occurred while updating the user status.');
            console.error('Error updating user status:', err);
        }
    };
    const handleEditUser = async (updatedUser) => {
        try {
            const response = await fetch(`${API_URL}/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                fetchUsers();
                setEditingUser(null);
            }
            else {
                throw new Error(`Error editing user: ${response.statusText}`);
            }
        }
        catch (err) {
            setError(err.message || 'An error occurred while editing the user.');
            console.error('Error editing user:', err);
        }
    };
    const handleAddUser = async (newUser) => {
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
                setIsNewUserModalOpen(false);
            }
            else {
                throw new Error(`Error adding user: ${response.statusText}`);
            }
        }
        catch (err) {
            setError(err.message || 'An error occurred while adding the user.');
            console.error('Error adding user:', err);
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
        isLoading ? (React.createElement("div", null, "Loading...")) : error ? (React.createElement("div", { style: { color: 'red' } },
            "Error: ",
            error)) : users.length > 0 ? (React.createElement("table", { style: styles.table },
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
                    React.createElement("button", { onClick: () => onToggleStatus(user), style: {
                            ...styles.status,
                            backgroundColor: user.status === 'active' ? '#d1e7dd' : '#f8d7da',
                            color: user.status === 'active' ? '#0f5132' : '#842029',
                            cursor: 'pointer',
                            border: 'none',
                        } }, user.status)),
                React.createElement("td", { style: styles.td },
                    React.createElement("button", { style: styles.actionButton, onClick: () => onEdit(user) }, "Edit"),
                    React.createElement("button", { style: {
                            ...styles.actionButton,
                            backgroundColor: '#f8d7da',
                            color: '#842029',
                        }, onClick: () => onDelete(user) }, "Delete")))))))) : (React.createElement("div", null, "No users available.")),
        editingUser && (React.createElement(EditUserModal, { user: editingUser, onClose: () => setEditingUser(null), onSave: handleEditUser })),
        isNewUserModalOpen && (React.createElement(NewUserModal, { onClose: () => setIsNewUserModalOpen(false), onSave: handleAddUser }))));
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
