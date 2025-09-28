import { useState } from 'react';

const TestPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Página de Teste</h1>
        <div className="text-sm text-muted-foreground">
          Esta é uma página de teste para verificar a navegação
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Contador</h3>
          <p className="text-2xl font-bold">{count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="mt-2 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground"
          >
            Incrementar
          </button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Status</h3>
          <p className="text-sm text-green-600">✅ Funcionando</p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Layout</h3>
          <p className="text-sm text-blue-600">Sidebar Fixo</p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Navegação</h3>
          <p className="text-sm text-purple-600">Teste OK</p>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Teste de Componentes</h2>
        <p className="text-muted-foreground">
          Esta página serve para testar se todos os componentes básicos estão funcionando corretamente.
          O layout deve estar fixo com sidebar sempre visível e conteúdo não colapsando.
        </p>
      </div>
    </div>
  );
};

export default TestPage;
