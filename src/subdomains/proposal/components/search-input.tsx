'use client';

import { Input } from '@/src/shared/modules/components/ui/input';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import ButtonFilterComponent from './button-filter.component';
import { CaregiverFilters } from '../types/filters.types';

interface SearchInputProps {
  onSearch?: (filters: CaregiverFilters) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<CaregiverFilters>({});

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filters = { ...appliedFilters, name: value || undefined };
    onSearch?.(filters);
  };

  const handleFilterChange = (filters: CaregiverFilters) => {
    setAppliedFilters(filters);
    const allFilters = { ...filters, name: searchTerm || undefined };
    onSearch?.(allFilters);
  };

  return (
    <div className="relative flex ">
      <Search className="absolute ml-3 mt-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Buscar cuidador "
        className="pl-8 w-full"
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
      />
      <ButtonFilterComponent onFilterChange={handleFilterChange} />
    </div>
  );
};

export default SearchInput;
