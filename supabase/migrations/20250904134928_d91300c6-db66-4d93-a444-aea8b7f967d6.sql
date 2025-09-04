-- Create households table for residential grouping
CREATE TABLE public.households (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT DEFAULT 'São Paulo',
  state TEXT DEFAULT 'SP',
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  responsible_agent_id UUID,
  family_size INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create household members table
CREATE TABLE public.household_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  cpf TEXT,
  birth_date DATE,
  relationship TEXT, -- 'responsavel', 'conjuge', 'filho', 'pai', 'mae', 'outros'
  is_primary_responsible BOOLEAN DEFAULT false,
  health_card_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(household_id, user_id)
);

-- Create medical documents table
CREATE TABLE public.medical_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES public.household_members(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL, -- 'exame', 'receita', 'atestado', 'prontuario', 'laudo'
  original_image_url TEXT,
  processed_data JSONB,
  raw_ocr_text TEXT,
  ai_interpretation JSONB,
  confidence_score DECIMAL(3, 2),
  processing_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'error'
  processed_by_agent TEXT, -- which AI agent processed this
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create document processing logs table
CREATE TABLE public.document_processing_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.medical_documents(id) ON DELETE CASCADE NOT NULL,
  processing_step TEXT NOT NULL, -- 'upload', 'ocr', 'ai_analysis', 'validation'
  status TEXT NOT NULL, -- 'started', 'completed', 'error'
  details JSONB,
  error_message TEXT,
  processing_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health agents table
CREATE TABLE public.health_agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  registration_number TEXT,
  role TEXT NOT NULL, -- 'agente_comunitario', 'enfermeiro', 'medico', 'auxiliar'
  assigned_areas TEXT[], -- array of neighborhoods/areas
  contact_phone TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.household_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_processing_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_agents ENABLE ROW LEVEL SECURITY;

-- Create policies for households
CREATE POLICY "Users can view their own household" 
ON public.households 
FOR SELECT 
USING (
  id IN (
    SELECT household_id FROM public.household_members 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own household" 
ON public.households 
FOR UPDATE 
USING (
  id IN (
    SELECT household_id FROM public.household_members 
    WHERE user_id = auth.uid() AND is_primary_responsible = true
  )
);

-- Create policies for household members
CREATE POLICY "Users can view their household members" 
ON public.household_members 
FOR SELECT 
USING (
  household_id IN (
    SELECT household_id FROM public.household_members 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Primary responsible can manage household members" 
ON public.household_members 
FOR ALL 
USING (
  household_id IN (
    SELECT household_id FROM public.household_members 
    WHERE user_id = auth.uid() AND is_primary_responsible = true
  )
);

-- Create policies for medical documents
CREATE POLICY "Users can view their household medical documents" 
ON public.medical_documents 
FOR SELECT 
USING (
  household_id IN (
    SELECT household_id FROM public.household_members 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert medical documents for their household" 
ON public.medical_documents 
FOR INSERT 
WITH CHECK (
  household_id IN (
    SELECT household_id FROM public.household_members 
    WHERE user_id = auth.uid()
  )
);

-- Create policies for health agents
CREATE POLICY "Health agents can view their assigned data" 
ON public.households 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.health_agents 
    WHERE user_id = auth.uid() AND active = true
  )
);

-- Create indexes for performance
CREATE INDEX idx_households_location ON public.households(latitude, longitude);
CREATE INDEX idx_household_members_household_id ON public.household_members(household_id);
CREATE INDEX idx_household_members_user_id ON public.household_members(user_id);
CREATE INDEX idx_medical_documents_household_id ON public.medical_documents(household_id);
CREATE INDEX idx_medical_documents_patient_id ON public.medical_documents(patient_id);
CREATE INDEX idx_medical_documents_type ON public.medical_documents(document_type);
CREATE INDEX idx_document_processing_logs_document_id ON public.document_processing_logs(document_id);

-- Create storage bucket for medical documents
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-documents', 'medical-documents', false);

-- Create storage policies
CREATE POLICY "Users can upload documents for their household" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'medical-documents' AND
  (storage.foldername(name))[1]::uuid IN (
    SELECT household_id::text FROM public.household_members 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can view documents from their household" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'medical-documents' AND
  (storage.foldername(name))[1]::uuid IN (
    SELECT household_id::text FROM public.household_members 
    WHERE user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_households_updated_at
BEFORE UPDATE ON public.households
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_household_members_updated_at
BEFORE UPDATE ON public.household_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_documents_updated_at
BEFORE UPDATE ON public.medical_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_agents_updated_at
BEFORE UPDATE ON public.health_agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();