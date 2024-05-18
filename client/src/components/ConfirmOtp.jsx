import React,{useState} from 'react'

const ConfirmOtp = () => {

    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const formSubmit = (e)=>{
        e.preventDefault();      
    }
  return (
    <>
    <div className='auth-container'>
    <div className="auth">
        <h2>Confirm OTP</h2><br />
        <form onSubmit={formSubmit}>
            <div className="form-group">
                <input className="inputField" type="text" id="otpInput" name="email"  value={inputs.email || ""} onChange ={handleChange}   required/>
            </div>
            <button type="submit" className="submit-button">Confirm</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default ConfirmOtp
