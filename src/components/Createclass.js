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
                        <button onClick={() => setModalVisibility('d-block')} type="button" className="btn btn-success btn-sm mt-2" data-bs-dismiss="modal">Generate</button>
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">Broadcast session</h5>
                            {!props.mediaLink?.text ? (
                            <div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text">Paste Video Link</span>
                                    <input  onInput={(e) => props.setIframe(e.target.value)} class="form-control" aria-label="Add Link" />
                                </div>
                                {/* <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text">Add Description</span>
                                    <textarea onChange={(e) => props.setDescription(e.target.value)} class="form-control" aria-label="Add Description"></textarea>
                                </div> */}
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" onChange={(e) => props.setDescription(e.target.value)} placeholder="Add description" id="floatingTextarea2"></textarea>
                                    <label for="floatingTextarea2">Add Description</label>
                                </div>
                                <button onClick={props.postVideo} type="button" className="btn btn-success btn-sm align-right d-flex ms-auto" data-bs-dismiss="modal">Broadcast <i class="bi bi-send"></i></button>      
                            </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <GenerateAiImage
                thumbnail={props.thumbnail}
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