const Input = (props) => {
    const {name, type, placeholder} = props;
    return (
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            className="text-sm text-black font-semibold border rounded w-full py-2 px-3 placeholder:opacity-50"
        />
    );
};
export default Input