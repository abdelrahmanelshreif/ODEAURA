import { useRef, useState } from 'react'
import {
  Breadcrumbs,
  Anchor,
  Container,
  Table,
  Button,
  Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useCart } from '../context/cartctx'
import CartProduct from '../components/common/Cart/CartProduct'
import { useAuth } from '../context/auth'
import NewAddress from '../components/common/Cart/NewAddress'
import orderApi from '../api/orderApi'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import axiosClient from '../api/axiosClient'

const Cart = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [CartProducts, setCartProducts] = useCart()
  const handlers = useRef()

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Cart', href: '/cart' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  const rows = CartProducts?.items?.map((item) => (
    <CartProduct item={item} key={item._id} />
  ))
  const [opened, { open, close }] = useDisclosure(false)

  const confimOrderHandler = async (address) => {
    const addTheOrder = async () => {
      try {
        const res = await orderApi.addOrder({
          shippingAddress: {
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
            mobileNumber: address.mobileNumber
          },
        })
        close()
      } catch (err) {
        console.log(err)
      }
    }
    addTheOrder()

    console.log(CartProducts)
    const stripe = await loadStripe('')

    const body = {
      products: CartProducts?.items,
    }

    const headres = {
      'Content-Type': 'application/json',
    }

    const response = await axiosClient.post(
      'cart/create-checkout-session',
      body
    )

    console.log(response)
    stripe
      .redirectToCheckout({
        sessionId: response.id,
      })
      .then((result) => {
        addTheOrder()
        if (result.error) {
          alert(result.error.message)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <Modal size="md" opened={opened} onClose={close} title="Confim order">
        <div className="flex flex-col gap-3 w-full justify-between mb-4">
          <span className="w-full flex flex-row justify-between">
            <p>subtotal</p>
            <p>EGP {CartProducts?.subTotal?.toFixed(2)}</p>
          </span>
          <span className="w-full flex flex-row justify-between">
            <p>Shipping cost</p>
            <p>EGP 0</p>
          </span>
          <span className="w-full flex flex-row justify-between">
            <p>Total</p>
            <p>EGP {(CartProducts?.subTotal + 0)?.toFixed(2)}</p>
          </span>
        </div>
        <div className="flex flex-col w-full">
          <p>Adress</p>
          <NewAddress confimOrderHandler={confimOrderHandler} />
        </div>
      </Modal>
      <Container className="mt-8 mb-28">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>
        <h1 className="text-left font-bold text-zinc-800 mt-6">
          Shopping Cart
        </h1>
        <div className="flex flex-col lg:flex-row justify-between mt-10 gap-7 items-start">
          <div className="flex-grow w-full lg:w-2/3">
            <Table className="min-w-full lg:min-w-[800px]" verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th className="w-40">Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>

          <div className="flex w-full lg:w-1/3 flex-col">
            <div className="bg-[#F9FAFB] w-full rounded-sm flex flex-col justify-start items-start p-5">
              <p className="text-gray-800 font-semibold text-xl mb-4">
                Order Summary
              </p>
              <div className="text-left flex flex-row justify-between w-full">
                <p className="text-[#475467]">item(s) Total</p>
                <p>EGP {CartProducts?.subTotal?.toFixed(2)}</p>
              </div>
            </div>

            <Button
              onClick={open}
              className="w-full mt-4"
              type="submit"
              loading={loading}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Cart