
import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { ProfileSection } from '../types';

interface PersonalDataProps {
  sections: ProfileSection[];
}

const PersonalData = ({ sections }: PersonalDataProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      {sections.map((section) => (
        <div key={section.id} className="overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
          >
            <span className="font-medium">{section.title}</span>
            {expandedSections[section.id] ? (
              <ChevronUp size={18} className="text-gray-500" />
            ) : (
              <ChevronDown size={18} className="text-gray-500" />
            )}
          </button>
          
          {expandedSections[section.id] && (
            <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <div className="text-sm text-gray-500">{field.label}</div>
                  {field.isArray ? (
                    <div className="space-y-1">
                      {(field.value as string[]).map((item, index) => (
                        <div 
                          key={index}
                          className="bg-gray-100 dark:bg-gray-800 text-sm py-1 px-2 rounded"
                        >
                          {item}
                        </div>
                      ))}
                      <button className="text-xs text-primary flex items-center mt-1">
                        <Plus size={12} className="mr-1" />
                        Adicionar {field.label}
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm font-medium">
                      {field.value || <span className="text-gray-400 italic">Não especificado</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PersonalData;
