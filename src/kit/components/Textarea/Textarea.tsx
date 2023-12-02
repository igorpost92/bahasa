import React, { Ref, useRef } from 'react';
import cn from 'classnames';
import styles from './Textarea.module.css';

type Props = Omit<JSX.IntrinsicElements['textarea'], 'value' | 'onChange'> & {
  value: string;
  autoresize?: boolean;
  onChange?: (value: string) => void;
  textAreaClassName?: string;
  inputRef?: Ref<HTMLTextAreaElement>;
};

export const Textarea: React.FC<Props> = props => {
  const {
    className,
    textAreaClassName,
    autoresize = true,
    rows = 4,
    onChange: onChangeProp,
    inputRef: forwardedInputRef,
    ...restProps
  } = props;

  const wrapRef = useRef<HTMLDivElement>(null);

  // const inputRef = useRef<HTMLTextAreaElement>(null);
  // const mergedRef = useMergeRefs(forwardedInputRef, inputRef);

  const onChange = (value: string) => {
    onChangeProp?.(value);
  };

  return (
    <div
      ref={wrapRef}
      data-value={props.value}
      className={cn(styles.wrap, className, autoresize && styles.autoresize)}
    >
      <textarea
        rows={rows}
        ref={props.inputRef}
        {...restProps}
        className={cn(styles.textarea, textAreaClassName)}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
