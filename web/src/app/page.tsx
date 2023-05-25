import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { IMemory, Memory } from '@/components/Memory'

dayjs.locale(ptBR)

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  // if (!isAuthenticated) {
  //   return <EmptyMemories />
  // }

  const token = cookies().get('token')?.value

  const response = await api.get(
    `/memories${isAuthenticated ? '' : '/offline'}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const memories: IMemory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return <Memory key={memory.id} memory={memory} />
      })}
    </div>
  )
}
