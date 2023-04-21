// import { useState } from "react";
const ConfigPoolModal = (props) => {
    // const [mainState, setMainState] = useState(["abc", "xyz"]);
    // const [selectedState, setSelectedState] = useState(["abc"]);

    // const handleSelection = (e) => {
    //     if(e.target.checked){
    //         setSelectedState([...selectedState, e.target.value])
    //     }else{
    //         setSelectedState(selectedState.filter(itm => itm !== e.target.value))
    //     }
    // }
    // const sendData = () => {
    //     alert(selectedState)
    // }
    console.log('selected', props.selectedModalMedia)
    // console.log(props?.modalMedia?.pool_email?.find((item) => item.email))
    return (
    <div className={`modal ${props?.poolConfigModalVisibility}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Configure Pool Users</h5>
            <button
              type="button"
              onClick={() => props?.setPoolConfigModalVisibility("d-none")}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <ul>
            {/* {mainState.map((itm) => {
              return (
                <div>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    onClick={(e) => handleSelection(e)}
                    value={itm}
                    checked={itm === selectedState?.find((it) => it === itm)}

                    // checked={
                    //     user.pool_email ===
                    //     props.modalMedia.pool_email.find(
                    //       (item) => item === user.pool_email
                    //     )
                    //   }
                  />
                  <label className="form-check-label">{itm}</label>
                </div>
              );
            })}
            <button onClick={sendData}>Send Data</button> */}
          </ul>
          {props.loggedInUser.email === props.modalMedia.broadCast_email && (
            <>
              <div className="modal-body">
                <ul className="list-group p-2">
                  {props?.userPool &&
                    props?.userPool.map((user) => {
                      return (
                        <li className="list-group-item pad-2" key={user._id}>
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            name={props?.modalMedia?._id}
                            value={user?.pool_email}
                            onChange={(e) =>
                              props?.handleMediaPoolEmail(
                                e,
                                props?.modalMedia._id
                              )
                            }
                            // checked={user?.pool_email === props?.modalMedia?.pool_email?.find((item) => item === user.pool_email)
                              checked={props?.modalMedia?.pool_email?.find((item) => item.email === user.pool_email)
                              }
                          />
                          {/* <div>{user.pool_email} === {props.modalMedia.pool_email.find((item) => item === user.pool_email)}</div> */}
                          {/* <li>hi{props?.modalMedia?.pool_email?.map((item) => item.email === user.pool_email ? item.email : null )} bye</li> */}
                          {/* <li>hi{props?.modalMedia?.pool_email?.find((item) => item.email === user.pool_email )} bye</li> */}
                          <label className="form-check-label">
                            {user?.pool_email}
                            {/* {user._id} */}
                          </label>
                          {/* <div>
                            {props.modalMedia.pool_email.find(
                              (item) => item === user.pool_email
                            )}
                          </div> */}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => props?.setPoolConfigModalVisibility("d-none")}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn-outline-success m-2"
                  onClick={() => {
                    // props.addInPool(props.modalMedia._id);
                    props?.addInPool(props?.modalMedia);
                    props?.setPoolConfigModalVisibility("d-none");
                  }}
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ConfigPoolModal;
