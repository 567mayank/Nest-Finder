import React from 'react';
import { FaHeart, FaPhoneAlt } from 'react-icons/fa'; // For Heart and Phone icons

function PropertyCard({ property }) {
  return (
    <div className="max-w-full w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 p-4">
        {/* Image Section */}
        <div className="relative w-full h-full">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-56 lg:h-full object-cover rounded-lg" 
          />
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
            {property.type}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between py-3 pl-4 pr-0 lg:pl-6">
          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
          <p className="text-xl font-bold text-gray-800">{property.price}</p>
          <p className="text-sm text-gray-600">{property.location}</p>
          
          <p className="mt-2 text-sm text-gray-500">{property.beds} Beds | {property.baths} Baths | {property.size} sqft</p>
          
          {/* Additional Info */}
          <div className="mt-2 flex space-x-4">
            {property.features.parking && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18h14V3H5zm12 14H7V5h10v12z" />
                </svg>
                Parking
              </span>
            )}
            {property.features.pool && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18h14V3H5zm12 14H7V5h10v12z" />
                </svg>
                Pool
              </span>
            )}
            {property.features.balcony && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18h14V3H5zm12 14H7V5h10v12z" />
                </svg>
                Balcony
              </span>
            )}
          </div>

          {property.status && (
            <div className="mt-2 text-sm text-gray-500">{property.status}</div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => alert('View Details clicked')}
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              View Details
            </button>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => alert('Saved')}
                className="text-red-500 hover:text-red-700"
              >
                <FaHeart size={20} />
              </button>
              <button 
                onClick={() => alert('Contact clicked')}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaPhoneAlt size={20} />
              </button>
            </div>
          </div>

          {/* User Information (Optional) */}
          {property.agent && (
            <div className="mt-4 flex items-center">
              <img 
                src={property.agent.image} 
                alt={property.agent.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm text-gray-700">{property.agent.name}</span>
            </div>
          )}
        </div>
      </div>      
    </div>
  );
}

export default PropertyCard;
