export interface userGetInput {
	id: string;
}

export interface UserCreateInput {
	data: {
		email: string;
		username: string;
		password: string;
	};
}

export interface UserUpdateInput {
	id: string;
	data: {
		email?: string;
		username?: string;
		password?: string;
		role?: string;
	};
}
