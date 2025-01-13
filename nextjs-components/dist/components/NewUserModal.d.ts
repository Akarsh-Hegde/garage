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
    onSave: (user: Omit<User, '_id'>) => void;
}
declare const NewUserModal: React.FC<NewUserModalProps>;
export default NewUserModal;
