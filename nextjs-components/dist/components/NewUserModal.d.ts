import React from 'react';
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
declare const NewUserModal: React.ComponentType<NewUserModalProps>;
export default NewUserModal;
