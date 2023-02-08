import { useState, useEffect } from "react";
import CreateClass from './Createclass';
import MediaModal from './MediaModel';
import Listing from './Listing';

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
  const [sessionLoader, setSessionLoader] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)

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
    setSessionLoader(true)
    const response = await fetch(api, {
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
    if(!response.ok){
      setSessionLoader(false)
    }else{
      getVideo()
    }
    setThumbnail()
    setSessionLoader(false)
    setUserImageInput()
    setDescription()
    setIframe()
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
    setDeleteLoader(true)
    console.log(`${mediaLink?._id}`);
    if(!mediaLink?._id) {
      setDeleteLoader(false)
      return 
    }
    const response = await fetch(`${api}/${mediaLink?._id}`,{
        method: "DELETE",
      }
    );
    setMediaLink([]);
    if(!response.ok){
      setDeleteLoader(false)
    }
    setDeleteLoader(false)
  };

  return (
    <div>
        <CreateClass 
        thumbnail={thumbnail} 
        userImageInput={userImageInput}
        setUserImageInput={setUserImageInput} 
        generateImage={generateImage}
        mediaLink={mediaLink}
        iFrame={iFrame}
        setIframe={setIframe}
        description={description}
        setDescription={setDescription}
        postVideo={postVideo}
        clearAIImage={clearAIImage}
        openaiLoader={openaiLoader}
        setopenaiLoader={setopenaiLoader}
        sessionLoader={sessionLoader}
    />
      <div className="row">
          <Listing
          mediaLink={mediaLink}
          deleteLoader={deleteLoader}
          deleteSlot={deleteSlot}
          setMediaModalVisibility={setMediaModalVisibility}
          />
      </div>
      <MediaModal 
          mediaLink={mediaLink}
          mediaModalVisibility={mediaModalVisibility}
          deleteSlot={deleteSlot}
          setMediaModalVisibility={setMediaModalVisibility}
        />
    </div>
  );
};
export default Video;

// https://youtu.be/9xaKQi9-VTI
// Yoga https://youtu.be/glOd-4t_wmo
// https://www.youtube.com/watch?v=glOd-4t_wmo&ab_channel=YogRiti
