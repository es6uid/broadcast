import {useState} from 'react';
import GenerateAiImage from './GenerateAI'
import placeholder from '../placeholder.jpeg';

const CreateClass = (props) => {
    const [modalVisibility, setModalVisibility] = useState('');
    return(
        <div>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2 p-3 text-center bg-light rounded">
                        {props.thumbnail ? 
                            <img src={props.thumbnail} className="img-thumbnail w-100 rounded my-1" alt="aiImage" width='150' height='150' />
                            : <img src={placeholder} className="img-thumbnail w-100" alt="aiImage" width='150' height='150'/>
                        }
                        <button onClick={() => setModalVisibility('d-block')} type="button" className="btn btn-success btn-sm mt-2" data-bs-dismiss="modal">Create Thumbnail</button>
                        { props.description && props.iFrame ? !props.thumbnail ?
                            <div class="mt-2 badge text-wrap text-warning">
                                <i class="bi bi-exclamation-triangle-fill"></i> Create Thumbnail
                            </div>
                            :null
                            :null
                        }
                        
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">Broadcast session</h5>
                            {!props.mediaLink?.text ? (
                            <form>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text">Paste Video Link</span>
                                    <input  onInput={(e) => props.setIframe(e.target.value)} className={ "form-control " + (props.iFrame && ' is-valid') } aria-label="Add Link" />
                                    {/* <input type="text" class="form-control is-invalid" required /> */}

                                </div>
                                <div class="mb-3">
                                    <label  class="form-label">Add detailed description</label>
                                    <textarea  onChange={(e) => props.setDescription(e.target.value)} className={ "form-control " + (props.description && ' is-valid') } placeholder='Add detailed description about session' rows="3"></textarea>
                                </div>
                                {props.sessionLoader ?
                                    <button class="btn btn-success btn-sm align-right d-flex ms-auto" type="button" disabled>
                                        <span class="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button> 
                                    :
                                    <div>
                                        
                                    <button onClick={props.postVideo} type="submit" className="btn btn-success btn-sm align-right d-flex ms-auto" data-bs-dismiss="modal" disabled={!props.iFrame || !props.description || !props.thumbnail ? true : false}>Broadcast <i class="bi bi-send ms-1"></i></button>
                                    </div>
                                }
                                </form>
                                // disabled={!props.description || !props.iFrame ? true : false}
                            ) : null}
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
    )
}
export default CreateClass