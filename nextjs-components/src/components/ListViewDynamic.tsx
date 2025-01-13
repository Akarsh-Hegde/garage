import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const API_URL = "http://localhost:5000/api";

const ListView: React.FC<{ collectionName: string }> = ({ collectionName }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${collectionName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${collectionName}: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRow = () => {
    if (data.length > 0) {
      const newRowTemplate = Object.fromEntries(Object.keys(data[0]).map((key) => [key, ""]));
      setNewRow(newRowTemplate);
    }
  };

  const handleSaveNewRow = async () => {
    try {
      const newPayload = { ...newRow };
      delete newPayload._id; // Remove `_id` before sending to the server
  
      const response = await fetch(`${API_URL}/${collectionName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add new row.");
      }
      fetchData(); // Refresh the data after adding a row
      setNewRow(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while adding a new row.");
    }
  };
  
  const handleEditRow = (index: number) => {
    setEditingRow(index);
  };

  const handleSaveEdit = async (index: number) => {
    try {
      const response = await fetch(`${API_URL}/${collectionName}/${data[index]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data[index]),
      });
      if (!response.ok) {
        throw new Error("Failed to update row.");
      }
      setEditingRow(null);
      fetchData();
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the row.");
    }
  };

  const handleDeleteRow = async (index: number) => {
    try {
      const response = await fetch(`${API_URL}/${collectionName}/${data[index]._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete row.");
      }
      fetchData();
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the row.");
    }
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderTableHeaders = () => {
    if (data.length === 0) return null;
    const keys = Object.keys(data[0]).filter((key) => key !== "_id");
    return (
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key} onClick={() => requestSort(key)} style={{ ...styles.th }}>
              <div style={styles.thContent}>
                {key.replace(/_/g, " ").toUpperCase()}
                {sortConfig?.key === key &&
                  (sortConfig.direction === "asc" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />)}
              </div>
            </th>
          ))}
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    if (filteredData.length === 0) return null;
    const keys = Object.keys(filteredData[0]).filter((key) => key !== "_id");
    return (
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index}>
            {keys.map((key) => (
              <td key={key} style={styles.td}>
                {editingRow === index ? (
                  <input
                    type="text"
                    value={item[key]}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index][key] = e.target.value;
                      setData(newData);
                    }}
                    style={styles.input}
                  />
                ) : (
                  String(item[key])
                )}
              </td>
            ))}
            <td style={styles.td}>
              {editingRow === index ? (
                <>
                  <button onClick={() => handleSaveEdit(index)} style={styles.actionButton}>
                    <FaSave />
                  </button>
                  <button onClick={() => setEditingRow(null)} style={styles.actionButton}>
                    <FaTimes />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditRow(index)} style={styles.actionButton}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteRow(index)} style={styles.actionButton}>
                    <FaTrash />
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
        {newRow && (
          <tr>
            {keys.map((key) => (
              <td key={key} style={styles.td}>
                <input
                  type="text"
                  value={newRow[key]}
                  onChange={(e) => setNewRow({ ...newRow, [key]: e.target.value })}
                  style={styles.input}
                />
              </td>
            ))}
            <td style={styles.td}>
              <button onClick={handleSaveNewRow} style={styles.actionButton}>
                <FaSave />
              </button>
              <button onClick={() => setNewRow(null)} style={styles.actionButton}>
                <FaTimes />
              </button>
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Data from "{collectionName}"</h2>
      {isLoading ? (
        <p style={styles.message}>Loading...</p>
      ) : error ? (
        <p style={styles.error}>Error: {error}</p>
      ) : data.length === 0 ? (
        <p style={styles.message}>No data available for this collection.</p>
      ) : (
        <>
          <div style={styles.topControls}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button onClick={handleAddRow} style={styles.addButton}>
              <FaPlus /> Add Row
            </button>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              {renderTableHeaders()}
              {renderTableRows()}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px", maxWidth: "100%", margin: "0 auto" },
  title: { textAlign: "center", fontSize: "24px", fontWeight: "bold" },
  message: { textAlign: "center", fontSize: "16px", color: "#555" },
  error: { textAlign: "center", fontSize: "16px", color: "red" },
  topControls: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  searchInput: { padding: "8px", fontSize: "14px", border: "1px solid #ddd", borderRadius: "4px", width: "200px" },
  addButton: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  tableContainer: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    cursor: "pointer",
  },
  thContent: { display: "flex", alignItems: "center", gap: "5px" },
  td: { border: "1px solid #ddd", padding: "12px", textAlign: "left" },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  actionButton: {
    padding: "6px",
    fontSize: "14px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
};

export default ListView;

