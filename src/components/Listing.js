import { useState } from 'react'
// import { findAllByAltText } from '@testing-library/react';
// import placeholder from "../placeholder.jpeg";
import ConfigPoolModal from './ConfigPoolModal';

const Listing = (props) => {
    const [poolConfigModalVisibility, setPoolConfigModalVisibility] = useState('d-none');

    const addInPool = async(media) => {
        console.log('final', media)
        // console.log(props.mediaLink.filter((item) => item._id === media._id)[0].pool_email)
        // setModalMedia(media)
        const aSelectedEmails = props.mediaLink.filter((item) => item._id === media._id)[0].pool_email;

        const pool_email = [];

        aSelectedEmails.map((sEmail) => pool_email.push(sEmail))

        // aSelectedEmails.map

        console.log(pool_email)

        await fetch(`${props.api}/media/${media._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pool_email
                // pool_email: [
                //     {
                //         email: props.mediaLink.filter((item) => item._id === media._id)[0].pool_email,
                //         played: 'false'
                //     }
                // ]
            })
          }
        );
    }
  return (
    <>
      {props.mediaLink?.map((media) => {
        return (
          <div className="col-12 col-sm-6 col-md-4" key={media._id}>
            <div className="card mb-4">
              <img
                src={media.thumbnail} className="card-img-top" alt="aiImage"
              />

              <div className="card-body">
                <h5 className="card-title">{media.text}</h5>
                <p className="card-text">{media.description}</p>
                <p className="card-text">Created by: {media.broadCast_email}</p>
                <button data-id={media.text}
                  onClick={() => {props.getPoolUsers(media._id); props.setPlayVideo(media.text)}}
                  type="button" className="btn btn-outline-success me-2" data-bs-dismiss="modal"
                >
                  <i className="bi bi-play-btn-fill"></i>
                </button>
                {/* <button onClick={() => handlerPlayBtn(media._id)}>Play</button> */}
                {
                    (props.loggedInUser.email === media.broadCast_email) &&
                    <>
                {props.deleteLoader ? (
                  <button
                    className="btn btn-outline-danger btn-sm me-2" type="button" disabled
                  >
                    <span
                      className="spinner-grow spinner-grow-sm m-1" role="status" aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Loading...</span>
                  </button>
                ) : (
                    <>
                  <button
                    onClick={() => props.deleteSlot(media._id)}
                    type="button" className="btn btn-outline-danger me-2" data-bs-dismiss="modal"
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                <button data-id={media.text}
                onClick={() => {
                    props.setSelectedModalMedia(media);  
                    props.setModalMedia(media); 
                    setPoolConfigModalVisibility('d-block'); 
                    }
                }
                // onClick={() => setPoolConfigModalVisibility('d-block')}
                type="button" className="btn btn-outline-success" data-bs-dismiss="modal"
              >
                 Config Users
              </button>
              </>
                )}
                </>
                }
              </div>
            </div>
          </div>
        );
      })}
      {
        (poolConfigModalVisibility === 'd-block') &&

        <ConfigPoolModal
        selectedModalMedia={props.selectedModalMedia}
        modalMedia={props.selectedModalMedia}
        userPool={props?.userPool}
        addInPool={addInPool}
        handleMediaPoolEmail={props?.handleMediaPoolEmail}
        loggedInUser={props?.loggedInUser}
        poolConfigModalVisibility={poolConfigModalVisibility}
        setPoolConfigModalVisibility={setPoolConfigModalVisibility}
        />

      }
    </>
  );
};
export default Listing;

// List view
// {/*
// <div class="card mb-3">
//                 <div class="row g-0">
//                     <div class="col-md-2">
//                         {mediaLink?.thumbnail ? <img src={mediaLink.thumbnail} className="m-2 img-thumbnail rounded" alt="aiImage" width='150' height='150' />
//                         : <img src={placeholder} className="img-thumbnail w-100" alt="aiImage" width='150' height='150'/>
//   }
//                     </div>
//                     <div class="col-md-6">
//                     <div class="card-body">
//                         <h5 class="card-title">Live sessions</h5>
//                         <p class="card-text">{mediaLink?.description && <p>{mediaLink.description}</p>}</p>
//                         <p class="card-text"><small class="text-muted">Created on updated 3 mins ago, created by: Nupur</small></p>
//                         { deleteLoader ?

//                           <button class="btn btn-outline-danger btn-sm me-2" type="button" disabled>
//                             <span class="spinner-grow spinner-grow-sm m-1" role="status" aria-hidden="true"></span>
//                             <span class="visually-hidden">Loading...</span>
//                           </button>
//                         :
//                         <button onClick={deleteSlot} type="button" className="btn btn-outline-danger me-2" data-bs-dismiss="modal">
//                           <i class="bi bi-trash"></i>
//                         </button>

//                        }
//                         <button onClick={() => setMediaModalVisibility('d-block')} type="button" className="btn btn-outline-success" data-bs-dismiss="modal">
//                         <i class="bi bi-play-btn-fill"></i>
//                         </button>
//                     </div>
//                     </div>

//                 </div>
//             </div> */}

// {/* <div className="card"> */}
// {/* {props.mediaLink?.thumbnail ? <img src={props.mediaLink.thumbnail} className="card-img-top" alt="aiImage" />
//     : <img src={placeholder} className="card-img-top" alt="aiImage" />
// } */}

// {
  /* {props.mediaLink ? 
            <div className="card-body">
                <h5 className="card-title">{props.mediaLink.text}</h5>
                <p className="card-text">{props.mediaLink.description}</p>
                <p className="card-text">Created by: {props.mediaLink.broadCast_email}</p>
                { props.deleteLoader ?
                    <button className="btn btn-outline-danger btn-sm me-2" type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm m-1" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                    </button>
                    :
                    <button onClick={props.deleteSlot} type="button" className="btn btn-outline-danger me-2" data-bs-dismiss="modal">
                    <i className="bi bi-trash"></i>
                    </button>
                }
                <button onClick={props.getPoolUsers} type="button" className="btn btn-outline-success" data-bs-dismiss="modal">
                    <i class="bi bi-play-btn-fill"></i>
                </button>
                    
            </div> : 
            <div class="card-body">
            <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
            </p>
            <button class="btn disabled bg-dark bg-opacity-50 placeholder col-2 border-0 me-2"></button>
            <button class="btn disabled bg-dark bg-opacity-50 placeholder col-2 border-0"></button>
            </div>
            } */
// }
