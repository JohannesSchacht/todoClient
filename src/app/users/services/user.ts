export interface User {
	id: number;
	firstName: string;
	lastName: string;
	shortName: string;
	sex: 'male' | 'female';
	born: Date;
}
