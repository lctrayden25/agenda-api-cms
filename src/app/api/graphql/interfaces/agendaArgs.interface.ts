export interface AgendaListArgs {
	limit: number;
	offset: number;
	filter: { searchText?: string; isActive: boolean };
}

export interface AgendaGetInput {
	id: string;
}

export interface AgendaCreateInput {
	data: {
		code: string | null;
		items: [{ session: [{ title: string; description?: string | null }][] }];
	};
}

export interface AgendaUpdateInput {
	id: string;
	data: {
		items: [{ session: [{ title: string; description?: string | null }][] }];
	};
	isActive: boolean;
}
