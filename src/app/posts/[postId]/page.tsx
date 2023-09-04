'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPost } from '../../page';

export default function Post({ params }: any) {
	const [post, setPost] = useState<IPost>();

	const fetchPost = async () => {
		const res = await fetch('http://localhost:3000/api/posts');
		const result = JSON.parse(await res.json());
		const filtered = result.posts.filter(
			(post: IPost) => post.slug === params.postId
		)[0];

		setPost(filtered);
	};

	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<main className='flex flex-col items-center justify-between p-24 w-full text-center'>
			<Link
				href='/'
				className='text-gray-600 underline hover:text-gray-400 hover:no-underline'
			>
				Go back
			</Link>

			<div className='w-6/12'>
				<h1 className='text-gray-800 text-3xl font-bold my-7'>
					{post?.title}
				</h1>

				{post?.imageUrl && (
					<Image
						src={post?.imageUrl}
						alt={post?.title}
						width={600}
						height={400}
						className='m-auto rounded-xl'
					/>
				)}
				<p className='my-8 text-gray-500 text-xl'>{post?.excerpt}</p>
			</div>
		</main>
	);
}
