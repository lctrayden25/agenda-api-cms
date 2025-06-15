import ConsoleLayout from "@/components/layout/ConsoleLayout";
import { Space } from "antd";
import React from "react";

const NotificationListLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<ConsoleLayout>
			<Space
				direction="vertical"
				style={{
					width: "100%",
					background: "#fff",
					padding: "2rem",
					height: "100%",
				}}
			>
				{children}
			</Space>
		</ConsoleLayout>
	);
};

export default NotificationListLayout;
