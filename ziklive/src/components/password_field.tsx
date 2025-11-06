"use client";
import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidityChange?: (valid: boolean) => void;
};

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  onValidityChange,
}: Props) {
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!value) {
      setScore(0);
      setFeedback("");
      setValid(false);
      onValidityChange?.(false);
      return;
    }

    const result = zxcvbn(value);
    setScore(result.score);
    setFeedback(result.feedback.warning || result.feedback.suggestions[0] || "");

    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
    const isValid = pattern.test(value);
    setValid(isValid);
    onValidityChange?.(isValid);
  }, [value]);

  const getBarStyle = () => {
    const colors = [
      "bg-red-500",
      "bg-orange-400",
      "bg-yellow-400",
      "bg-blue-500",
      "bg-green-500",
    ];
    const widths = ["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];
    return `${colors[score]} ${widths[score]}`;
  };

  return (
    <div className="mb-6 relative">
      <label htmlFor={name} className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={name}
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 rounded border text-gray-700 border-gray-300 dark:border-gray-700 pr-10 focus:outline-none focus:ring hover:border-hover focus:ring-hover"
        title="Minimum 8 characters, including uppercase, lowercase, number, and special character"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[38px] text-gray-500 dark:text-gray-300"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>

      {value && (
        <>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded">
            <div className={`h-full rounded transition-all duration-300 ${getBarStyle()}`} />
          </div>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300" aria-live="polite">
            {feedback || "Password strength looks good!"}
          </p>
        </>
      )}
    </div>
  );
}
