import { FiSearch } from "react-icons/fi";


function InputBusca({value,onChange,text}) {
  

   

  return (
    <div className="relative w-64 justify-center items-center p-2">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FiSearch />
      </span>
      <input
      
        onChange={onChange}
        type="imput"
        value={value}
        placeholder={text}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-600"
      />
    </div>
  );
}

export default InputBusca;
