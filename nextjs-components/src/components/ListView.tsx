import React, { useEffect, useState } from 'react';
import EditUserModal from './EditUserModal';
import NewUserModal from './NewUserModal';
import { theme } from './theme';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}
const ListView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        <div style={styles.loading}>Loading...</div>
      ) : error ? (
        <div style={styles.error}>Error: {error}</div>
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
            {users.map((user) => (
              <tr key={user._id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.nameContainer}>
                    <img
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
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
                      backgroundColor: user.status === 'active' ? theme.colors.success : theme.colors.danger,
                      color: theme.colors.white,
                    }}
                  >
                    {user.status}
                  </button>
                </td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button style={styles.deleteButton} onClick={() => onDelete(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={styles.noUsers}>No users available.</div>
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
    textAlign: 'left' as const,
    padding: '16px',
    backgroundColor: theme.colors.light,
    color: theme.colors.secondary,
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'uppercase' as const,
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
    textTransform: 'capitalize' as const,
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
    textAlign: 'center' as const,
    fontSize: '16px',
    color: theme.colors.secondary,
    padding: '40px',
  },
  error: {
    textAlign: 'center' as const,
    fontSize: '16px',
    color: theme.colors.danger,
    padding: '40px',
  },
  noUsers: {
    textAlign: 'center' as const,
    fontSize: '16px',
    color: theme.colors.secondary,
    padding: '40px',
  },
} as const;

export default ListView;

