import React from 'react';
import { Box, Typography } from '@mui/material';
import { Character } from '../types/character';
import CharacterCard from './CharacterCard';
import LoadingSpinner from './LoadingSpinner';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  onCharacterClick: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  error,
  onCharacterClick,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (characters.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography>Ничего не найдено</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {characters.map((character) => (
        <Box key={character.url}>
          <CharacterCard
            character={character}
            onClick={onCharacterClick}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CharacterList;