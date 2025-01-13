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

const theme = {
    colors: {
        primary: '#50b8d5',
        secondary: '#6B7280',
        success: '#1A1A1A',
        danger: '#EF4444',
        warning: '#ffc107',
        info: '#FFFFFF',
        light: '#F3F4F6',
        dark: '#111827',
        white: '#FFFFFF',
        background: '#FFFFFF', // White background
    },
    fonts: {
        body: 'Inter, sans-serif',
        heading: 'Poppins, sans-serif',
    },
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
            React.createElement("h2", { style: styles$2.title }, "Edit User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "name", style: styles$2.label }, "Name:"),
                    React.createElement("input", { type: "text", id: "name", name: "name", value: editedUser.name, onChange: handleChange, required: true, style: styles$2.input })),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "email", style: styles$2.label }, "Email:"),
                    React.createElement("input", { type: "email", id: "email", name: "email", value: editedUser.email, onChange: handleChange, required: true, style: styles$2.input })),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "role", style: styles$2.label }, "Role:"),
                    React.createElement("select", { id: "role", name: "role", value: editedUser.role, onChange: handleChange, required: true, style: styles$2.select },
                        React.createElement("option", { value: "viewer" }, "Viewer"),
                        React.createElement("option", { value: "editor" }, "Editor"),
                        React.createElement("option", { value: "admin" }, "Admin"))),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "status", style: styles$2.label }, "Status:"),
                    React.createElement("select", { id: "status", name: "status", value: editedUser.status, onChange: handleChange, required: true, style: styles$2.select },
                        React.createElement("option", { value: "active" }, "Active"),
                        React.createElement("option", { value: "inactive" }, "Inactive"))),
                React.createElement("div", { style: styles$2.buttonGroup },
                    React.createElement("button", { type: "submit", style: styles$2.saveButton }, "Save Changes"),
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
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        padding: '24px',
        borderRadius: theme.borderRadius,
        width: '400px',
        maxWidth: '90%',
        boxShadow: theme.boxShadow,
    },
    title: {
        fontFamily: theme.fonts.heading,
        fontSize: '20px',
        fontWeight: 600,
        color: theme.colors.dark,
        marginBottom: '16px',
    },
    formGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        marginBottom: '4px',
        fontSize: '14px',
        fontWeight: 600,
        color: theme.colors.dark,
    },
    input: {
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.white,
    },
    select: {
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.white,
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '24px',
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: 'none',
        borderRadius: theme.borderRadius,
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: theme.colors.light,
        color: theme.colors.dark,
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 600,
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
            React.createElement("h2", { style: styles$1.title }, "Add New User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "name", style: styles$1.label }, "Name:"),
                    React.createElement("input", { type: "text", id: "name", name: "name", value: newUser.name, onChange: handleChange, required: true, style: styles$1.input })),
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "email", style: styles$1.label }, "Email:"),
                    React.createElement("input", { type: "email", id: "email", name: "email", value: newUser.email, onChange: handleChange, required: true, style: styles$1.input })),
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "role", style: styles$1.label }, "Role:"),
                    React.createElement("select", { id: "role", name: "role", value: newUser.role, onChange: handleChange, required: true, style: styles$1.select },
                        React.createElement("option", { value: "viewer" }, "Viewer"),
                        React.createElement("option", { value: "editor" }, "Editor"),
                        React.createElement("option", { value: "admin" }, "Admin"))),
                React.createElement("div", { style: styles$1.formGroup },
                    React.createElement("label", { htmlFor: "status", style: styles$1.label }, "Status:"),
                    React.createElement("select", { id: "status", name: "status", value: newUser.status, onChange: handleChange, required: true, style: styles$1.select },
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
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        padding: '24px',
        borderRadius: theme.borderRadius,
        width: '400px',
        maxWidth: '90%',
        boxShadow: theme.boxShadow,
    },
    title: {
        fontFamily: theme.fonts.heading,
        fontSize: '20px',
        fontWeight: 600,
        color: theme.colors.dark,
        marginBottom: '16px',
    },
    formGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        marginBottom: '4px',
        fontSize: '14px',
        fontWeight: 600,
        color: theme.colors.dark,
    },
    input: {
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.white,
    },
    select: {
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.white,
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '24px',
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: 'none',
        borderRadius: theme.borderRadius,
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: theme.colors.light,
        color: theme.colors.dark,
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 600,
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
        isLoading ? (React.createElement("div", { style: styles.loading }, "Loading...")) : error ? (React.createElement("div", { style: styles.error },
            "Error: ",
            error)) : users.length > 0 ? (React.createElement("table", { style: styles.table },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { style: styles.th }, "Name"),
                    React.createElement("th", { style: styles.th }, "Role"),
                    React.createElement("th", { style: styles.th }, "Status"),
                    React.createElement("th", { style: styles.th }, "Actions"))),
            React.createElement("tbody", null, users.map((user) => (React.createElement("tr", { key: user._id, style: styles.tr },
                React.createElement("td", { style: styles.td },
                    React.createElement("div", { style: styles.nameContainer },
                        React.createElement("img", { src: `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`, alt: "User Avatar", style: styles.avatar }),
                        React.createElement("div", null,
                            React.createElement("div", { style: styles.name }, user.name),
                            React.createElement("div", { style: styles.email }, user.email)))),
                React.createElement("td", { style: styles.td }, user.role),
                React.createElement("td", { style: styles.td },
                    React.createElement("button", { onClick: () => onToggleStatus(user), style: {
                            ...styles.status,
                            backgroundColor: user.status === 'active' ? theme.colors.success : theme.colors.danger,
                            color: theme.colors.white,
                        } }, user.status)),
                React.createElement("td", { style: styles.td },
                    React.createElement("button", { style: styles.editButton, onClick: () => onEdit(user) }, "Edit"),
                    React.createElement("button", { style: styles.deleteButton, onClick: () => onDelete(user) }, "Delete")))))))) : (React.createElement("div", { style: styles.noUsers }, "No users available.")),
        editingUser && (React.createElement(EditUserModal, { user: editingUser, onClose: () => setEditingUser(null), onSave: handleEditUser })),
        isNewUserModalOpen && (React.createElement(NewUserModal, { onClose: () => setIsNewUserModalOpen(false), onSave: handleAddUser }))));
};
const styles = {
    container: {
        fontFamily: theme.fonts.body,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius,
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: theme.boxShadow,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    title: {
        fontFamily: theme.fonts.heading,
        fontSize: '24px',
        fontWeight: 600,
        color: theme.colors.dark,
        margin: 0,
    },
    addButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: 'none',
        borderRadius: theme.borderRadius,
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    subtitle: {
        color: theme.colors.secondary,
        fontSize: '14px',
        marginBottom: '24px',
    },
    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
    },
    th: {
        textAlign: 'left',
        padding: '16px',
        backgroundColor: theme.colors.light,
        color: theme.colors.secondary,
        fontWeight: 600,
        fontSize: '14px',
        textTransform: 'uppercase',
    },
    tr: {
        backgroundColor: theme.colors.white,
        transition: 'box-shadow 0.2s',
    },
    td: {
        padding: '16px',
        borderTop: `1px solid ${theme.colors.light}`,
        borderBottom: `1px solid ${theme.colors.light}`,
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '12px',
    },
    name: {
        fontWeight: 600,
        color: theme.colors.dark,
    },
    email: {
        fontSize: '12px',
        color: theme.colors.secondary,
    },
    status: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize',
        cursor: 'pointer',
        border: 'none',
    },
    editButton: {
        backgroundColor: theme.colors.white,
        color: theme.colors.dark,
        border: `1px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius,
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        marginRight: '8px',
    },
    deleteButton: {
        backgroundColor: theme.colors.danger,
        color: theme.colors.white,
        border: 'none',
        borderRadius: theme.borderRadius,
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        fontSize: '16px',
        color: theme.colors.secondary,
        padding: '40px',
    },
    error: {
        textAlign: 'center',
        fontSize: '16px',
        color: theme.colors.danger,
        padding: '40px',
    },
    noUsers: {
        textAlign: 'center',
        fontSize: '16px',
        color: theme.colors.secondary,
        padding: '40px',
    },
};

exports.Button = Button;
exports.Card = Card;
exports.ListView = ListView;
exports.WeatherWidget = WeatherWidget;
