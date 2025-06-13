import React from "react";

type SubmitButtonProps = {
	label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
	return (
		<button
			type="submit"
			className="border border-gray-300 text-black rounded-md hover:bg-slate-900 hover:text-white w-full max-w-[200px] p-2 mx-auto hover:cursor-pointer"
		>
			{label}
		</button>
	);
};

export default SubmitButton;
