import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

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
                    window.location.reload();
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
                <h3 id={author}>{author}<span>{date}</span></h3>
                <p>{comments}</p>
            </div>
            {
                author === user || role === process.env.REACT_APP_ADMIN_SECRET ? (
                    <button onClick={deleteComment}>&times;</button>
                ) : (
                    <button onClick={unauthorized}>&times;</button>
                )
            }
        </StyledComment>
    )
}

const StyledComment = styled.div`
    display: flex;
    width: 95%;
    min-height: 100px;
    margin: 2% auto;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 3px 3px 3px #5252528d;
    position: relative;
    align-items: center;
    justify-content: space-around;
    .comment-wrapper {
        width: 95%;
        margin: auto;
        h3 {
            font-size: 12px;
            display: flex;
            align-items: center;
            span {
                margin-left: 10px;
                font-size: 11px;
                color: #575757;
            }
        }
        #Gibby{
            color: #008ee0;
        }
        #Moose{
            color: #0dbe7a;
        }
        p {
            font-size: ${pallette.paraSize};
        }
    }
    button {
        font-size: 30px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        background: none;
        border: none;
    }
`;