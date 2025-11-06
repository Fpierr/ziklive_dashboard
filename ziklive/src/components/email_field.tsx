export default function EmailField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='mb-4'>
      <label className='block text-sm mb-1 text-gray-700 dark:text-gray-300'>
        Email
      </label>
      <input
        type='email'
        name='email'
        value={value}
        onChange={onChange}
        required
        pattern='^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$'
        className='w-full px-3 py-2 rounded border text-gray-700 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring hover:border-hover focus:ring-hover'
      />
    </div>
  );
}
