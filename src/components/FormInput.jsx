import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  focusColor = 'purple', // Default focus color is purple
  onCopy,
  onPaste
}) {
  const [showPassword, setShowPassword] = useState(false);

  // Map of allowed focus colors (Tailwind safe)
  const focusColors = {
    purple: 'focus:border-purple-500 focus:ring-2 focus:ring-purple-500',
    blue: 'focus:border-blue-500 focus:ring-2 focus:ring-blue-500',
    green: 'focus:border-green-500 focus:ring-2 focus:ring-green-500',
    red: 'focus:border-red-500 focus:ring-2 focus:ring-red-500'
  };

  const focusClass = focusColors[focusColor] || focusColors.purple;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          onCopy={onCopy}
          onPaste={onPaste}
          required={required}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-md
            dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200
            transition-all duration-300 outline-none
            ${focusClass}
          `}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
