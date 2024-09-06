import { IconName } from 'boxicons';

type IconProps = {
    name: IconName;
    styles?: React.CSSProperties;
    className?: string;
};

const Icon: React.FC<IconProps> = ({
    name,
    styles = { fontSize: '24px' },
    className,
}: IconProps) => {
    return <i className={`bx ${name} ${className}`} style={styles} />;
};

export default Icon;
