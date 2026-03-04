import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ForbiddenPage } from './ForbiddenPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderForbiddenPage() {
  return render(
    <MemoryRouter>
      <ForbiddenPage />
    </MemoryRouter>
  );
}

describe('ForbiddenPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders access denied message', () => {
    renderForbiddenPage();
    expect(screen.getByRole('heading', { level: 2, name: /access denied/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have permission/i)).toBeInTheDocument();
    expect(screen.getByText(/administrator access is required/i)).toBeInTheDocument();
  });

  it('has Sign in with a different account button that navigates to /login', () => {
    renderForbiddenPage();
    const signInButton = screen.getByRole('button', { name: /sign in with a different account/i });
    fireEvent.click(signInButton);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('has Back to projects button that navigates to /projects', () => {
    renderForbiddenPage();
    const backButton = screen.getByRole('button', { name: /back to projects/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });
});
