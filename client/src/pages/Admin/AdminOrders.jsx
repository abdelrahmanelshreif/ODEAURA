import React, { useEffect, useState } from 'react';
import OrderCardAdmin from '../../components/common/AdminPanal/OrderCardAdmin';
import orderApi from '../../api/orderApi';
import styles from './AdminOrders.module.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersNo, setOrdersNo] = useState(0);

  useEffect(() => {
    const getAdminOrders = async () => {
      try {
        const res = await orderApi.getAllOrders();
        setOrders(res.orders);
        setOrdersNo(res.ordersNo);
      } catch (error) {
        console.log(error);
      }
    };
    getAdminOrders();
  }, []);

  const deleteOrderById = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
  };

  const rows = orders?.map((item) => (
    <OrderCardAdmin
      key={item._id}
      item={item}
      mobileNumber={item.mobileNumber}
      deleteOrderById={deleteOrderById}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders</h1>
        <span className={styles.count}>{ordersNo ? ordersNo : 0}</span>
      </div>
      <div className={styles.ordersList}>
        {rows}
      </div>
    </div>
  );
};

export default AdminOrders;
