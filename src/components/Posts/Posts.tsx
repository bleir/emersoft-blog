'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IPosts, IPost } from '@/components/types';

const Posts: FC<IPosts> = ({
	posts,
	input,
	currentSliceStart,
	currentSliceEnd,
}) => {
	const router = useRouter();

	const handleClick = (slug: string) => {
		router.push(`/posts/${slug}`);
	};

	return (
		<div className='grid grid-cols-3 my-5'>
			{posts
				.slice(currentSliceStart, currentSliceEnd)
				.filter((post: IPost) => post.title.includes(input))
				.map(({ id, title, imageUrl, excerpt, slug }: IPost) => {
					return (
						<div
							key={id}
							className='rounded-md shadow-lg mx-5 overflow-hidden cursor-pointer'
							onClick={() => handleClick(slug)}
						>
							<Image
								src={imageUrl}
								alt={title}
								width={700}
								height={250}
								className='transition ease-in-out delay-100 hover:-translate-y-3 hover:scale-110'
							/>
							<div className='p-5'>
								<h3 className='my-3 text-gray-800 text-xl font-bold my-3'>
									{title}
								</h3>
								<p className='text-gray-400'>{excerpt}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Posts;
