import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';
import { IconType } from 'react-icons';

type InputProps = {
  name: string
  Icon?: IconType
  placeholder: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, Icon, ...rest }, ref) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue = "", registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export const Input = forwardRef(InputBase);
