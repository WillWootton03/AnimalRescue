import { useState } from "react";
import { Eye, EyeOff} from 'lucide-react';

type FieldVariant = "text" | "number" | "password";

interface FormFieldProps {
    id: string;
    label: string;
    value: string;
    type?: string;
    onChange: (value: string) => void;
    placeholder: string;
    min?: string;
    max?: string;
    required?: boolean,
    variant?: FieldVariant;
    options?: { label: string, value: string | number}[];
}


export default function FormField({
    id,
    value,
    label,
    onChange,
    type = 'text',
    placeholder = '',
    variant = 'text',
    required = false,
} : FormFieldProps) {

    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-black/55 mb-1 tracking-widest uppercase"
            >
                {label}
            </label>
            {(variant === 'text' || variant === 'password') && (
                <div className="relative">
                    <input 
                        id={id}
                        // If password, check if show password, else type is type
                        type={variant === 'password' 
                                ? showPassword 
                                    ? 'text' : 'password' 
                                : type
                            }
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        required={required}
                        className="w-full px-4 py-3 text-sm bg-gray-100 text-black placeholder-black/25 rounded-lg outline-none transition-all duration-150"
                        style={{
                            border: focused ? '1.5px solid #32a5f1' : '1.5px solid transparent',
                            boxShadow: focused ? '0 0 0 3px rgba(124, 77, 186, 0.12)' : 'none',
                        }}
                    />
                    {(variant === 'password') && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/35 hover:text-black/60 transition-colors duration-100"
                            aria-label={showPassword ? "Hide password" : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                        </button>
                    )}
                </div>
            )} 
        </div>
    )
}