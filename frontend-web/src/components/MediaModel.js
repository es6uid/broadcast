const MediaModal = (props) => {
    return(
        <div class={`modal ${props.mediaModalVisibility}`} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        {/* <h5 className="modal-title">Generate Image</h5> */}
                        <button onClick={() => props.setMediaModalVisibility('d-none')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    {props.mediaLink?.text ? (
                        <iframe
                        className="ytplayer"
                        width="100%"
                        height="315"
                        src={`https://www.youtube-nocookie.com/embed/${props.mediaLink?.text}?controls=0`}
                        title="YouTube video player123"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        ></iframe>
                    ) : null}
                    </div>

                    <div className="modal-footer">
                        {/* <button onClick={props.generateImage} type="button" className="btn btn-outline-success btn-sm" data-bs-dismiss="modal">Generate</button> */}
                        {/* <button type="button" className="btn btn-outline-warning btn-sm" onClick={props.clearAIImage}>Reset</button> */}
                        <button onClick={() => props.setMediaModalVisibility('d-none')} type="button" className="btn btn-outline-danger btn-sm">Close</button>
                    </div>
                    </div>
                </div>
            </div>
    )
}
export default MediaModal;