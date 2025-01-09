import React from 'react';

interface User {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface ListViewProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAdd: () => void;
}

const ListView: React.FC<ListViewProps> = ({ users, onEdit, onDelete, onAdd }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Management</h2>
        <button style={styles.addButton} onClick={onAdd}>
          Add New User
        </button>
      </div>
      <p style={styles.subtitle}>A list of all users in the system.</p>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>
                <div style={styles.nameContainer}>
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    style={styles.avatar}
                  />
                  <div>
                    <div style={styles.name}>{user.name}</div>
                    <div style={styles.email}>{user.email}</div>
                  </div>
                </div>
              </td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor: user.status === 'active' ? '#d1e7dd' : '#f8d7da',
                    color: user.status === 'active' ? '#0f5132' : '#842029',
                  }}
                >
                  {user.status}
                </span>
              </td>
              <td style={styles.td}>
                <button style={styles.actionButton} onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button
                  style={{ ...styles.actionButton, backgroundColor: '#f8d7da', color: '#842029' }}
                  onClick={() => onDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button style={styles.pageButton}>Previous</button>
        <span style={styles.pageInfo}>Page 1 of 2</span>
        <button style={styles.pageButton}>Next</button>
      </div>
    </div>
  );
};

const styles = {
    container: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    } as React.CSSProperties,
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as React.CSSProperties,
    title: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 600,
    } as React.CSSProperties,
    subtitle: {
      color: '#6c757d',
      fontSize: '14px',
    } as React.CSSProperties,
    addButton: {
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 12px',
      cursor: 'pointer',
    } as React.CSSProperties,
    table: {
      width: '100%',
      borderCollapse: 'collapse' as 'collapse',
      marginTop: '16px',
    } as React.CSSProperties,
    th: {
      textAlign: 'left',
      padding: '8px',
      borderBottom: '2px solid #e0e0e0',
      fontSize: '14px',
      color: '#495057',
    } as React.CSSProperties,
    td: {
      padding: '8px',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '14px',
      color: '#495057',
    } as React.CSSProperties,
    tr: {
      transition: 'background-color 0.2s',
    } as React.CSSProperties,
    nameContainer: {
      display: 'flex',
      alignItems: 'center',
    } as React.CSSProperties,
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '8px',
    } as React.CSSProperties,
    name: {
      fontWeight: 600,
    } as React.CSSProperties,
    email: {
      fontSize: '12px',
      color: '#6c757d',
    } as React.CSSProperties,
    status: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-block',
    } as React.CSSProperties,
    actionButton: {
      marginRight: '8px',
      padding: '6px 12px',
      fontSize: '12px',
      color: '#fff',
      backgroundColor: '#0d6efd',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    } as React.CSSProperties,
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
    } as React.CSSProperties,
    pageButton: {
      backgroundColor: '#e9ecef',
      color: '#495057',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer',
    } as React.CSSProperties,
    pageInfo: {
      fontSize: '14px',
      color: '#6c757d',
    } as React.CSSProperties,
  };
  
export default ListView;
