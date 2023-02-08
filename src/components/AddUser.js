import { useState } from 'react'
const AddUser = () => {
    const [ userMail, setUserMail ] = useState();
    const [addUser, setaddUser ] = useState([])

    const saveUser = () => {
        if(userMail) 
        setaddUser([...addUser, userMail])
    }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/
        if(re.test(email))
        setUserMail(email)
      }
    
    return(
        <div className="card-body">
            <h5 class="card-title">Add Students <span className='text-danger'> - In Progress</span></h5>
            <form>

            <div className="input-group mb-3">
                    <input onInput={(e) => validateEmail(e.target.value)} type="email" className="form-control" placeholder="Recipient's email" aria-label="Recipient's username with two button addons" />
                    {<button onClick={saveUser} className="btn btn-outline-secondary" type="button" disabled={!userMail ? true : false }>Save</button> }
                    <button className="btn btn-outline-secondary" type="button" disabled={!userMail ? true : false }>Clear</button>
            </div>
            </form>

            <ul className="list-group">
                {
                    addUser.map((user, i) => {
                        return(
                            <li className="list-group-item" key={i}>
                                <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                                <label className="form-check-label" for="firstCheckbox">{user}</label>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default AddUser;