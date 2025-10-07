import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type CertificateProps = {
  title: string;
  issuedTo: string;
  issuedBy: string;
  issueDate: string;
  expiryDate?: string;
  certificateId: string;
  status?: 'valid' | 'expired' | 'revoked';
  className?: string;
};

export const Certificate: React.FC<CertificateProps> = ({
  title,
  issuedTo,
  issuedBy,
  issueDate,
  expiryDate,
  certificateId,
  status = 'valid',
  className = '',
}) => {
  const statusVariant = {
    valid: 'bg-green-100 text-green-800',
    expired: 'bg-yellow-100 text-yellow-800',
    revoked: 'bg-red-100 text-red-800',
  }[status];

  return (
    <Card className={`border-2 border-gray-200 shadow-md ${className}`}>
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
          <Badge className={statusVariant}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Issued To:</span>
            <span className="text-sm text-gray-900">{issuedTo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Issued By:</span>
            <span className="text-sm text-gray-900">{issuedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Issue Date:</span>
            <span className="text-sm text-gray-900">
              {new Date(issueDate).toLocaleDateString()}
            </span>
          </div>
          {expiryDate && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Expiry Date:</span>
              <span className="text-sm text-gray-900">
                {new Date(expiryDate).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Certificate ID:</span>
            <span className="text-sm font-mono text-gray-700">{certificateId}</span>
          </div>
        </div>
        
        {status === 'expired' && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-md">
            ⚠️ This certificate has expired. Please renew it.
          </div>
        )}
        
        {status === 'revoked' && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
            ⚠️ This certificate has been revoked and is no longer valid.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Certificate;
