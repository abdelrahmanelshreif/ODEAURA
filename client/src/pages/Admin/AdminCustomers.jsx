import { useEffect, useState } from 'react'
import authAPI from '../../api/AuthAPI'
import UsersAdminCard from '../../components/common/AdminPanal/UsersAdminCard'

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        const res = await authAPI.allUsers()
        setCustomers(res)
      } catch (error) {
        console.log(error)
      }
    }
    getAdminUsers()
  }, [])

  const deleteUserById = (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer._id !== id)
    )
  }

  const rows = customers?.map((item) => (
    <UsersAdminCard
      item={item}
      key={item._id}
      deleteUserById={deleteUserById}
    />
  ))

  return (
    <div className="flex flex-col items-start w-full bg-[#FCFCFD] p-4 md:p-8 overflow-auto">
      <div className="w-full text-lg text-neutral-600 font-medium mb-6 flex flex-row items-center">
        <h1 className="text-left text-xl md:text-2xl">Customers</h1>
      </div>
      <div className="flex-grow w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {rows}
        </div>
      </div>
    </div>
  )
}

export default AdminCustomers
