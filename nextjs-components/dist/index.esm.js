import React, { useState, useEffect, useMemo } from 'react';
import require$$2 from 'react-dom';

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
    const [editedUser, setEditedUser] = useState(user);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
    };
    return (React.createElement("div", { style: styles$3.modal },
        React.createElement("div", { style: styles$3.modalContent },
            React.createElement("h2", { style: styles$3.title }, "Edit User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: styles$3.formGroup },
                    React.createElement("label", { htmlFor: "name", style: styles$3.label }, "Name:"),
                    React.createElement("input", { type: "text", id: "name", name: "name", value: editedUser.name, onChange: handleChange, required: true, style: styles$3.input })),
                React.createElement("div", { style: styles$3.formGroup },
                    React.createElement("label", { htmlFor: "email", style: styles$3.label }, "Email:"),
                    React.createElement("input", { type: "email", id: "email", name: "email", value: editedUser.email, onChange: handleChange, required: true, style: styles$3.input })),
                React.createElement("div", { style: styles$3.formGroup },
                    React.createElement("label", { htmlFor: "role", style: styles$3.label }, "Role:"),
                    React.createElement("select", { id: "role", name: "role", value: editedUser.role, onChange: handleChange, required: true, style: styles$3.select },
                        React.createElement("option", { value: "viewer" }, "Viewer"),
                        React.createElement("option", { value: "editor" }, "Editor"),
                        React.createElement("option", { value: "admin" }, "Admin"))),
                React.createElement("div", { style: styles$3.formGroup },
                    React.createElement("label", { htmlFor: "status", style: styles$3.label }, "Status:"),
                    React.createElement("select", { id: "status", name: "status", value: editedUser.status, onChange: handleChange, required: true, style: styles$3.select },
                        React.createElement("option", { value: "active" }, "Active"),
                        React.createElement("option", { value: "inactive" }, "Inactive"))),
                React.createElement("div", { style: styles$3.buttonGroup },
                    React.createElement("button", { type: "submit", style: styles$3.saveButton }, "Save Changes"),
                    React.createElement("button", { type: "button", onClick: onClose, style: styles$3.cancelButton }, "Cancel"))))));
};
const styles$3 = {
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
    const [newUser, setNewUser] = useState({
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
    return (React.createElement("div", { style: styles$2.modal },
        React.createElement("div", { style: styles$2.modalContent },
            React.createElement("h2", { style: styles$2.title }, "Add New User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "name", style: styles$2.label }, "Name:"),
                    React.createElement("input", { type: "text", id: "name", name: "name", value: newUser.name, onChange: handleChange, required: true, style: styles$2.input })),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "email", style: styles$2.label }, "Email:"),
                    React.createElement("input", { type: "email", id: "email", name: "email", value: newUser.email, onChange: handleChange, required: true, style: styles$2.input })),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "role", style: styles$2.label }, "Role:"),
                    React.createElement("select", { id: "role", name: "role", value: newUser.role, onChange: handleChange, required: true, style: styles$2.select },
                        React.createElement("option", { value: "viewer" }, "Viewer"),
                        React.createElement("option", { value: "editor" }, "Editor"),
                        React.createElement("option", { value: "admin" }, "Admin"))),
                React.createElement("div", { style: styles$2.formGroup },
                    React.createElement("label", { htmlFor: "status", style: styles$2.label }, "Status:"),
                    React.createElement("select", { id: "status", name: "status", value: newUser.status, onChange: handleChange, required: true, style: styles$2.select },
                        React.createElement("option", { value: "active" }, "Active"),
                        React.createElement("option", { value: "inactive" }, "Inactive"))),
                React.createElement("div", { style: styles$2.buttonGroup },
                    React.createElement("button", { type: "submit", style: styles$2.saveButton }, "Add User"),
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

const ListView$1 = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
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
    useEffect(() => {
        fetchUsers();
    }, []);
    return (React.createElement("div", { style: styles$1.container },
        React.createElement("div", { style: styles$1.header },
            React.createElement("h2", { style: styles$1.title }, "User Management"),
            React.createElement("button", { style: styles$1.addButton, onClick: onAdd }, "Add New User")),
        React.createElement("p", { style: styles$1.subtitle }, "A list of all users in the system."),
        isLoading ? (React.createElement("div", { style: styles$1.loading }, "Loading...")) : error ? (React.createElement("div", { style: styles$1.error },
            "Error: ",
            error)) : users.length > 0 ? (React.createElement("table", { style: styles$1.table },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { style: styles$1.th }, "Name"),
                    React.createElement("th", { style: styles$1.th }, "Role"),
                    React.createElement("th", { style: styles$1.th }, "Status"),
                    React.createElement("th", { style: styles$1.th }, "Actions"))),
            React.createElement("tbody", null, users.map((user) => (React.createElement("tr", { key: user._id, style: styles$1.tr },
                React.createElement("td", { style: styles$1.td },
                    React.createElement("div", { style: styles$1.nameContainer },
                        React.createElement("img", { src: `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`, alt: "User Avatar", style: styles$1.avatar }),
                        React.createElement("div", null,
                            React.createElement("div", { style: styles$1.name }, user.name),
                            React.createElement("div", { style: styles$1.email }, user.email)))),
                React.createElement("td", { style: styles$1.td }, user.role),
                React.createElement("td", { style: styles$1.td },
                    React.createElement("button", { onClick: () => onToggleStatus(user), style: {
                            ...styles$1.status,
                            backgroundColor: user.status === 'active' ? theme.colors.success : theme.colors.danger,
                            color: theme.colors.white,
                        } }, user.status)),
                React.createElement("td", { style: styles$1.td },
                    React.createElement("button", { style: styles$1.editButton, onClick: () => onEdit(user) }, "Edit"),
                    React.createElement("button", { style: styles$1.deleteButton, onClick: () => onDelete(user) }, "Delete")))))))) : (React.createElement("div", { style: styles$1.noUsers }, "No users available.")),
        editingUser && (React.createElement(EditUserModal, { user: editingUser, onClose: () => setEditingUser(null), onSave: handleEditUser })),
        isNewUserModalOpen && (React.createElement(NewUserModal, { onClose: () => setIsNewUserModalOpen(false), onSave: handleAddUser }))));
};
const styles$1 = {
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

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React.createContext && /*#__PURE__*/React.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (undefined !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/React.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/React.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaEdit (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"},"child":[]}]})(props);
}function FaPlus (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"},"child":[]}]})(props);
}function FaSave (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"},"child":[]}]})(props);
}function FaTimes (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 352 512"},"child":[{"tag":"path","attr":{"d":"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"},"child":[]}]})(props);
}function FaTrash (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"},"child":[]}]})(props);
}

// THIS FILE IS AUTO GENERATED
function IoMdArrowDropdown (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M128 192l128 128 128-128z"},"child":[]}]})(props);
}function IoMdArrowDropup (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M128 320l128-128 128 128z"},"child":[]}]})(props);
}

const API_URL = "http://localhost:5000/api";
const ListView = ({ collectionName }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [newRow, setNewRow] = useState(null);
    useEffect(() => {
        fetchData();
    }, [collectionName]);
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${collectionName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${collectionName}: ${response.statusText}`);
            }
            const result = await response.json();
            setData(result || []);
        }
        catch (err) {
            setError(err.message || "An error occurred while fetching data.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleAddRow = () => {
        if (data.length > 0) {
            const newRowTemplate = Object.fromEntries(Object.keys(data[0]).map((key) => [key, ""]));
            setNewRow(newRowTemplate);
        }
    };
    const handleSaveNewRow = async () => {
        try {
            const newPayload = { ...newRow };
            delete newPayload._id; // Remove `_id` before sending to the server
            const response = await fetch(`${API_URL}/${collectionName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPayload),
            });
            if (!response.ok) {
                throw new Error("Failed to add new row.");
            }
            fetchData(); // Refresh the data after adding a row
            setNewRow(null);
        }
        catch (err) {
            setError(err.message || "An error occurred while adding a new row.");
        }
    };
    const handleEditRow = (index) => {
        setEditingRow(index);
    };
    const handleSaveEdit = async (index) => {
        try {
            const response = await fetch(`${API_URL}/${collectionName}/${data[index]._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data[index]),
            });
            if (!response.ok) {
                throw new Error("Failed to update row.");
            }
            setEditingRow(null);
            fetchData();
        }
        catch (err) {
            setError(err.message || "An error occurred while updating the row.");
        }
    };
    const handleDeleteRow = async (index) => {
        try {
            const response = await fetch(`${API_URL}/${collectionName}/${data[index]._id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete row.");
            }
            fetchData();
        }
        catch (err) {
            setError(err.message || "An error occurred while deleting the row.");
        }
    };
    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);
    const filteredData = useMemo(() => {
        return sortedData.filter((item) => Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())));
    }, [sortedData, searchTerm]);
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };
    const renderTableHeaders = () => {
        if (data.length === 0)
            return null;
        const keys = Object.keys(data[0]).filter((key) => key !== "_id");
        return (React.createElement("thead", null,
            React.createElement("tr", null,
                keys.map((key) => (React.createElement("th", { key: key, onClick: () => requestSort(key), style: { ...styles.th } },
                    React.createElement("div", { style: styles.thContent },
                        key.replace(/_/g, " ").toUpperCase(),
                        sortConfig?.key === key &&
                            (sortConfig.direction === "asc" ? React.createElement(IoMdArrowDropup, null) : React.createElement(IoMdArrowDropdown, null)))))),
                React.createElement("th", { style: styles.th }, "Actions"))));
    };
    const renderTableRows = () => {
        if (filteredData.length === 0)
            return null;
        const keys = Object.keys(filteredData[0]).filter((key) => key !== "_id");
        return (React.createElement("tbody", null,
            filteredData.map((item, index) => (React.createElement("tr", { key: index },
                keys.map((key) => (React.createElement("td", { key: key, style: styles.td }, editingRow === index ? (React.createElement("input", { type: "text", value: item[key], onChange: (e) => {
                        const newData = [...data];
                        newData[index][key] = e.target.value;
                        setData(newData);
                    }, style: styles.input })) : (String(item[key]))))),
                React.createElement("td", { style: styles.td }, editingRow === index ? (React.createElement(React.Fragment, null,
                    React.createElement("button", { onClick: () => handleSaveEdit(index), style: styles.actionButton },
                        React.createElement(FaSave, null)),
                    React.createElement("button", { onClick: () => setEditingRow(null), style: styles.actionButton },
                        React.createElement(FaTimes, null)))) : (React.createElement(React.Fragment, null,
                    React.createElement("button", { onClick: () => handleEditRow(index), style: styles.actionButton },
                        React.createElement(FaEdit, null)),
                    React.createElement("button", { onClick: () => handleDeleteRow(index), style: styles.actionButton },
                        React.createElement(FaTrash, null)))))))),
            newRow && (React.createElement("tr", null,
                keys.map((key) => (React.createElement("td", { key: key, style: styles.td },
                    React.createElement("input", { type: "text", value: newRow[key], onChange: (e) => setNewRow({ ...newRow, [key]: e.target.value }), style: styles.input })))),
                React.createElement("td", { style: styles.td },
                    React.createElement("button", { onClick: handleSaveNewRow, style: styles.actionButton },
                        React.createElement(FaSave, null)),
                    React.createElement("button", { onClick: () => setNewRow(null), style: styles.actionButton },
                        React.createElement(FaTimes, null)))))));
    };
    return (React.createElement("div", { style: styles.container },
        React.createElement("h2", { style: styles.title },
            "Data from \"",
            collectionName,
            "\""),
        isLoading ? (React.createElement("p", { style: styles.message }, "Loading...")) : error ? (React.createElement("p", { style: styles.error },
            "Error: ",
            error)) : data.length === 0 ? (React.createElement("p", { style: styles.message }, "No data available for this collection.")) : (React.createElement(React.Fragment, null,
            React.createElement("div", { style: styles.topControls },
                React.createElement("input", { type: "text", placeholder: "Search...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: styles.searchInput }),
                React.createElement("button", { onClick: handleAddRow, style: styles.addButton },
                    React.createElement(FaPlus, null),
                    " Add Row")),
            React.createElement("div", { style: styles.tableContainer },
                React.createElement("table", { style: styles.table },
                    renderTableHeaders(),
                    renderTableRows()))))));
};
const styles = {
    container: { padding: "20px", maxWidth: "100%", margin: "0 auto" },
    title: { textAlign: "center", fontSize: "24px", fontWeight: "bold" },
    message: { textAlign: "center", fontSize: "16px", color: "#555" },
    error: { textAlign: "center", fontSize: "16px", color: "red" },
    topControls: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
    searchInput: { padding: "8px", fontSize: "14px", border: "1px solid #ddd", borderRadius: "4px", width: "200px" },
    addButton: {
        padding: "8px 16px",
        fontSize: "14px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    tableContainer: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
        border: "1px solid #ddd",
        padding: "12px",
        textAlign: "left",
        backgroundColor: "#f4f4f4",
        fontWeight: "bold",
        cursor: "pointer",
    },
    thContent: { display: "flex", alignItems: "center", gap: "5px" },
    td: { border: "1px solid #ddd", padding: "12px", textAlign: "left" },
    input: {
        width: "100%",
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
    },
    actionButton: {
        padding: "6px",
        fontSize: "14px",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ddd",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "5px",
    },
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var script$1 = {exports: {}};

var _interop_require_default = {};

var hasRequired_interop_require_default;

function require_interop_require_default () {
	if (hasRequired_interop_require_default) return _interop_require_default;
	hasRequired_interop_require_default = 1;

	_interop_require_default._ = _interop_require_default._interop_require_default = _interop_require_default$1;
	function _interop_require_default$1(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}
	return _interop_require_default;
}

var _interop_require_wildcard = {};

var hasRequired_interop_require_wildcard;

function require_interop_require_wildcard () {
	if (hasRequired_interop_require_wildcard) return _interop_require_wildcard;
	hasRequired_interop_require_wildcard = 1;

	function _getRequireWildcardCache(nodeInterop) {
	    if (typeof WeakMap !== "function") return null;

	    var cacheBabelInterop = new WeakMap();
	    var cacheNodeInterop = new WeakMap();

	    return (_getRequireWildcardCache = function(nodeInterop) {
	        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
	    })(nodeInterop);
	}
	_interop_require_wildcard._ = _interop_require_wildcard._interop_require_wildcard = _interop_require_wildcard$1;
	function _interop_require_wildcard$1(obj, nodeInterop) {
	    if (!nodeInterop && obj && obj.__esModule) return obj;
	    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

	    var cache = _getRequireWildcardCache(nodeInterop);

	    if (cache && cache.has(obj)) return cache.get(obj);

	    var newObj = {};
	    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	    for (var key in obj) {
	        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
	            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
	            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
	            else newObj[key] = obj[key];
	        }
	    }

	    newObj.default = obj;

	    if (cache) cache.set(obj, newObj);

	    return newObj;
	}
	return _interop_require_wildcard;
}

var headManagerContext_sharedRuntime = {};

var hasRequiredHeadManagerContext_sharedRuntime;

function requireHeadManagerContext_sharedRuntime () {
	if (hasRequiredHeadManagerContext_sharedRuntime) return headManagerContext_sharedRuntime;
	hasRequiredHeadManagerContext_sharedRuntime = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "HeadManagerContext", {
		    enumerable: true,
		    get: function() {
		        return HeadManagerContext;
		    }
		});
		const _interop_require_default = /*@__PURE__*/ require_interop_require_default();
		const _react = /*#__PURE__*/ _interop_require_default._(React);
		const HeadManagerContext = _react.default.createContext({});
		if (process.env.NODE_ENV !== "production") {
		    HeadManagerContext.displayName = "HeadManagerContext";
		}

		
	} (headManagerContext_sharedRuntime));
	return headManagerContext_sharedRuntime;
}

var headManager = {exports: {}};

var hasRequiredHeadManager;

function requireHeadManager () {
	if (hasRequiredHeadManager) return headManager.exports;
	hasRequiredHeadManager = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    DOMAttributeNames: function() {
		        return DOMAttributeNames;
		    },
		    isEqualNode: function() {
		        return isEqualNode;
		    },
		    default: function() {
		        return initHeadManager;
		    }
		});
		const DOMAttributeNames = {
		    acceptCharset: "accept-charset",
		    className: "class",
		    htmlFor: "for",
		    httpEquiv: "http-equiv",
		    noModule: "noModule"
		};
		function reactElementToDOM(param) {
		    let { type, props } = param;
		    const el = document.createElement(type);
		    for(const p in props){
		        if (!props.hasOwnProperty(p)) continue;
		        if (p === "children" || p === "dangerouslySetInnerHTML") continue;
		        // we don't render undefined props to the DOM
		        if (props[p] === undefined) continue;
		        const attr = DOMAttributeNames[p] || p.toLowerCase();
		        if (type === "script" && (attr === "async" || attr === "defer" || attr === "noModule")) {
		            el[attr] = !!props[p];
		        } else {
		            el.setAttribute(attr, props[p]);
		        }
		    }
		    const { children, dangerouslySetInnerHTML } = props;
		    if (dangerouslySetInnerHTML) {
		        el.innerHTML = dangerouslySetInnerHTML.__html || "";
		    } else if (children) {
		        el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
		    }
		    return el;
		}
		function isEqualNode(oldTag, newTag) {
		    if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
		        const nonce = newTag.getAttribute("nonce");
		        // Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
		        // be stripped if there is no content security policy response header that includes a nonce.
		        if (nonce && !oldTag.getAttribute("nonce")) {
		            const cloneTag = newTag.cloneNode(true);
		            cloneTag.setAttribute("nonce", "");
		            cloneTag.nonce = nonce;
		            return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
		        }
		    }
		    return oldTag.isEqualNode(newTag);
		}
		let updateElements;
		if (process.env.__NEXT_STRICT_NEXT_HEAD) {
		    updateElements = (type, components)=>{
		        const headEl = document.querySelector("head");
		        if (!headEl) return;
		        const headMetaTags = headEl.querySelectorAll('meta[name="next-head"]') || [];
		        const oldTags = [];
		        if (type === "meta") {
		            const metaCharset = headEl.querySelector("meta[charset]");
		            if (metaCharset) {
		                oldTags.push(metaCharset);
		            }
		        }
		        for(let i = 0; i < headMetaTags.length; i++){
		            var _headTag_tagName;
		            const metaTag = headMetaTags[i];
		            const headTag = metaTag.nextSibling;
		            if ((headTag == null ? undefined : (_headTag_tagName = headTag.tagName) == null ? undefined : _headTag_tagName.toLowerCase()) === type) {
		                oldTags.push(headTag);
		            }
		        }
		        const newTags = components.map(reactElementToDOM).filter((newTag)=>{
		            for(let k = 0, len = oldTags.length; k < len; k++){
		                const oldTag = oldTags[k];
		                if (isEqualNode(oldTag, newTag)) {
		                    oldTags.splice(k, 1);
		                    return false;
		                }
		            }
		            return true;
		        });
		        oldTags.forEach((t)=>{
		            var _t_parentNode;
		            const metaTag = t.previousSibling;
		            if (metaTag && metaTag.getAttribute("name") === "next-head") {
		                var _t_parentNode1;
		                (_t_parentNode1 = t.parentNode) == null ? undefined : _t_parentNode1.removeChild(metaTag);
		            }
		            (_t_parentNode = t.parentNode) == null ? undefined : _t_parentNode.removeChild(t);
		        });
		        newTags.forEach((t)=>{
		            var _t_tagName;
		            const meta = document.createElement("meta");
		            meta.name = "next-head";
		            meta.content = "1";
		            // meta[charset] must be first element so special case
		            if (!(((_t_tagName = t.tagName) == null ? undefined : _t_tagName.toLowerCase()) === "meta" && t.getAttribute("charset"))) {
		                headEl.appendChild(meta);
		            }
		            headEl.appendChild(t);
		        });
		    };
		} else {
		    updateElements = (type, components)=>{
		        const headEl = document.getElementsByTagName("head")[0];
		        const headCountEl = headEl.querySelector("meta[name=next-head-count]");
		        if (process.env.NODE_ENV !== "production") {
		            if (!headCountEl) {
		                console.error("Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing");
		                return;
		            }
		        }
		        const headCount = Number(headCountEl.content);
		        const oldTags = [];
		        for(let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? undefined : j.previousElementSibling) || null){
		            var _j_tagName;
		            if ((j == null ? undefined : (_j_tagName = j.tagName) == null ? undefined : _j_tagName.toLowerCase()) === type) {
		                oldTags.push(j);
		            }
		        }
		        const newTags = components.map(reactElementToDOM).filter((newTag)=>{
		            for(let k = 0, len = oldTags.length; k < len; k++){
		                const oldTag = oldTags[k];
		                if (isEqualNode(oldTag, newTag)) {
		                    oldTags.splice(k, 1);
		                    return false;
		                }
		            }
		            return true;
		        });
		        oldTags.forEach((t)=>{
		            var _t_parentNode;
		            return (_t_parentNode = t.parentNode) == null ? undefined : _t_parentNode.removeChild(t);
		        });
		        newTags.forEach((t)=>headEl.insertBefore(t, headCountEl));
		        headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
		    };
		}
		function initHeadManager() {
		    return {
		        mountedInstances: new Set(),
		        updateHead: (head)=>{
		            const tags = {};
		            head.forEach((h)=>{
		                if (// If the font tag is loaded only on client navigation
		                // it won't be inlined. In this case revert to the original behavior
		                h.type === "link" && h.props["data-optimized-fonts"]) {
		                    if (document.querySelector('style[data-href="' + h.props["data-href"] + '"]')) {
		                        return;
		                    } else {
		                        h.props.href = h.props["data-href"];
		                        h.props["data-href"] = undefined;
		                    }
		                }
		                const components = tags[h.type] || [];
		                components.push(h);
		                tags[h.type] = components;
		            });
		            const titleComponent = tags.title ? tags.title[0] : null;
		            let title = "";
		            if (titleComponent) {
		                const { children } = titleComponent.props;
		                title = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
		            }
		            if (title !== document.title) document.title = title;
		            [
		                "meta",
		                "base",
		                "link",
		                "style",
		                "script"
		            ].forEach((type)=>{
		                updateElements(type, tags[type] || []);
		            });
		        }
		    };
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (headManager, headManager.exports));
	return headManager.exports;
}

var requestIdleCallback = {exports: {}};

var hasRequiredRequestIdleCallback;

function requireRequestIdleCallback () {
	if (hasRequiredRequestIdleCallback) return requestIdleCallback.exports;
	hasRequiredRequestIdleCallback = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    requestIdleCallback: function() {
		        return requestIdleCallback;
		    },
		    cancelIdleCallback: function() {
		        return cancelIdleCallback;
		    }
		});
		const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
		    let start = Date.now();
		    return self.setTimeout(function() {
		        cb({
		            didTimeout: false,
		            timeRemaining: function() {
		                return Math.max(0, 50 - (Date.now() - start));
		            }
		        });
		    }, 1);
		};
		const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
		    return clearTimeout(id);
		};

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (requestIdleCallback, requestIdleCallback.exports));
	return requestIdleCallback.exports;
}

var hasRequiredScript$1;

function requireScript$1 () {
	if (hasRequiredScript$1) return script$1.exports;
	hasRequiredScript$1 = 1;
	(function (module, exports) {
		"use client";
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    handleClientScriptLoad: function() {
		        return handleClientScriptLoad;
		    },
		    initScriptLoader: function() {
		        return initScriptLoader;
		    },
		    default: function() {
		        return _default;
		    }
		});
		const _interop_require_default = /*@__PURE__*/ require_interop_require_default();
		const _interop_require_wildcard = /*@__PURE__*/ require_interop_require_wildcard();
		const _reactdom = /*#__PURE__*/ _interop_require_default._(require$$2);
		const _react = /*#__PURE__*/ _interop_require_wildcard._(React);
		const _headmanagercontextsharedruntime = requireHeadManagerContext_sharedRuntime();
		const _headmanager = requireHeadManager();
		const _requestidlecallback = requireRequestIdleCallback();
		const ScriptCache = new Map();
		const LoadCache = new Set();
		const ignoreProps = [
		    "onLoad",
		    "onReady",
		    "dangerouslySetInnerHTML",
		    "children",
		    "onError",
		    "strategy",
		    "stylesheets"
		];
		const insertStylesheets = (stylesheets)=>{
		    // Case 1: Styles for afterInteractive/lazyOnload with appDir injected via handleClientScriptLoad
		    //
		    // Using ReactDOM.preinit to feature detect appDir and inject styles
		    // Stylesheets might have already been loaded if initialized with Script component
		    // Re-inject styles here to handle scripts loaded via handleClientScriptLoad
		    // ReactDOM.preinit handles dedup and ensures the styles are loaded only once
		    if (_reactdom.default.preinit) {
		        stylesheets.forEach((stylesheet)=>{
		            _reactdom.default.preinit(stylesheet, {
		                as: "style"
		            });
		        });
		        return;
		    }
		    // Case 2: Styles for afterInteractive/lazyOnload with pages injected via handleClientScriptLoad
		    //
		    // We use this function to load styles when appdir is not detected
		    // TODO: Use React float APIs to load styles once available for pages dir
		    if (typeof window !== "undefined") {
		        let head = document.head;
		        stylesheets.forEach((stylesheet)=>{
		            let link = document.createElement("link");
		            link.type = "text/css";
		            link.rel = "stylesheet";
		            link.href = stylesheet;
		            head.appendChild(link);
		        });
		    }
		};
		const loadScript = (props)=>{
		    const { src, id, onLoad = ()=>{}, onReady = null, dangerouslySetInnerHTML, children = "", strategy = "afterInteractive", onError, stylesheets } = props;
		    const cacheKey = id || src;
		    // Script has already loaded
		    if (cacheKey && LoadCache.has(cacheKey)) {
		        return;
		    }
		    // Contents of this script are already loading/loaded
		    if (ScriptCache.has(src)) {
		        LoadCache.add(cacheKey);
		        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
		        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
		        ScriptCache.get(src).then(onLoad, onError);
		        return;
		    }
		    /** Execute after the script first loaded */ const afterLoad = ()=>{
		        // Run onReady for the first time after load event
		        if (onReady) {
		            onReady();
		        }
		        // add cacheKey to LoadCache when load successfully
		        LoadCache.add(cacheKey);
		    };
		    const el = document.createElement("script");
		    const loadPromise = new Promise((resolve, reject)=>{
		        el.addEventListener("load", function(e) {
		            resolve();
		            if (onLoad) {
		                onLoad.call(this, e);
		            }
		            afterLoad();
		        });
		        el.addEventListener("error", function(e) {
		            reject(e);
		        });
		    }).catch(function(e) {
		        if (onError) {
		            onError(e);
		        }
		    });
		    if (dangerouslySetInnerHTML) {
		        // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
		        el.innerHTML = dangerouslySetInnerHTML.__html || "";
		        afterLoad();
		    } else if (children) {
		        el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
		        afterLoad();
		    } else if (src) {
		        el.src = src;
		        // do not add cacheKey into LoadCache for remote script here
		        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
		        ScriptCache.set(src, loadPromise);
		    }
		    for (const [k, value] of Object.entries(props)){
		        if (value === undefined || ignoreProps.includes(k)) {
		            continue;
		        }
		        const attr = _headmanager.DOMAttributeNames[k] || k.toLowerCase();
		        el.setAttribute(attr, value);
		    }
		    if (strategy === "worker") {
		        el.setAttribute("type", "text/partytown");
		    }
		    el.setAttribute("data-nscript", strategy);
		    // Load styles associated with this script
		    if (stylesheets) {
		        insertStylesheets(stylesheets);
		    }
		    document.body.appendChild(el);
		};
		function handleClientScriptLoad(props) {
		    const { strategy = "afterInteractive" } = props;
		    if (strategy === "lazyOnload") {
		        window.addEventListener("load", ()=>{
		            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
		        });
		    } else {
		        loadScript(props);
		    }
		}
		function loadLazyScript(props) {
		    if (document.readyState === "complete") {
		        (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
		    } else {
		        window.addEventListener("load", ()=>{
		            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
		        });
		    }
		}
		function addBeforeInteractiveToCache() {
		    const scripts = [
		        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
		        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
		    ];
		    scripts.forEach((script)=>{
		        const cacheKey = script.id || script.getAttribute("src");
		        LoadCache.add(cacheKey);
		    });
		}
		function initScriptLoader(scriptLoaderItems) {
		    scriptLoaderItems.forEach(handleClientScriptLoad);
		    addBeforeInteractiveToCache();
		}
		function Script(props) {
		    const { id, src = "", onLoad = ()=>{}, onReady = null, strategy = "afterInteractive", onError, stylesheets, ...restProps } = props;
		    // Context is available only during SSR
		    const { updateScripts, scripts, getIsSsr, appDir, nonce } = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
		    /**
		   * - First mount:
		   *   1. The useEffect for onReady executes
		   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
		   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
		   *   3. The useEffect for loadScript executes
		   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
		   *      Once the script is loaded, the onLoad and onReady will be called by then
		   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
		   *   5. The useEffect for onReady executes again
		   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
		   *   7. The useEffect for loadScript executes again
		   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
		   *
		   * - Second mount:
		   *   1. The useEffect for onReady executes
		   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
		   *      onReady is called, set hasOnReadyEffectCalled.current to true
		   *   3. The useEffect for loadScript executes
		   *   4. The script is already loaded, loadScript bails out
		   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
		   *   5. The useEffect for onReady executes again
		   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
		   *   7. The useEffect for loadScript executes again
		   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
		   */ const hasOnReadyEffectCalled = (0, _react.useRef)(false);
		    (0, _react.useEffect)(()=>{
		        const cacheKey = id || src;
		        if (!hasOnReadyEffectCalled.current) {
		            // Run onReady if script has loaded before but component is re-mounted
		            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
		                onReady();
		            }
		            hasOnReadyEffectCalled.current = true;
		        }
		    }, [
		        onReady,
		        id,
		        src
		    ]);
		    const hasLoadScriptEffectCalled = (0, _react.useRef)(false);
		    (0, _react.useEffect)(()=>{
		        if (!hasLoadScriptEffectCalled.current) {
		            if (strategy === "afterInteractive") {
		                loadScript(props);
		            } else if (strategy === "lazyOnload") {
		                loadLazyScript(props);
		            }
		            hasLoadScriptEffectCalled.current = true;
		        }
		    }, [
		        props,
		        strategy
		    ]);
		    if (strategy === "beforeInteractive" || strategy === "worker") {
		        if (updateScripts) {
		            scripts[strategy] = (scripts[strategy] || []).concat([
		                {
		                    id,
		                    src,
		                    onLoad,
		                    onReady,
		                    onError,
		                    ...restProps
		                }
		            ]);
		            updateScripts(scripts);
		        } else if (getIsSsr && getIsSsr()) {
		            // Script has already loaded during SSR
		            LoadCache.add(id || src);
		        } else if (getIsSsr && !getIsSsr()) {
		            loadScript(props);
		        }
		    }
		    // For the app directory, we need React Float to preload these scripts.
		    if (appDir) {
		        // Injecting stylesheets here handles beforeInteractive and worker scripts correctly
		        // For other strategies injecting here ensures correct stylesheet order
		        // ReactDOM.preinit handles loading the styles in the correct order,
		        // also ensures the stylesheet is loaded only once and in a consistent manner
		        //
		        // Case 1: Styles for beforeInteractive/worker with appDir - handled here
		        // Case 2: Styles for beforeInteractive/worker with pages dir - Not handled yet
		        // Case 3: Styles for afterInteractive/lazyOnload with appDir - handled here
		        // Case 4: Styles for afterInteractive/lazyOnload with pages dir - handled in insertStylesheets function
		        if (stylesheets) {
		            stylesheets.forEach((styleSrc)=>{
		                _reactdom.default.preinit(styleSrc, {
		                    as: "style"
		                });
		            });
		        }
		        // Before interactive scripts need to be loaded by Next.js' runtime instead
		        // of native <script> tags, because they no longer have `defer`.
		        if (strategy === "beforeInteractive") {
		            if (!src) {
		                // For inlined scripts, we put the content in `children`.
		                if (restProps.dangerouslySetInnerHTML) {
		                    // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
		                    restProps.children = restProps.dangerouslySetInnerHTML.__html;
		                    delete restProps.dangerouslySetInnerHTML;
		                }
		                return /*#__PURE__*/ _react.default.createElement("script", {
		                    nonce: nonce,
		                    dangerouslySetInnerHTML: {
		                        __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([
		                            0,
		                            {
		                                ...restProps
		                            }
		                        ]) + ")"
		                    }
		                });
		            } else {
		                // @ts-ignore
		                _reactdom.default.preload(src, restProps.integrity ? {
		                    as: "script",
		                    integrity: restProps.integrity
		                } : {
		                    as: "script"
		                });
		                return /*#__PURE__*/ _react.default.createElement("script", {
		                    nonce: nonce,
		                    dangerouslySetInnerHTML: {
		                        __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([
		                            src
		                        ]) + ")"
		                    }
		                });
		            }
		        } else if (strategy === "afterInteractive") {
		            if (src) {
		                // @ts-ignore
		                _reactdom.default.preload(src, restProps.integrity ? {
		                    as: "script",
		                    integrity: restProps.integrity
		                } : {
		                    as: "script"
		                });
		            }
		        }
		    }
		    return null;
		}
		Object.defineProperty(Script, "__nextScript", {
		    value: true
		});
		const _default = Script;

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (script$1, script$1.exports));
	return script$1.exports;
}

var script;
var hasRequiredScript;

function requireScript () {
	if (hasRequiredScript) return script;
	hasRequiredScript = 1;
	script = requireScript$1();
	return script;
}

var scriptExports = requireScript();
var Script = /*@__PURE__*/getDefaultExportFromCjs(scriptExports);

const RazorpayPayment = () => {
    const handlePayment = async () => {
        try {
            // User details (you can replace these with dynamic values as needed)
            const userDetails = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: '1234567890',
            };
            // API call to create an order
            const response = await fetch('http://localhost:5000/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 5000,
                    itemName: 'Premium Membership',
                    userDetails,
                }),
            });
            const { razorpayOptions } = await response.json();
            // Attach the payment handler to the Razorpay options
            razorpayOptions.handler = function (paymentResponse) {
                alert(`Payment Successful! Payment ID: ${paymentResponse.razorpay_payment_id}`);
                console.log('Payment Details:', paymentResponse);
                // You can also make a POST request to your backend to log payment success.
            };
            // Initialize Razorpay instance
            const razorpayInstance = new window.Razorpay(razorpayOptions);
            // Open the Razorpay payment modal
            razorpayInstance.open();
        }
        catch (error) {
            console.error('Error creating Razorpay order:', error);
            alert('Something went wrong. Please try again.');
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Script, { src: "https://checkout.razorpay.com/v1/checkout.js", strategy: "beforeInteractive" }),
        React.createElement("button", { onClick: handlePayment, style: {
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            } }, "Pay Now")));
};

export { Button, Card, ListView$1 as ListView, ListView as ListViewDynamic, RazorpayPayment as PaymentForm, WeatherWidget };
