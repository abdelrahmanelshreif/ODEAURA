// import React from 'react'
// import { TextInput, Button, Group } from '@mantine/core'
// import { useForm } from '@mantine/form'
// import { useAuth } from '../../../context/auth'

// const NewAddress = (props) => {
//   const [auth, setAuth] = useAuth()

//   const form = useForm({
//     initialValues: {
//       street: auth.user?.shippingAddress?.street || '',
//       city: auth.user?.shippingAddress?.city || '',
//       state: auth.user?.shippingAddress?.state || '',
//       zip: auth.user?.shippingAddress?.zip || '',
//       country: auth.user?.shippingAddress?.country || '',
//       mobileNumber: auth.user?.mobileNumber || '', // Include mobileNumber for both authenticated and unauthenticated users
//     },
//     validate: {
//       // Add validation rules if needed
//     },
//   })

//   const submitHandler = async (values) => {
//     if (!auth.user) {
//       // Handle order submission for unauthenticated users
//       console.log('Order submitted by unauthenticated user:', values)
//     } else {
//       // Handle order submission for authenticated users
//       console.log('Order submitted by authenticated user:', values)
//     }
//     props.confimOrderHandler(values)
//   }

//   return (
//     <form
//       className="mb-6 flex flex-row w-full gap-10"
//       onSubmit={form.onSubmit((values) => submitHandler(values))}
//     >
//       <div className="w-full">
//         <TextInput
//           className="flex flex-col w-full items-start mb-4"
//           withAsterisk
//           label="Street"
//           placeholder=""
//           {...form.getInputProps('street')}
//         />
//         <div className="flex flex-row gap-4 w-full">
//           <TextInput
//             className="flex flex-col w-full items-start mb-4"
//             withAsterisk
//             label="City"
//             placeholder=""
//             {...form.getInputProps('city')}
//           />

//           <TextInput
//             className="flex flex-col w-full items-start mb-4"
//             withAsterisk
//             label="State"
//             placeholder=""
//             {...form.getInputProps('state')}
//           />
//         </div>

//         <div className="flex flex-row gap-4 w-full">
//           <TextInput
//             className="flex flex-col w-full items-start mb-4"
//             withAsterisk
//             label="Postal code"
//             placeholder=""
//             {...form.getInputProps('zip')}
//           />

//           <TextInput
//             className="flex flex-col w-full items-start mb-4"
//             withAsterisk
//             label="Country"
//             placeholder=""
//             {...form.getInputProps('country')}
//           />
//         </div>

//         <TextInput
//           className="flex flex-col w-full items-start mb-4"
//           withAsterisk
//           label="Mobile Number"
//           placeholder="Enter your mobile number"
//           {...form.getInputProps('mobileNumber')}
//         />

//         <Group position="right" mt="md">
//           <Button className="w-full mt-4" type="submit">
//             Submit
//           </Button>
//         </Group>
//       </div>
//     </form>
//   )
// }

// export default NewAddress

import React from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../../../context/auth';

const NewAddress = (props) => {
  const [auth] = useAuth(); // Use only the authentication state

  const form = useForm({
    initialValues: {
      street: auth.user?.shippingAddress?.street || '',
      city: auth.user?.shippingAddress?.city || '',
      state: auth.user?.shippingAddress?.state || '',
      zip: auth.user?.shippingAddress?.zip || '',
      country: auth.user?.shippingAddress?.country || '',
      mobileNumber: auth.user?.mobileNumber || '', // Include mobileNumber for both authenticated and unauthenticated users
    },
    validate: {
      street: (value) => (value.length === 0 ? 'Street is required' : null),
      city: (value) => (value.length === 0 ? 'City is required' : null),
      state: (value) => (value.length === 0 ? 'State is required' : null),
      zip: (value) => (value.length === 0 ? 'Postal code is required' : null),
      country: (value) => (value.length === 0 ? 'Country is required' : null),
      mobileNumber: (value) => (value.length === 0 ? 'Mobile Number is required' : null),
    },
  });

  const submitHandler = async (values) => {
    try {
      // Handle form submission for authenticated and unauthenticated users
      if (!auth.user) {
        console.log('Order submitted by unauthenticated user:', values);
      } else {
        console.log('Order submitted by authenticated user:', values);
      }
      // Call the prop function to handle the submitted data
      props.confimOrderHandler(values);
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  return (
    <form
      className="mb-6 flex flex-col w-full gap-4"
      onSubmit={form.onSubmit((values) => submitHandler(values))}
    >
      <TextInput
        withAsterisk
        label="Street"
        placeholder=""
        {...form.getInputProps('street')}
      />
      <div className="flex flex-row gap-4">
        <TextInput
          withAsterisk
          label="City"
          placeholder=""
          {...form.getInputProps('city')}
        />
        <TextInput
          withAsterisk
          label="State"
          placeholder=""
          {...form.getInputProps('state')}
        />
      </div>
      <div className="flex flex-row gap-4">
        <TextInput
          withAsterisk
          label="Postal code"
          placeholder=""
          {...form.getInputProps('zip')}
        />
        <TextInput
          withAsterisk
          label="Country"
          placeholder=""
          {...form.getInputProps('country')}
        />
      </div>
      <TextInput
        withAsterisk
        label="Mobile Number"
        placeholder="Enter your mobile number"
        {...form.getInputProps('mobileNumber')}
      />
      <Group position="right" mt="md">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default NewAddress;

