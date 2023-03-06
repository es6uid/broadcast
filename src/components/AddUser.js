import { useState } from 'react'
// const api = `https://glorious-worm-poncho.cyclic.app/api`
const api = `http://localhost:5000/api`

const AddUser = (props) => {
    const [ userMail, setUserMail ] = useState();
    const [addUser, setaddUser ] = useState([])
    const [duplicateEmail, setDuplicateEmail] = useState(false);

    // const [poolUser, setPoolUser] = useState(props.userPool)

    // const saveUser = () => {
    //     if(userMail) 
    //     setaddUser([...addUser, userMail])
    // }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/
        if(re.test(email))
        setUserMail(email)
    }
    
    // const fetchUser = async() => {
    //     const data = await fetch(`${api}/pool/?broadCast_email=${props.loggedInUser}`);
    //     const users = await data.json();
    //     setaddUser(users)
    // } 

    const saveUser = async() => {
        // if(userMail) 
        // setaddUser([...addUser, userMail])
        try{
            // const response = await fetch(`${api}/user`, {
            const response = await fetch(`${api}/pool`, {

                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    broadCast_email: props.loggedInUser.email,
                    pool_email: userMail
                }),
            }
            );
            // setaddUser([...addUser, response.email])

            if(!response.ok){
            //   setSessionLoader(false)
            console.log(response)
            }else{
            //   getVideo()
            props.fetchUserPool()

            }
            if(response.status === 409){
                console.log('Email id Exists!')
                setDuplicateEmail(true)
                setTimeout(() => {
                    setDuplicateEmail(false)
                }, 5000)
            }
        } catch(error){
            console.log('hi', error)
        }
    }

    // const deletePoolUser = async(res) => {
    //     // alert(res)
    //     const response = await fetch(`${api}/pool/${res}`,{
    //         method: "DELETE",
    //       }
    //     );
    //     if(response.status === 200){
    //         // console.log(response => )

    //         props.userPool.filter(user => user._id === "64036689f87955c9b0f275fb" )
    //     }
    // }

    // const deletePoolUser = (res) => {
    //     // return fetch(url + '/' + item, {
    //     //   method: 'delete'
    //     // })
    //     fetch(`${api}/pool/${res}`,{
    //                 method: "DELETE",
    //               }
    //             )
    //     .then(response => response.json());
    //   }

    // http://localhost:5000/api/pool/6403575ffc2cc0be91be6532
    
    return(
        <div className="card-body">
            <h5 class="card-title">
                Add Pool 
                { duplicateEmail && <span className='text-danger fs-6 ps-1'>User Email Exists!</span>}
            </h5>
            <form>

            <div className="input-group mb-4">
                    <input onInput={(e) => validateEmail(e.target.value)} type="email" className="form-control" placeholder="Recipient's email" aria-label="Recipient's username with two button addons" />
                    {<button onClick={saveUser} className="btn btn-outline-secondary" type="button" disabled={!userMail ? true : false }>Add</button> }
                    <button className="btn btn-outline-secondary" type="button" disabled={!userMail ? true : false }>Clear</button>
            </div>
            </form>
            {/* <p>123 {props}</p> */}

            {/* {props?.loggedInUser && `Welcomeeeee, ${props.loggedInUser}`} */}

{/* {poolUser && poolUser.map((data) => {return(<div>{data}</div>)})} */}

            <ul className="list-group">
                {
                    props.userPool && props.userPool.map((user) => {
                        return(
                            <li className="list-group-item pad-2" key={user._id}>
                                {/* <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" /> */}
                                <label className="form-check-label" for="firstCheckbox">{user.pool_email} {user._id}</label>
                                <i onClick={() => props.deletePoolUser(user._id)} role='button' class="delete-btn bi bi-trash text-danger opacity-75 float-end"></i>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default AddUser;