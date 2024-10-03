
type menuProps={
    setMenu:any

}


const Menubar = (props:menuProps) => {
  return (
    <div className="flex shadow-sm h-10 p-2 ">
      <h1 onClick={()=>props?.setMenu("Shirt")} className="ml-48 cursor-pointer">Shirt</h1>
      <h1 onClick={()=>props?.setMenu("Jacket")} className="ml-5 cursor-pointer">Jacket</h1>
      <h1 onClick={()=>props?.setMenu("electronics")} className="ml-5 cursor-pointer">Electronics</h1>
      <h1 onClick={()=>props?.setMenu("House")}className="ml-5 cursor-pointer">House</h1>
      <h1 onClick={()=>props?.setMenu("Jewelery")} className="ml-5 cursor-pointer">Jewelery</h1>
      <h1 onClick={()=>props?.setMenu("Scooters")} className="ml-5 cursor-pointer">Scooters</h1>
      <h1 onClick={()=>props?.setMenu("Bike")} className="ml-5 cursor-pointer">Bike</h1>
      <h1 onClick={()=>props?.setMenu("Books")} className="ml-5 cursor-pointer">Books</h1>
      <h1 onClick={()=>props?.setMenu("Car")} className="ml-5 cursor-pointer">Cars</h1>
      
    </div>
  )
}

export default Menubar
