import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// images
import X from '../assets/icons/whiteX.png';

// router
import { Link } from 'react-router-dom';

// components
import Loader from '../loaders/Loader';

export default function AddProjectPage({user, role, confirmRole}) {

    const [ projectTitle, setProjectTitle] = useState("");
    const [ startDate, setStartDate] = useState("");
    const [ author, setAuthor ] = useState(user);
    const [ projectLink, setProjectLink ] = useState("");
    const [ projectImage, setProjectImage ] = useState("");
    const [ isLoading, setLoading ] = useState(false);
    const [ projectKey, setProjectKey ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ repository, setRepository ] = useState("");
    const [ projectLead, setProjectLead ] = useState("");
    const [ projectType, setProjectType ] = useState("");

    useEffect(() => {
        function handleDate(){
            const current = new Date();
            const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
            setStartDate(date);
        }
        handleDate();
        setAuthor(user);
    }, [user]);

    function addProject() {
        confirmRole(role);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_ADD_PROJECT_URL}`, {
            projectTitle: projectTitle,
            startDate: startDate,
            author: author,
            projectLink: projectLink,
            projectImage: projectImage,
            repository: repository,
            description: description,
            projectKey: projectKey,
            projectLead: projectLead,
            projectType: projectType
        })
        .then(function(response) {
            if(response.data !== "Project Created"){
                setLoading(false);
                alert("Server Error - Project not created")
            } else {
                setLoading(false);
                alert('Project Started!');
            }
        })
        .catch(function(response){
            console.log(response);
        })
    }

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledProjectPage>
            <div className="links-wrapper">
                <div className="breadcrumbs">
                    <Link to={`/`}>Home</Link><span>/</span>
                    <Link to={`/`}>Add Project</Link>
                </div>
                <Link id="exit-btn" to="/"><img id="exit-btn-icon" src={X} alt="Exit" /><span className="tooltiptext">Close</span></Link>
            </div>
            <h1>Start a Project</h1>
            {
                user === null 
                ? <h1>You are signed out</h1>
                : isLoading === true 
                ? <Loader/>
                : <div className="form-wrapper">
                    <div className="top-form-container">
                        <label>Title
                            <input 
                                type="text"
                                id="title"
                                onChange={(event) => {
                                    setProjectTitle(event.target.value);
                                }} 
                            />
                        </label>
                        <label>Key
                            <input 
                                type="text"
                                id="key"
                                onChange={(event) => {
                                    setProjectKey(event.target.value);
                                }} 
                            />
                        </label>
                        <label>URL
                            <input 
                                type="text"
                                id="projectLink"
                                onChange={(event) => {
                                    setProjectLink(event.target.value);
                                }} 
                            />
                        </label>
                        <label>Repository
                            <input 
                                type="text"
                                id="repositiory"
                                onChange={(event) => {
                                    setRepository(event.target.value);
                                }} 
                            />
                            
                        </label>
                        <label>Lead
                            <input 
                                type="text" 
                                id="projectLead"
                                onChange={(event) => {
                                    setProjectLead(event.target.value);
                                }} 
                            />
                        </label>
                    </div>
                    <div className="bottom-form-container">
                        <label>Date
                            <input 
                                type="text" 
                                id="date"
                                onChange={(event) => {
                                    setStartDate(event.target.value);
                                }} 
                            />
                        </label>
                        <label>Project Type
                            <input 
                                type="text" 
                                id="projectType"
                                onChange={(event) => {
                                    setProjectType(event.target.value);
                                }} 
                            />
                        </label>
                        <label>Description
                            <input 
                                type="text" 
                                id="description"
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }} 
                            />
                        </label>
                        <label>Image
                            <input 
                                type="text" 
                                id="image"
                                onChange={(event) => {
                                    setProjectImage(event.target.value);
                                }} 
                            />
                        </label>
                    </div>
                </div>
            }
            {
                role === process.env.REACT_APP_GUEST_SECRET 
                ? <button className="start-button" onClick={unauthorized}>Start</button>
                : <button className="start-button" onClick={addProject}>Start</button>
            }
        </StyledProjectPage>
    ) 
}

const StyledProjectPage = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 50vh;
    width: 100%;
    max-width: 1000px;
    margin: 50px auto;
    position: relative;
    @media (max-width: 1160px){
        width: 80%;
        left: 60px;
    }
    @media (max-width: 834px){
        left: 0;
    }
    @media (max-width: 750px){
        height: 40vh;
        margin: 20px auto;
    }
    @media (max-width: 428px){
        margin-left: 65px;
        width: 80vw;
    }
    .links-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        #exit-btn {
            background: none;
            border: none;
            width: 30px;
            height: 30px;
            position: relative;
            @media (max-width: 428px){
                margin-left: auto;
            }
            #exit-btn-icon {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            .tooltiptext {
                visibility: hidden;
                width: 100%;
                min-width: 160px;
                background-color: black;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1000;
                top: 0;
                right: 105%;
            }
        }
        #exit-btn:hover .tooltiptext, #exit-btn:active .tooltiptext {
            visibility: visible;
            transition-delay: 1s;
        }
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        @media (max-width: 428px){
            display: none;
        }
        a {
            font-size: 20px;
            color: ${pallette.helperGrey};
            @media (max-width: 450px){
                font-size: 12px;
            }
            &:hover {
                color: white;
            }
        }
        span {
            margin: 0 10px;
            color: white;
        }
    }
    h1 {
        color: white;
        width: 100%;
        margin: 10px auto;
        font-size: ${pallette.titleSize};
        @media (max-width: 750px){
            font-size: ${pallette.subtitleSize};
        }
    }
    .form-wrapper {
        width: 100%;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        @media (max-width: 750px){
            flex-direction: column;
        }
        .top-form-container, .bottom-form-container {
            margin: 0;
            width: 45%;
            @media (max-width: 600px){
                width: 100%;
            }
            label {
                display: flex;
                flex-direction: column;
                margin: 10px 0;
                color: white;
                @media (max-width: 750px){
                    font-size: ${pallette.labelSize};
                }
                @media (max-width: 428px){
                    font-size: 16px;
                    margin: 10px 0;
                }
                input {
                    width: 400px;
                    font-size: 18px;
                    padding: 2px;
                    background: ${pallette.helperGrey};
                    @media (max-width:834px){
                        width: 100%;
                    }
                    @media (max-width: 750px){
                        width: 100%;
                    }
                    @media (max-width: 428px){
                        font-size: 16px;
                        height: 30px;
                    }
                }
            }
        }
    }
    .start-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 40px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        font-size: ${pallette.subtitleSize};
        font-weight: 700;
        background: #ffffff;
        color: ${pallette.accentColor};
        &:hover{
            color: #ffffff;
            cursor: pointer;
            background: #000000;
            transition: 0.2s;
            transform: scale(1.01);
        }
        @media (max-width: 750px){
            width: 100px;
            font-size: ${pallette.paraSize};
        }
        @media (max-width: 429px){
            width: 100px;
            font-size: 16px;
        }
    }
    
`;