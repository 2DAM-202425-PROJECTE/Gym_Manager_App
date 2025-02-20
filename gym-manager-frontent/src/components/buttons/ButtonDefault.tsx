import { MouseEventHandler } from "react";

interface DefaultButtonProps {
    text: string;
    action: MouseEventHandler<HTMLButtonElement>;
}

export function DefaultButton({ text, action }: DefaultButtonProps){


    return (
        <button
        type="submit"
        onClick={action}
        className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow mb-4"
        >
            {text}
      </button>
    )
}