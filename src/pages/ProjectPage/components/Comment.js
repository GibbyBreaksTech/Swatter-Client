import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// images
import Menu from '../../../assets/icons/dotMenu.png';


export default function Comment({
    comments,
    author,
    date,
    user,
    commentId,
    projectId,
    role,
    setLoading
}) {

    const [ compareDate, setCompareDate] = useState("");

	useEffect(() => {
	  const handleDate = () => {
		const currentDate = new Date();
		setCompareDate( currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
	  }
	  handleDate();
	}, [])
	
	const [ currentDate ] = compareDate.split(",");
	const [ commentDate, commentTime ] = date.split(",");

    function deleteComment(){
        setLoading(true);
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            axios.post(`${process.env.REACT_APP_DELETE_COMMENT_URL}/${projectId}/${commentId}`)
            .then(function(response) {
                if(response.data !== "Comment Deleted"){
                    setLoading(false);
                    alert("Server Error - Comment not deleted");
                } else {
                    setLoading(false);
                    alert('Comment Deleted!');
                }
            })
        }
    }

    function unauthorized(){
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledComment>
            <div className="comment-wrapper">
                <div className="comment-title-container">
                    <h3 id={author}>{author}
                        <span>
                            {
                                currentDate === commentDate 
                                ? commentTime
                                : date
                            }
                        </span>
                    </h3>
                    <div className="dropdown">
                        <button className="dropbtn"><img src={Menu} alt="" /></button>
                        <div className="dropdown-content">
                            {
                                author === user || role === process.env.REACT_APP_ADMIN_SECRET 
                                ? <button onClick={deleteComment}>Delete</button>
                                : <button onClick={unauthorized}>Delete</button>
                            }
                        </div>
                    </div>
                </div>
                <p>{comments}</p>
            </div>
        </StyledComment>
    )
}

const StyledComment = styled.div`
    display: flex;
    width: 95%;
    margin: 2% auto;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 3px 3px 3px #5252528d;
    position: relative;
    justify-content: space-around;
    .comment-wrapper {
        width: 95%;
        margin: 10px auto;
        .comment-title-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 20px;
            align-items: center;
            margin-bottom: 10px;
            h3 {
                font-size: 14px;
                display: flex;
                align-items: center;
                span {
                    margin-left: 10px;
                    font-size: 11px;
                    color: #575757;
                }
                
            }
            .dropdown {
                position: relative;
                display: inline-block;
                .dropbtn {
                    color: white;
                    padding: 4px;
                    font-size: 16px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    img {
                        height: 25px;
                        width: 25px;
                    }
                }
                .dropdown-content {
                    display: none;
                    position: absolute;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    z-index: 1;
                    background: ${pallette.helperGrey};
                    button {
                        color: black;
                        padding: 12px 16px;
                        text-decoration: none;
                        display: block;
                        border: none;
                        background: none;
                        cursor: pointer;
                        &:hover {
                            background: white;
                        }
                    }
                }
            }
            .dropdown:hover .dropdown-content, .dropdown:active .dropdown-content, .dropdown:focus .dropdown-content {display: block;}
            .dropdown:hover .dropbtn, .dropdown:active .dropdown-content, .dropdown:focus .dropdown-content {background-color: ${pallette.helperGrey};}
        }
        #Gibby{
            color: #008ee0;
        }
        #Moose{
            color: #0dbe7a;
        }
        p {
            font-size: ${pallette.paraSize};
            @media (max-width: 700px){
                font-size: 14px;
            }
        }
    }
`;