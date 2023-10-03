import React, {useState} from "react";

function Prompt({isOpen,title,onSubmit,onClose}){
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue)
        onClose()
    }

    if (!isOpen){
        return null;
    }
    return(
        <div>
            <h3>{title}</h3>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

export default Prompt;