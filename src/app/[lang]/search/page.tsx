import { Search } from '@/components/search/Search.component'
import React from 'react'
import { getDictionary } from '../dictionaries'

const page = async({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ar' }>
}) => {
   const { lang } = await params

  const dict = await getDictionary(lang) 
  return (
<Search dict={dict}/>
  )
}

export default page
