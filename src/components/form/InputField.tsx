import React from "react";

type InputFieldProps = {
	label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ ...props }: InputFieldProps) => {
	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor={props?.name}
				className="font-semibold text-black text-[18px] "
			>
				{props.label}
			</label>
			<input
				type={props.type ?? "text"}
				{...props}
				className="border-gray-300 border rounded-md p-2 outline-none w-full"
			/>
		</div>
	);
};

export default InputField;
