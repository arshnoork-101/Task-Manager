import React from 'react'
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';

function CartNav()
 {
    const tasks=useSelector((state)=>state.cart.items);
  return(
        <span className="flex justify-between items-center h-16">
          {/* Cart Icon */}
          <span className="relative ">
            <FiShoppingCart className="text-gray-700 text-2xl cursor-pointer" />
            <span> </span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {tasks.length > 0 ? tasks.length : 0}
        </span>
          </span>
        </span>
  )
}

export default CartNav;