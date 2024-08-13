import { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Group,
  Text,
  ActionIcon,
  NumberInput,
  rem,
} from '@mantine/core';

import { Trash } from 'iconoir-react';
import cartApi from '../../../api/cartApi';
import { useCart } from '../../../context/cartctx';

const CartProduct = (props) => {
  const [CartProducts, setCartProducts] = useCart();
  const item = props.item;
  const handlers = useRef();
  const [value, setValue] = useState(+item.quantity);
  const [total, setTotal] = useState(`${(+item.price * +value).toFixed(2)}`);

  useEffect(() => {
    setTotal(`${(+item.price * +value).toFixed(2)}`);
  }, [value]);

  const decProduct = async () => {
    const updatedCart = {
      ...CartProducts,
      subTotal: +CartProducts.subTotal - +item.productId.price,
    };
    if (value >= 2) {
      setCartProducts(updatedCart);
      handlers.current.decrement();
      try {
        const res = await cartApi.decPrdocutQuantity(item.productId._id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const incProduct = async () => {
    const updatedCart = {
      ...CartProducts,
      subTotal: +CartProducts.subTotal + +item.productId.price,
    };
    setCartProducts(updatedCart);
    handlers.current.increment();
    try {
      const res = await cartApi.incPrdocutQuantity(item.productId._id);
    } catch (err) {
      console.log(err);
    }
  };
  
  const productDelete = async () => {
    setCartProducts((prevCartProducts) => ({
      ...prevCartProducts,
      items: prevCartProducts.items.filter(
        (z) => z.productId._id !== item.productId._id
      ),
      subTotal: +CartProducts.subTotal - +total,
    }));

    try {
      const res = await cartApi.deleteProduct(item.productId._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <tr key={item._id}>
        <td>
          <Group
            spacing="sm"
            className="flex flex-row content-start items-start"
          >
            <Avatar size={100} src={item?.productId?.image[0]} radius={10} />
            <Group className="flex flex-col gap-0 items-start justify-between ">
              <div>
                <Text className="text-left" fz="sm" fw={400} color="#98A2B3">
                  {item?.productId?.brand}
                </Text>
                <Text className="trimTextCart text-left" fz="md" fw={500}>
                  {item?.productId?.name}
                </Text>
              </div>
              <Text fz="md" fw={500}>
                EGP {item?.productId?.price}
              </Text>
            </Group>
          </Group>
        </td>

        <td>
          <Group spacing={0}>
            <ActionIcon
              size={36}
              radius={0}
              className="rounded-tl-lg rounded-bl-lg"
              variant="default"
              onClick={decProduct}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={value}
              onChange={(val) => setValue(val)}
              handlersRef={handlers}
              min={0}
              step={1}
              radius="0"
              styles={{ input: { width: rem(54), textAlign: 'center' } }}
            />

            <ActionIcon
              size={36}
              radius={0}
              className="rounded-tr-lg rounded-br-lg"
              variant="default"
              onClick={incProduct}
            >
              +
            </ActionIcon>
          </Group>
        </td>

        <td>
          <Text className="text-left" fz="sm" c="dimmed">
            {`EGP ${total}`}
          </Text>
        </td>

        <td>
          <Group spacing={0} position="right">
            <ActionIcon
              onClick={productDelete}
              className="transition-all text-gray-400 p-1 hover:bg-red-100 hover:text-red-500"
            >
              <Trash width={18} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
};

export default CartProduct;
