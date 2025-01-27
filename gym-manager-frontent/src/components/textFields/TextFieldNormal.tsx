interface TextFieldNormalProps {
    value: string;
    placeholder: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    Constrasenya?: boolean;
}

export function TextFieldNormal({ value, placeholder, setValue, Constrasenya=false }: TextFieldNormalProps) {
    return (
    <input
            type={Constrasenya ? "password" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%', 
              marginBottom: '10px', 
              background: 'rgba(0,0,0,0.3)',
              outline: 'none',
              padding: '10px',
              fontSize: '13px',
              color: 'gray',
              textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
              border: '1px solid rgba(0,0,0,0.3)',
              borderRadius: '4px',
              boxShadow: 'inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px'
            }}
          />
        )
}