interface ButtonCommonProps {
    label: string;
    onClick?: () => void;
    type: "button" | "submit" | "reset";
    className?: string;
}
const DEFAULT_BUTTON_CLASS = "bg-blue-600 text-white py-1 px-4 rounded-xl hover:bg-blue-500";

const ButtonCommon: React.FC<ButtonCommonProps> = ({ label, onClick, type, className }) => {

    return (
        <button
            type={type}
            className={DEFAULT_BUTTON_CLASS + (className ? ` ${className}` : '')}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default ButtonCommon;