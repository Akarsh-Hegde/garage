import React, { useState } from 'react';

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

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor = (item) => item.id?.toString() ?? Math.random().toString(),
  onRowClick,
  tableContainerStyle = '',
  tableStyle = '',
  headerStyle = '',
  rowStyle = '',
  cellStyle = '',
  isLoading = false,
  loadingRowsCount = 3,
  emptyStateComponent,
  title,
  description,
  pageSize = 10,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const renderCell = (item: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(item);
    }
    return item[column.key as keyof T];
  };

  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingRowsCount }).map((_, index) => (
        <tr key={`loading-row-${index}`}>
          {columns.map((column) => (
            <td key={`loading-cell-${column.key}`} style={{ padding: '10px', textAlign: 'center' }}>
              <div style={{ height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const renderContent = () => {
    if (isLoading) {
      return renderLoadingSkeleton();
    }

    if (data.length === 0 && emptyStateComponent) {
      return (
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
            {emptyStateComponent}
          </td>
        </tr>
      );
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return paginatedData.map((item) => (
      <tr
        key={keyExtractor(item)}
        className={`${rowStyle} ${onRowClick ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
        onClick={() => onRowClick && onRowClick(item)}
      >
        {columns.map((column) => (
          <td
            key={`${keyExtractor(item)}-${column.key}`}
            className={cellStyle}
            style={{
              textAlign: column.align || 'left',
              padding: '10px',
              width: column.width,
            }}
          >
            {renderCell(item, column)}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className={`border rounded-lg shadow ${tableContainerStyle}`} style={{ overflow: 'hidden' }}>
      {(title || description) && (
        <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
          {title && <h2 style={{ margin: 0 }}>{title}</h2>}
          {description && <p style={{ margin: 0, color: '#666' }}>{description}</p>}
        </div>
      )}
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        <table className={`w-full ${tableStyle}`} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr className={headerStyle}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    textAlign: column.align || 'left',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid #e0e0e0',
                    width: column.width,
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderContent()}</tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderTop: '1px solid #e0e0e0' }}>
          <button
            style={{ padding: '8px 16px', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '4px' }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={{ padding: '8px 16px', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '4px' }}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomTable;
