"use client";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserLoginMutation } from "@/gql/graphql";

const userLogin = gql(`
	mutation UserLogin($data: UserLoginInput!) {
		userLogin(data: $data) {
			id
			createdAt
			email
			role
			updatedAt
			username
		}
	}
`);

type LoginFormValues = {
	email: string;
	password: string;
};

export default function Login() {
	const [login, { loading }] = useMutation<UserLoginMutation>(userLogin);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const onLogin = useCallback(
		async (values: LoginFormValues) => {
			try {
				setError(null);
				const res = await login({
					variables: {
						data: {
							email: values.email,
							password: values.password,
						},
					},
				});
				console.log({ res });

				if (res?.data?.userLogin?.id) {
					// Store user data in localStorage or your preferred state management
					localStorage.setItem("user", JSON.stringify(res.data.userLogin));
					message.success("Login successful!");
					router.push("/agendaList");
				}
			} catch (err) {
				const error = err as Error;
				setError(error.message || "Login failed. Please try again.");
				message.error(error.message || "Login failed. Please try again.");
			}
		},
		[login, router]
	);

	return (
		<div
			style={{
				padding: "2rem",
				display: "flex",
				height: "100dvh",
				width: "100%",
			}}
		>
			<div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
				<Form
					onFinish={onLogin}
					labelCol={{ span: 8 }}
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						padding: "3rem 2rem",
						boxShadow: "0px 0px 3px #ccc",
						borderRadius: "10px",
					}}
				>
					{error && (
						<div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
					)}
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: "Please input your email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
					>
						<Input placeholder="Enter email" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password placeholder="Enter password" />
					</Form.Item>

					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						style={{ marginTop: "1rem" }}
					>
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
}
