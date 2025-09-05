-- Create table for 2FA secrets
CREATE TABLE public.user_2fa_secrets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  encrypted_secret TEXT NOT NULL,
  backup_codes TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_2fa_secrets ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own 2FA secrets" 
ON public.user_2fa_secrets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own 2FA secrets" 
ON public.user_2fa_secrets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own 2FA secrets" 
ON public.user_2fa_secrets 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own 2FA secrets" 
ON public.user_2fa_secrets 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_2fa_secrets_updated_at
BEFORE UPDATE ON public.user_2fa_secrets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create unique constraint to ensure one active 2FA per user
CREATE UNIQUE INDEX idx_user_2fa_active ON public.user_2fa_secrets(user_id) WHERE is_active = true;