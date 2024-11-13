import React, { useEffect, useState } from 'react';
import Basic from '../Components/ListProperty/Basic';
import Details from '../Components/ListProperty/Details';
import Media from '../Components/ListProperty/Media';
import Pricing from '../Components/ListProperty/Pricing';
import Confirmation from '../Components/ListProperty/Confirmation';

const StepNavigation = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [property, setProperty] = useState({
    title: '',
    propType: '',
    listingType: 'sale', // Default listing type
    price: '',
    address: '',
    neighborhood : '',
    city: '',
    state: '',
    zipCode: '',
    zip: '',
    area: '',
    bedrooms: '',
    floor: '',
    parkingAvailable: false,
    furnishingStatus: '',
    propAge: '',
    description: '',
  });

  useEffect(()=>{
    const local = JSON.parse(localStorage.getItem("ListItem"))
    if(local) setProperty(local)
  },[])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setProperty((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setProperty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if(!property.title) return
    localStorage.setItem("ListItem", JSON.stringify(property));
  }, [property]);
  
  // Handle step click
  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep(activeStep+1); // Move to the next step
  };

  const steps = [
    { number: 1, label: 'Basic', icon: 'check' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Media' },
    { number: 4, label: 'Pricing' },
    { number: 5, label: 'Confirmation' },
  ];

  return (
    <>
      <div className=' ml-14 md:ml-64 lg:ml-80 xl:ml-96'>
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {steps.map((step) => {
            const isActive = activeStep === step.number;
            const isCompleted = activeStep > step.number;

            return (
              <li
                key={step.number} // Assign key directly to the <li> element
                className={`flex md:w-full items-center ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-500'
                    : isCompleted
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-gray-500 dark:text-gray-400'
                } sm:after:content-[''] cursor-pointer mt-4 ${step.number !== 5 ? 'after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after-hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700' : ''}`}
                onClick={() => handleStepClick(step.number)}
              >
                <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
                  {isCompleted && (
                    <svg
                      className="w-4 h-4 me-2.5 text-green-600 dark:text-green-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm4.3-12.7l-4.3 4.3-2-2-1.4 1.4 3.4 3.4 5.7-5.7-1.4-1.4z" />
                    </svg>
                  )}
                  {isActive && (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  {step.number === 1 ? (
                    <span className="flex items-center after:text-gray-200 dark:after:text-gray-500">
                      Basic <span className="hidden sm:inline-flex sm:ms-2"></span>
                    </span>
                  ) : (
                    <>
                      <span className="me-2">{step.number}</span>
                      {step.label}
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      {
        activeStep===1 && <Basic property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      }
      {
        activeStep===2 && <Details property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      }
      {
        activeStep===3 && <Media property={property} handleChange={handleChange} handleSubmit={handleSubmit}/>
      }
      {
        activeStep===4 && <Pricing property={property} handleChange={handleChange} handleSubmit={handleSubmit}/>
      }
      {
        activeStep===5 && <Confirmation property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      }
    </>
  );
};

export default StepNavigation;
