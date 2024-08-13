// import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core'
// import { useForm } from '@mantine/form'
// import { Link } from 'react-router-dom'
// const AdminLogin = () => {
//   const form = useForm({
//     initialValues: {
//       email: '',
//       password: '',
//     },

//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//     },
//   })

//   return (
//     <Box className=" mt-20 mb-20" maw={400} mx="auto">
//       <h1 className=" text-3xl font-medium text-gray-600 mb-8">Admin Login</h1>

//       <form
//         className="mb-6"
//         onSubmit={form.onSubmit((values) => console.log(values))}
//       >
//         <TextInput
//           className="flex flex-col w-full items-start mb-4"
//           withAsterisk
//           label="Email"
//           placeholder="your@email.com"
//           {...form.getInputProps('email')}
//         />
//         <PasswordInput
//           className="flex flex-col w-full items-start"
//           withAsterisk
//           label="Password"
//           placeholder="Type your password"
//           {...form.getInputProps('password')}
//         />

//         <Group position="right" mt="md">
//           <Button className="w-full mt-4" type="submit">
//             Submit
//           </Button>
//         </Group>
//       </form>
//     </Box>
//   )
// }

// export default AdminLogin

import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import authAPI from './authAPI' // Import your authAPI
import { useState } from 'react'

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleLogin = async (values) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(values);
      console.log('Login successful:', response);
      
      // Redirect to dashboard or desired page after login
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="mt-20 mb-20" maw={400} mx="auto">
      <h1 className="text-3xl font-medium text-gray-600 mb-8">Admin Login</h1>

      <form className="mb-6" onSubmit={form.onSubmit(handleLogin)}>
        <TextInput
          className="flex flex-col w-full items-start mb-4"
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          className="flex flex-col w-full items-start"
          withAsterisk
          label="Password"
          placeholder="Type your password"
          {...form.getInputProps('password')}
        />

        {error && <p className="text-red-600">{error}</p>}

        <Group position="right" mt="md">
          <Button className="w-full mt-4" type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default AdminLogin;
