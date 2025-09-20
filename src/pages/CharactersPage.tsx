import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchCharacters, setPage, setSearchTerm } from '../store/slices/charactersSlice';
import CharacterList from '../components/CharacterList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const CharactersPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { characters, loading, error, count, currentPage, searchTerm } = useAppSelector(
    (state) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters({ page: currentPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handleSearch = (term: string) => {
    dispatch(setPage(1));
    dispatch(setSearchTerm(term));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo(0, 0);
  };

  const handleCharacterClick = (character: any) => {
    const id = character.url.split('/').filter(Boolean).pop();
    navigate(`/character/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          персонажи из звездных войн
        </Typography>
        <SearchBar onSearch={handleSearch} placeholder="Найти персонажа..." />
      </Box>

      <CharacterList
        characters={characters}
        loading={loading}
        error={error}
        onCharacterClick={handleCharacterClick}
      />

      <Pagination
        count={count}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default CharactersPage;