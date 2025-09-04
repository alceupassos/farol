import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel: () => void;
  type: 'identity' | 'medical' | 'exam';
  title: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onCancel,
  type,
  title
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Câmera traseira para documentos
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      toast({
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Ajustar canvas para o tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenhar frame atual do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converter para imagem
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
  }, [stopCamera]);

  const confirmCapture = useCallback(() => {
    if (!capturedImage || !canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `${type}-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });
        onCapture(file);
      }
    }, 'image/jpeg', 0.8);
  }, [capturedImage, type, onCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCapture(file);
    }
  }, [onCapture]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const getInstructions = () => {
    switch (type) {
      case 'identity':
        return 'Posicione o documento de forma que fique bem visível e legível. Evite reflexos e sombras.';
      case 'medical':
        return 'Fotografe receitas médicas, relatórios ou laudos de forma clara e bem iluminada.';
      case 'exam':
        return 'Capture imagens de exames (raio-x, ultrassom, etc.) garantindo boa qualidade.';
      default:
        return 'Posicione o documento de forma clara e bem iluminada.';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {getInstructions()}
            </p>
          </div>

          {/* Área de captura */}
          <div className="relative bg-muted rounded-lg overflow-hidden">
            {!isStreaming && !capturedImage && (
              <div className="aspect-[4/3] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Clique em "Iniciar Câmera" ou "Escolher Arquivo"
                  </p>
                </div>
              </div>
            )}

            {isStreaming && (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-8 rounded-lg pointer-events-none" />
              </div>
            )}

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captura"
                className="w-full aspect-[4/3] object-cover"
              />
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Controles */}
          <div className="flex gap-2 justify-center">
            {!isStreaming && !capturedImage && (
              <>
                <Button onClick={startCamera} className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Iniciar Câmera
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Arquivo
                </Button>
              </>
            )}

            {isStreaming && (
              <>
                <Button onClick={capturePhoto} size="lg">
                  <Camera className="w-4 h-4 mr-2" />
                  Capturar
                </Button>
                <Button variant="outline" onClick={() => { stopCamera(); onCancel(); }}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </>
            )}

            {capturedImage && (
              <>
                <Button onClick={confirmCapture} size="lg">
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
                <Button variant="outline" onClick={retakePhoto}>
                  <Camera className="w-4 h-4 mr-2" />
                  Refazer
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraCapture;