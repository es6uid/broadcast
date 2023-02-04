import { useState, useEffect } from "react";
import CreateClass from './Createclass';
import MediaModal from './MediaModel';


const api = `https://glorious-worm-poncho.cyclic.app/api/media`
// const api = `http://localhost:5000/api/media/`

const Video = () => {
  const [userImageInput, setUserImageInput] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [iFrame, setIframe] = useState();
  const [mediaLink, setMediaLink] = useState();
  const [mediaModalVisibility, setMediaModalVisibility] = useState('');
  const [openaiLoader, setopenaiLoader] = useState(false)

  const generateImage = async () => {
    try {
      setopenaiLoader(true)
      const response = await fetch('https://glorious-worm-poncho.cyclic.app/api/openai/generateimage', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: userImageInput
          }),
        }
      );
      if(!response.ok){
        setopenaiLoader(false)
        throw new Error('Image could not be generated - Wrong Content');
      }
      const data = await response.json()
      console.log(data)
      setopenaiLoader(false)
      setThumbnail(data.data);

    } catch(error) {
      setopenaiLoader(false)
    }
  }

  const clearAIImage = () => setThumbnail('');

  useEffect(() => {
    getVideo();
  }, []);
  

  const getVideo = async () => {
    const data = await fetch(api);
    const json = await data.json();
    setMediaLink(json[0]);
    // console.log(json[0]);
  };

  const postVideo = async () => {
    // console.log(iFrame, thumbnail )
    await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: encodeURIComponent(iFrame.split("/")[3]),
          thumbnail,
          description
        }),
      }
    );
  };

//   const putVideo = async (
//     data = { text: encodeURIComponent(iFrame.split("/")[3]) }
//   ) => {
//     const response = await fetch(
//       `http://localhost:5000/api/media/${mediaLink?._id}`,
//       {
//         // const response = await fetch(`https://glorious-worm-poncho.cyclic.app/api/media/${mediaLink?._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: JSON.stringify(data),
//       }
//     );
//   };

  // const deleteSlot = async(url = `http://localhost:5000/api/media/${mediaLink?._id}`) => {
  const deleteSlot = async () => {
    console.log(`${mediaLink?._id}`);
    await fetch(`${api}/${mediaLink?._id}`,{
        method: "DELETE",
      }
    );
    setMediaLink([]);
  };

  return (
    <div>
        <CreateClass 
        thumbnail={thumbnail} 
        setUserImageInput={setUserImageInput} 
        generateImage={generateImage}
        mediaLink={mediaLink}
        setIframe={setIframe}
        setDescription={setDescription}
        postVideo={postVideo}
        clearAIImage={clearAIImage}
        openaiLoader={openaiLoader}
        setopenaiLoader={setopenaiLoader}

    />


<div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        {mediaLink?.thumbnail && <img src={mediaLink.thumbnail} className="m-2 img-thumbnail rounded" alt="aiImage" width='200' height='200' />}
                    </div>
                    <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">Live sessions</h5>
                        <p class="card-text">{mediaLink?.description && <p>{mediaLink.description}</p>}</p>
                        <p class="card-text"><small class="text-muted">Created on updated 3 mins ago, created by: Nupur</small></p>
                        <button onClick={deleteSlot} type="button" className="btn btn-outline-danger btn-sm me-2" data-bs-dismiss="modal">Delete</button>
                        <button onClick={() => setMediaModalVisibility('d-block')} type="button" className="btn btn-outline-success btn-sm" data-bs-dismiss="modal">Play</button>
                    </div>
                    </div>
                </div>
            </div>
            <MediaModal 
                mediaLink={mediaLink}
                mediaModalVisibility={mediaModalVisibility}
                setMediaModalVisibility={setMediaModalVisibility}
             />
      {/* {mediaLink?.text ? (
        <iframe
          className="ytplayer"
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${mediaLink?.text}?controls=0`}
          title="YouTube video player123"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : null} */}

      {/* <button onClick={deleteSlot}>Delete Slot</button>
      {!mediaLink?.text ? (
        <button onClick={getVideo}>New session</button>
      ) : null} */}
    </div>
  );
};
export default Video;

// https://youtu.be/9xaKQi9-VTI
