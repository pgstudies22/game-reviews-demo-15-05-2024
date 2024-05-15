import { readdir } from 'node:fs/promises'
import Image from 'next/image'
import Link from 'next/link'
import Heading1 from '@/components/heading-1'
import { getReview } from '@/lib/get-review'

const Reviews = async () => {
  const files = await readdir(`${process.cwd()}/content/reviews/`)
  const reviewPromises = files.map(async file => {
    const slug = file.replace('.md', '')
    const { data: { title, img } } = await getReview(slug)
    return { title, img, path: `/analises/${slug}` }
  })

  const reviews = await Promise.all(reviewPromises)
  return (
    <>
      <Heading1>Análises</Heading1>
      <ul className="flex gap-5 mt-3">
        {reviews.map(review =>
          <li key={review.title} className="bg-slate-700 rounded-lg border border-slate-700 hover:shadow-lg">
            <Link href={review.path}>
              <Image
                src={review.img}
                width="320"
                height="180"
                alt=""
                priority
                className="rounded-t-lg"
              />
              <h2 className="text-center text-base p-3 font-montserrat">{review.title}</h2>
            </Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default Reviews 
