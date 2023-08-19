import React from 'react'

const Laptop = ({item}) => {

   const url = new URL(item.url)
   const domain  = url.hostname.split(".")[1] ;
   

  return (
    <div >        
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="p-8 rounded-t-lg" src={item.img} alt="product image" />
    </a>
    <div className="px-5 pb-5">
        <a href={item.url}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
        </a>
        <div className='flex flex-col'>
        <ul className=''>
            <li>{item.desc}</li>
        </ul>

        </div>


        <div className="flex items-center  justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price === "Tk 0" ? "out of stock": item.price }</span>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{domain}</a>
        </div>
    </div>
</div>


    </div>
  )
}

export default Laptop