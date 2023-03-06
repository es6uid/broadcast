const LoginModal = (props) => {
    return(
        <div className={`modal ${props.loginSignupModalVisibility}`} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        {/* <h5 className="modal-title">Generate Image</h5> */}
                        {/* <button onClick={() => props.setMediaModalVisibility('d-none')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address - Login / Signup</label>
                            {/* <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}
                            <input onInput={(e) => props.validateEmail(e.target.value)} type="email" className="form-control" placeholder="Recipient's email" aria-label="Recipient's username with two button addons" />

                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        {/* <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <button type="button" onClick={props.loginSignupUser} class="btn btn-primary">Submit</button>
                        </form>
                    {/* {props.mediaLink?.text ? (
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
                    ) : null} */}
                    </div>

                     {/* <div className="modal-footer">
                        <button onClick={props.generateImage} type="button" className="btn btn-outline-success btn-sm" data-bs-dismiss="modal">Generate</button>
                        <button type="button" className="btn btn-outline-warning btn-sm" onClick={props.clearAIImage}>Reset</button>
                        <button onClick={() => props.setMediaModalVisibility('d-none')} type="button" className="btn btn-outline-danger btn-sm">Close</button>
                    </div>  */}
                    </div>
                </div>
            </div>
    )
}
export default LoginModal;