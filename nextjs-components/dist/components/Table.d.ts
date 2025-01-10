import React from 'react';
type TableColumn<T> = {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
    width?: string;
};
type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    keyExtractor?: (item: T) => string;
    onRowClick?: (item: T) => void;
    tableContainerStyle?: string;
    tableStyle?: string;
    headerStyle?: string;
    rowStyle?: string;
    cellStyle?: string;
    isLoading?: boolean;
    loadingRowsCount?: number;
    emptyStateComponent?: React.ReactNode;
    title?: string;
    description?: string;
    pageSize?: number;
};
declare function CustomTable<T extends Record<string, any>>({ data, columns, keyExtractor, onRowClick, tableContainerStyle, tableStyle, headerStyle, rowStyle, cellStyle, isLoading, loadingRowsCount, emptyStateComponent, title, description, pageSize, }: TableProps<T>): React.JSX.Element;
export default CustomTable;
