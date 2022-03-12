import React from 'react';

const NavButtons = ({ previousPage, nextPage, listStart, listEnd, fullListLength }) => {
  return (
    <div className='w-full max-w-2xl mx-auto justify-between flex mb-8'>
      {listStart != 0 ? 
        <button onClick={previousPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3'>
          <div className="flex flex-row align-middle">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
            </svg>
            <span className="ml-2">Prev</span>
          </div>
        </button> 
      :
        <button disabled onClick={previousPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3 disabled:opacity-50 disabled:hover:bg-gray-800'>
          <div className="flex flex-row align-middle">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
            </svg>
            <span className="ml-2">Prev</span>
          </div>
        </button> 
      }

      {listEnd < fullListLength  ?
        <button onClick={nextPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3'>
          <div className="flex flex-row align-middle">
            <span className="mr-2">Next</span>
            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </div>
        </button>
      :
        <button disabled onClick={nextPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3 disabled:opacity-50 disabled:hover:bg-gray-800'>
          <div className="flex flex-row align-middle">
            <span className="mr-2">Next</span>
            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </div>
        </button>
      }
    </div>
  );
};

export default NavButtons;