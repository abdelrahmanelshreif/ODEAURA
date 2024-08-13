import React, { useState } from 'react'
import { useCat } from '../../context/catCtx'
import { Table, Button, Drawer, Group, Input, TextInput, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import CatCardAdmin from '../../components/common/AdminPanal/CatCardAdmin'
import catApi from '../../api/catApi'

const AdminCategories = () => {
  const [cat, setCat] = useCat()
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {},
  })

  const addCatToList = async (values) => {
    setLoading(true)
    try {
      const res = await catApi.addCat({
        name: values?.name,
        description: values?.description,
      })
      setLoading(false)
      setCat((prevCat) => ({
        ...prevCat,
        categories: [...prevCat.categories, res.category],
      }))
      close()
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const deleteCatbyId = (categoryId) => {
    const updatedCategories = cat.categories.filter(
      (category) => category._id !== categoryId
    )
    setCat((prevCat) => ({
      ...prevCat,
      categories: updatedCategories,
    }))
  }

  return (
    <div className="flex flex-col items-start w-full bg-[#FCFCFD] p-4 md:p-8 overflow-auto">
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Add Category"
      >
        <form onSubmit={form.onSubmit((values) => addCatToList(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            {...form.getInputProps('name')}
          />
          <Textarea
            withAsterisk
            label="Description"
            placeholder="Description"
            {...form.getInputProps('description')}
          />
          <Group position="right" mt="md">
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Group>
        </form>
      </Drawer>

      <div className="w-full text-lg text-neutral-600 font-medium mb-8 flex flex-col md:flex-row items-center">
        <h1 className="text-left text-xl md:text-2xl">Categories</h1>
        <span className="text-lg bg-slate-300 ml-0 md:ml-3 rounded-xl px-5 text-gray-800 p-2">
          {cat?.categories?.length}
        </span>
        <Button className="ml-auto mt-4 md:mt-0" variant="filled" onClick={open}>
          Add Category
        </Button>
      </div>
      <div className="w-full mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cat?.categories?.map((item) => (
            <CatCardAdmin
              item={item}
              key={item._id}
              deleteCatbyId={deleteCatbyId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
