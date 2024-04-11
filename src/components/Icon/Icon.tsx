import { FC, useState } from 'react';
import refresh from '../../assets/icons/refresh-icon.svg';
import copy from '../../assets/icons/copy-icon.svg';
import plus from '../../assets/icons/plus-icon.svg';
import minus from '../../assets/icons/minus-icon.svg';
import cn from 'classnames';
import './Icon.scss';

type IconType = 'refresh' | 'copy' | 'plus' | 'minus';

interface IconProps {
  type: IconType;
  onClick?: () => void;
  title?: string;
}

export const Icon: FC<IconProps> = ({ type, onClick, title, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    type === 'refresh' && setIsClicked(true);

    onClick && onClick();
  };

  const handleAnimationEnd = () => {
    setIsClicked(false);
  };

  const getIcon = () => {
    switch (type) {
      case 'refresh':
        return refresh;

      case 'copy':
        return copy;

      case 'plus':
        return plus;

      case 'minus':
        return minus;

      default:
        return '';
    }
  };

  return (
    <img
      src={getIcon()}
      alt={`${getIcon()} Icon`}
      className={cn(`Icon Icon__${type}`, {
        'Icon__refresh--active': isClicked,
      })}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleClick}
      title={title}
      {...props}
    />
  );
};
