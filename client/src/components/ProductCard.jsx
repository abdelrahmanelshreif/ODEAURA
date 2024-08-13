import { SimpleCart } from 'iconoir-react';
import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  createStyles,
  rem,
} from '@mantine/core';

import { notifications } from '@mantine/notifications';

import BagContext from '../context/BagContext';
import { useContext, useState } from 'react';
import cartApi from '../api/cartApi';
import { useCart } from '../context/cartctx';
import { useAuth } from '../context/auth';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const ProductCard = (props) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { bag, incBag } = useContext(BagContext);
  const { classes, theme } = useStyles();
  const [CartProducts, setCartProducts] = useCart();

  const addTocartApi = async () => {
    try {
      const res = await cartApi.addProduct(props.id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const addProductTocard = () => {
    setLoading(true);

    if (auth.user) {
      addProductToCart(props.item);
      incBag(props.id);
      addTocartApi();
      notifications.show({
        title: `📦 ${props.title} added to cart`,
        message: 'You can review it in the cart section',
      });
    } else {
      navigate('/login');
    }
  };

  const addProductToCartLocal = (product) => {
    let cart;

    if (!auth.user) {
      const cartItems = localStorage.getItem('cartItems');
      cart = cartItems ? JSON.parse(cartItems) : { items: [] };
    } else {
      cart = { ...CartProducts };
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId._id === product._id
    );

    if (existingProductIndex !== -1) {
      cart.items[existingProductIndex].quantity += 1;
    } else {
      const newCartItem = {
        productId: product,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
        _id: product._id,
      };
      cart.items.push(newCartItem);
    }

    if (!auth.user) {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    } else {
      setCartProducts(cart);
    }
    setLoading(false);
  };

  const addProductToCart = (product) => {
    const existingProductIndex = CartProducts?.items
      ? CartProducts?.items?.findIndex(
          (item) => item.productId._id === product._id
        )
      : -1;
    if (CartProducts?.items && existingProductIndex !== -1) {
      const updatedCart = { ...CartProducts };
      updatedCart.items[existingProductIndex].quantity += 1;
      setCartProducts(updatedCart);
    } else {
      const newCartItem = {
        productId: product,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
        _id: Math.random().toString(),
      };
      const updatedCart = { ...CartProducts };
      updatedCart.items = updatedCart.items || [];
      updatedCart.items.push(newCartItem);
      setCartProducts(updatedCart);
    }
  };

  return (
    <Card
      radius="md"
      p="md"
      className={
        classes.card +
        ` transition-all flex flex-col !border !rounded-[20px] hover:shadow-sm border-[#F2F4F7] hover:border-green-200`
      }
    >
      <Card.Section>
        <Link to={`/products/${props.id}`}>
          <Image src={props.image[0]} alt={props.title} height={380} />
        </Link>
      </Card.Section>

      <Card.Section className="px-4 mb-auto" mt="md">
        <Link to={`/products/${props.id}`}>
          <Group className="flex flex-col items-start gap-0" position="apart">
            <Text className="text-sm text-gray-400">{props.brand}</Text>
            <Text className="trimTextCard text-lg font-semibold text-left text-[#344054]">
              {props.title}
            </Text>
          </Group>
        </Link>
      </Card.Section>

      <Card.Section className="px-4 flex flex-row items-center justify-between mt-6 pb-3">
        <Text className="text-left text-3xl text-[#1D2939] font-semibold">
          EGP {props.price}
        </Text>
        <ActionIcon
          className="transition-all w-9 h-9 bg-green-100 hover:bg-green-50"
          variant="light"
          onClick={addProductTocard}
          loading={Loading}
        >
          <SimpleCart color="#15BE53" strokeWidth={2} height={20} width={20} />
        </ActionIcon>
      </Card.Section>
    </Card>
  );
};

export default ProductCard;
