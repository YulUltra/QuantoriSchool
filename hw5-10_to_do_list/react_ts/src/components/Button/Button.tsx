import "./Button.css";

export default function Button({
    onClick,
    text,
    className,
    isDisabled = false,
}: {
    onClick: () => void;
    text?: string;
    className: string;
    isDisabled?: boolean;
}) {
    return (
        <button onClick={onClick} className={className} disabled={isDisabled}>
            {text}
        </button>
    );
}
