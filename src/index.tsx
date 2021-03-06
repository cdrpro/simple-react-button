import React, { memo, useState, useCallback } from 'react';

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick: <T>(event: React.MouseEvent<HTMLButtonElement>) => void | Promise<T>;
}

const Button: React.FunctionComponent<IButtonProps> = memo((props) => {
  const [loading, changeLoading] = useState(false);

  const onClickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const promise = props.onClick(event);

    if (promise) {
      changeLoading(true);
      promise.then(() => changeLoading(false));
    }
  }, [props.onClick]);

  return (
    <button
      type={props.type || 'button'}
      disabled={props.disabled || loading}
      className={props.className}
      onClick={onClickHandler}
    >
      {props.children}
    </button>
  );
});

export default Button;
