import ReactLoading from 'react-loading'


const ButtonLoading = ({ disabled, loading, text }) => {
    return (
        <button
            disabled={disabled}
            type='submit'
            className='bg-custom-five text-white font-medium text-lg py-3 px-6 rounded-sm hover:bg-custom-fourth shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700 w-full'
        >
            {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
        </button>
    );
};

export default ButtonLoading;