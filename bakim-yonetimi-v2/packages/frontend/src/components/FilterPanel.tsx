import { useState } from 'react';
import { Box, TextField, MenuItem, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterPanelProps {
  onSearch?: (value: string) => void;
  onStatusFilter?: (value: string) => void;
  onDateRangeFilter?: (startDate: string, endDate: string) => void;
  onCategoryFilter?: (value: string) => void;
  onClearFilters?: () => void;
  statusOptions?: FilterOption[];
  categoryOptions?: FilterOption[];
  showDateFilter?: boolean;
  showStatusFilter?: boolean;
  showCategoryFilter?: boolean;
}

const FilterPanel = ({
  onSearch,
  onStatusFilter,
  onDateRangeFilter,
  onCategoryFilter,
  onClearFilters,
  statusOptions = [
    { label: 'Tümü', value: '' },
    { label: 'Onaylandı', value: 'approved' },
    { label: 'Beklemede', value: 'pending' },
    { label: 'Reddedildi', value: 'rejected' },
  ],
  categoryOptions = [],
  showDateFilter = false,
  showStatusFilter = true,
  showCategoryFilter = false,
}: FilterPanelProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusValue(value);
    onStatusFilter?.(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
    onCategoryFilter?.(value);
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      onDateRangeFilter?.(startDate, endDate);
    }
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setStatusValue('');
    setCategoryValue('');
    setStartDate('');
    setEndDate('');
    onClearFilters?.();
  };

  const hasActiveFilters = searchValue || statusValue || categoryValue || startDate || endDate;

  return (
    <Box
      sx={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        border: '1px solid var(--gray-200)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <FilterListIcon sx={{ color: 'var(--gray-600)' }} />
        <Box sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gray-900)' }}>
          Filtreler
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end',
        }}
      >
        {/* Search Field */}
        <TextField
          size="small"
          placeholder="Ara..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--gray-400)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            },
          }}
        />

        {/* Status Filter */}
        {showStatusFilter && (
          <TextField
            select
            size="small"
            label="Durum"
            value={statusValue}
            onChange={(e) => handleStatusChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              },
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Category Filter */}
        {showCategoryFilter && categoryOptions.length > 0 && (
          <TextField
            select
            size="small"
            label="Kategori"
            value={categoryValue}
            onChange={(e) => handleCategoryChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              },
            }}
          >
            <MenuItem value="">Tümü</MenuItem>
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Date Range Filter */}
        {showDateFilter && (
          <>
            <TextField
              type="date"
              size="small"
              label="Başlangıç Tarihi"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                handleDateChange();
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            />
            <TextField
              type="date"
              size="small"
              label="Bitiş Tarihi"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                handleDateChange();
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            />
          </>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            sx={{
              color: 'var(--gray-600)',
              borderColor: 'var(--gray-300)',
              '&:hover': {
                borderColor: 'var(--gray-400)',
                backgroundColor: 'var(--gray-50)',
              },
            }}
          >
            Temizle
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FilterPanel;
