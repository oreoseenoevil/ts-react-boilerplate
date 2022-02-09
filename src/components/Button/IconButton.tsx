import { FC } from 'react';
import useClassNames from 'hooks/useClassNames';

import Button, { ButtonProps } from '.';
import styles from './Button.module.scss';

export type IconButtonProps = Omit<ButtonProps, 'trailingIcon' | 'leadingIcon'> & {
  rounded?: boolean;
};

const IconButton: FC<IconButtonProps> = ({ rounded, className, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button {...props} className={useClassNames(className, styles.icon_button, rounded && styles.rounded)} />
);

export default IconButton;
