import { ReactNode, useState } from 'react';
import useClassNames from 'hooks/useClassNames';

import { FaInfo as Info } from 'react-icons/fa';
import Tooltip from 'components/Tooltip';

import styles from './InfoTooltip.module.scss';

interface InfoTooltipProps {
  children?: ReactNode;
  className?: string;
}

const InfoTooltip = ({ children, className }: InfoTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={useClassNames(styles.info_icon_container, className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Info data-testid="info-icon" />
      <Tooltip position="bottom" data-testid="tooltip" className={styles.tooltip} show={showTooltip}>
        {children}
      </Tooltip>
    </div>
  );
};

export default InfoTooltip;
