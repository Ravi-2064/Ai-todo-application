import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  Fab,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as UncheckIcon,
  Search as SearchIcon,
  Lightbulb as SuggestionIcon,
  Schedule as ScheduleIcon,
  PriorityHigh as PriorityIcon,
} from '@mui/icons-material';
import { taskService } from '../services/taskService';

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await taskService.toggleTask(id);
      fetchTasks(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleGetSuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      const data = await taskService.getTaskSuggestions();
      setSuggestions(data);
      setSuggestionsOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed);
    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Tasks
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Chip label={`${tasks.length} Total`} color="primary" />
          <Chip label={`${completedCount} Completed`} color="success" />
          <Chip label={`${pendingCount} Pending`} color="warning" />
        </Box>

        {/* Search and Filter */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Tasks</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SuggestionIcon />}
              onClick={handleGetSuggestions}
              disabled={loadingSuggestions}
            >
              {loadingSuggestions ? 'Loading...' : 'AI Suggestions'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Task Grid */}
      {filteredTasks.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: task.completed ? '2px solid #4caf50' : '2px solid transparent',
                  opacity: task.completed ? 0.8 : 1,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h2"
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {task.title}
                    </Typography>
                    {task.priority && (
                      <Chip 
                        label={task.priority} 
                        size="small" 
                        color={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'default'}
                        icon={<PriorityIcon />}
                      />
                    )}
                  </Box>
                  
                  {task.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <ScheduleIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(task.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  {task.category && (
                    <Chip label={task.category} size="small" variant="outlined" sx={{ mt: 1 }} />
                  )}
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleTask(task.id)}
                      color={task.completed ? 'success' : 'default'}
                    >
                      {task.completed ? <CheckIcon /> : <UncheckIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/edit/${task.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTask(task.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm || filterStatus !== 'all' ? 'No tasks found' : 'No tasks yet!'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first task to get started.'
            }
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
          >
            Create Your First Task
          </Button>
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => navigate('/create')}
      >
        <AddIcon />
      </Fab>

      {/* AI Suggestions Dialog */}
      <Dialog open={suggestionsOpen} onClose={() => setSuggestionsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <SuggestionIcon color="primary" />
            AI Task Suggestions
          </Box>
        </DialogTitle>
        <DialogContent>
          {suggestions.length > 0 ? (
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <SuggestionIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={suggestion.title}
                    secondary={suggestion.reason}
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      navigate('/create', { state: { suggestion } });
                      setSuggestionsOpen(false);
                    }}
                  >
                    Use
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">
              No suggestions available at the moment.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuggestionsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskList; 