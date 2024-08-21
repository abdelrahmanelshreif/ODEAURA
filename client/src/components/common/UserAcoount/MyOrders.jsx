// // import React, { useEffect, useState } from 'react';
// // import orderApi from '../../../api/orderApi';
// // import { Svg3DSelectFace } from 'iconoir-react';

// // const MyOrders = () => {
// //   const [ordersNumbers, setOrdersNumbers] = useState(0);
// //   const [Orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     const getMyOrders = async () => {
// //       try {
// //         const res = await orderApi.getMyOrders();
// //         setOrdersNumbers(res.ordersNo);
// //         setOrders(res.orders);
// //         console.log(res);
// //       } catch (err) {
// //         console.log(err);
// //       }
// //     };
// //     getMyOrders();
// //   }, []);

// //   return (
// //     <div className="w-full px-4 md:px-12 font-medium mt-14 pb-4">
// //       <div className="w-full flex flex-col md:flex-row text-sm items-center text-neutral-600 font-medium mb-12">
// //         <h1 className="text-left">My Orders</h1>
// //         <h1 className="mt-2 md:mt-0 ml-0 md:ml-4 bg-slate-100 p-2 rounded-md text-left text-gray-500">
// //           {ordersNumbers}
// //         </h1>
// //       </div>
// //       {Orders.map((order) => (
// //         <div
// //           key={order._id}
// //           className="flex flex-col w-full border px-3 py-3 rounded-2xl mt-5"
// //         >
// //           <div className="flex flex-col md:flex-row justify-between">
// //             <div className="flex flex-col md:flex-row gap-2">
// //               {/* <Svg3DSelectFace color="#758193" /> */}
// //               <p className="text-truncate text-gray-500">
// //                 Order No. {order._id}
// //               </p>
// //               <p className="text-left text-gray-600">
// //                 Items No. {order.items.length}
// //               </p>
// //             </div>
// //             <div className="mt-2 md:mt-0">
// //               <p className="text-right text-gray-500">Total</p>
// //               <p className="text-right">{order.totalCost?.toFixed(2)} EGP</p>
// //             </div>
// //           </div>
// //           <div className="mt-2">
// //             <p className="text-gray-500">Shipping Address:</p>
// //             <p className="text-gray-600">
// //               {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
// //               {order.shippingAddress.state}, {order.shippingAddress.zip},{' '}
// //               {order.shippingAddress.country}
// //             </p>
// //             <p className="text-gray-600">
// //               Shipping Cost: {order.shippingCost} EGP
// //             </p>
// //             <p className="text-gray-600">
// //               Subtotal: {order.subTotal?.toFixed(2)} EGP
// //             </p>
// //             <p className="text-gray-600">
// //               Date: {new Date(order.createdAt).toLocaleDateString()}
// //             </p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyOrders;
// import React, { useEffect, useState } from 'react';
// import orderApi from '../../../api/orderApi';

// const MyOrders = () => {
//   const [ordersNumbers, setOrdersNumbers] = useState(0);
//   const [Orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getMyOrders = async () => {
//       try {
//         const res = await orderApi.getMyOrders();
//         setOrdersNumbers(res.ordersNo);
//         setOrders(res.orders);
//         console.log(res);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMyOrders();
//   }, []);

//   return (
//     <div className="w-full px-4 md:px-12 font-medium mt-14 pb-4">
//       <div className="w-full flex flex-col md:flex-row text-sm items-center text-neutral-600 font-medium mb-12">
//         <h1 className="text-left">My Orders</h1>
//         <h1 className="mt-2 md:mt-0 ml-0 md:ml-4 bg-slate-100 p-2 rounded-md text-left text-gray-500">
//           {ordersNumbers}
//         </h1>
//       </div>
//       {Orders.map((order) => (
//         <div
//           key={order._id}
//           className="flex flex-col w-full border px-4 py-4 rounded-2xl mt-5 bg-white shadow-md"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 mb-2">
//             <div className="flex flex-col md:flex-row gap-2">
//               <p className="text-gray-500">
//                 Order No. {order._id}
//               </p>
//               <p className="text-gray-600">
//                 Total Items: {order.items.length}
//               </p>
//             </div>
//             <div className="mt-2 md:mt-0 text-right">
//               <p className="text-gray-500">Total</p>
//               <p className="font-bold">{order.totalCost?.toFixed(2)} EGP</p>
//             </div>
//           </div>
//           <div className="mb-4 text-left">
//             <p className="text-gray-500 font-medium">Shipping Address:</p>
//             <p className="text-gray-600">
//               {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}, {order.shippingAddress.country}
//             </p>
//             <p className="text-gray-600">
//               Shipping Cost: {order.shippingCost} EGP
//             </p>
//             <p className="text-gray-600">
//               Subtotal: {order.subTotal?.toFixed(2)} EGP
//             </p>
//             <p className="text-gray-600">
//               Date: {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-500 font-medium text-left">Items:</p>
//             {order.items.map((item) => (
//               <div key={item._id} className="flex flex-col border-b py-2">
//                 <p className="text-gray-600 truncate w-full">Product Name: {item.productId.name}</p>
//                 <p className="text-gray-600 ">Quantity: {item.quantity}</p>
//                 <p className="text-gray-600 ">Product Price: {item.productId.price} EGP</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from 'react';
import orderApi from '../../../api/orderApi';

const MyOrders = () => {
  const [ordersNumbers, setOrdersNumbers] = useState(0);
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const res = await orderApi.getMyOrders();
        setOrdersNumbers(res.ordersNo);
        setOrders(res.orders);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMyOrders();
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 md:px-8 font-medium mt-14 pb-4 box-border overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row text-sm items-center text-neutral-600 font-medium mb-8 md:mb-12">
        <h1 className="text-left text-lg">My Orders</h1>
        <h1 className="mt-2 md:mt-0 ml-0 md:ml-4 bg-slate-100 p-2 rounded-md text-left text-gray-500">
          {ordersNumbers}
        </h1>
      </div>
      {Orders.map((order) => (
        <div
          key={order.orderNumber}
          className="w-full md:w-11/12 border px-4 py-4 rounded-2xl mt-4 bg-white shadow-md box-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 mb-2">
            <div className="flex flex-col md:flex-row gap-2">
              <p className="text-gray-500">
                Order No. {order.orderNumber}
              </p>
              {/* <p className="text-gray-600">
                Total Items: {order.items.length}
              </p>   */}
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <p className="text-gray-500">Total</p>
              <p className="font-bold">{order.totalCost?.toFixed(2)} EGP</p>
            </div>
          </div>
          <div className="mb-4 text-left">
            <p className="text-gray-500 font-medium">Shipping Address:</p>
            <p className="text-gray-600">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
            </p>
            <p className="text-gray-600">
              Shipping Cost: {order.shippingCost} EGP
            </p>
            <p className="text-gray-600">
              Subtotal: {order.subTotal?.toFixed(2)} EGP
            </p>
            <p className="text-gray-600">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium text-left">Items:</p>
            {order.items.map((item) => (
              <div key={item._id} className="flex flex-col border-b py-2">
                <p className="text-gray-600 truncate w-full text-left">Product Name: {item.productId?.name}</p>
                <p className="text-gray-600 text-left">Quantity: {item.quantity}</p>
                <p className="text-gray-600 text-left">Product Price: {item.productId?.price} EGP</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
