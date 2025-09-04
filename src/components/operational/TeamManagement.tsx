import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Clock, CheckCircle, AlertCircle, Plus, MessageSquare, Phone } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  avatar?: string;
  tasksCompleted: number;
  tasksAssigned: number;
  efficiency: number;
  workload: 'light' | 'normal' | 'heavy' | 'overloaded';
  lastActivity: Date;
  skills: string[];
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  productivity: number;
  currentTasks: number;
  completedToday: number;
}

export const TeamManagement = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  useEffect(() => {
    generateTeamData();
  }, []);

  const generateTeamData = () => {
    const sampleTeams: Team[] = [
      {
        id: '1',
        name: 'Análise de Documentos',
        productivity: 92,
        currentTasks: 45,
        completedToday: 28,
        members: [
          {
            id: '1',
            name: 'Dr. Ana Silva',
            role: 'Médica Revisora',
            department: 'Análise Médica',
            status: 'online',
            tasksCompleted: 12,
            tasksAssigned: 15,
            efficiency: 89,
            workload: 'normal',
            lastActivity: new Date(Date.now() - 5 * 60 * 1000),
            skills: ['Cardiologia', 'Clínica Geral', 'Revisão de Exames']
          },
          {
            id: '2',
            name: 'João Santos',
            role: 'Analista de Dados',
            department: 'Análise Médica',
            status: 'busy',
            tasksCompleted: 8,
            tasksAssigned: 12,
            efficiency: 78,
            workload: 'heavy',
            lastActivity: new Date(Date.now() - 2 * 60 * 1000),
            skills: ['Python', 'ML', 'Análise Estatística']
          },
          {
            id: '3',
            name: 'Maria Costa',
            role: 'Enfermeira Especialista',
            department: 'Análise Médica',
            status: 'online',
            tasksCompleted: 15,
            tasksAssigned: 18,
            efficiency: 95,
            workload: 'normal',
            lastActivity: new Date(Date.now() - 1 * 60 * 1000),
            skills: ['Enfermagem', 'Triagem', 'Cuidados Intensivos']
          }
        ]
      },
      {
        id: '2',
        name: 'Suporte Técnico',
        productivity: 87,
        currentTasks: 23,
        completedToday: 19,
        members: [
          {
            id: '4',
            name: 'Pedro Lima',
            role: 'Desenvolvedor Senior',
            department: 'TI',
            status: 'online',
            tasksCompleted: 6,
            tasksAssigned: 8,
            efficiency: 92,
            workload: 'normal',
            lastActivity: new Date(Date.now() - 3 * 60 * 1000),
            skills: ['React', 'Node.js', 'DevOps']
          },
          {
            id: '5',
            name: 'Laura Fernandes',
            role: 'Analista de Sistemas',
            department: 'TI',
            status: 'away',
            tasksCompleted: 4,
            tasksAssigned: 7,
            efficiency: 68,
            workload: 'light',
            lastActivity: new Date(Date.now() - 45 * 60 * 1000),
            skills: ['Análise de Sistemas', 'UX/UI', 'Testes']
          }
        ]
      },
      {
        id: '3',
        name: 'Epidemiologia',
        productivity: 94,
        currentTasks: 18,
        completedToday: 11,
        members: [
          {
            id: '6',
            name: 'Dr. Carlos Mendes',
            role: 'Epidemiologista',
            department: 'Saúde Pública',
            status: 'online',
            tasksCompleted: 7,
            tasksAssigned: 9,
            efficiency: 88,
            workload: 'normal',
            lastActivity: new Date(Date.now() - 10 * 60 * 1000),
            skills: ['Epidemiologia', 'Estatística', 'Saúde Pública']
          },
          {
            id: '7',
            name: 'Fernanda Oliveira',
            role: 'Analista de Saúde',
            department: 'Saúde Pública',
            status: 'busy',
            tasksCompleted: 9,
            tasksAssigned: 11,
            efficiency: 91,
            workload: 'heavy',
            lastActivity: new Date(Date.now() - 7 * 60 * 1000),
            skills: ['Análise de Dados', 'GIS', 'Relatórios']
          }
        ]
      }
    ];
    
    setTeams(sampleTeams);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'light': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'normal': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'heavy': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'overloaded': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getAllMembers = () => {
    return teams.flatMap(team => team.members);
  };

  const getFilteredMembers = () => {
    let members = getAllMembers();
    
    if (selectedTeam !== 'all') {
      const team = teams.find(t => t.id === selectedTeam);
      members = team ? team.members : [];
    }
    
    if (selectedDepartment !== 'all') {
      members = members.filter(member => member.department === selectedDepartment);
    }
    
    return members;
  };

  const departments = [...new Set(getAllMembers().map(member => member.department))];

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Produtividade</span>
                  <span className="font-semibold">{team.productivity}%</span>
                </div>
                <Progress value={team.productivity} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">{team.currentTasks}</div>
                    <div className="text-xs text-muted-foreground">Tarefas Ativas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">{team.completedToday}</div>
                    <div className="text-xs text-muted-foreground">Concluídas Hoje</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{team.members.length} membros</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Filtros:</span>
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione uma equipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Equipes</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Departamentos</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Membros da Equipe</TabsTrigger>
          <TabsTrigger value="workload">Distribuição de Carga</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredMembers().map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Eficiência</span>
                    <span className="text-sm font-semibold">{member.efficiency}%</span>
                  </div>
                  <Progress value={member.efficiency} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-500">{member.tasksCompleted}</div>
                      <div className="text-xs text-muted-foreground">Concluídas</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-500">{member.tasksAssigned - member.tasksCompleted}</div>
                      <div className="text-xs text-muted-foreground">Pendentes</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge className={getWorkloadColor(member.workload)}>
                      Carga: {member.workload}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Última atividade: {member.lastActivity.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Ligar
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-medium">Habilidades:</div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{member.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Carga de Trabalho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredMembers().map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{member.name}</span>
                        <Badge className={getWorkloadColor(member.workload)}>
                          {member.workload}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Tarefas: {member.tasksAssigned}</span>
                        <span>Concluídas: {member.tasksCompleted}</span>
                        <span>Pendentes: {member.tasksAssigned - member.tasksCompleted}</span>
                      </div>
                      <Progress 
                        value={(member.tasksCompleted / member.tasksAssigned) * 100} 
                        className="h-2 mt-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getFilteredMembers()
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .slice(0, 5)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-500">{member.efficiency}%</div>
                          <div className="text-xs text-muted-foreground">eficiência</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas da Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border border-border rounded-lg">
                      <div className="text-2xl font-bold">{getAllMembers().length}</div>
                      <div className="text-xs text-muted-foreground">Total de Membros</div>
                    </div>
                    <div className="text-center p-3 border border-border rounded-lg">
                      <div className="text-2xl font-bold text-green-500">
                        {getAllMembers().filter(m => m.status === 'online').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Online Agora</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Eficiência Média:</span>
                      <span className="font-bold">
                        {Math.round(getAllMembers().reduce((acc, m) => acc + m.efficiency, 0) / getAllMembers().length)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tarefas Totais:</span>
                      <span className="font-bold">
                        {getAllMembers().reduce((acc, m) => acc + m.tasksAssigned, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Concluídas Hoje:</span>
                      <span className="font-bold text-green-500">
                        {getAllMembers().reduce((acc, m) => acc + m.tasksCompleted, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};