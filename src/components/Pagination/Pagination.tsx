import { FC } from 'react';
import { IPagination } from '@/components/types';

const Pagination: FC<IPagination> = ({
	sliceStart,
	sliceEnd,
	posts,
	previousPage,
	nextPage,
}) => {
	return (
		<div className='flex justify-between w-full'>
			<button
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
					sliceStart === 0 ? 'cursor-not-allowed opacity-50' : ''
				}`}
				onClick={previousPage}
			>
				previous
			</button>

			{sliceEnd < posts.length && (
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={nextPage}
				>
					next
				</button>
			)}
		</div>
	);
};

export default Pagination;
