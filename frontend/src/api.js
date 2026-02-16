// API Service Layer for Todo App
const API_BASE_URL = 'http://localhost:8000';

/**
 * Get authorization headers with JWT token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Handle API errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  return response.json();
};

/**
 * API methods
 */
export const api = {
  /**
   * Login user
   */
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(response);
  },

  /**
   * Register new user
   */
  async register(username, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(response);
  },

  /**
   * Get all todos for current user
   */
  async getTodos() {
    const response = await fetch(`${API_BASE_URL}/todo_items`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  /**
   * Create a new todo
   */
  async createTodo(title, description = '') {
    const response = await fetch(`${API_BASE_URL}/todo_items`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title,
        description,
        completed: false,
        is_pinned: false
      })
    });
    return handleResponse(response);
  },

  /**
   * Update a todo (title, description)
   */
  async updateTodo(id, updates) {
    const response = await fetch(`${API_BASE_URL}/todo_items/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return handleResponse(response);
  },

  /**
   * Toggle todo completed status
   */
  async toggleComplete(id) {
    const response = await fetch(`${API_BASE_URL}/todo_items/${id}/complete`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  /**
   * Toggle todo pin status
   */
  async togglePin(id) {
    const response = await fetch(`${API_BASE_URL}/todo_items/${id}/pin`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  /**
   * Delete a todo
   */
  async deleteTodo(id) {
    const response = await fetch(`${API_BASE_URL}/todo_items/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};
