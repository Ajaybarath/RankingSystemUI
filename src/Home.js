import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FaTelegramPlane } from 'react-icons/fa';


export default function Home() {

    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [url, setUrl] = useState('');
    const [gender, setGender] = useState('');
    const [requiredFields, setRequiredFields] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (category === '' || category === null || state === '' || url === '' || gender === '') {
            setRequiredFields(false)
        } else {
            navigate(`/examResult?url=${url}&state=${state}&category=${category}&gender=${gender}`);
        }
    };


    return (
        <div className="form-page">
            <h1>Check your Marks & Rank</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='input1'>
                    <label htmlFor="url">Answer key url:<span className="mandatory">*</span></label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        placeholder='Enter your URL'
                        value={url}
                        onChange={(event) =>
                            setUrl(event.target.value)
                        }
                        required  // Add the required attribute here
                    />
                </div>
                <div className='input1'>
                    <label htmlFor="category">Category:<span className="mandatory">*</span></label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        required  // Add the required attribute here
                    >
                        <option value="">Category</option>
                        <option value="UR">UR</option>
                        <option value="OBC">OBC</option>
                        <option value="EWS">EWS</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>
                <div className='input1'>
                    <label htmlFor="gender">Gender:<span className="mandatory">*</span></label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(event) =>
                            setGender(event.target.value)
                        }
                        required  // Add the required attribute here
                    >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='input1'>
                    <label htmlFor="state">State: <span className="mandatory">*</span></label>
                    <select
                        id="state"
                        name="state"
                        value={state}
                        onChange={(event) =>
                            setState(event.target.value)
                        }
                        required  // Add the required attribute here
                    >
                        <option value="">State</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                { !requiredFields ? (<></>) : (<p className='warning'>Fill all the mandatory fields</p>)}
                <button type="submit">Submit</button>
            </form>

            <footer>
                <p>Follow us on Telegram:</p>
                <a href="https://t.me/the_target100" target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane />  THE TARGET 100 (SSC in KANNADA)
                </a>
            </footer>
        </div>
    );

}