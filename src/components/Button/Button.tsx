import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cn from 'classnames';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, active, ...props }) => {
  return (
    <button className={cn('Button', { 'Button-active': active })} {...props}>
      {children}
    </button>
  );
};
