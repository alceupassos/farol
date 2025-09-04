import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MunicipalityContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cityName: '',
    state: '',
    population: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio
    toast({
      title: "Solicitação Enviada!",
      description: "Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração personalizada.",
    });

    // Reset form
    setFormData({
      cityName: '',
      state: '',
      population: '',
      contactName: '',
      position: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const populationRanges = [
    "Até 10.000 habitantes",
    "10.001 - 50.000 habitantes", 
    "50.001 - 100.000 habitantes",
    "100.001 - 500.000 habitantes",
    "Mais de 500.000 habitantes"
  ];

  const positions = [
    "Prefeito(a)",
    "Secretário(a) de Saúde",
    "Coordenador(a) de Saúde",
    "Assessor(a) Técnico(a)",
    "Diretor(a) de TI",
    "Outro"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-gradient-medical">
          Solicite uma Demonstração para Sua Cidade
        </h3>
        <p className="text-xl text-muted-foreground">
          Veja como o MedWallet pode transformar a gestão de saúde do seu município
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Demonstração Personalizada
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* City Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cityName" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Nome da Cidade *
                </Label>
                <Input
                  id="cityName"
                  value={formData.cityName}
                  onChange={(e) => handleChange('cityName', e.target.value)}
                  placeholder="Ex: São Paulo"
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  placeholder="Ex: SP"
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Population */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Faixa Populacional *
              </Label>
              <Select onValueChange={(value) => handleChange('population', value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Selecione a faixa populacional" />
                </SelectTrigger>
                <SelectContent>
                  {populationRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName">Nome do Responsável *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Cargo/Função *</Label>
                <Select onValueChange={(value) => handleChange('position', value)}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione seu cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu.email@cidade.gov.br"
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem (Opcional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Conte-nos mais sobre as necessidades da sua cidade ou dúvidas específicas..."
                rows={4}
                className="bg-background/50"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 text-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 px-8 py-3 text-lg font-semibold"
              >
                Solicitar Demonstração Gratuita
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Nossa equipe entrará em contato em até 24 horas
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
        <div className="p-6">
          <div className="text-2xl font-bold text-primary mb-2">Demonstração</div>
          <div className="text-muted-foreground">Personalizada para sua cidade</div>
        </div>
        <div className="p-6">
          <div className="text-2xl font-bold text-primary mb-2">Suporte</div>
          <div className="text-muted-foreground">Implementação completa</div>
        </div>
        <div className="p-6">
          <div className="text-2xl font-bold text-primary mb-2">Treinamento</div>
          <div className="text-muted-foreground">Equipe técnica especializada</div>
        </div>
      </div>
    </div>
  );
};

export default MunicipalityContactForm;