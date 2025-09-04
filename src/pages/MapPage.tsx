import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GoogleMapsPindamonhangaba from '@/components/maps/GoogleMapsPindamonhangaba';

const MapPage = () => {
  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Mapa Epidemiológico
            </h1>
            <p className="text-muted-foreground">
              Visualização geográfica dos dados epidemiológicos de Pindamonhangaba
            </p>
          </div>

          <GoogleMapsPindamonhangaba />
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;