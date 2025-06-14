"use client";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const agendaList = gql`
	query AgendaList {
		agendaList {
			id
			code
			isActive
			items {
				id
				title
				description
			}
			createdAt
			updatedAt
			startDate
			endDate
		}
	}
`;

const AgendaListPage: React.FC = () => {
	const { data } = useQuery(agendaList);
	console.log(data?.agendaList);
	return <div>{data?.agendaList?.map((item) => item?.code)}</div>;
};

export default AgendaListPage;
