
import editIcon from '../../assets/edit.svg';

interface ButtonAdminProps {
    text: string;
    action: () => void;
}

export function BlueButtonAdmin({ action }: ButtonAdminProps) {
    return (
        <button
            onClick={action}
            className="flex justify-center items-center text-white font-medium rounded-xl py-1 px-2 bg-blue-400 hover:text-blue-800"
        >
            <img src={editIcon} alt="delete icon" className="h-5 w-5 inline-block mr-1" />
        </button>
    )
}