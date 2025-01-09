import React, { useEffect, useState } from 'react';
import EditUserModal from './EditUserModal';
import NewUserModal from './NewUserModal';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const ListView: React.ComponentType = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching users.');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onAdd = () => {
    setIsNewUserModalOpen(true);
  };

  const onEdit = (user: User) => {
    setEditingUser(user);
  };

  const onDelete = async (user: User) => {
    try {
      const response = await fetch(`${API_URL}/${user._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      } else {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the user.');
      console.error('Error deleting user:', err);
    }
  };

  const onToggleStatus = async (user: User) => {
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
      } else {
        throw new Error(`Error updating user status: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the user status.');
      console.error('Error updating user status:', err);
    }
  };

  const handleEditUser = async (updatedUser: User) => {
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
      } else {
        throw new Error(`Error editing user: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while editing the user.');
      console.error('Error editing user:', err);
    }
  };

  const handleAddUser = async (newUser: User) => {
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
      } else {
        throw new Error(`Error adding user: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while adding the user.');
      console.error('Error adding user:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Management</h2>
        <button style={styles.addButton} onClick={onAdd}>
          Add New User
        </button>
      </div>
      <p style={styles.subtitle}>A list of all users in the system.</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : users.length > 0 ? (
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
                  <button
                    onClick={() => onToggleStatus(user)}
                    style={{
                      ...styles.status,
                      backgroundColor:
                        user.status === 'active' ? '#d1e7dd' : '#f8d7da',
                      color: user.status === 'active' ? '#0f5132' : '#842029',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    {user.status}
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.actionButton}
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#f8d7da',
                      color: '#842029',
                    }}
                    onClick={() => onDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users available.</div>
      )}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleEditUser}
        />
      )}
      {isNewUserModalOpen && (
        <NewUserModal
          onClose={() => setIsNewUserModalOpen(false)}
          onSave={handleAddUser}
        />
      )}
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
  addButton: {
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
  } as React.CSSProperties,
  subtitle: {
    color: '#6c757d',
    fontSize: '14px',
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
};

export default ListView;
