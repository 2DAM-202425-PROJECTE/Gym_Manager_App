import deleteIcon from '../../assets/delete.svg';

interface ButtonAdminProps {
    text: string;
    action: () => void;
}

export function RedButtonAdmin({ action }: ButtonAdminProps) {
    return (
        <button
            onClick={action}
             className="text-black font-medium bg-red-600 rounded-xl px-2 py-1 hover:text-red-600"
        >
            <img src={deleteIcon} alt="delete icon" className="h-5 w-5 inline-block mr-1" />
            </button>
    )
}