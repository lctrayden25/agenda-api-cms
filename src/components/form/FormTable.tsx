"use client";
import { Button, Form, Table, TableProps } from "antd";
import React, { useCallback, useEffect, useState } from "react";

type FormTableProps = {
	onFetchList: (params?: Record<string, unknown> | undefined) => Promise<[]>;
	onFetchCount: (
		params?: Record<string, unknown> | undefined
	) => Promise<number>;
	columns?: TableProps["columns"] | undefined;
	children?: React.ReactNode;
	loading?: boolean;
	rowKey?: TableProps["rowKey"];
	tableProps?: TableProps;
};

type FilterQuery = {
	[key: string]: string | number;
};

type PageQuery = {
	limit: number;
	offset: number;
	filter: FilterQuery;
};

const FormTable = ({
	onFetchList,
	onFetchCount,
	columns,
	children,
	loading = false,
	tableProps,
	rowKey,
}: FormTableProps) => {
	const [listing, setListing] = useState<unknown[]>([]);
	const [count, setCount] = useState<number>(0);
	const [form] = Form.useForm();

	const [listingQuery, setListingQuery] = useState<PageQuery>({
		limit: 10,
		offset: 0,
		filter: {},
	});

	const fetchList = useCallback(async () => {
		try {
			const { ...rest } = listingQuery ?? {};
			const res = await onFetchList({
				...rest,
			});
			setListing(res);
		} catch (error) {
			console.log(error);
		}
	}, [listingQuery, onFetchList]);

	const fetchCount = useCallback(async () => {
		const { ...rest } = listingQuery ?? {};
		try {
			const res = await onFetchCount({
				...rest,
			});
			setCount(res);
		} catch (error) {
			console.log(error);
		}
	}, [listingQuery, onFetchCount]);

	const onFinish = useCallback(async (params: FilterQuery) => {
		setListingQuery((prev) => ({
			...prev,
			filter: { ...prev.filter, ...params },
		}));
	}, []);

	useEffect(() => {
		fetchList();
		fetchCount();
		console.log({ listingQuery });
	}, [fetchCount, fetchList, listingQuery]);
	return (
		<Form onFinish={onFinish} form={form}>
			{children}
			<Button type="primary" htmlType="submit">
				Search
			</Button>
			<div style={{ marginTop: "2rem" }}>
				<Table
					rowKey={rowKey}
					bordered
					columns={columns}
					dataSource={(listing as { code: string | number }[]) ?? []}
					loading={loading}
					pagination={{
						total: count,
						// pageSizeOptions: ["5", "10", "20"],
						// showQuickJumper: true,
					}}
					onChange={(props) => {
						const { current, pageSize } = props;
						setListingQuery((prev) => ({
							...prev,
							offset: pageSize! * current! - pageSize!,
						}));
					}}
					{...tableProps}
				/>
			</div>
		</Form>
	);
};

export default FormTable;
