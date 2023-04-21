const MediaModal = (props) => {
    return(
        <div className={`modal ${props.mediaModalVisibility}`} tabIndex="-1">
                <div className="modal-dialog" height="315">
                    <div className="modal-content">
                    <div className="modal-header">
                        {/* <h5 className="modal-title">Generate Image</h5> */}
                        <button onClick={() => {props.setMediaModalVisibility('d-none'); props.setPoolReady(false)}} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    {/* { props.poolReady && props.playVideo?.text ? ( */}
                    { props.poolReady ? (
                        <iframe
                        className="ytplayer"
                        width="100%"
                        height="315"
                        src={`https://www.youtube-nocookie.com/embed/${props.playVideo}?controls=0&autoplay=1`}
                        title="YouTube video player123"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        ></iframe>
                    ) : 
                    <div className="text-center">
                        <p>Waiting for Pool users to join</p>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    </div>
                    }

                    </div>

                    <div className="modal-footer">
                        {/* <button onClick={props.generateImage} type="button" className="btn btn-outline-success btn-sm" data-bs-dismiss="modal">Generate</button> */}
                        {/* <button type="button" className="btn btn-outline-warning btn-sm" onClick={props.clearAIImage}>Reset</button> */}
                        <button onClick={() => {props.setMediaModalVisibility('d-none'); props.setPoolReady(false)}} type="button" className="btn btn-outline-danger btn-sm">Close</button>
                    </div>
                    </div>
                </div>
            </div>
    )
}
export default MediaModal;