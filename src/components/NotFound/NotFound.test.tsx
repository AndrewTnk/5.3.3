import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotFound } from './NotFound';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderNotFound() {
  return render(
    <MantineProvider>
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    </MantineProvider>
  );
}

describe('NotFound', () => {
  it('renders 404 error page', () => {
    renderNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(
      screen.getByText('К сожалению, запрашиваемая страница не существует.')
    ).toBeInTheDocument();
  });

  it('navigates to vacancies when button is clicked', async () => {
    const user = userEvent.setup();
    renderNotFound();

    const goToVacanciesButton = screen.getByText('Перейти к вакансиям');
    await user.click(goToVacanciesButton);

    expect(mockNavigate).toHaveBeenCalledWith('/vacancies/moscow');
  });
});
