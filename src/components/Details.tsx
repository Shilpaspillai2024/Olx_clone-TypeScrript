import { useLocation } from "react-router-dom"


const Details = () => {
   const location =useLocation()

  return (
    <div className="flex p-4">
      <img src={location?.state?.data?.image} alt={location?.state?.data?.title} />

      <div>
       <h1 className="font-bold text-xl">${location?.state?.data?.price}</h1>
       <h1 className="mt-5"><span className="font-semibold">category</span>{location?.state?.data?.category}</h1>
       <h1 className="mt-5"><span className="font-semibold">Title</span>{location?.state?.data?.title}</h1>
       <h1 className="mt-5"><span className="font-semibold">Description</span>{location?.state?.data?.description}</h1>
    
      </div>
       
    </div>
  )
}

export default Details
