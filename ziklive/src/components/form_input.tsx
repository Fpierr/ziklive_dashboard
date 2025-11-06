export default function FormInput({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  showToggle,
  onToggle,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon?: React.ReactNode;
  showToggle?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          {icon}
        </button>
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
