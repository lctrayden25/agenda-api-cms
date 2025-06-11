export interface AgendaGetInput {
	id: string;
}

export interface AgendaCreateInput {
	data: {
		items: { title: string; description?: string | null }[];
	};
}

export interface AgendaUpdateInput {
	id: string;
	data: {
		items: { title: string; description?: string | null }[];
	};
	isActive: boolean;
}
