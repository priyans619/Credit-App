import React, { useState } from 'react';

interface FormData {
  fullName: string;
  loanTenure: string;
  reasonForLoan: string;
  amountNeeded: string;
  employmentStatus: string;
  employmentAddress: string;
}

const ApplyLoan: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    loanTenure: '',
    reasonForLoan: '',
    amountNeeded: '',
    employmentStatus: '',
    employmentAddress: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-gray-50 border-2 border-gray-300 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">APPLY FOR A LOAN</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            'Full Name as it appears on bank account',
            'Loan tenure (in months)',
            'Reason for loan',
            'How much do you need?',
            'Employment status',
            'Employment Address'
          ].map((placeholder, index) => (
            <div key={index}>
              <label className="block mb-2 text-sm font-medium text-gray-700">{placeholder}</label>
              <input
                type="text"
                name={placeholder.replace(/\s+/g, '').toLowerCase()}
                placeholder={placeholder}
                value={formData[placeholder.replace(/\s+/g, '').toLowerCase() as keyof FormData]}
                onChange={handleChange}
                className="appearance-none rounded-md block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
              />
            </div>
          ))}
          <button type="submit" className="bg-green-900 text-white py-2 px-6 rounded-lg">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
