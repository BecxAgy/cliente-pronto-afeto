'use client';

import { Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

import SignatureCanvas from 'react-signature-canvas';

const SignaturField = () => {
  const signCanvas = useRef<SignatureCanvas | null>(null);
  const [signatureData, setSignatureData] = useState<string>('');

  // atualiza o valor da assinatura sempre que forr desenhado algo
  const handleEnd = () => {
    if (signCanvas.current) {
      setSignatureData(signCanvas.current.toDataURL('image/png'));
    }
  };

  const clearSignature = () => {
    if (signCanvas.current) {
      signCanvas.current.clear();
      setSignatureData('');
    }
  };

  return (
    <div className="flex items-start mt-8 w-full ">
      <div className="flex flex-col w-[700px]">
        <div className="flex justify-between">
          <p className="font-medium">Assine o contrato</p>
          <Trash2
            onClick={clearSignature}
            className="text-red-500 w-5 h-5 cursor-pointer my-auto mr-2"
          />
        </div>
        {/* Área de Assinatura */}
        <div className="relative mt-4 w-full">
          <input type="hidden" name="image" value={signatureData} />
          <SignatureCanvas
            ref={signCanvas}
            penColor="black"
            canvasProps={{
              className:
                'w-full h-40   border-[0.1rem] border-accent/10 rounded-2xl',
            }}
            onEnd={handleEnd}
          />
        </div>
      </div>
    </div>
  );
};
export default SignaturField;
