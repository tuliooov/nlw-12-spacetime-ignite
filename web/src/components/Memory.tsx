import Image from 'next/image'

import Link from 'next/link'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'

export interface IMemory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
  isPublic: string
}

interface MemoryProps {
  memory: IMemory
}
export function Memory({ memory }: MemoryProps) {
  const isAuthenticated = cookies().has('token')
  return (
    <div key={memory.id} className="space-y-4">
      <div className="flex justify-between ">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        {memory.isPublic && (
          <span className=" rounded-md bg-purple-500 px-2 py-1 align-middle text-xs text-white">
            Público
          </span>
        )}
      </div>
      <Image
        // src={`https://firebasestorage.googleapis.com/v0/b/search-of-carnival-7-boracodar.appspot.com/o/nlw-space-time-7%2F${memory.coverUrl}?alt=media&token=409c594e-019a-484b-a19d-9588c310e730`}
        src={`https://firebasestorage.googleapis.com/v0/b/search-of-carnival-7-boracodar.appspot.com/o/nlw-space-time%2F${memory.coverUrl}?alt=media&token=1ae335a0-7734-45d2-a24b-391f9f1d9120`}
        // src={memory.coverUrl}
        alt=""
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
      />
      <p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>
      {isAuthenticated && (
        <Link
          href={`/memories/${memory.id}`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          Ler mais
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
