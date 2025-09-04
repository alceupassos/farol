import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import PublicHealthLanding from '@/components/landing/PublicHealthLanding';

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            {children}
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

describe('PublicHealthLanding', () => {
  beforeEach(() => {
    // Reset any potential DOM modifications
    document.head.innerHTML = '';
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <TestWrapper>
        <PublicHealthLanding />
      </TestWrapper>
    );
    
    expect(getByText('Transforme a Saúde Pública do seu Município')).toBeInTheDocument();
  });

  it('displays the main hero section', () => {
    const { getByText } = render(
      <TestWrapper>
        <PublicHealthLanding />
      </TestWrapper>
    );
    
    expect(getByText('Saúde Pública Inteligente')).toBeInTheDocument();
    expect(getByText('Ver Demonstração')).toBeInTheDocument();
    expect(getByText('Ver Documentação')).toBeInTheDocument();
  });

  it('displays key features section', () => {
    const { getByText } = render(
      <TestWrapper>
        <PublicHealthLanding />
      </TestWrapper>
    );
    
    expect(getByText('Recursos Principais')).toBeInTheDocument();
    expect(getByText('Dashboards Executivos')).toBeInTheDocument();
    expect(getByText('Análise Epidemiológica IA')).toBeInTheDocument();
    expect(getByText('Gestão de Recursos')).toBeInTheDocument();
  });

  it('displays access buttons for different user types', () => {
    const { getByText } = render(
      <TestWrapper>
        <PublicHealthLanding />
      </TestWrapper>
    );
    
    expect(getByText('Acesso Gestor')).toBeInTheDocument();
    expect(getByText('Acesso Médico')).toBeInTheDocument();
    expect(getByText('Acesso Paciente')).toBeInTheDocument();
  });

  it('displays contact form', () => {
    const { getByText, getByLabelText } = render(
      <TestWrapper>
        <PublicHealthLanding />
      </TestWrapper>
    );
    
    expect(getByText('Solicite uma Demonstração')).toBeInTheDocument();
    expect(getByLabelText('Município *')).toBeInTheDocument();
    expect(getByLabelText('Nome do Responsável *')).toBeInTheDocument();
  });

  it('displays benefits section with statistics', () => {
    const { getByText } = render(
      <TestWrapper>
        <PublicHealthLanding />
      </TestWrapper>
    );
    
    expect(getByText('Benefícios para seu Município')).toBeInTheDocument();
    expect(getByText('+35%')).toBeInTheDocument();
    expect(getByText('-25%')).toBeInTheDocument();
    expect(getByText('-50%')).toBeInTheDocument();
    expect(getByText('+90%')).toBeInTheDocument();
  });
});