"use client";
import { UserLogoutMutation } from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { GetProp, Layout, Menu, MenuProps, message, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import gql from "graphql-tag";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

type MenuItem = GetProp<MenuProps, "items">[number];

const logout = gql`
	mutation UserLogout {
		userLogout
	}
`;

const ConsoleLayout = ({ children }: { children: React.ReactNode }) => {
	const [logoutMutation] = useMutation<UserLogoutMutation>(logout);
	const [currentMenu, setCurrentMenu] = useState<string>("agenda-list");
	const router = useRouter();
	const items: MenuItem[] = [
		{
			key: "agenda-list",
			icon: null,
			label: "Agenda List",
		},
		{
			key: "notification-list",
			icon: null,
			label: "Notification List",
		},
		{
			key: "logout",
			icon: null,
			label: "Logout",
		},
	];

	const onLogout = useCallback(async () => {
		try {
			const res = await logoutMutation();
			return res?.data?.userLogout;
		} catch (err) {
			const error = err as Error;
			message.error(error.message || "Logout failed. Please try again.");
		}
	}, [logoutMutation]);

	const onItemClick = useCallback(
		async (item: MenuItem) => {
			if (item?.key === "logout") {
				const res = await onLogout();
				if (res) {
					router.replace("/");
				}
			} else {
				setCurrentMenu(item?.key as string);
				router.push(`/${item?.key}`);
			}
		},
		[onLogout, router]
	);
	return (
		<Layout
			style={{
				minHeight: "100dvh",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<Sider trigger={null} theme="light">
				{/* <div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "2rem",
					}}
				>
					<Image src={logo.src} alt="logo" width={100} height={100} />
				</div> */}
				<Typography.Text
					style={{
						padding: "2rem 1.5rem 1.5rem",
						display: "block",
						fontSize: "16px",
						color: "#00b96b",
					}}
				>
					Title
				</Typography.Text>

				<Menu
					defaultSelectedKeys={[currentMenu]}
					theme="light"
					mode="inline"
					items={items}
					onClick={onItemClick}
				/>
			</Sider>
			<Layout style={{ maxHeight: "100dvh", borderLeft: "2px solid #f0f0f0" }}>
				<Content
					style={{
						overflow: "auto",
						height: "100%",
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default ConsoleLayout;
