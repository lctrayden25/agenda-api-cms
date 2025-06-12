"use client";
import { gql, useQuery } from "@apollo/client";

const agendaList = gql`
	query AgendaList {
		agendaList {
			code
			createdAt
			endDate
			id
			isActive
			items {
				id
				title
				description
			}
			startDate
			updatedAt
		}
	}
`;

export default function Home() {
	const { data } = useQuery(agendaList);
	console.log({ data });
	return (
		<div className="relative min-h-[50dvh] flex flex-col items-center justify-center text-3xl font-bold">
			<div className="">
				<h1>Login</h1>
				<div>
					<form></form>
				</div>
			</div>
		</div>
	);
}
