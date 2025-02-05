interface ButtonAdminProps {
    text: string;
    action: () => void;
}

export function RedButtonAdmin({ text, action }: ButtonAdminProps) {
    return (
        <button
            onClick={action}
             className="text-red-600 hover:text-red-600"
        >
            {text}
        </button>
    )
}