import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TickConfirm } from '../../../assets';
import { Button } from '@mantine/core';

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if orderId is not present
    if (!location.state?.orderId) {
      navigate('/');
    }
  }, [navigate, location.state?.orderId]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <div className="flex flex-col items-center bg-green-50 px-8 py-6 rounded-xl shadow-md max-w-xs w-full text-center mt-16">
        <img src={TickConfirm} alt="Order confirmation tick" width={80} height={80} />
        <p className="text-lg font-semibold text-primary mt-4">
          Order successfully placed.
        </p>
        <p className="text-gray-700 mt-2">
          Order code: {location.state?.orderId || 'N/A'}
        </p>
        <Button className="mt-4" onClick={() => navigate('/myaccount')}>View order</Button>
        <Link to="/" className="text-blue-500 mt-2">Home</Link>
      </div>
    </div>
  );
};

export default ConfirmOrder;
