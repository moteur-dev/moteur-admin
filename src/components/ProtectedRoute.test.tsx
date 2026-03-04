import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthContext } from '@/providers/AuthContext';
import type { User } from '@/types/User';

function renderWithAuth(
  authValue: {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string, user?: User) => void;
    logout: () => void;
  },
  initialEntry = '/projects'
) {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/projects" element={<ProtectedRoute><div data-testid="protected-content">Content</div></ProtectedRoute>} />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
          <Route path="/forbidden" element={<div data-testid="forbidden-page">Forbidden</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

const adminUser: User = {
  id: '1',
  email: 'admin@test.com',
  name: 'Admin',
  roles: ['admin'],
  isActive: true,
  projects: [],
  avatar: '',
};

const nonAdminUser: User = {
  id: '2',
  email: 'user@test.com',
  name: 'User',
  roles: ['editor'],
  isActive: true,
  projects: [],
  avatar: '',
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner when loading is true', () => {
    const { container } = renderWithAuth({
      user: null,
      token: null,
      loading: true,
      login: vi.fn(),
      logout: vi.fn(),
    });
    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('redirects to login when there is no token', () => {
    renderWithAuth({
      user: null,
      token: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects to login when there is no user', () => {
    renderWithAuth({
      user: null,
      token: 'some-token',
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects to forbidden when user does not have admin role', () => {
    renderWithAuth({
      user: nonAdminUser,
      token: 'token',
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
    expect(screen.getByTestId('forbidden-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('renders children when user is admin', () => {
    renderWithAuth({
      user: adminUser,
      token: 'token',
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
