interface HomeButtonProps {
    text: string;
}

export default function HomeButton({ text }: HomeButtonProps) {
    return (
    <button className="w-full mt-4 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
        {text}
    </button>)
}

