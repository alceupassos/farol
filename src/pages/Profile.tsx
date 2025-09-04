
import MainLayout from '@/components/layout/MainLayout';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import BlockchainVerification from '@/components/profile/BlockchainVerification';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { 
  profileSections, 
  medicalRecords, 
  appointments, 
  healthMetrics, 
  accessLogs 
} from '@/data/profileData';

// Adding the required 'status' property to each medication with the correct type
const medications = [
  { id: "med1", name: "Lisinopril", dose: "10mg", frequency: "Uma vez ao dia", startDate: "15/01/2022", endDate: "Contínuo", status: "Ativo" as "Ativo" },
  { id: "med2", name: "Metformina", dose: "500mg", frequency: "Duas vezes ao dia", startDate: "10/03/2022", endDate: "Contínuo", status: "Ativo" as "Ativo" },
  { id: "med3", name: "Atorvastatina", dose: "20mg", frequency: "Uma vez ao dia antes de dormir", startDate: "05/08/2023", endDate: "Contínuo", status: "Ativo" as "Ativo" },
];

const Profile = () => {
  return (
    <MainLayout>
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <ProfileHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Barra Lateral */}
            <div className="md:col-span-1">
              <ProfileSidebar 
                name="João Silva"
                age="43 anos"
                gender="Masculino"
                lastUpdate="10 de Junho de 2023"
                bloodType="O+"
                allergies={3}
                activeMedications={3}
              />
            </div>
            
            {/* Conteúdo Principal */}
            <div className="md:col-span-3 animate-scale-in">
              <ProfileCard 
                sections={profileSections}
                medicalRecords={medicalRecords}
                medications={medications}
                appointments={appointments}
                healthMetrics={healthMetrics}
                accessLogs={accessLogs}
              />
              <BlockchainVerification />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
