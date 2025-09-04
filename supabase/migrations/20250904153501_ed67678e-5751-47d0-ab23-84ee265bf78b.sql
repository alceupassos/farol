-- Create storage buckets for document management
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('medical-documents', 'medical-documents', false),
  ('identity-documents', 'identity-documents', false),
  ('exam-images', 'exam-images', false);

-- Create RLS policies for medical documents
CREATE POLICY "Users can upload their own medical documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own medical documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own medical documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own medical documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create RLS policies for identity documents
CREATE POLICY "Users can upload their own identity documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'identity-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own identity documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'identity-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create RLS policies for exam images
CREATE POLICY "Users can upload their own exam images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'exam-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own exam images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'exam-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Gestores can view all documents for municipal oversight
CREATE POLICY "Gestores can view all medical documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'medical-documents' AND EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'gestor'
));

CREATE POLICY "Médicos can view patient documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id IN ('medical-documents', 'exam-images') AND EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'medico'
));