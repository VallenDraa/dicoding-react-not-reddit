/* eslint-disable react/no-danger */
import { cn } from '@/utils';
import PropTypes from 'prop-types';
import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function Wysiwg({ className, value, onChange }) {
  return (
    <>
      <style>
        {`.ql-container, .ql-toolbar {
            border: none !important;
          }
          
          .ql-toolbar {
            z-index: 10;
            background-color: rgb(229 231 235);
            border-bottom: 1px solid rgb(229 231 235) !important;
            position: sticky;
            top: 0;
          }`}
      </style>
      <ReactQuill
        value={value}
        onChange={onChange}
        className={cn(
          'max-h-72 overflow-auto rounded-md bg-gray-200/50 text-gray-600 transition duration-200',
          // Add custom place holder to the contenteditable div
          '[&[placeholder]]:empty:before:text-gray-400 [&[placeholder]]:empty:before:content-[attr(placeholder)]',
          className,
        )}
      />
    </>
  );
}

Wysiwg.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Wysiwg.defaultProps = {
  className: '',
};
