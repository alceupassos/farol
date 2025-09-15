
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Eye, FileText, Trash, UserPlus, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AccessPermissions = () => {
  // Simulated permissions data
  const [permissions, setPermissions] = useState([
    { 
      id: 1, 
      name: "Dr. Antônio Ferreira", 
      role: "Clínico Geral", 
      status: "Ativo", 
      type: "Médico", 
      access: ["Prontuários", "Medicamentos", "Métricas de Saúde"],
      expiry: "Permanente"
    },
    { 
      id: 2, 
      name: "Dra. Mariana Santos", 
      role: "Endocrinologista", 
      status: "Ativo", 
      type: "Médico", 
      access: ["Prontuários", "Medicamentos", "Métricas de Saúde"],
      expiry: "30/12/2023"
    },
    { 
      id: 3, 
      name: "Dr. Ricardo Mendes", 
      role: "Cardiologista", 
      status: "Pendente", 
      type: "Médico", 
      access: ["Prontuários", "Métricas de Saúde"],
      expiry: "Pendente"
    },
    { 
      id: 4, 
      name: "Maria Silva", 
      role: "Familiar", 
      status: "Ativo", 
      type: "Contato de Emergência", 
      access: ["QR de Emergência", "Medicamentos"],
      expiry: "Permanente"
    },
    { 
      id: 5, 
      name: "Hospital Santa Cruz", 
      role: "Instituição", 
      status: "Ativo", 
      type: "Hospital", 
      access: ["Prontuários", "Alergias", "Contato de Emergência"],
      expiry: "Renovação Anual"
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Dados Compartilhados</TableHead>
              <TableHead>Expiração</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>
                  <div className="font-medium">{permission.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{permission.role}</div>
                </TableCell>
                <TableCell>{permission.type}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {permission.access.map((item, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{permission.expiry}</TableCell>
                <TableCell>
                  <StatusBadge status={permission.status} />
                </TableCell>
                <TableCell>
                  {permission.status === "Pendente" ? (
                    <div className="flex space-x-1">
                      <Button size="icon" variant="ghost" className="text-green-500">
                        <CheckCircle2 size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-500">
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-1">
                      <Button size="icon" variant="ghost" title="Ver detalhes">
                        <Eye size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-500" title="Revogar acesso">
                        <Trash size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Solicitações Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {permissions.filter(p => p.status === "Pendente").length > 0 ? (
                permissions.filter(p => p.status === "Pendente").map(permission => (
                  <div key={permission.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{permission.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{permission.role}</p>
                      </div>
                       <Badge variant="outline" className="border-warning text-warning bg-warning/10">
                         Pendente
                       </Badge>
                    </div>
                    <div className="mt-3 space-y-2">
                      <p className="text-sm">Solicita acesso a:</p>
                      <div className="flex flex-wrap gap-1">
                        {permission.access.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button size="sm" variant="outline" className="text-red-500">Recusar</Button>
                      <Button size="sm">Aprovar</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 dark:text-green-400 mb-3" />
                  <p>Nenhuma solicitação pendente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conceder Novo Acesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Profissional ou Instituição</label>
                <input 
                  type="text" 
                  placeholder="Nome, e-mail ou ID" 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-950" 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Tipo de Acesso</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-950">
                  <option>Médico</option>
                  <option>Hospital</option>
                  <option>Laboratório</option>
                  <option>Familiar</option>
                  <option>Contato de Emergência</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Dados a Compartilhar</label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Prontuários Médicos</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Medicamentos</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Métricas de Saúde</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Alergias</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Contato de Emergência</label>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Período de Acesso</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-950">
                  <option>7 dias</option>
                  <option>30 dias</option>
                  <option>90 dias</option>
                  <option>1 ano</option>
                  <option>Até ser revogado</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              <UserPlus size={16} className="mr-2" />
              Conceder Acesso
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Ativo":
      return <Badge variant="outline" className="border-success text-success bg-success/10">Ativo</Badge>;
    case "Pendente":
      return <Badge variant="outline" className="border-warning text-warning bg-warning/10">Pendente</Badge>;
    case "Expirado":
      return <Badge variant="outline" className="border-muted-foreground text-muted-foreground bg-muted/10">Expirado</Badge>;
    case "Revogado":
      return <Badge variant="outline" className="border-error text-error bg-error/10">Revogado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default AccessPermissions;
