import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

export function NewThreadButton() {
  return (
    <Button withIcon to="/threads/new">
      <IconPlus />
      New Thread
    </Button>
  );
}
