import {useState} from 'react';
import GenerateAiImage from './GenerateAI'
import placeholder from '../placeholder.jpeg';

const CreateClass = (props) => {
    const [modalVisibility, setModalVisibility] = useState('');
    return(
        <div>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2 m-2">
                        {props.thumbnail ? 
                            <img src={props.thumbnail} className="img-thumbnail rounded my-1" alt="aiImage" width='150' height='150' />
                            : <img src={placeholder} className="img-thumbnail" alt="aiImage" width='150' height='150'/>
                        }
                        <button onClick={() => setModalVisibility('d-block')} type="button" className="btn btn-outline-success btn-sm my-2" data-bs-dismiss="modal">Generate</button>
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">Create a class</h5>
                            {!props.mediaLink?.text ? (
                            <div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text">Paste Video Link</span>
                                    <input  onInput={(e) => props.setIframe(e.target.value)} class="form-control" aria-label="Add Link" />
                                </div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text">Add Description</span>
                                    <textarea onChange={(e) => props.setDescription(e.target.value)} class="form-control" aria-label="Add Description"></textarea>
                                </div>
                                <button onClick={props.postVideo} type="button" className="btn btn-outline-success btn-sm align-right" data-bs-dismiss="modal">Broadcast</button>      
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
                />
            </div>
      </div>
    )
}
export default CreateClass