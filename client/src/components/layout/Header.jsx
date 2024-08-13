// // import { useEffect, useState, useContext } from 'react'
// // import { useAuth } from '../../context/auth'
// // import { useCart } from '../../context/cartctx'
// // import {
// //   createStyles,
// //   Header,
// //   Container,
// //   Group,
// //   Burger,
// //   Paper,
// //   Transition,
// //   rem,
// //   Input,
// //   Avatar,
// //   Badge,
// // } from '@mantine/core'
// // import { useDisclosure } from '@mantine/hooks'

// // // Icons
// // import {
// //   Search,
// //   ShoppingBag,
// //   ProfileCircle,
// //   LogOut,
// // } from 'iconoir-react'

// // import { logo } from './../../assets'
// // import { Link, useNavigate, useParams } from 'react-router-dom'
// // import BagContext from '../../context/BagContext'
// // import authAPI from '../../api/AuthAPI'

// // const links = [
// //   { link: '/', label: 'Home' },
// //   { link: '/categories', label: 'Categories' },
// // ]

// // const HEADER_HEIGHT = '110px'

// // const useStyles = createStyles((theme) => ({
// //   root: {
// //     position: 'relative',
// //     zIndex: 1,
// //     width: '100%',
// //   },

// //   dropdown: {
// //     position: 'absolute',
// //     top: HEADER_HEIGHT,
// //     left: 0,
// //     right: 0,
// //     zIndex: 0,
// //     borderTopRightRadius: 0,
// //     borderTopLeftRadius: 0,
// //     borderTopWidth: 0,
// //     overflow: 'hidden',

// //     [theme.fn.largerThan('sm')]: {
// //       display: 'none',
// //     },
// //   },

// //   header: {
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     height: '100%',
// //     width: '100%',

// //     [theme.fn.smallerThan('sm')]: {
// //       flexDirection: 'column',
// //       alignItems: 'flex-start',
// //     },
// //   },

// //   logoContainer: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: rem(20),
// //     [theme.fn.smallerThan('sm')]: {
// //       width: '100%',
// //       justifyContent: 'center',
// //     },
// //   },

// //   links: {
// //     [theme.fn.smallerThan('sm')]: {
// //       display: 'none',
// //     },
// //   },

// //   burgerContainer: {
// //     [theme.fn.largerThan('sm')]: {
// //       display: 'none',
// //     },
// //     marginTop: rem(20), // Adjust this value to position the burger menu further down
// //   },

// //   burger: {
// //     [theme.fn.largerThan('sm')]: {
// //       display: 'none',
// //     },
// //   },

// //   link: {
// //     display: 'block',
// //     lineHeight: 1,
// //     padding: `${rem(8)} ${rem(12)}`,
// //     borderRadius: theme.radius.sm,
// //     textDecoration: 'none',
// //     color: theme.colorScheme === 'dark'
// //       ? theme.colors.dark[0]
// //       : theme.colors.gray[7],
// //     fontSize: theme.fontSizes.sm,
// //     fontWeight: 500,

// //     '&:hover': {
// //       backgroundColor: theme.colorScheme === 'dark'
// //         ? theme.colors.dark[6]
// //         : theme.colors.gray[0],
// //     },

// //     [theme.fn.smallerThan('sm')]: {
// //       borderRadius: 0,
// //       padding: theme.spacing.md,
// //     },
// //   },

// //   linkActive: {
// //     '&, &:hover': {
// //       backgroundColor: theme.fn.variant({
// //         variant: 'light',
// //         color: theme.primaryColor,
// //       }).background,
// //       color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
// //         .color,
// //     },
// //   },

// //   searchInput: {
// //     [theme.fn.smallerThan('sm')]: {
// //       width: '100%',
// //     },
// //   },

// //   avatar: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: rem(8),
// //   },

// //   badge: {
// //     position: 'relative',
// //     display: 'inline-block',
// //     marginRight: rem(8),
// //   },

// //   navbar: {
// //     display: 'none',
// //     [theme.fn.largerThan('sm')]: {
// //       display: 'flex',
// //     },
// //   },
// // }))

// // function MainHeader() {
// //   const navigate = useNavigate()
// //   const [auth, setAuth] = useAuth()
// //   const [CartProducts, setCartProducts] = useCart()
// //   const { bag, setthebag } = useContext(BagContext)

// //   useEffect(() => {
// //     setthebag(CartProducts?.items?.length)
// //   }, [CartProducts, navigate])

// //   const isUser = auth.user
// //   const curLink = useParams()
// //   const [opened, { toggle, close }] = useDisclosure(false)
// //   const [active, setActive] = useState(`/${curLink['*'] ? curLink['*'] : ''}`)
// //   const { classes, cx } = useStyles()

// //   const items = links.map((link) => (
// //     <a
// //       key={link.label}
// //       href={link.link}
// //       className={cx(classes.link, {
// //         [classes.linkActive]: active === link.link,
// //       })}
// //       onClick={(event) => {
// //         event.preventDefault()
// //         setActive(link.link)
// //         navigate(link.link)
// //         close()
// //       }}
// //     >
// //       {link.label}
// //     </a>
// //   ))

// //   const handleLogout = async () => {
// //     try {
// //       const res = await authAPI.logout()
// //       setAuth({ user: null, token: null })
// //       navigate('/')
// //       window.location.reload()
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }

// //   const [searchValue, setSearchValue] = useState('')
// //   const handleInputChange = (e) => {
// //     setSearchValue(e.target.value)
// //   }

// //   const handleSearch = () => {
// //     navigate(`/search/${searchValue}`)
// //   }

// //   const handleKeyDown = (e) => {
// //     if (e.key === 'Enter') {
// //       handleSearch()
// //     }
// //   }

// //   return (
// //     <Header height={HEADER_HEIGHT} mb={20} className={classes.root}>
// //       <Container className={classes.header}>
// //         {/* Left side */}
// //         <div className={classes.logoContainer}>
// //           <Link to="/">
// //             <img src={logo} alt="logo" className="max-w-[150px]" />
// //           </Link>
// //           <Group spacing={5} className={classes.links}>
// //             {items}
// //             {isUser?.isAdmin && (
// //               <Link
// //                 className="bg-slate-200 px-3 py-2 rounded-xl font-medium text-sm text-gray-500"
// //                 to="/admin"
// //               >
// //                 Dashboard
// //               </Link>
// //             )}
// //           </Group>
// //         </div>

// //         {/* Right Side */}
// //         <div className="flex flex-row items-center gap-3">
// //           <Input
// //             className={`${classes.searchInput} w-[300px] max-w-sm rounded-full mr-3`}
// //             placeholder="What you are looking for?"
// //             radius="xl"
// //             value={searchValue}
// //             onChange={handleInputChange}
// //             onKeyDown={handleKeyDown}
// //             rightSection={
// //               <div
// //                 className="p-2 rounded-full bg-primary cursor-pointer"
// //                 onClick={handleSearch}
// //               >
// //                 <Search color="white" height={16} width={16} />
// //               </div>
// //             }
// //           />
// //           <Link to="/cart" className={classes.badge}>
// //             <Badge className="!p-1 !px-[6px]" variant="filled">
// //               {bag || 0}
// //             </Badge>
// //             <ShoppingBag color="#98A2B3" strokeWidth={2} />
// //           </Link>
// //           <div className="w-[2px] rounded-full h-3 bg-gray-300 mx-2" />
// //           <div className={classes.avatar}>
// //             {!isUser ? (
// //               <>
// //                 <ProfileCircle color="#98A2B3" strokeWidth={2} />
// //                 <Link
// //                   className="font-medium text-sm text-gray-500"
// //                   to="/login"
// //                 >
// //                   Login
// //                 </Link>
// //               </>
// //             ) : (
// //               <Link to="/myaccount">
// //                 <div className="flex flex-row items-center gap-2">
// //                   <Avatar
// //                     className="rounded-full"
// //                     src={isUser?.photo}
// //                     alt="User Avatar"
// //                   />
// //                   <p className="font-medium text-sm text-gray-500">
// //                     {isUser.firstName}
// //                   </p>
// //                   <LogOut
// //                     color="#98A2B3"
// //                     strokeWidth={2}
// //                     onClick={handleLogout}
// //                   />
// //                 </div>
// //               </Link>
// //             )}
// //           </div>
// //         </div>

// //         {/* Burger Menu */}
// //         <div className={classes.burgerContainer}>
// //           <Burger
// //             opened={opened}
// //             onClick={toggle}
// //             className={classes.burger}
// //             size="sm"
// //           />
// //         </div>

// //         <Transition transition="pop-top-right" duration={200} mounted={opened}>
// //           {(styles) => (
// //             <Paper className={classes.dropdown} withBorder style={styles}>
// //               {items}
// //             </Paper>
// //           )}
// //         </Transition>
// //       </Container>
// //     </Header>
// //   )
// // }

// // export default MainHeader

// import { useEffect, useState, useContext } from 'react'
// import { useAuth } from '../../context/auth'
// import { useCart } from '../../context/cartctx'
// import {
//   createStyles,
//   Header,
//   Container,
//   Group,
//   Burger,
//   Paper,
//   Transition,
//   rem,
//   Input,
//   Avatar,
//   Badge,
// } from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'

// // Icons
// import {
//   Search,
//   ShoppingBag,
//   ProfileCircle,
//   LogOut,
// } from 'iconoir-react'

// import { logo } from './../../assets'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import BagContext from '../../context/BagContext'
// import authAPI from '../../api/AuthAPI'

// const links = [
//   { link: '/', label: 'Home' },
//   { link: '/categories', label: 'Categories' },
// ]

// const HEADER_HEIGHT = '100%'

// const useStyles = createStyles((theme) => ({
//   root: {
//     position: 'relative',
//     zIndex: 1,
//     width: '100%',
//   },


//   header: {
//     display: '-ms-inline-grid',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: '100%',
//     width: '100%',

//     [theme.fn.smallerThan('sm')]: {
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//     },
//   },

//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: rem(20),
//     [theme.fn.smallerThan('sm')]: {
//       width: '100%',
//       justifyContent: 'center',
//     },
//   },

//   links: {
//     [theme.fn.smallerThan('sm')]: {
//       display: 'none',
//     },
//   },

//   burgerContainer: {
//     [theme.fn.largerThan('sm')]: {
//       display: 'none',
//     },
//     marginTop: rem(20), // Adjust this value to position the burger menu further down
//   },

//   burger: {
//     [theme.fn.largerThan('sm')]: {
//       display: 'none',
//     },
//   },

//   link: {
//     display: 'block',
//     lineHeight: 1,
//     padding: `${rem(8)} ${rem(12)}`,
//     borderRadius: theme.radius.sm,
//     textDecoration: 'none',
//     color: theme.colorScheme === 'dark'
//       ? theme.colors.dark[0]
//       : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark'
//         ? theme.colors.dark[6]
//         : theme.colors.gray[0],
//     },

//     [theme.fn.smallerThan('sm')]: {
//       borderRadius: 0,
//       padding: theme.spacing.md,
//     },
//   },

//   linkActive: {
//     '&, &:hover': {
//       backgroundColor: theme.fn.variant({
//         variant: 'light',
//         color: theme.primaryColor,
//       }).background,
//       color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
//         .color,
//     },
//   },

//   searchInput: {
//     [theme.fn.smallerThan('sm')]: {
//       width: '100%',
//     },
//   },

//   avatar: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: rem(8),
//   },

//   badge: {
//     position: 'relative',
//     display: 'inline-block',
//     marginRight: rem(8),
//   },

//   navbar: {
//     display: 'none',
//     [theme.fn.largerThan('sm')]: {
//       display: 'flex',
//     },
//   },

//   loginLink: {
//     color: theme.colorScheme === 'dark'
//       ? theme.colors.dark[0]
//       : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,
//     textDecoration: 'none',
    
//     '&:hover': {
//       color: theme.colorScheme === 'dark'
//         ? theme.colors.dark[4]
//         : theme.colors.gray[5],
//     },
//   },

//   logoutIcon: {
//     cursor: 'pointer',
//     marginLeft: rem(8),
//     color: theme.colorScheme === 'dark'
//       ? theme.colors.dark[0]
//       : theme.colors.gray[7],
//   },
// }))

// function MainHeader() {
//   const navigate = useNavigate()
//   const [auth, setAuth] = useAuth()
//   const [CartProducts, setCartProducts] = useCart()
//   const { bag, setthebag } = useContext(BagContext)

//   useEffect(() => {
//     setthebag(CartProducts?.items?.length)
//   }, [CartProducts, navigate])

//   const isUser = auth.user
//   const curLink = useParams()
//   const [opened, { toggle, close }] = useDisclosure(false)
//   const [active, setActive] = useState(`/${curLink['*'] ? curLink['*'] : ''}`)
//   const { classes, cx } = useStyles()

//   const items = links.map((link) => (
//     <a
//       key={link.label}
//       href={link.link}
//       className={cx(classes.link, {
//         [classes.linkActive]: active === link.link,
//       })}
//       onClick={(event) => {
//         event.preventDefault()
//         setActive(link.link)
//         navigate(link.link)
//         close()
//       }}
//     >
//       {link.label}
//     </a>
//   ))

//   const handleLogout = async () => {
//     try {
//       const res = await authAPI.logout()
//       setAuth({ user: null, token: null })
//       navigate('/')
//       window.location.reload()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const [searchValue, setSearchValue] = useState('')
//   const handleInputChange = (e) => {
//     setSearchValue(e.target.value)
//   }

//   const handleSearch = () => {
//     navigate(`/search/${searchValue}`)
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch()
//     }
//   }

//   return (
//     <Header height={HEADER_HEIGHT} mb={20} className={classes.root}>
//       <Container className={classes.header}>
//         {/* Left side */}
//         <div className={classes.logoContainer}>
//           <Link to="/">
//             <img src={logo} alt="logo" className="max-w-[150px]" />
//           </Link>
//           <Group spacing={5} className={classes.links}>
//             {items}
//             {isUser?.isAdmin && (
//               <Link
//                 className="bg-slate-200 px-3 py-2 rounded-xl font-medium text-sm text-gray-500"
//                 to="/admin"
//               >
//                 Dashboard
//               </Link>
//             )}
//           </Group>
//         </div>

//         {/* Right Side */}
//         <div className="flex flex-row items-center gap-3">
//           <Input
//             className={`${classes.searchInput} w-[300px] max-w-sm rounded-full mr-3`}
//             placeholder="What you are looking for?"
//             radius="xl"
//             value={searchValue}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             rightSection={
//               <div
//                 className="p-2 rounded-full bg-primary cursor-pointer"
//                 onClick={handleSearch}
//               >
//                 <Search color="white" height={16} width={16} />
//               </div>
//             }
//           />
//           <Link to="/cart" className={classes.badge}>
//             <Badge className="!p-1 !px-[6px]" variant="filled">
//               {bag || 0}
//             </Badge>
//             <ShoppingBag color="#98A2B3" strokeWidth={2} />
//           </Link>
//           <div className="w-[2px] rounded-full h-3 bg-gray-300 mx-2" />
//           <div className={classes.avatar}>
//             {!isUser ? (
//               <>
//                 <ProfileCircle color="#98A2B3" strokeWidth={2} />
//                 <Link
//                   className={classes.loginLink}
//                   to="/login"
//                 >
//                   Login
//                 </Link>
//               </>
//             ) : (
//               <Link to="/myaccount">
//                 <div className="flex flex-row items-center gap-2">
//                   <Avatar
//                     className="rounded-full"
//                     src={isUser?.photo}
//                     alt="User Avatar"
//                   />
//                   <p className="font-medium text-sm text-gray-500">
//                     {isUser.firstName}
//                   </p>
//                   <LogOut
//                     className={classes.logoutIcon}
//                     strokeWidth={2}
//                     onClick={handleLogout}
//                   />
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Burger Menu */}
//         <div className={classes.burgerContainer}>
//           <Burger
//             opened={opened}
//             onClick={toggle}
//             className={classes.burger}
//             size="sm"
//           />
//         </div>

//         <Transition transition="pop-top-right" duration={200} mounted={opened}>
//           {(styles) => (
//             <Paper className={classes.dropdown} withBorder style={styles}>
//               {items}
//             </Paper>
//           )}
//         </Transition>
//       </Container>
//     </Header>
//   )
// }

// export default MainHeader
import { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cartctx';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Input,
  Avatar,
  Badge,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Icons
import {
  Search,
  ShoppingBag,
  ProfileCircle,
  LogOut,
} from 'iconoir-react';

import { logo } from './../../assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BagContext from '../../context/BagContext';
import authAPI from '../../api/AuthAPI';

const links = [
  { link: '/', label: 'Home' },
  { link: '/categories', label: 'Categories' },
];

const HEADER_HEIGHT = '100%';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
  },
  header: {
    display: '-ms-inline-flexbox',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: rem(20),
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  burgerContainer: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
    marginTop: rem(20), // Adjust this value to position the burger menu further down
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  searchInput: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    gap: rem(8),
  },
  badge: {
    position: 'relative',
    display: 'inline-block',
    marginRight: rem(8),
  },
  navbar: {
    display: 'none',
    [theme.fn.largerThan('sm')]: {
      display: 'flex',
    },
  },
  loginLink: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    textDecoration: 'none',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[5],
    },
  },
  logoutIcon: {
    cursor: 'pointer',
    marginLeft: rem(8),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  },
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

function MainHeader() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [CartProducts, setCartProducts] = useCart();
  const { bag, setthebag } = useContext(BagContext);

  useEffect(() => {
    setthebag(CartProducts?.items?.length);
  }, [CartProducts, navigate]);

  const isUser = auth.user;
  const curLink = useParams();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(`/${curLink['*'] ? curLink['*'] : ''}`);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  const handleLogout = async () => {
    try {
      const res = await authAPI.logout();
      setAuth({ user: null, token: null });
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search/${searchValue}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Header height={HEADER_HEIGHT} mb={20} className={classes.root}>
      <Container className={classes.header}>
        {/* Left side */}
        <div className={classes.logoContainer}>
          <Link to="/">
            <img src={logo} alt="logo" className="max-w-[150px]" />
          </Link>
          <Group spacing={5} className={classes.links}>
            {items}
            {isUser?.isAdmin && (
              <Link
                className="bg-slate-200 px-3 py-2 rounded-xl font-medium text-sm text-gray-500"
                to="/admin"
              >
                Dashboard
              </Link>
            )}
          </Group>
        </div>

        {/* Right Side */}
        <div className="flex flex-row items-center gap-3">
          <Input
            className={`${classes.searchInput} w-[300px] max-w-sm rounded-full mr-3`}
            placeholder="What you are looking for?"
            radius="xl"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rightSection={
              <div
                className="p-2 rounded-full bg-primary cursor-pointer"
                onClick={handleSearch}
              >
                <Search color="white" height={16} width={16} />
              </div>
            }
          />
          <Link to="/cart" className={classes.badge}>
            <Badge className="!p-1 !px-[6px]" variant="filled">
              {bag || 0}
            </Badge>
            <ShoppingBag color="#98A2B3" strokeWidth={2} />
          </Link>
          <div className="w-[2px] rounded-full h-3 bg-gray-300 mx-2" />
          <div className={classes.avatar}>
            {!isUser ? (
              <>
                <ProfileCircle color="#98A2B3" strokeWidth={2} />
                <Link
                  className={classes.loginLink}
                  to="/login"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link to="/myaccount">
                <div className="flex flex-row items-center gap-2">
                  <Avatar
                    className="rounded-full"
                    src={isUser?.photo}
                    alt="User Avatar"
                  />
                  <p className="font-medium text-sm text-gray-500">
                    {isUser.firstName}
                  </p>
                  <LogOut
                    className={classes.logoutIcon}
                    strokeWidth={2}
                    onClick={handleLogout}
                  />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Burger Menu */}
        <div className={classes.burgerContainer}>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </div>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {isUser?.isAdmin && (
                <Link
                  className={`${classes.link} bg-slate-200 px-3 py-2 rounded-xl font-medium text-sm text-gray-500`}
                  to="/admin"
                  onClick={(event) => {
                    event.preventDefault();
                    setActive('/admin');
                    navigate('/admin');
                    close();
                  }}
                >
                  Dashboard
                </Link>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

export default MainHeader;
