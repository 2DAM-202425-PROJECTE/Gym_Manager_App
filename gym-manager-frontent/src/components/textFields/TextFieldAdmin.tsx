

interface TextFieldAdminProps {
  name: string;
  placeholder: string;
  value: number | string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  string?: boolean;
}

export function TextFieldAdmin({name, placeholder, value, handleChange, string=false}: TextFieldAdminProps){
    return(<input
    type={string ? "text" : "number"}
    name={name}
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
    className="border p-2 rounded w-full"
  />)
}