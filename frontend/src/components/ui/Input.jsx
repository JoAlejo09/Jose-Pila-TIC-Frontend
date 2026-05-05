const Input = ({
    type="text", name, placeholder, value, onChange, className="",
})=>{
    return(
        <input
        type = {type}
        name = {name}
        placeholder={placeholder}
        value = {value}
        onChange = {onChange}
        className={`w-full border p-2 rounded-lg focus:ring-2 focus:ring-primary ${className}`}/>
    )
}
export default Input