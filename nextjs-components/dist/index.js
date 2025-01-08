'use strict';

var React = require('react');

const Button = ({ label, onClick }) => {
    return React.createElement("button", { onClick: onClick }, label);
};

const Card = ({ title, content }) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, title),
        React.createElement("p", null, content)));
};

const WeatherWidget = ({ location, temperature, description, style = {}, // Default to an empty object
iconStyle = {}, // Default to an empty object
contentStyle = {}, // Default to an empty object
 }) => {
    const defaultWidgetStyles = {
        display: "flex",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        gap: "16px",
        backgroundColor: "#4299e1",
        ...style, // Override with user-provided styles
    };
    const defaultIconStyles = {
        fontSize: "24px",
        backgroundColor: "white",
        color: "#4299e1",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...iconStyle, // Override with user-provided icon styles
    };
    const defaultContentStyles = {
        flex: 1,
        ...contentStyle, // Override with user-provided content styles
    };
    const titleStyles = {
        margin: 0,
        fontSize: "18px",
    };
    const temperatureStyles = {
        fontSize: "24px",
        fontWeight: "bold",
        margin: "4px 0",
    };
    const descriptionStyles = {
        margin: 0,
        fontSize: "14px",
        opacity: 0.8,
    };
    return (React.createElement("div", { style: defaultWidgetStyles },
        React.createElement("div", { style: defaultIconStyles }, "\u26C5"),
        React.createElement("div", { style: defaultContentStyles },
            React.createElement("h2", { style: titleStyles }, location),
            React.createElement("p", { style: temperatureStyles },
                temperature,
                "\u00B0C"),
            React.createElement("p", { style: descriptionStyles }, description))));
};

function CustomTable({ data, columns, keyExtractor = (item) => item.id?.toString() ?? Math.random().toString(), onRowClick, tableContainerStyle = '', tableStyle = '', headerStyle = '', rowStyle = '', cellStyle = '', isLoading = false, loadingRowsCount = 3, emptyStateComponent, title, description, pageSize = 10, }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = Math.ceil(data.length / pageSize);
    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item);
        }
        return item[column.key];
    };
    const renderLoadingSkeleton = () => (React.createElement(React.Fragment, null, Array.from({ length: loadingRowsCount }).map((_, index) => (React.createElement("tr", { key: `loading-row-${index}` }, columns.map((column) => (React.createElement("td", { key: `loading-cell-${column.key}`, style: { padding: '10px', textAlign: 'center' } },
        React.createElement("div", { style: { height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px' } })))))))));
    const renderContent = () => {
        if (isLoading) {
            return renderLoadingSkeleton();
        }
        if (data.length === 0 && emptyStateComponent) {
            return (React.createElement("tr", null,
                React.createElement("td", { colSpan: columns.length, style: { textAlign: 'center', padding: '20px' } }, emptyStateComponent)));
        }
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = data.slice(startIndex, endIndex);
        return paginatedData.map((item) => (React.createElement("tr", { key: keyExtractor(item), className: `${rowStyle} ${onRowClick ? 'hover:bg-gray-100 cursor-pointer' : ''}`, onClick: () => onRowClick && onRowClick(item) }, columns.map((column) => (React.createElement("td", { key: `${keyExtractor(item)}-${column.key}`, className: cellStyle, style: {
                textAlign: column.align || 'left',
                padding: '10px',
                width: column.width,
            } }, renderCell(item, column)))))));
    };
    return (React.createElement("div", { className: `border rounded-lg shadow ${tableContainerStyle}`, style: { overflow: 'hidden' } },
        (title || description) && (React.createElement("div", { style: { padding: '16px', borderBottom: '1px solid #e0e0e0' } },
            title && React.createElement("h2", { style: { margin: 0 } }, title),
            description && React.createElement("p", { style: { margin: 0, color: '#666' } }, description))),
        React.createElement("div", { style: { maxHeight: '400px', overflow: 'auto' } },
            React.createElement("table", { className: `w-full ${tableStyle}`, style: { borderCollapse: 'collapse', width: '100%' } },
                React.createElement("thead", null,
                    React.createElement("tr", { className: headerStyle }, columns.map((column) => (React.createElement("th", { key: column.key, style: {
                            textAlign: column.align || 'left',
                            padding: '10px',
                            backgroundColor: '#f5f5f5',
                            borderBottom: '1px solid #e0e0e0',
                            width: column.width,
                        } }, column.header))))),
                React.createElement("tbody", null, renderContent()))),
        totalPages > 1 && (React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', padding: '16px', borderTop: '1px solid #e0e0e0' } },
            React.createElement("button", { style: { padding: '8px 16px', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '4px' }, onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage === 1 }, "Previous"),
            React.createElement("span", null,
                "Page ",
                currentPage,
                " of ",
                totalPages),
            React.createElement("button", { style: { padding: '8px 16px', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '4px' }, onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), disabled: currentPage === totalPages }, "Next")))));
}

exports.Button = Button;
exports.Card = Card;
exports.Table = CustomTable;
exports.WeatherWidget = WeatherWidget;
