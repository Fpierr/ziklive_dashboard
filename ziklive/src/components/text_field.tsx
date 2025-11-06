export default function TextField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring hover:border-hover focus:ring-hover"
      />
    </div>
  );
}
