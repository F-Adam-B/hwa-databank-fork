import { DataGrid } from '@mui/x-data-grid';
import { DataGridProps } from '../../types';
const gridStyle = { height: 300, width: '100%' };
const DataGridMUI = ({ rows, columns }: DataGridProps) => {
  return (
    <div style={gridStyle}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataGridMUI;
