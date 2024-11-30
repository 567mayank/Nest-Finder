import React, { useState } from 'react';

function Pricing({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    amount: data?.amount || '',
    currency: data?.currency || 'USD',
    securityDeposit: data?.securityDeposit || '',
    paymentTerms: data?.paymentTerms || 'Monthly',
    negotiability: data?.negotiability || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value === "true" ? true : false,
    }));
  };
  

  const handleEditClick = () => {
    if(isEditing){
      console.log(formData)
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Pricing Details</h2>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Amount */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm font-medium text-gray-600">
            {data.listingType === 'Sale'?'Amount':'Rent'}
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {/* Currency */}
        <div className="flex flex-col">
          <label htmlFor="currency" className="text-sm font-medium text-gray-600">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>

        {/* Security Deposit */}
        { data.listingType === 'Rent' &&
          <div className="flex flex-col">
            <label htmlFor="securityDeposit" className="text-sm font-medium text-gray-600">
              Security Deposit
            </label>
            <input
              type="number"
              id="securityDeposit"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
        }

        {/* Payment Terms */}
        { data.listingType === 'Rent' &&
          <div className="flex flex-col">
            <label htmlFor="paymentTerms" className="text-sm font-medium text-gray-600">
              Payment Terms
            </label>
            <select
              id="paymentTerms"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        }

        {/* Negotiability */}
        <div className="flex flex-col">
          <label htmlFor="negotiability" className="text-sm font-medium text-gray-600">
            Negotiability
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                id="negotiability-yes"
                name="negotiability"
                value={true}
                checked={formData.negotiability === true}
                onChange={handleChange}
                disabled={!isEditing}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="negotiability-no"
                name="negotiability"
                value={false}
                checked={formData.negotiability === false}
                onChange={handleChange}
                disabled={!isEditing}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;