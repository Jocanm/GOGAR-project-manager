const Input = ({ label = "", name, defaultValue, type, placeholder = "" }) => {
    return (
        <label htmlFor={name} className='flex flex-col my-3'>
            <span>{label}</span>
            {
                !placeholder ?
                    (
                        <input
                            required
                            type={type}
                            name={name}
                            className='input'
                            defaultValue={defaultValue}
                        />
                    ) :
                    (
                        <input
                            required
                            type={type}
                            name={name}
                            className='input'
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                        />
                    )
            }
        </label>
    );
};

export default Input;