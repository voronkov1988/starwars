import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onPageChange,
  itemsPerPage = 10,
}) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  const safePage = Math.max(1, Math.min(page, totalPages));

  if (totalPages <= 1) return null;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (value >= 1 && value <= totalPages) {
      onPageChange(value);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <MuiPagination
        count={totalPages}
        page={safePage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;