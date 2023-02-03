import placeholder from '../placeholder.jpeg';
const GenerateAiImage = (props) => {
    return(
        <div>
            <div class={`modal ${props.modalVisibility}`} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Generate Image</h5>
                        <button onClick={() => props.setModalVisibility('d-none')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div className='text-center'>
                        {props.thumbnail ? 
                            <img src={props.thumbnail} className="img-thumbnail rounded" alt="aiImage" width='265' height='256' />
                            : <img src={placeholder} className="img-thumbnail" alt="aiImage" width='265' height='256'/>
                            }
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Message:</label>
                            <textarea onChange={(e) => props.setUserImageInput(e.target.value)} class="form-control"></textarea>
                        </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button onClick={props.generateImage} type="button" className="btn btn-outline-success btn-sm" data-bs-dismiss="modal">Generate</button>
                        <button type="button" className="btn btn-outline-warning btn-sm" onClick={props.clearAIImage}>Reset</button>
                        <button onClick={() => props.setModalVisibility('d-none')} type="button" className="btn btn-outline-dark btn-sm">Add</button>
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GenerateAiImage;