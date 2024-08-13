// import { Text, ActionIcon } from "@mantine/core";
// import { modals } from "@mantine/modals";
// import { Trash } from "iconoir-react";
// import orderApi from "../../../api/orderApi";
// import styles from "../../../pages/Admin/AdminOrders.module.css";

// const OrderCardAdmin = (props) => {
//   const { item } = props;

//   // Function to open the delete confirmation modal
//   const openDeleteModal = () =>
//     modals.openConfirmModal({
//       title: `Delete Order ${item._id}`,
//       centered: true,
//       children: (
//         <Text size="sm" className="z-30">
//           Are you sure you want to delete order {item._id}?
//         </Text>
//       ),
//       labels: { confirm: "Delete Order", cancel: "No, don't delete it" },
//       confirmProps: { color: "red" },
//       onCancel: () => console.log("Delete action canceled"),
//       onConfirm: () => deleteOrder(),
//     });

//   // Function to handle the deletion of an order
//   const deleteOrder = async () => {
//     try {
//       await orderApi.deleteOrder(item._id);
//       props.deleteOrderById(item._id); // Call the parent component's delete method
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className={styles.orderCard}>
//       {/* Order details */}
//       <div className={styles.orderDetails}>
//         <span className={styles.orderId}>
//           Order NO. <span className="text-gray-600">{item._id}</span>
//         </span>
//         <div className={styles.userInfo}>
//           <div className={styles.userName}>
//             {item?.userId?.firstName} {item?.userId?.lastName}
//           </div>
//           <div className={styles.userEmail}>{item?.userId?.email}</div>
//         </div>
//         <div className={styles.shippingAddress}>
//           <p>{item?.shippingAddress?.street}</p>
//           <p>
//             {item?.shippingAddress?.city} {item?.shippingAddress?.zip}
//           </p>
//           <p>
//             {item?.shippingAddress?.state} {item?.shippingAddress?.country}
//           </p>
//           <p>{item?.shippingAddress?.mobileNumber}</p>
//         </div>
//         <div className={styles.itemsList}>
//           <p>Items:</p>
//           {item?.items?.map((itemDetail) => (
//             <div
//               key={itemDetail.productDetails._id}
//               className={styles.itemDetail}
//             >
//               <p>Product Name: {itemDetail.productDetails.name}</p>
//               <p>Description: {itemDetail.productDetails.description}</p>
//               <p>Price: {itemDetail.productDetails.price} EGP</p>
//               <p>Quantity: {itemDetail.quantity}</p>
//               <p>Total Price: {itemDetail.totalPrice} EGP</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Order cost details */}
//       <div className={styles.orderCost}>
//         <span>
//           Subtotal:{" "}
//           <span className={styles.totalCost}>{item.subTotal} EGP</span>
//         </span>
//         <span>
//           Shipping Cost:{" "}
//           <span className={styles.totalCost}>{item.shippingCost} EGP</span>
//         </span>
//         <span>
//           Total: <span className={styles.totalCost}>{item.totalCost} EGP</span>
//         </span>
//       </div>

//       {/* Delete action */}
//       <div className={styles.deleteAction}>
//         <ActionIcon
//           className={styles.deleteIcon}
//           variant="light"
//           onClick={openDeleteModal}
//         >
//           <Trash color="#F34141" strokeWidth={2} height={20} width={20} />
//         </ActionIcon>
//       </div>
//     </div>
//   );
// };

// export default OrderCardAdmin;


import { Text, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Trash } from "iconoir-react";
import orderApi from "../../../api/orderApi";
import styles from "../../../pages/Admin/AdminOrders.module.css";

const OrderCardAdmin = (props) => {
  const { item } = props;

  // Function to open the delete confirmation modal
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete Order ${item._id}`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete order {item._id}?
        </Text>
      ),
      labels: { confirm: "Delete Order", cancel: "No, don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Delete action canceled"),
      onConfirm: () => deleteOrder(),
    });

  // Function to handle the deletion of an order
  const deleteOrder = async () => {
    try {
      await orderApi.deleteOrder(item._id);
      props.deleteOrderById(item._id); // Call the parent component's delete method
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div className={styles.orderCard}>
      {/* Order details */}
      <div className={styles.orderDetails}>
        <span className={styles.orderId}>
          Order NO. <span className="text-gray-600">{item.orderNumber}</span>
        </span>
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            {item?.userId?.firstName} {item?.userId?.lastName}
          </div>
          <div className={styles.userEmail}>{item?.userId?.email}</div>
        </div>
        <div className={styles.shippingAddress}>
          <p>{item?.shippingAddress?.street}</p>
          <p>
            {item?.shippingAddress?.city} {item?.shippingAddress?.zip}
          </p>
          <p>
            {item?.shippingAddress?.state} {item?.shippingAddress?.country}
          </p>
          <p>{item?.shippingAddress?.mobileNumber || "N/A"}</p>
          <br />
        </div>
        <div className={styles.itemsList}>
          <p className={styles.userName} >Items:</p>
          {item?.items?.map((itemDetail) => (
            <div
              key={itemDetail._id}
              className={styles.itemDetail}
            >
              <p>Product Name: {itemDetail.productId?.name || "N/A"}</p>
              {/* <p>Description: {itemDetail.productId?.description || "N/A"}</p> */}
              <p>Price: {itemDetail.productId?.price} EGP</p>
              <p>Quantity: {itemDetail.quantity}</p>
              <p>Item Total: {itemDetail.totalPrice} EGP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order cost details */}
      <div className={styles.orderCost}>
        <span>
          Subtotal:{" "}
          <span className={styles.totalCost}>{item.subTotal} EGP</span>
        </span>
        <span>
          Shipping Cost:{" "}
          <span className={styles.totalCost}>{item.shippingCost} EGP</span>
        </span>
        <span>
          Total: <span className={styles.totalCost}>{item.totalCost} EGP</span>
        </span>
      </div>

      {/* Delete action */}
      <div className={styles.deleteAction}>
        <ActionIcon
          className={styles.deleteIcon}
          variant="light"
          onClick={openDeleteModal}
        >
          <Trash color="#F34141" strokeWidth={2} height={20} width={20} />
        </ActionIcon>
      </div>
    </div>
  );
};

export default OrderCardAdmin;
