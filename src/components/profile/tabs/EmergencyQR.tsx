
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AppButton from '@/components/ui/AppButton';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '@/contexts/LanguageContext';

const EmergencyQR = () => {
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const { t } = useLanguage();
  
  const handleGenerateQrCode = () => {
    setQrCodeGenerated(true);
    setAccessCode("MED-" + Math.random().toString(36).substring(2, 10).toUpperCase());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('emergency.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {t('emergency.description')}
        </p>
        
        <div className="border border-border rounded-lg p-5">
          {qrCodeGenerated ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-48 h-48 bg-white flex items-center justify-center p-2">
                <QRCodeSVG
                  value={`https://saudepublica.gov.br/emergency-access/${accessCode}`}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium mb-1">{t('emergency.access_code')}</div>
                <div className="font-mono text-lg font-semibold">{accessCode}</div>
              </div>
              
              <div className="flex space-x-2">
                <AppButton size="sm" variant="outline">
                  {t('emergency.download')}
                </AppButton>
                <AppButton size="sm" variant="outline">
                  {t('emergency.share')}
                </AppButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10">
              <p className="text-center mb-4">
                {t('emergency.description')}
              </p>
              <AppButton onClick={handleGenerateQrCode}>
                {t('emergency.generate')}
              </AppButton>
            </div>
          )}
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">{t('emergency.info_title')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{t('emergency.info.name')}</li>
            <li>{t('emergency.info.contact')}</li>
            <li>{t('emergency.info.blood')}</li>
            <li>{t('emergency.info.allergies')}</li>
            <li>{t('emergency.info.medications')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyQR;
