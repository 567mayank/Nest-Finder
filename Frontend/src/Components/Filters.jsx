import React, { useState } from 'react';

function FilterBox({ onSubmit }) {
  const [filters, setFilters] = useState({
    parking: false,
    bhk: '',
    area: '',
    rentSale: 'all',
    petFriendly: false,
  });

  const [isOpen, setIsOpen] = useState(false); // Track if the dropdown is open or not

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
    setIsOpen(false); // Close the filter box after submitting
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Filter Properties
      </button>

      {/* Dropdown Filter Box */}
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white p-4 rounded-lg shadow-lg w-72 z-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Properties</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Parking */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                checked={filters.parking}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="parking" className="text-gray-700">Parking Available</label>
            </div>

            {/* BHK */}
            <div>
              <label htmlFor="bhk" className="block text-gray-700">BHK</label>
              <select
                id="bhk"
                name="bhk"
                value={filters.bhk}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
              </select>
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-gray-700">Area (in sqft)</label>
              <input
                type="number"
                id="area"
                name="area"
                value={filters.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter area in sqft"
              />
            </div>

            {/* Rent/Sale */}
            <div>
              <label className="block text-gray-700">Property Type</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="rent"
                    name="rentSale"
                    value="rent"
                    checked={filters.rentSale === 'rent'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="rent" className="text-gray-700">For Rent</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sale"
                    name="rentSale"
                    value="sale"
                    checked={filters.rentSale === 'sale'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="sale" className="text-gray-700">For Sale</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="all"
                    name="rentSale"
                    value="all"
                    checked={filters.rentSale === 'all'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="all" className="text-gray-700">Any</label>
                </div>
              </div>
            </div>

            {/* Pet Friendly */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="petFriendly"
                name="petFriendly"
                checked={filters.petFriendly}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="petFriendly" className="text-gray-700">Pet Friendly</label>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FilterBox;
