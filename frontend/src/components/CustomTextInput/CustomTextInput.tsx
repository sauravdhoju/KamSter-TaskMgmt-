import {
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    FormLabel,
    Text,
} from '@chakra-ui/react';
import Icon from '../Icon/Icon';

import './CustomTextInput.scss';

type CustomTextInputProps = {
    label: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: 'email' | 'text' | 'password' | 'name';
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
    const getInputIcon = () => {
        if (type === 'email') {
            return <Icon name='bxl-gmail' />;
        } else if (type === 'password') {
            return <Icon name='bxs-lock-open-alt' />;
        } else if (type === 'text') {
            return <Icon name='bxs-user' />;
        } else if (type === 'name') {
            return <Icon name='bxs-user-rectangle' />;
        } else {
            return null;
        }
    };

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
                <InputLeftElement
                    pointerEvents={'none'}
                    height={'100%'}
                    opacity={0.2}
                    marginLeft={'10px'}
                    // backgroundColor={'black'}
                >
                    {getInputIcon()}
                </InputLeftElement>
                <Input
                    className='input-area'
                    onChange={onChange}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    paddingLeft={'60px'}
                    // backgroundColor={'yellow'}
                />
            </InputGroup>
        </FormControl>
    );
};

export default CustomTextInput;
