import {useState} from 'react';
import GenerateAiImage from './GenerateAI'
import placeholder from '../placeholder.jpeg';
// import AddUser from './AddUser';

const CreateClass = (props) => {
    const [modalVisibility, setModalVisibility] = useState('');
    return(
        <div className="row">
            <div className='col-md-12'>
                <div className="card ">
                <div className="row g-0">
                    <div className="col-md-2 p-3 text-center bg-light rounded">
                        {props.thumbnail ? 
                            <img src={props.thumbnail} className="img-thumbnail w-100 rounded my-1" alt="aiImage" width='150' height='150' />
                            : <img src={placeholder} className="img-thumbnail w-100" alt="aiImage" width='150' height='150'/>
                        }
                        <button onClick={() => setModalVisibility('d-block')} type="button" className="btn btn-success btn-sm mt-2" data-bs-dismiss="modal">Thumbnail <i className="bi bi-images"></i></button>
                        { props.description && props.iFrame ? !props.thumbnail ?
                            <div className="mt-2 badge text-wrap text-warning">
                                <i className="bi bi-exclamation-triangle-fill"></i> Create Thumbnail
                            </div>
                            :null
                            :null
                        }
                        
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            {/* <h5 className="card-title">Broadcast session</h5> */}
                            {/* <button onClick={props.changeClass}>Click</button> */}
                            {/* <button type="button" class="position-absolute top-0 end-0 btn-close m-1" onClick={props.changeClass}></button> */}

                            {/* {!props.mediaLink?.text ? ( */}
                            <form>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text">Paste Video Link</span>
                                    <input onInput={(e) => props.setIframe(e.target.value)} className={ "form-control " + (props.iFrame && ' is-valid') } aria-label="Add Link" />
                                    {/* <input type="text" class="form-control is-invalid" required /> */}

                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Add detailed description</label>
                                    <textarea  onChange={(e) => props.setDescription(e.target.value)} className={ "form-control " + (props.description && ' is-valid') } placeholder='Add detailed description about session' rows="3"></textarea>
                                </div>
                                {props.sessionLoader ?
                                    <button className="btn btn-success btn-sm align-right d-flex ms-auto" type="button" disabled>
                                        <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button> 
                                    :
                                    <div>
                                        
                                    {/* <button onClick={props.postVideo} type="submit" className="btn btn-success btn-sm align-right d-flex ms-auto" data-bs-dismiss="modal" disabled={!props.iFrame || !props.description || !props.thumbnail ? true : false}>Broadcast <i class="bi bi-send ms-1"></i></button> */}
                                    </div>
                                }
                                </form>
                                {/* // disabled={!props.description || !props.iFrame ? true : false} */}
                            {/* ) : null} */}
                        </div>
                    </div>
                    
                </div>
                
                <GenerateAiImage
                thumbnail={props.thumbnail}
                userImageInput={props.userImageInput}
                setUserImageInput={props.setUserImageInput}
                generateImage={props.generateImage}
                clearAIImage={props.clearAIImage}
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                openaiLoader={props.openaiLoader}
                setopenaiLoader={props.setopenaiLoader}
                />
                </div>
            </div>
            {/* <div className='col-md-3'> */}
            {/* <div className='row'> */}
                {/* <div className='col-md-4 mt-3'> */}
                        {/* <AddUser 
                            loggedInUser= {props?.loggedInUser}
                            fetchUserPool = {props.fetchUserPool}
                            userPool={props.userPool}
                            deletePoolUser={props.deletePoolUser}
                            api={props.api}
                        /> */}
                    {/* </div> */}
                {/* </div> */}

            {/* </div> */}
            
        </div>
    )
}
export default CreateClass