import PropTypes from 'prop-types';
import React from 'react';
import FocusTrap from 'focus-trap-react';
import { DropdownTrigger } from './dropdown-trigger';
import { DropdownBody } from './dropdown-body';
import { DropdownContext } from './dropdown-context';
import { DropdownItem } from './dropdown-item';

export function Dropdown({ children, open, onToggle }) {
  const [isOpen, setIsOpen] = React.useState(open);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const animateTimeoutRef = React.useRef();

  const handleToggle = React.useCallback(() => {
    if (animateTimeoutRef.current) {
      animateTimeoutRef.current.clearTimeout();
    }

    setIsAnimating(true);

    setIsOpen(!isOpen);
    onToggle(!isOpen);

    animateTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animateTimeoutRef.current = null;
    }, 90);
  }, [isOpen, onToggle]);

  const providerValue = React.useMemo(
    () => ({ isOpen, isAnimating, handleToggle }),
    [handleToggle, isOpen, isAnimating],
  );

  return (
    <DropdownContext.Provider value={providerValue}>
      <FocusTrap active={isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
        <div className="relative">{children}</div>
      </FocusTrap>
    </DropdownContext.Provider>
  );
}

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Body = DropdownBody;
Dropdown.Item = DropdownItem;
