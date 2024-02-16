import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

type DataGridProps = {
  rows: GridRowsProp[];
  columns: GridColDef[];
};

const DataGridMUI = ({ rows, columns }: DataGridProps) => {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataGridMUI;
