import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TickConfirm } from '../../../assets'
import { Button } from '@mantine/core'

const ConfirmOrder = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to home if orderId is not present
    if (!location.state?.orderId) {
      navigate('/')
    }
  }, [navigate, location.state])

  const goToOrders = () => {
    // Navigate to /myaccount with state
    navigate('/myaccount', {
      state: { id: 1, activated: 2 },
    })
  }

  return (
    <div className="flex h-full flex-row justify-center items-center my-36">
      <div className="flex flex-col justify-between items-center gap-3 bg-green-50 px-36 py-11 rounded-xl">
        <img src={TickConfirm} alt="tick" width={100} height={100} />
        <p className="text-lg font-semibold text-primary">
          Order successfully placed.
        </p>
        <p className="text-gray-700">
          Order code: {location.state?.orderId}
        </p>
        <Button onClick={goToOrders}>View order</Button>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default ConfirmOrder
