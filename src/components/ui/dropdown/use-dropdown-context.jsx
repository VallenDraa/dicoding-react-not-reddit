import React from 'react';
import { DropdownContext } from './dropdown-context';

export const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);

  if (context === null) {
    throw new Error(
      'This component must be used within the Dropdown component.',
    );
  }

  return context;
};
