import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
//import * as pallette from '../../styled/ThemeVariables';

// components
import BugTable from './components/BugTable.js';
import { ProjectSideNav } from './components/ProjectSideNav';
import { Searchbar } from './forms/Searchbar';

// loaders
import ProjectPageLoader from '../../loaders/ProjectPageLoader';

// pop out sections
import CommentSection from './sections/CommentSection';
import BugSection from './sections/BugSection';
import AddBugSection from './sections/AddBugSection';
import SprintSection from './sections/SprintSection.js';

// images
import arrowRight from '../../assets/icons/arrowRight.png';

// router
import { useParams } from 'react-router-dom';
import DetailsSection from './sections/DetailsSection.js';

export default function ProjectPage({ user, role, confirmRole, projectSideNavRef }) {

    const commentSectionRef = useRef();
    const bugSectionRef = useRef();
    const addbugSectionRef = useRef();
    const sprintSectionRef = useRef();
    const detailsSectionRef = useRef(); 

    const { projectId, bugId } = useParams();

    const [ bugs, setBugs ] = useState([]);
    const [ project, setProject ] = useState([]);
    const [ rerender, setRerender ] = useState(false);
    const [ isLoading, setLoading ] = useState(true);

    // data states
    const [ openBugs, setOpenBugs] = useState([]);
    const [ underwayBugs, setUnderwayBugs ] = useState([]);
    const [ reviewBugs, setReviewBugs ] = useState([]);
    const [ completedBugs, setCompletedBugs ] = useState([]);

    // bug section states
    const [ sectionBugId, setSectionBugId ] = useState();
    const [ sectionProjectId, setSectionProjectId ] = useState();

    useEffect(() =>{
        function getProject(){
            axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
            .then(function (response){
                setProject(response.data);
                setBugs(response.data.bugs);
                setOpenBugs(response.data.bugs.filter(bugs => bugs.status === "Open"));
                setUnderwayBugs(response.data.bugs.filter(bugs => bugs.status === "Underway"));
                setReviewBugs(response.data.bugs.filter(bugs => bugs.status === "Reviewing"));
                setCompletedBugs(response.data.bugs.filter(bugs => bugs.status === "Completed"));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
       getProject(projectId);
    }, [ projectId, bugId, rerender ]);

    const toggleComments = () => {
        setRerender(!rerender);
        let section = commentSectionRef.current;
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }

    const toggleBug = () => {
        setRerender(!rerender);
        let section = bugSectionRef.current;
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }

    const toggleAddBug = () => {
        setRerender(!rerender)
        let section = addbugSectionRef.current;
        if (section.style.display === "none") {
            section.style.display = "flex";
        } else {
            section.style.display = "none";
        }
    }

    const handleArrow = () => {
        let element = document.getElementById("arrow");
        element.classList.toggle("rotate");
    }

    const toggleSideNav = () => {
        setRerender(!rerender);
        let section = projectSideNavRef.current;
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }

    const toggleSprints = () => {
        setRerender(!rerender);
        let section = sprintSectionRef.current;
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }

    const toggleDetails = () => {
        setRerender(!rerender);
        let section = detailsSectionRef.current;
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }


    return (
        <StyledProjectPage>
            <button id="arrow-button" onClick={() => { handleArrow(); toggleSideNav();}}><img id="arrow" src={arrowRight} alt="" /><span className="tooltiptext">Project Menu</span></button>
            <ProjectSideNav
                project={project}
                toggleComments={toggleComments}
                toggleAddBugs={toggleAddBug}
                projectSideNavRef={projectSideNavRef}
                toggleSprints={toggleSprints}
                toggleDetails={toggleDetails}
            />
            {
                isLoading === true 
                ? <ProjectPageLoader />
                : <div className="bug-table-wrapper">
                    <Searchbar />
                    { 
                        bugs === undefined 
                        ? <div className="undefined">
                            <h1>You've havent entered any bugs</h1>
                        </div>
                        : <>
                            <BugTable
                                setRerender={setRerender}
                                rerender={rerender}
                                user={user}
                                bugs={bugs}
                                openBugs={openBugs}
                                underwayBugs={underwayBugs}
                                reviewBugs={reviewBugs}
                                completedBugs={completedBugs}
                                setSectionProjectId={setSectionProjectId}
                                setSectionBugId={setSectionBugId}
                                projectId={projectId}
                                project={project}
                                toggleBug={toggleBug}
                                bugSectionRef={bugSectionRef}
                            />
                        </>
                    }
                </div>
            }
            {
                <>
                    <CommentSection
                        toggleComments={toggleComments}
                        user={user}
                        role={role}
                        commentSectionRef={commentSectionRef}
                        setRerender={setRerender}
                        rerender={rerender}
                    />
                    <BugSection
                        toggleBug={toggleBug}
                        user={user}
                        role={role}
                        sectionProjectId={sectionProjectId}
                        sectionBugId={sectionBugId}
                        bugSectionRef={bugSectionRef}
                        setRerender={setRerender}
                        rerender={rerender}
                        project={project}
                    />
                    <AddBugSection
                        toggleAddBug={toggleAddBug}
                        user={user}
                        role={role}
                        projectId={projectId}
                        project={project}
                        addbugSectionRef={addbugSectionRef}
                        confirmRole={confirmRole}
                        setRerender={setRerender}
                        rerender={rerender}
                    />
                    <SprintSection
                        bugs={bugs}
                        setSectionProjectId={setSectionProjectId}
                        setSectionBugId={setSectionBugId}
                        projectId={projectId}
                        project={project}
                        toggleBug={toggleBug}
                        bugSectionRef={bugSectionRef}
                        toggleAddBug={toggleAddBug}
                        user={user}
                        role={role}
                        sprintSectionRef={sprintSectionRef}
                        confirmRole={confirmRole}
                        setRerender={setRerender}
                        rerender={rerender}
                        openBugs={openBugs}
                        reviewBugs={reviewBugs}
                        underwayBugs={underwayBugs}
                        completedBugs={completedBugs}
                        toggleSprints={toggleSprints}
                    />
                    <DetailsSection 
                        project={project}
                        user={user}
                        role={role}
                        confirmRole={confirmRole}
                        setRerender={setRerender}
                        rerender={rerender}
                        toggleDetails={toggleDetails}
                        detailsSectionRef={detailsSectionRef}
                    />
                </>
            }
            
        </StyledProjectPage>
    )
}

const StyledProjectPage = styled.div`
    height: 100%;
    max-height: 100vh;
    width: 100%;
    max-width: 80vw;
    display: flex;
    position: relative;
    margin-left: 350px;
    z-index: 2;
    @media (max-width: 1440px){
        margin-left: 300px;
    }
    @media (max-width: 834px){
        margin-left: 80px;
        width: 900px;
        max-width: 85vw;
    }
    @media (max-width: 820px){
        width: 760px;
    }
    @media (max-width: 768px){
        width: 710px;
    }
    @media (max-width: 428px){
        margin-left: 60px;
        width: 360px;
    }
    @media (max-width: 414px){
        margin-left: 60px;
        width: 340px;
    }
    @media (max-width: 390px){
        width: 320px;
    }
    @media (max-width: 375px){
        width: 310px;
    }
    @media (max-width: 360px){
        width: 295px;
    }
    #arrow-button {
        background: none;
        border: none;
        cursor: pointer;
        display: none;
        position: absolute;
        z-index: 2;
        top: 50%;
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
            left: 105%;
        }
        @media (max-width: 834px){
            display: block;
            left: -60px;
        }
        @media (max-width: 428px){
            left: -45px;
        }
        img {
            transition: 0.2s;
            width: 30px;
            height: 30px;
        }   
    }
    #arrow-button:hover .tooltiptext, #arrow-button:active .tooltiptext {
        visibility: visible;
        transition-delay: 1s;
    }
    .undefined {
        background: white;
        width: 100%;
        min-height: 80vh;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    .bug-table-wrapper {
        overflow: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        position: relative;
        width: 100vw;
        display: flex;
        &::-webkit-scrollbar {
            display: none;
            width: none;
        }
    }
    .rotate {
        transform: rotate(180deg);
        transition: 0.2s;
    }
`;