import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { Wysiwg } from '@/components/ui/wysiwyg';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils';

export function NewThread({ onSubmit, className }) {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [category, setCategory] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory.slice(0, 20));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await onSubmit({ title, body, category });

    setIsSubmitting(false);
  };

  return (
    <Card className={cn(className)}>
      <h3>New Thread</h3>

      <div className="my-4 flex flex-col gap-2">
        <Input
          type="text"
          pill={false}
          value={title}
          className="w-full"
          placeholder="Thread Title"
          onChange={setTitle}
        />
        <Input
          type="text"
          pill={false}
          value={category}
          className="w-full"
          placeholder="Thread Category (Max. 20 Characters)"
          onChange={handleCategoryChange}
        />
        <Wysiwg value={body} className="basis-full" onChange={setBody} />
      </div>

      <Button
        className="w-full"
        pill
        withIcon
        disabled={!title || !body || isSubmitting}
        onClick={handleSubmit}
      >
        <IconPlus /> Add Thread
      </Button>
    </Card>
  );
}

NewThread.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
