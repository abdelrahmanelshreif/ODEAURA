import { useEffect, useState } from 'react';
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Loader,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authAPI from '../../api/AuthAPI';
import { useAuth } from '../../context/auth';
import { User } from 'iconoir-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [loginLoading, setLoginLoading] = useState(true);

  const fromUrl = location.state?.from || '/';

  useEffect(() => {
    const checkUser = async () => {
      try {
        await authAPI.verifyUser();
        navigate(fromUrl);
      } catch (err) {
        console.error(err);
        setLoginLoading(false);
      }
    };
    checkUser();
  }, [auth, navigate, fromUrl]);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const submitHandler = async (values) => {
    setLoading(true);
    try {
      const res = await authAPI.login({
        email: values.email,
        password: values.password,
      });

      // Sending email and password as URL parameters
      const loginUrl = `/login?email=${encodeURIComponent(values.email)}&password=${encodeURIComponent(values.password)}`;
      navigate(loginUrl);

      setAuth({
        ...auth,
        token: res.user,
      });
      navigate(fromUrl);
    } catch (err) {
      notifications.show({
        color: 'red',
        title: 'Invalid credentials',
        message: `${err.data.email || 'Email'} ${err.data.password || 'Password'}`,
      });
      form.setErrors({ email: 'Could not find your account', password: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loginLoading ? (
        <div className="w-full h-[calc(100vh-405px)] flex flex-col items-center justify-center">
          <Loader variant="dots" />
        </div>
      ) : (
        <Box className="mt-20 mb-20" maw={400} mx="auto">
          <h1 className="text-3xl font-medium text-gray-600 mb-8">Login</h1>
          <form className="mb-6" onSubmit={form.onSubmit(submitHandler)}>
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
            <Group position="right" mt="md">
              <Button className="w-full mt-4" type="submit" loading={loading}>
                Submit
              </Button>
            </Group>
          </form>
          <span className="text-gray-400 pt-3">
            Do not have an account?{' '}
            <Link to="/signup" className="text-primary font-medium">
              Sign Up
            </Link>
          </span>
        </Box>
      )}
    </>
  );
};

export default Login;

// src/pages/Auth/Login.js
// import { useEffect, useState } from 'react';
// import {
//   TextInput,
//   Button,
//   Group,
//   Box,
//   PasswordInput,
//   Loader,
// } from '@mantine/core';
// import { notifications } from '@mantine/notifications';
// import { useForm } from '@mantine/form';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import authAPI from '../../api/AuthAPI';
// import { useAuth } from '../../context/auth';
// import CookieConsentBanner from '../../context/CookieConsentBanner';
// import Cookies from 'js-cookie';

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [auth, setAuth] = useAuth();
//   const [loginLoading, setLoginLoading] = useState(true);
//   const [cookieConsent, setCookieConsent] = useState(false);

//   const fromUrl = location.state?.from || '/';

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         await authAPI.verifyUser();
//         navigate(fromUrl);
//       } catch (err) {
//         console.error(err);
//         setLoginLoading(false);
//       }
//     };
//     checkUser();
//   }, [auth, navigate, fromUrl]);

//   const form = useForm({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//     },
//   });

//   const submitHandler = async (values) => {
//     setLoading(true);
//     try {
//       const res = await authAPI.login({
//         email: values.email,
//         password: values.password,
//       });

//       if (cookieConsent) {
//         // Store the token in cookies
//         Cookies.set('login_token', res.token, { expires: 365, sameSite: 'None', secure: false });
//       }

//       setAuth({
//         ...auth,
//         token: res.token,
//       });
//       navigate(fromUrl);
//     } catch (err) {
//       notifications.show({
//         color: 'red',
//         title: 'Invalid credentials',
//         message: `${err.data.email || 'Email'} ${err.data.password || 'Password'}`,
//       });
//       form.setErrors({ email: 'Could not find your account', password: '' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loginLoading ? (
//         <div className="w-full h-[calc(100vh-405px)] flex flex-col items-center justify-center">
//           <Loader variant="dots" />
//         </div>
//       ) : (
//         <Box className="mt-20 mb-20" maw={400} mx="auto">
//           <h1 className="text-3xl font-medium text-gray-600 mb-8">Login</h1>
//           <form className="mb-6" onSubmit={form.onSubmit(submitHandler)}>
//             <TextInput
//               className="flex flex-col w-full items-start mb-4"
//               withAsterisk
//               label="Email"
//               placeholder="your@email.com"
//               {...form.getInputProps('email')}
//             />
//             <PasswordInput
//               className="flex flex-col w-full items-start"
//               withAsterisk
//               label="Password"
//               placeholder="Type your password"
//               {...form.getInputProps('password')}
//             />
//             <Group position="right" mt="md">
//               <Button className="w-full mt-4" type="submit" loading={loading}>
//                 Submit
//               </Button>
//             </Group>
//           </form>
//           <span className="text-gray-400 pt-3">
//             Do not have an account?{' '}
//             <Link to="/signup" className="text-primary font-medium">
//               Sign Up
//             </Link>
//           </span>
//         </Box>
//       )}
//       <CookieConsentBanner onAccept={() => setCookieConsent(true)} />
//     </>
//   );
// };

// export default Login;
