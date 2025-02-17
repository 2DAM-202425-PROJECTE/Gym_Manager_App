interface ButtonAdminProps {
    text: string;
    action: () => void;
}

export function BlueButtonAdmin({ text, action }: ButtonAdminProps) {
    return (
        <button
            onClick={action}
             className="text-blue-600 hover:text-blue-800"
        >
            {text}
        </button>
    )
}