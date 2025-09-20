import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Chip,
  Breadcrumbs,
} from '@mui/material';
import { Home as HomeIcon, ArrowBack } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchCharacter, updateCharacter, clearCurrentCharacter } from '../store/slices/charactersSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { Character } from '../types/character';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCharacter, loading, error } = useAppSelector(
    (state) => state.characters
  );

  const [editedCharacter, setEditedCharacter] = useState<Character | null>(currentCharacter);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacter(id));
    }
    return () => {
      dispatch(clearCurrentCharacter());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setEditedCharacter(currentCharacter);
  }, [currentCharacter]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedCharacter) {
      dispatch(updateCharacter(editedCharacter));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCharacter(currentCharacter);
    setIsEditing(false);
  };

  const handleChange = (field: keyof Character, value: string) => {
    if (editedCharacter) {
      setEditedCharacter({
        ...editedCharacter,
        [field]: value,
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          На главную
        </Button>
      </Container>
    );
  }

  if (!currentCharacter) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Character not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          На главную
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Персонажи
        </Link>
        <Typography color="text.primary">{currentCharacter.name}</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            {isEditing ? (
              <TextField
                value={editedCharacter?.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                fullWidth
              />
            ) : (
              currentCharacter.name
            )}
          </Typography>
          {!isEditing ? (
            <Button variant="contained" onClick={handleEdit}>
              редактировать
            </Button>
          ) : (
            <Box>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                сохранить
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Отмена
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom>
              Характеристики
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Высота"
                value={isEditing ? editedCharacter?.height || '' : currentCharacter.height}
                onChange={(e) => handleChange('height', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Вес"
                value={isEditing ? editedCharacter?.mass || '' : currentCharacter.mass}
                onChange={(e) => handleChange('mass', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Цвет волос"
                value={isEditing ? editedCharacter?.hair_color || '' : currentCharacter.hair_color}
                onChange={(e) => handleChange('hair_color', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="цвет"
                value={isEditing ? editedCharacter?.skin_color || '' : currentCharacter.skin_color}
                onChange={(e) => handleChange('skin_color', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom>
              Информация
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="цвет глаз"
                value={isEditing ? editedCharacter?.eye_color || '' : currentCharacter.eye_color}
                onChange={(e) => handleChange('eye_color', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="год рожденния"
                value={isEditing ? editedCharacter?.birth_year || '' : currentCharacter.birth_year}
                onChange={(e) => handleChange('birth_year', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Пол"
                value={isEditing ? editedCharacter?.gender || '' : currentCharacter.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Дополнительная информация
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip label={`Фильмы: ${currentCharacter.films.length}`} />
            <Chip label={`разновидность: ${currentCharacter.species.length}`} />
            <Chip label={`Транспорт: ${currentCharacter.vehicles.length}`} />
            <Chip label={`Кораблей: ${currentCharacter.starships.length}`} />
          </Box>
        </Box>
      </Paper>

      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mt: 3 }}
      >
        Вернуться на главную страницу
      </Button>
    </Container>
  );
};

export default CharacterDetailPage;