import { WHITE } from '@features/global/styles/variables';

export const SidebarOpenIcon = ({
  onClick,
  fill = 'none',
  stroke = WHITE,
  w = 13,
  h = 9
}: {
  onClick?: () => void;
  fill?: string;
  stroke?: string;
  w?: number;
  h?: number;
}) => {
  return (
    <svg
      onClick={onClick}
      width={w}
      height={h}
      viewBox="0 0 13 9"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.5" y1="0.5" x2="12.5" y2="0.5" stroke={stroke} />
      <line x1="0.5" y1="4.5" x2="12.5" y2="4.5" stroke={stroke} />
      <line x1="0.5" y1="8.5" x2="12.5" y2="8.5" stroke={stroke} />
    </svg>
  );
};
