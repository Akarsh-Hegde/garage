import React from 'react';
interface User {
    _id?: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
}
interface EditUserModalProps {
    user: User;
    onClose: () => void;
    onSave: (user: User) => void;
}
declare const EditUserModal: React.FC<EditUserModalProps>;
export default EditUserModal;
