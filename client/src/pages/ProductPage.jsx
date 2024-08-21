// import React, { useEffect, useState, useContext } from 'react';
// import {
//   Breadcrumbs,
//   Anchor,
//   Container,
//   Text,
//   createStyles,
//   getStylesRef,
//   Image,
//   Card,
//   rem,
//   Button,
//   Badge,
// } from '@mantine/core';
// import { notifications } from '@mantine/notifications';

// import { useAuth } from '../context/auth';
// import { useCart } from '../context/cartctx';
// import BagContext from '../context/BagContext';

// import { Carousel } from '@mantine/carousel';

// import productApi from '../api/productApi';
// import { useParams, useNavigate } from 'react-router';
// import cartApi from '../api/cartApi';

// const useStyles = createStyles((theme) => ({
//   price: {
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//   },

//   carousel: {
//     '&:hover': {
//       [`& .${getStylesRef('carouselControls')}`]: {
//         opacity: 1,
//       },
//     },
//   },

//   carouselControls: {
//     ref: getStylesRef('carouselControls'),
//     transition: 'opacity 150ms ease',
//     opacity: 0,
//   },

//   carouselIndicator: {
//     width: rem(4),
//     height: rem(4),
//     transition: 'width 250ms ease',

//     '&[data-active]': {
//       width: rem(16),
//     },
//   },

//   formControl: {
//     width: '100%',
//     padding: '10px',
//     margin: '10px 0px',
//     border: '1px solid #ced4da',
//     borderRadius: '10px',
//     fontSize: rem(16),
//     lineHeight: rem(24),
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     backgroundColor: theme.colorScheme === 'dark' ? '#333' : '#fff',
//   },

//   formLabel: {
//     fontWeight: 'bold',
//     marginBottom: rem(8),
//   },

//   submitButton: {
//     marginTop: rem(12),
//     padding: `${rem(10)} ${rem(20)}`,
//     backgroundColor: theme.colors.green[6],
//     color: theme.white,
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: theme.colors.green[7],
//     },
//   },
// }));

// const ProductPage = () => {
//   const { classes } = useStyles();
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState({});
//   const [review, setReview] = useState('');

//   useEffect(() => {
//     const getCurrentProduct = async () => {
//       try {
//         const res = await productApi.getProductById(productId);
//         setCurrentProduct(res);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCurrentProduct();
//   }, [navigate, productId]);

//   const items = [
//     { title: 'Home', href: '/' },
//     {
//       title: `${currentProduct?.categoryId?.name}`,
//       href: `/categories/${currentProduct?.categoryId?._id}`,
//     },
//     { title: `${currentProduct?.name}`, href: '#' },
//   ].map((item, index) => (
//     <Anchor href={item.href} key={index}>
//       {item.title}
//     </Anchor>
//   ));

//   // const slides = currentProduct?.image?.map((image) => (
//   //   <Carousel.Slide key={image} className="flex flex-row">
//   //     <Image src={image} />
//   //   </Carousel.Slide>
//   // ));
//   const slides = currentProduct?.image?.map((image) => (
//     <Carousel.Slide key={image} className="flex items-center justify-center">
//       <div className="relative w-full h-full overflow-hidden border border-gray-300">
//         <Image
//           src={image}
//           alt="Product image"
//           className="object-cover w-full h-full"
//           fit="cover"
//         />
//       </div>
//     </Carousel.Slide>
//   ));
//   const [auth, setAuth] = useAuth();
//   const { bag, incBag } = useContext(BagContext);
//   const [CartProducts, setCartProducts] = useCart();

//   const addTocartApi = async () => {
//     try {
//       const res = await cartApi.addProduct(productId);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const addProductTocard = () => {
//     setLoading(true);

//     if (auth.user) {
//       addProductToCart(currentProduct);
//       incBag(productId);
//       addTocartApi();
//     } else {
//       addProductToCartLocal(currentProduct);
//     }
//     notifications.show({
//       title: `📦 ${currentProduct.name} added to cart`,
//       message: 'You can review it in the cart section',
//     });
//   };

//   const addProductToCartLocal = (product) => {
//     let cart;

//     if (!auth.user) {
//       const cartItems = localStorage.getItem('cartItems');
//       cart = cartItems ? JSON.parse(cartItems) : { items: [] };
//     } else {
//       cart = { ...CartProducts };
//     }

//     const existingProductIndex = cart.items.findIndex(
//       (item) => item.productId._id === currentProduct._id
//     );
//     if (existingProductIndex !== -1) {
//       cart.items[existingProductIndex].quantity += 1;
//     } else {
//       const newCartItem = {
//         productId: currentProduct,
//         quantity: 1,
//         price: currentProduct.price,
//         totalPrice: currentProduct.price,
//         _id: currentProduct._id,
//       };
//       cart.items.push(newCartItem);
//     }

//     if (!auth.user) {
//       localStorage.setItem('cartItems', JSON.stringify(cart));
//     } else {
//       setCartProducts(cart);
//     }
//     setLoading(false);
//   };

//   const addProductToCart = (product) => {
//     const existingProductIndex = CartProducts?.items
//       ? CartProducts?.items?.findIndex(
//           (item) => item.productId._id === product._id
//         )
//       : -1;
//     if (CartProducts?.items && existingProductIndex !== -1) {
//       const updatedCart = { ...CartProducts };
//       updatedCart.items[existingProductIndex].quantity += 1;
//       setCartProducts(updatedCart);
//     } else {
//       const newCartItem = {
//         productId: product,
//         quantity: 1,
//         price: product.price,
//         totalPrice: product.price,
//         _id: Math.random().toString(),
//       };
//       const updatedCart = { ...CartProducts };
//       updatedCart.items = updatedCart.items || [];
//       updatedCart.items.push(newCartItem);
//       setCartProducts(updatedCart);
//     }
//   };
// return (
//   <>
//     <Container className="mt-8 mb-28">
//       <Breadcrumbs separator="→" mt="xs">
//         {items}
//       </Breadcrumbs>

//       <div className="flex flex-col md:flex-row mt-12">
//         <Card radius="md" className="w-full md:w-3/6 h-auto md:h-full" withBorder padding="xl">
//           <Card.Section className="h-full">
//             <Carousel
//               withIndicators
//               loop
//               classNames={{
//                 root: classes.carousel,
//                 controls: classes.carouselControls,
//                 indicator: classes.carouselIndicator,
//               }}
//               className="h-full"
//             >
//               {slides}
//             </Carousel>
//           </Card.Section>
//         </Card>
//         <div className="mt-12 md:mt-0 md:ml-12 w-full md:w-3/6 flex flex-col items-start">
//           <Badge className="mb-8">{currentProduct.brand}</Badge>
//           <Text className="text-4xl text-left mb-4" weight={700}>
//             {currentProduct.name}
//           </Text>
//           <Text className="text-4xl text-left mb-12" weight={700}>
//             {`${currentProduct.price} EGP`}
//           </Text>
//           <div className="flex flex-col gap-3 w-full">
//             <div className="flex flex-row gap-4">
//               <Button
//                 className="w-full"
//                 radius="md"
//                 onClick={addProductTocard}
//                 loading={loading}
//               >
//                 Add to cart
//               </Button>
//             </div>
//           </div>
//           <div className="mt-8 flex flex-col items-start">
//             <p className="text-zinc-400">Description</p>
//             <p className="text-left max-w-2xl">
//               {currentProduct.description}
//             </p>
//           </div>

//           <div className="mt-12 flex flex-col items-start w-full">
//             <Text className={classes.formLabel}>Your rating *</Text>
//             {/* Rating component can be added here */}

//             <Text className={classes.formLabel}>Your review *</Text>
//             <textarea
//               id="review"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               required
//               rows="5"
//               className={classes.formControl}
//             />
//             <button className={classes.submitButton}>Submit</button>
//           </div>
//         </div>
//       </div>
//     </Container>
//   </>
// );
// };
// export default ProductPage;

import React, { useEffect, useState, useContext } from "react";
import {
  Breadcrumbs,
  Anchor,
  Container,
  Text,
  createStyles,
  getStylesRef,
  Image,
  Card,
  rem,
  Button,
  Badge,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useAuth } from "../context/auth";
import { useCart } from "../context/cartctx";
import BagContext from "../context/BagContext";

import { Carousel } from "@mantine/carousel";

import productApi from "../api/productApi";
import reviewApi from "../api/reviewApi";
import { useParams, useNavigate } from "react-router";
import cartApi from "../api/cartApi";

const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(16),
    },
  },

  formControl: {
    width: "100%",
    padding: "10px",
    margin: "10px 0px",
    border: "1px solid #ced4da",
    borderRadius: "10px",
    fontSize: rem(16),
    lineHeight: rem(24),
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    backgroundColor: theme.colorScheme === "dark" ? "#333" : "#fff",
  },

  formLabel: {
    fontWeight: "bold",
    marginBottom: rem(8),
  },

  submitButton: {
    marginTop: rem(12),
    padding: `${rem(10)} ${rem(20)}`,
    backgroundColor: theme.colors.green[6],
    color: theme.white,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.green[7],
    },
  },
}));

const ProductPage = () => {
  const { classes } = useStyles();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getCurrentProduct = async () => {
      try {
        const res = await productApi.getProductById(productId);
        setCurrentProduct(res);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentProduct();
  }, [navigate, productId]);

  const items = [
    { title: "Home", href: "/" },
    {
      title: `${currentProduct?.categoryId?.name}`,
      href: `/categories/${currentProduct?.categoryId?._id}`,
    },
    { title: `${currentProduct?.name}`, href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const slides = currentProduct?.image?.map((image) => (
    <Carousel.Slide key={image} className="flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden border border-gray-300">
        <Image
          src={image}
          alt="Product image"
          className="object-cover w-full h-full"
          fit="cover"
        />
      </div>
    </Carousel.Slide>
  ));

  const [auth, setAuth] = useAuth();
  const { bag, incBag } = useContext(BagContext);
  const [CartProducts, setCartProducts] = useCart();

  const addTocartApi = async () => {
    try {
      const res = await cartApi.addProduct(productId);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const addProductTocard = () => {
    setLoading(true);

    if (auth.user) {
      addProductToCart(currentProduct);
      incBag(productId);
      addTocartApi();
    } else {
      addProductToCartLocal(currentProduct);
    }
    notifications.show({
      title: `📦 ${currentProduct.name} added to cart`,
      message: "You can review it in the cart section",
    });
  };

  const addProductToCartLocal = (product) => {
    let cart;

    if (!auth.user) {
      const cartItems = localStorage.getItem("cartItems");
      cart = cartItems ? JSON.parse(cartItems) : { items: [] };
    } else {
      cart = { ...CartProducts };
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId._id === currentProduct._id
    );
    if (existingProductIndex !== -1) {
      cart.items[existingProductIndex].quantity += 1;
    } else {
      const newCartItem = {
        productId: currentProduct,
        quantity: 1,
        price: currentProduct.price,
        totalPrice: currentProduct.price,
        _id: currentProduct._id,
      };
      cart.items.push(newCartItem);
    }

    if (!auth.user) {
      localStorage.setItem("cartItems", JSON.stringify(cart));
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

  const submitReview = async () => {
    if (!auth.user) {
      notifications.show({
        title: "You need to be logged in to submit a review",
        message: "Please log in and try again",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await reviewApi.addReview({
        review,
        rating,
        product: productId,
        user: auth.user._id,
      });

      notifications.show({
        title: "Review submitted successfully",
        message: "Thank you for your feedback!",
        color: "green",
      });
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      notifications.show({
        title: "Error",
        message: "Failed to submit your review. Please try again later or you have already rated this product",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="mt-8 mb-28">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>

        <div className="flex flex-col md:flex-row mt-12">
          <Card
            radius="md"
            className="w-full md:w-3/6 h-auto md:h-full"
            withBorder
            padding="xl"
          >
            <Card.Section className="h-full">
              <Carousel
                withIndicators
                loop
                classNames={{
                  root: classes.carousel,
                  controls: classes.carouselControls,
                  indicator: classes.carouselIndicator,
                }}
                className="h-full"
              >
                {slides}
              </Carousel>
            </Card.Section>
          </Card>
          <div className="mt-12 md:mt-0 md:ml-12 w-full md:w-3/6 flex flex-col items-start">
            <Badge className="mb-8">{currentProduct.brand}</Badge>
            <Text className="text-4xl text-left mb-4" weight={700}>
              {currentProduct.name}
            </Text>
            <Text className="text-4xl text-left mb-12" weight={700}>
              {`${currentProduct.price} EGP`}
            </Text>
            <p className="text-zinc-400">Description</p>
            <p className="text-left max-w-2xl">{currentProduct.description}</p>
            <br />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row gap-4">
              <Button
                className="w-full"
                radius="md"
                onClick={addProductTocard}
                loading={loading}
                disabled={loading}
                // style={styles.button}
              >
                Add to Cart
              </Button>
            </div>
            <div className="mt-8 flex flex-col items-start"></div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className={classes.formLabel}>Submit a Review</h3>
          <textarea
            className={classes.formControl}
            rows="4"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <select
            className={classes.formControl}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="" disabled>
              Select a rating
            </option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <button
            className={classes.submitButton}
            onClick={submitReview}
            disabled={loading}
          >
            Submit Review
          </button>
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
