import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Row } from '../interfaces/Row';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Name', width: 500,
  renderCell: (params) => (
    <a href={params.row.path} target="_blank" rel="noopener noreferrer">
      {params.value}
    </a>
  ), },
  { field: 'phase', headerName: 'Status', width: 150 },
];

const apiEndpoint = 'http://localhost:8080/api/mission-apprentissage/products-lazy'

export default function DataTable() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data : Row[] ) => {
        const rowsWithId = data.map((row , index) => ({ id: index + 1, ...row }));
        setRows(rowsWithId);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
    </div>
  );
}