import './label.scss';

interface LabelProps {
    label: string | number;
}

function Label({ label }: LabelProps) {
    return (
        <div className="label">{label}</div>
    )
}

export default Label;