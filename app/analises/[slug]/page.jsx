import { parse } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'
import Heading1 from '@/components/heading-1'
import { getReview } from '@/lib/get-review'

const GameReview = async ({ params }) => {
  const { content, data } = await getReview(params.slug)
  const [year, month, day] = data.date.split('-')
  console.log('Rendered GameReview component:', params.slug)
  return (
    <>
      <Heading1>{data.title}</Heading1>
      <time dateTime={data.date}>{`${day}/${month}/${year}`}</time>
      <Image
        src={data.img}
        width="640"
        height="360"
        alt=""
        priority
        className="rounded-lg mt-5 mb-5"
      />
      <article
        className="prose text-slate-200 prose-strong:text-slate-200"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parse(content)) }}
      />
    </>
  )
}

export default GameReview
