import placeholder from '../placeholder.jpeg';
const GenerateAiImage = (props) => {
    return(
        <div>
            <div class={`modal ${props.modalVisibility}`} tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Generate Image</h5>
                        <button onClick={() => props.setModalVisibility('d-none')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div className='text-center'>
                            { props.thumbnail ? 
                            <img src={props.thumbnail} className="img-thumbnail rounded" alt="aiImage" width='265' height='256' />
                            : <img src={placeholder} className="img-thumbnail" alt="aiImage" width='265' height='256'/>
                            }
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Start with a detailed description</label>
                            <textarea onChange={(e) => props.setUserImageInput(e.target.value)} placeholder="An Impressionist oil painting of sunflowers in a purple vase…" class="form-control rounded-0"></textarea>
                            {props.openaiLoader ?
                            <button class="btn btn-success w-100 rounded-0 mt-2" type="button" disabled>
                                <span class="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                            :
                            <button onClick={props.generateImage} class="btn btn-success w-100 rounded-0 mt-2" type="button"  disabled={!props.userImageInput ? true : false}>Generate</button>
                            }
                        </div>
                        {/* <div class="input-group input-group-lg mb-3">
                            <input onChange={(e) => props.setUserImageInput(e.target.value)} placeholder="An Impressionist oil painting of sunflowers in a purple vase…" type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        </div>      */}
                        </form>
                    </div>

                    <div className="modal-footer">
                        {/* <button onClick={props.generateImage} type="button" className="btn btn-outline-success btn-sm" data-bs-dismiss="modal">Generate</button> */}
                        <button type="button" className="btn btn-warning btn-sm" onClick={props.clearAIImage}>
                            <i class="bi bi-x"></i> Clear
                        </button>

                        <button onClick={() => props.setModalVisibility('d-none')} type="button" className="btn btn-success btn-sm" disabled={!props.thumbnail ? true : false}>
                            <i class="bi bi-caret-right"></i> Next
                        </button>
                        
                        {/* <button onClick={() => props.setModalVisibility('d-none')} type="button" className="btn btn-success btn-sm" disabled>
                            <i class="bi bi-caret-right"></i> Next
                        </button> */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GenerateAiImage;