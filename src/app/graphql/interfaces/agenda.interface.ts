export interface AgendaGetInput {
	id: string;
}

export interface AgendaCreateInput {
	title: string;
	description?: string | null;
}
