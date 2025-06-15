"use client";
import { AgendaListArgs } from "@/app/api/graphql/interfaces/agendaArgs.interface";
import FormTable from "@/components/form/FormTable";
import { AgendaListCountQuery, AgendaListQuery } from "@/gql/graphql";
import { gql, useLazyQuery } from "@apollo/client";
import { Button, Form, Input, Space, TableProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const agendaList = gql`
	query AgendaList($limit: Int, $offset: Int, $filter: AgendaFilter) {
		agendaList(limit: $limit, offset: $offset, filter: $filter) {
			id
			code
			isActive
			items {
				id
				session {
					title
					description
				}
			}
			createdAt
			updatedAt
			startDate
			endDate
		}
	}
`;

const agendaListCount = gql`
	query AgendaListCount($limit: Int, $offset: Int, $filter: AgendaFilter) {
		agendaListCount(limit: $limit, offset: $offset, filter: $filter)
	}
`;

const AgendaListPage: React.FC = () => {
	const router = useRouter();
	const [agendaListQuery, { loading: listLoading }] = useLazyQuery<
		AgendaListQuery,
		AgendaListArgs
	>(agendaList);

	const [agendaListCountQuery, { loading: countLoading }] = useLazyQuery<
		AgendaListCountQuery,
		AgendaListArgs
	>(agendaListCount);

	const fetchList = useCallback(
		async (params: unknown) => {
			const { filter, ...rest } = params as AgendaListArgs;
			try {
				const res = await agendaListQuery({
					variables: {
						...rest,
						filter: {
							...filter,
						},
					},
				});

				return res?.data?.agendaList ?? [];
			} catch (error) {
				console.log(error);
			}
		},
		[agendaListQuery]
	);

	const fetchListCount = useCallback(
		async (params: unknown) => {
			const { filter, ...rest } = params as AgendaListArgs;
			try {
				const res = await agendaListCountQuery({
					variables: {
						...rest,
						filter: {
							...filter,
						},
					},
				});
				return res?.data?.agendaListCount ?? 0;
			} catch (error) {
				console.log(error);
			}
		},
		[agendaListCountQuery]
	);

	const columns: TableProps<AgendaListQuery["agendaList"]>["columns"] = [
		{
			title: "Code",
			key: "code",
			dataIndex: "code",
			render: (value: string) => value,
		},
		{
			title: "Active?",
			key: "isActive",
			dataIndex: "isActive",
			render: (value: boolean) => value.toString(),
		},
		{
			title: "Session Count",
			key: "items.length",
			render: (record: any) => {
				return record?.items?.length;
			},
		},
		{
			title: "",
			key: "action",
			render: (record: any) => {
				return (
					<div>
						<Button
							onClick={() =>
								router.push(`/agenda-list/${record?.id as string}`)
							}
						>
							View Detail
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<Space
			direction="vertical"
			style={{
				width: "100%",
				background: "#fff",
				padding: "2rem",
				height: "100%",
			}}
		>
			<FormTable
				rowKey={(record) => record.code.toString()}
				onFetchList={fetchList as never}
				onFetchCount={fetchListCount as never}
				columns={columns as never}
				loading={listLoading || countLoading}
			>
				<Form.Item name="searchText">
					<Input placeholder="Enter code to search..." />
				</Form.Item>
			</FormTable>
		</Space>
	);
};

export default AgendaListPage;
