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
declare const ListView: React.ComponentType<ListViewProps>;
export default ListView;
