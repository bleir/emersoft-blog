'use client';

import { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import Posts from '@/components/Posts/Posts';
import Header from '@/components/Header/Header';
import Pagination from '@/components/Pagination/Pagination';
import {
	sliceStartAtom,
	sliceEndAtom,
	currentPageAtom,
} from '../../storage/atoms';
import { IPost } from '@/components/types';

export default function Home() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [input, setInput] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [sliceStart, setSliceStart] = useAtom(sliceStartAtom);
	const [sliceEnd, setSliceEnd] = useAtom(sliceEndAtom);
	const [page, setPage] = useAtom(currentPageAtom);

	const fetchPosts = async () => {
		const res = await fetch('http://localhost:3000/api/posts');
		const result = JSON.parse(await res.json());

		setPosts(result.posts);
		setCategories(result.categories);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const getFilteredPosts = () => {
		if (!selectedCategory) {
			return posts;
		}

		return posts.filter(
			(item) => item.categories[0] === Number(selectedCategory)
		);
	};

	const filteredPosts = useMemo(getFilteredPosts, [selectedCategory, posts]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setInput(value);
	};

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value);
	};

	const nextPage = () => {
		setSliceStart(sliceStart + 4);
		setSliceEnd(sliceEnd + 4);
		setPage(page + 1);
	};

	const previousPage = () => {
		if (sliceStart === 0) return null;
		setSliceStart(sliceStart - 4);
		setSliceEnd(sliceEnd - 4);
		setPage(page - 1);
	};

	return (
		<main className='flex flex-col items-center justify-between p-24 w-full'>
			<Header
				input={input}
				categories={categories}
				handleSelect={handleSelect}
				handleChange={handleChange}
			/>

			<div className='w-6/12 text-center'>
				<h1 className='text-gray-800 text-3xl font-bold my-3'>
					From the Blog
				</h1>
				<p className='text-gray-400 my-5'>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					industry&apos;s
				</p>
			</div>

			<Posts
				posts={filteredPosts}
				input={input}
				currentSliceStart={sliceStart}
				currentSliceEnd={sliceEnd}
			/>

			<Pagination
				sliceEnd={sliceEnd}
				sliceStart={sliceStart}
				posts={filteredPosts}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</main>
	);
}
