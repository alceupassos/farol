import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OSSMetasDesempenho = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('trimestral');

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <h1>Metas & Desempenho</h1>
    </div>
  );
};

export default OSSMetasDesempenho;
