export const InputField: React.FC<{
  type: string;
  id: string;
  placeholder: string;
}> = ({ type, id, placeholder }) => (
  <div className="mb-6 w-full px-5 lg:px-10 xl:px-20">
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-500 text-gray-900 text-base rounded-sm block w-full p-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] shadow-[#898686]"
      placeholder={placeholder}
      required
    />
  </div>
);

export default InputField;
