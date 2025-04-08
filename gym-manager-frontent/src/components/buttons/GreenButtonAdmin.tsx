interface ButtonAdminProps {
    text: string;
    action: () => void;
}

export function GreenButtonAdmin({ text, action }: ButtonAdminProps) {
    return (
        <button
            onClick={action}
             className="text-black font-medium rounded-xl px-2 py-1 bg-green-500 hover:text-green-600"
        >
            {text}
        </button>
    )
}