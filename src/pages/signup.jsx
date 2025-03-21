import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
function Signup(){
    const navigate = useNavigate();
    const [selectedOption, setselectedOption]= useState('');
    const handleoption=(event)=>{
        setselectedOption(event.target.value)
    } 
    function handlenavigation(){
        if(selectedOption=='user'){
            navigate("/generaluser");
        }else if(selectedOption=='organization'){
            navigate('/organization');
        }else if(selectedOption=='coach'){
            navigate("/coachpage")
        }
        else{
            navigate('/athleteinfo');
        }
    }
    return(
        <div id='outerdivsignin'>
            <div id='signin-imageh1div'>
                <img src={logo} alt="Logo" id='Logo' />
                <h1>Sign-up to Kotinos</h1>
            </div>
            <div id='signupbox'>
                <h2>Which of these best describes you?</h2>
                <div>
                    <label>
                        <input type="radio" value='user' checked={selectedOption==='user'} onChange={handleoption} />
                        A general user exploring the app
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" value='athlete' checked={selectedOption==='athlete'} onChange={handleoption} />
                        An athlete aiming to advance your career
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" value='organization' checked={selectedOption==='organization'} onChange={handleoption} />
                        An organization finding athletes and hosting events
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" value='coach' checked={selectedOption==='coach'} onChange={handleoption} />
                        A coach aiming to train talented athletes
                    </label>
                </div>
                <button onClick={handlenavigation} id='signupcontinue'>Continue</button>
            </div>
        </div>
    )
}
export default Signup;