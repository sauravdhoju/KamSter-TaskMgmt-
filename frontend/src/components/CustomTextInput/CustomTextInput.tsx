import {
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    FormLabel,
    Text,
} from '@chakra-ui/react';
import { BiLogoGmail } from 'react-icons/bi';
import Icon from '../Icon/Icon';

import './CustomTextInput.scss';

type CustomTextInputProps = {
    label: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: 'email' | 'text' | 'password';
    required?: boolean;
    placeholder?: string;
};

const CustomTextInput = ({
    label,
    className,
    onChange,
    value,
    type,
    required,
    placeholder,
}: CustomTextInputProps) => {
    return (
        <FormControl
            className={`input-container ${className ? className : ''}`}
        >
            <FormLabel className='input-label'>
                {label}
                {required && (
                    <Text as={'span'} className={'required-indicator'}>
                        *
                    </Text>
                )}
            </FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                    <BiLogoGmail />
                </InputLeftElement>
                <Input
                    className='input-area'
                    onChange={onChange}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                />
            </InputGroup>
        </FormControl>
    );
};

export default CustomTextInput;
