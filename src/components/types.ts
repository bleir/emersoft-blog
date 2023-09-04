export interface IPosts {
	posts: IPost[];
	input: string;
	currentSliceStart: number;
	currentSliceEnd: number;
}

export interface IPost {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	imageUrl: string;
	categories: number[];
}

export interface ICategories {
	id: number;
	name: string;
	slug: string;
}

export interface IPagination {
	sliceStart: number;
	sliceEnd: number;
	posts: IPost[];
	previousPage: () => void;
	nextPage: () => void;
}
