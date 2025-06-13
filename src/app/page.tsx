"use client";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const userLogin = gql`
	mutation UserLogin($data: UserLoginInput) {
		userLogin(data: $data) {
			id
			createdAt
			email
			role
			updatedAt
			username
		}
	}
`;

type LoginFormValues = {
	email: string;
	password: string;
};
export default function Login() {
	const [login, { data }] = useMutation(userLogin);
	const router = useRouter();
	const { register, handleSubmit } = useForm<LoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = useCallback(
		async (values: LoginFormValues) => {
			const res = await login({
				variables: {
					data: {
						email: values?.email,
						password: values?.password,
					},
				},
			});
			if (res?.data?.userLogin?.id) {
				router.push("/agendaList");
			}
		},
		[login, router]
	);

	return (
		<div className="flex flex-col items-center gap-3 w-full max-w-2xl p-8">
			<h1>{data?.userLogin?.id ?? "No logged in user"}</h1>
			<div className="shadow-2xl w-full">
				<form
					onSubmit={handleSubmit(onLogin)}
					className="flex flex-col gap-5 p-8 bg-base-100 shadow-xl"
				>
					<InputField
						{...register("email")}
						label="Email"
						placeholder="Enter email"
					/>
					<InputField
						{...register("password")}
						label="Password"
						placeholder="Enter password"
					/>

					<SubmitButton label="Login" />
				</form>
			</div>
		</div>
	);
}
