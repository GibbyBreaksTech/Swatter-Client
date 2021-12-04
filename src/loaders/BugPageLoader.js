// images
import BugImage from '../images/bugYaleBlue.png'

// styled
import styled from 'styled-components';

export default function BugPageLoader() {

    return (
        <StyledLoader>
            <div className="loader"><img src={BugImage} alt="" /></div>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
width: 90%;
height: 70vh;
margin: 1% auto;
display: flex;
justify-content: center;
align-items: center;
position: relative;
    .loader {
        opacity: 80%;
        border: 16px solid #f3f3f3;
        border: 16px dashed #0f4d92;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        animation: spin 2s linear infinite;
        position: absolute;
        top: 25%;
        right: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100px;
        }
    }

    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;