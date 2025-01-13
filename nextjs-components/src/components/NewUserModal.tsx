import React, { useState } from 'react';
import { theme } from './theme';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface NewUserModalProps {
  onClose: () => void;
  onSave: (user: Omit<User, '_id'>) => void;
}

const NewUserModal: React.FC<NewUserModalProps> = ({ onClose, onSave }) => {
  const [newUser, setNewUser] = useState<Omit<User, '_id'>>({
    name: '',
    email: '',
    role: 'viewer',
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newUser);
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="role" style={styles.label}>Role:</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="status" style={styles.label}>Status:</label>
            <select
              id="status"
              name="status"
              value={newUser.status}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>Add User</button>
            <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed' as const,
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
} as const;

export default NewUserModal;

