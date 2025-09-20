import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const extractIdFromUrl = (url: string): string => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '';
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
      onClick={() => onClick(character)}
    >
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {character.name}
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Высота: {character.height} cm
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Масса: {character.mass} kg
          </Typography>
          <Typography variant="body2" color="text.secondary">
            пол: {character.gender}
          </Typography>
          <Box display="flex" gap={0.5} flexWrap="wrap">
            <Chip 
              label={character.hair_color} 
              size="small" 
              variant="outlined" 
            />
            <Chip 
              label={character.eye_color} 
              size="small" 
              variant="outlined" 
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;