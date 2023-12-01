import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Row } from '../interfaces/Row';
import MarkdownViewer from './MarkdownViewer';

const apiEndpoint = 'http://localhost:8080/api/mission-apprentissage/products-lazy'

export default function DataTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data : Row[] ) => {
        const rowsWithId = data.map((row , index) => ({ id: index + 1, ...row }));
        setRows(rowsWithId);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleLinkClick = (path: string) => {
    const selectedRow = rows.find((row) => row.path === path);
    setSelectedRow(selectedRow || null);
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Name', width: 500,
    renderCell: (params) => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(params.row.path); }}>
          {params.value}
        </a>
    ), },
    { field: 'phase', headerName: 'Status', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pagination
        pageSizeOptions={[5, 10]}
      />
      {selectedRow && (
        <MarkdownViewer url={selectedRow.path} phase={selectedRow.phase}/>
      )}
    </div>
  );
}