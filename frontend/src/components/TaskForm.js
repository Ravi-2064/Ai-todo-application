import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as BackIcon,
  AutoAwesome as AIIcon,
  Lightbulb as SuggestionIcon,
  PriorityHigh as PriorityIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { taskService } from '../services/taskService';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchTask();
    } else if (location.state?.suggestion) {
      // Pre-fill form with AI suggestion
      const suggestion = location.state.suggestion;
      setFormData({
        title: suggestion.title || '',
        description: suggestion.description || '',
        priority: suggestion.priority || '',
        category: suggestion.category || '',
      });
    }
  }, [id, location.state]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const task = await taskService.getTask(id);
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority || '',
        category: task.category || '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAIAnalysis = async () => {
    if (!formData.title.trim()) {
      setError('Please enter a task title first');
      return;
    }

    try {
      setAiProcessing(true);
      setError('');
      
      // Simulate AI analysis - in real app, this would call your AI service
      const analysis = await analyzeTaskWithAI(formData.title, formData.description);
      setAiSuggestions(analysis);
      
      // Auto-apply suggestions if they make sense
      if (analysis.priority && !formData.priority) {
        setFormData(prev => ({ ...prev, priority: analysis.priority }));
      }
      if (analysis.category && !formData.category) {
        setFormData(prev => ({ ...prev, category: analysis.category }));
      }
    } catch (err) {
      setError('AI analysis failed. Please try again.');
    } finally {
      setAiProcessing(false);
    }
  };

  const analyzeTaskWithAI = async (title, description) => {
    // Simulate AI analysis - replace with actual AI service call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const text = `${title} ${description}`.toLowerCase();
    
    // Simple keyword-based analysis
    const suggestions = {};
    
    // Priority analysis
    if (text.includes('urgent') || text.includes('asap') || text.includes('deadline')) {
      suggestions.priority = 'High';
    } else if (text.includes('important') || text.includes('meeting')) {
      suggestions.priority = 'Medium';
    } else {
      suggestions.priority = 'Low';
    }
    
    // Category analysis
    if (text.includes('work') || text.includes('office') || text.includes('meeting')) {
      suggestions.category = 'Work';
    } else if (text.includes('home') || text.includes('house') || text.includes('clean')) {
      suggestions.category = 'Home';
    } else if (text.includes('study') || text.includes('learn') || text.includes('read')) {
      suggestions.category = 'Learning';
    } else if (text.includes('health') || text.includes('exercise') || text.includes('gym')) {
      suggestions.category = 'Health';
    } else {
      suggestions.category = 'Personal';
    }
    
    return suggestions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (isEditing) {
        await taskService.updateTask(id, formData);
      } else {
        await taskService.createTask(formData);
      }
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Tasks
        </Button>
        
        <Typography variant="h4" gutterBottom>
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter your task title..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleAIAnalysis}
                        disabled={aiProcessing || !formData.title.trim()}
                        color="primary"
                        title="Analyze with AI"
                      >
                        {aiProcessing ? <CircularProgress size={20} /> : <AIIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Add more details about your task..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Learning">Learning</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* AI Suggestions Display */}
            {Object.keys(aiSuggestions).length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SuggestionIcon color="primary" />
                    AI Suggestions
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Based on your task content, here are some suggestions:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {aiSuggestions.priority && (
                      <Chip
                        label={`Priority: ${aiSuggestions.priority}`}
                        color={aiSuggestions.priority === 'High' ? 'error' : aiSuggestions.priority === 'Medium' ? 'warning' : 'default'}
                        icon={<PriorityIcon />}
                        variant="outlined"
                      />
                    )}
                    {aiSuggestions.category && (
                      <Chip
                        label={`Category: ${aiSuggestions.category}`}
                        icon={<CategoryIcon />}
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading || !formData.title.trim()}
                >
                  {loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm; 