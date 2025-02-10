interface ButtonAdminProps {
    text: string;
    action: () => void;
}

export function GreenButtonAdmin({ text, action }: ButtonAdminProps) {
    return (
        <button
            onClick={action}
             className="text-green-600 hover:text-green-600"
        >
            {text}
        </button>
    )
}