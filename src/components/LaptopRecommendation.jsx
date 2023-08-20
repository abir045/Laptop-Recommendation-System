import React, {useEffect, useState} from 'react'
import Laptop from './Laptop';
import ReactPaginate from 'react-paginate';
//  import products from '../assets/asusLaptopsRyansDetails.json'

const LaptopRecommendation = () => {
    const [laptops, setLaptops] = useState([]);
    const [display, setDisplay] = useState('')
    const [ram, setRam] = useState('')
    const [storage, setStorage] = useState('') ;
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 15
     

    useEffect(()=> {
     
        async function fetchLaptops ()  {
            const response = await fetch('./asusLaptopsRyansDetails.json')
            const data = await response.json()
            setLaptops(data)
            setTotalPages(Math.ceil(data.length / itemsPerPage))
        }
       fetchLaptops();

    }, [display,ram,storage])
    
     const startIndex = currentPage * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     const subset = laptops.slice(startIndex, endIndex)
    
     const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
     }

      
    const handleChange = (e) => {
        const {name, value } = e.target

        switch(name) {
            case 'display':
                setDisplay(value);
                break;
            case 'ram': 
                setRam(value);
                break;
            case 'storage':
                setStorage(value);
                break;        
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const filteredLaptops = laptops.filter((laptop) => {
        const meetsDisplay = display === '' || laptop.desc.some(descLine => descLine.toLowerCase().includes(display) )
        
        
        // Extract numerical value from price
         const meetsRAM = ram === '' || laptop.desc.some(descLine => descLine.toLowerCase().includes(ram)); // Check if any description line contains the RAM
         const meetsStorage = storage === '' || laptop.desc.some(descLine => descLine.toLowerCase().includes(storage)); // Check if any description line contains the storage
            
           
            return  meetsDisplay && meetsRAM && meetsStorage;

        //    return meetsBudget
        })

        setLaptops(filteredLaptops) 
        // setDisplay('')
        // setRam('')
        // setStorage('')
    }

    


  return (
    <div className='flex flex-col justify-center my-[5%] items-center'>
        
        <h1 className='font-bold text-center mb-10 p-5'>Laptop Recommendation for Asus from Ryans & Startech </h1>
        
        <q className='text-sm my-3 italic'>Please input display, ram and storage , follow the placeholder pattern </q>
        
        <form onSubmit={handleSubmit} className='flex flex-col space-y-5 items-center md:flex md:space-x-6 mb-[5%]'>
         
        <label>Display</label>
        <input type='number' value={display} name='display' onChange={handleChange} placeholder='15....' />
        <label>RAM</label>
        <input type='text' value={ram.toLowerCase()} name='ram' onChange={handleChange} placeholder='8gb....' />
        <label>Storage</label>
        <input type='text' value={storage.toLowerCase()} name='storage' onChange={handleChange} placeholder='1tb....' />

        {/* <button type='submit'>Recommend</button> */}
        <button type="sumbit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Recommend</button>


        </form>
        
        
        <div className='grid  grid-cols-1 md:grid-cols-3 gap-5'>
        
         
         {
            subset.map((item) => (
                <Laptop key={item.url} item={item}  />
            ) )
         }

         

        </div>

        <ReactPaginate
         className='flex space-x-3 my-5'
         pageCount={totalPages}
         onPageChange={handlePageChange}
         forcePage={currentPage}
         />
        
        </div>
  )
}

export default LaptopRecommendation