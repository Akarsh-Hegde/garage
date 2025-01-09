import React, { useState } from 'react';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface NewUserModalProps {
  onClose: () => void;
  onSave: (user: User) => void;
}

const NewUserModal: React.ComponentType<NewUserModalProps> = ({ onClose, onSave }) => {
  const [newUser, setNewUser] = useState<User>({
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
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleChange}
              required
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={newUser.status}
              onChange={handleChange}
              required
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
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
  } as React.CSSProperties,
  formGroup: {
    marginBottom: '15px',
  } as React.CSSProperties,
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  } as React.CSSProperties,
  saveButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  } as React.CSSProperties,
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default NewUserModal;

