import React, { useState } from 'react'
import { Navbar, UnstyledButton, Stack, Container } from '@mantine/core'
import { ViewGrid, Svg3DSelectFace, FaceId, SimpleCart } from 'iconoir-react'
import AdminTable from '../../components/AdminTable'
import RecentUsersList from '../../components/RecentUsersList'
import FullLogo from '../../assets/images/FullLogo.svg'

const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  const linkStyle = {
    width: 'auto',
    height: 'auto',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '10px',
    cursor: 'pointer',
    backgroundColor: active ? '#D1FADF' : '',
    color: active ? '#039855' : '#667085',
  }

  return (
    <UnstyledButton style={linkStyle} onClick={onClick}>
      <Icon size="1.2rem" stroke={1.5} />
      <p>{label}</p>
    </UnstyledButton>
  )
}

const Current = ({ active }) => {
  if (active === 0) {
    return <div>Section 1</div>
  } else if (active === 1) {
    return <div>Section 2</div>
  } else if (active === 2) {
    return <RecentUsersList />
  } else if (active === 3) {
    return <AdminTable />
  }
}

const mockdata = [
  { icon: ViewGrid, label: 'Overview' },
  { icon: Svg3DSelectFace, label: 'Product' },
  { icon: FaceId, label: 'Customers' },
  { icon: SimpleCart, label: 'Orders' },
]

const AdminAccount = () => {
  const [active, setActive] = useState(0)

  const handleLinkClick = (index) => {
    setActive(index)
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      active={index === active}
      onClick={() => handleLinkClick(index)}
    />
  ))

  return (
    <Container fluid style={{ display: 'flex', flexDirection: 'row', height: '100vh', padding: 0 }}>
      <div style={{
        flex: '0 0 250px',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #ddd',
        padding: '20px',
        overflowY: 'auto',
        height: '100vh'
      }}>
        <Navbar p="xs" width={{ base: 250 }} height="100%">
          <Navbar.Section>
            <Stack direction="row" gap="sm" align="center" mb="lg">
              <img
                src={FullLogo}
                alt="Logo"
                height={35}
                style={{ marginLeft: '10px', marginRight: 'auto' }}
              />
            </Stack>
          </Navbar.Section>
          <Navbar.Section grow>
            <Stack justify="center" spacing="sm">
              {links}
            </Stack>
          </Navbar.Section>
        </Navbar>
      </div>
      <div style={{
        flex: 1,
        marginLeft: '250px',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <Current active={active} />
      </div>
    </Container>
  )
}

export default AdminAccount
