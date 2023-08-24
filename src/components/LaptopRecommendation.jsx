import React, {useEffect, useState} from 'react'
import Laptop from './Laptop';
import ReactPaginate from 'react-paginate';


const LaptopRecommendation = () => {
    const [laptops, setLaptops] = useState([]);
    const [display, setDisplay] = useState('')
    const [ram, setRam] = useState('')
    const [storage, setStorage] = useState('') ;
    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const itemsPerPage = 15
    const [filteredVendor,setFilteredVendor] = useState("")
     

    useEffect(()=> {
     
        async function fetchLaptops ()  {
            const response = await fetch('./asusLaptopsRyansDetails.json')
            const data = await response.json()
            setLaptops(data)
            setTotalPages(Math.ceil(data.length / itemsPerPage))
        }
       fetchLaptops();

    }, [display,ram,storage,filteredVendor])

    
     
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
         
         //vendor
         const meetsVendor =  filteredVendor === '' || laptop.url.toString().includes(filteredVendor); 
            
           
            return  meetsDisplay && meetsRAM && meetsStorage && meetsVendor

        
        })

        setLaptops(filteredLaptops) 
        setTotalPages(Math.ceil((filteredLaptops.length / itemsPerPage)))
        
    }


  return (
    <div className='flex flex-col justify-center my-[5%] items-center'>
        
    <h1 className='font-bold text-center text-4xl mb-10 p-5'>Laptop Recommendation for Asus from Ryans & Startech </h1>
        
        <q className='text-sm my-3 italic'>Please input display, ram and storage , every time you change an input you have to click the recommend button </q>
        
        <form onSubmit={handleSubmit} className='flex flex-col space-y-5 items-center md:flex md:space-x-6 mb-[5%]'>
         

       <label>Please choose  <span className='font-bold tracking-wider uppercase '>Storage...</span></label>
       <select
       value={storage}
       onChange={handleChange}
       name='storage'
       >
        
        <option value="512gb"> 512  GB </option>
        <option value="1tb">   1 TB </option>
        <option value="2tb">   2 TB   </option>


       </select>


       {/* ram */}
       <label>Please choose <span className='font-bold tracking-wider uppercase '>RAM...</span></label>
       <select
       value={ram}
       onChange={handleChange}
       name='ram'
       >
        
        <option value="4gb"> 4  GB </option>
        <option value="8gb"> 8  GB </option>
        <option value="16gb">16 GB   </option>


       </select>

       <label>Please choose <span className='font-bold tracking-wider uppercase '>Display ...</span>in inch</label>

        {/* diaplay */}
       
       <select
       value={display}
       onChange={handleChange}
       name='display'
       >
        
        <option value="14">14 </option>
        <option value="15">15</option>
        <option value="16">16</option>


       </select>
       
       <label>Please choose <span className='font-bold tracking-wider uppercase '>Vendor ...</span></label>
         
       
        <select
       value={filteredVendor}
       onChange={
        (e) => { 
            setFilteredVendor(e.target.value);
            
        } 
    }
       className="custom-select"
       aria-label="Filter By Vendor"
       name='filteredVendor'
    >
   
   <option value="">All Vendors</option>
   <option value="ryanscomputers">Ryans Computers</option>
   <option value="startech">Startech</option>
   
   </select> 


   <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-7 py-2.5 mr-2 mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Recommend</button>

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