import React, { useContext, useEffect, useState } from 'react'
import { getAllItems, getItemsByCategory } from '../services/itemService'
import '../style/Products.css'
import ProductsCard from '../components/ProductsCard'
import { CircleLoader } from "react-spinners"
import { cartContext } from '../context/CartContext'
import { getAllDepartments } from '../services/departmentServices.js'
import { getCatByDepart } from '../services/categoryService'

const Products = () => {
  const { cartItems } = useContext(cartContext)
  const [allItems, setAllItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])
  const [departments, setDepartments] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedDep, setSelectedDep] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


 useEffect(() => {
  const fetchAll = async () => {
    setIsLoading(true)
    const [itemsRes, depRes] = await Promise.all([getAllItems(), getAllDepartments()])
    setAllItems(itemsRes.data)
    setDisplayedItems(itemsRes.data)
    setDepartments(depRes.data)
    setIsLoading(false)
  }
  fetchAll()
}, [])


const handleDepClick = async (dep) => {
  setSelectedDep(dep)
  setSelectedCat(null)
  setDisplayedItems([])                    // dont appear item until category selected
  setIsLoading(true)
  const res = await getCatByDepart(dep._id)
  setCategories(res.data)
  setIsLoading(false)
}
 
  const handleCatClick = async (cat) => {
    // if (selectedCat?._id === cat._id) {
    //   // clicking same cat → show all items of that dept
    //   setSelectedCat(null)
    //   setDisplayedItems([])
    //   return
    // }
    setSelectedCat(cat)
    try {
      setIsLoading(true)
      const res = await getItemsByCategory(cat._id)
      setDisplayedItems(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="products-page">

      <div className="dep-bar">
        <button
          className={`dep-btn ${!selectedDep ? 'dep-btn--active' : ''}`}
          onClick={() => {
            setSelectedDep(null)
            setSelectedCat(null)
            setCategories([])
            setDisplayedItems(allItems)
          }}
        >
          All
        </button>
        {departments.map(dep => (
          <button
            key={dep._id}
            className={`dep-btn ${selectedDep?._id === dep._id ? 'dep-btn--active' : ''}`}
            onClick={() => handleDepClick(dep)}
          >
            {dep.departmentName_en}
          </button>
        ))}
      </div>

    
      {selectedDep && categories.length > 0 && (
        <div className="cat-bar">
          {categories.map(cat => (
            <button
              key={cat._id}
              className={`cat-btn ${selectedCat?._id === cat._id ? 'cat-btn--active' : ''}`}
              onClick={() => handleCatClick(cat)}
            >
              {cat.name_ar}
            </button>
          ))}
        </div>
      )}

      <div className="products-body">
        {isLoading && <CircleLoader />}
        {!isLoading && errorMessage && <p className="error">{errorMessage}</p>}
        {!isLoading && selectedDep && !selectedCat && (
          <p className="hint"> choose category to list the product</p>
        )}
        {!isLoading && (
          <div className="card-container">
            {displayedItems.map(item => (
              <ProductsCard key={item._id} item={item} className="card" />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Products