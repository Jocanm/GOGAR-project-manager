const Input = ({ label = "", name, defaultValue, type, placeholder = "" }) => {
    return (
        <label htmlFor={name} className='flex flex-col my-3'>
            <span
            className="text-white font-bold"
            >{label}</span>
            {
                !placeholder ?
                    (
                        <input
                            required
                            type={type}
                            name={name}
                            className='input'
                            defaultValue={defaultValue}
                            autoComplete="off"
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
                            autoComplete="off"
                        />
                    )
            }
        </label>
    );
};

export const Input2 = ({ label = "", name, defaultValue, type, placeholder = "" }) => {
    return (
        <label htmlFor={name} className='flex flex-col my-3'>
            <span
            className="text-white font-bold"
            >{label}</span>
            {
                !placeholder ?
                    (
                        <input
                            type={type}
                            name={name}
                            className='input'
                            defaultValue={defaultValue}
                            autoComplete="off"
                        />
                    ) :
                    (
                        <input
                            type={type}
                            name={name}
                            className='input'
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                    )
            }
        </label>
    );
};

export default Input;