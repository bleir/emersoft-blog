import { FC, ChangeEvent } from 'react';
import { ICategories } from '@/components/types';

export interface IHeader {
	input: string;
	categories: ICategories[];
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Header: FC<IHeader> = ({
	input,
	categories,
	handleChange,
	handleSelect,
}) => {
	return (
		<div className='mb-4'>
			<input
				type='text'
				value={input}
				onChange={handleChange}
				className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				placeholder='Search by Title...'
			/>
			<select
				onChange={handleSelect}
				className='mx-5 select-auto border border-gray-300 py-2 rounded shadow focus:outline-none focus:shadow-outline'
			>
				<option key={0} value=''>
					Search by Category
				</option>
				{categories.map((category: ICategories) => (
					<option key={category.id} value={category.id.toString()}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Header;
