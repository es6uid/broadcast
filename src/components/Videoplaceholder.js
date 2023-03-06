import { useState, useEffect } from "react";
import LoginModal from './LoginModal';
import Header from './Header';
import CreateClass from './Createclass';
import MediaModal from './MediaModel';
import Listing from './Listing';

const api = `https://glorious-worm-poncho.cyclic.app/api`
// const api = `http://localhost:5000/api`

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
  const [loginSignupModalVisibility, setLoginSignupModalVisibility] = useState('d-block');
  const [loggedInUser, setLoggedUser] = useState();
  const [userPool, setUserPool] = useState();

  

  const [userMail, setUserMail] = useState();
  const [addUser, setaddUser] = useState([])
  const [duplicateEmail, setDuplicateEmail] = useState(false);


  const fetchUser = async() => {
    const data = await fetch(`${api}/user`);
    const users = await data.json();
    console.log(users)
    setaddUser(users)
  } 

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    if(re.test(email))
    setUserMail(email)
  }

  const loginSignupUser = async() => {
      // if(userMail) 
      // setaddUser([...addUser, userMail])
      try{
        const response = await fetch(`${api}/user/?email=${userMail}&isLoggedIn=true`)

          // const response = await fetch(`${api}/user`, {
          //     method: "POST",
          //     headers: {
          //     "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //     email: userMail
          //     }),
          // }
          // );
          // const users = await response.json();
          // console.log(users)

          // setaddUser([...addUser, response.email])
          if(response.ok){
            setLoginSignupModalVisibility('d-none')
            // console.log(await response.json())
            setLoggedUser(await response.json())
            console.log(loggedInUser)
            getVideo()
          }

          if(!response.ok){
          //   setSessionLoader(false)
          console.log(response)
          }
          if(response.status === 409){
              console.log('Email id Exists!')
              setDuplicateEmail(true)
              setLoginSignupModalVisibility('d-none')
              setLoggedUser(await response.json())
              console.log(loggedInUser)
          }
      } catch(error){
          console.log('hi', error)
      }
  }

  useEffect(() => {
    fetchUserPool()
    }, [loggedInUser])

   const fetchUserPool = async() => {
        const data = await fetch(`${api}/pool/?broadCast_email=${loggedInUser.email}`);
        const users = await data.json();
        setUserPool(users)
    } 

    // if(loggedInUser){
    //   fetchUserPool()
    // }

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
    const data = await fetch(`${api}/media`);
    const json = await data.json();
    setMediaLink(json[0]);
    // console.log(json[0]);
  };

  const postVideo = async () => {
    console.log(iFrame, thumbnail, loggedInUser )
    setSessionLoader(true)
    const response = await fetch(`${api}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: encodeURIComponent(iFrame.split("/")[3]),
          thumbnail,
          description,
          broadCast_email: loggedInUser.email
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
    const response = await fetch(`${api}/media/${mediaLink?._id}`,{
        method: "DELETE",
      }
    );
    setMediaLink([]);
    if(!response.ok){
      setDeleteLoader(false)
    }
    setDeleteLoader(false)
  };

  const [isActive, setActive] = useState("false");

  const changeClass = () => {
    setActive(!isActive);
  }

  const deletePoolUser = async(res) => {
    // alert(res)
    const response = await fetch(`${api}/pool/${res}`,{
        method: "DELETE",
      }
    );
    if(response.status === 200){
        // console.log(response => )
        // console.log(userPool)
        const resId = await response.json()
        // console.log(resId.id)
        setUserPool(userPool.filter(user => user._id !== resId.id))
    }
}
// const myObj = 
//   {"email": "anshul"}

const [linkedPoolUsers, setLinkedPoolUsers] = useState([])
const [poolActiveUsers, setPoolActiveUsers] = useState([])
const getPoolUsers = async() => {
    const getPoolEmails = await fetch(`${api}/pool?broadCast_email=${mediaLink.broadCast_email}`)
    const resGetPoolEmails = await getPoolEmails.json()
    if(getPoolEmails.status){
      // console.log()
      setLinkedPoolUsers(resGetPoolEmails)
    }

    let poolusr = '';
    linkedPoolUsers.forEach((i) => {
      poolusr += `email=${i.pool_email}&`
    })

    // const response = await fetch(`${api}/user/getPoolUsersStatus?email=${user.pool_email}`)
    const response = await fetch(`${api}/user/getPoolUsersStatus?${poolusr}`)
    // http://localhost:5000/api/user/getPoolUsersStatus?email=ansh@g.com&email=shivu@gmail.com
    const res = await response.json()

    let checker = arr => arr.every(v => v.status === true);
console.log(checker(res))
if(checker(res) === true){
  setMediaModalVisibility('d-block')
}

    if(response.status){
        res.map(user => {
          if(!user.status){
            console.log('false')
            setTimeout(() => {
              getPoolUsers()
            }, 5000)
          }
        })
    }
}

// const playVideoFlag = () => {
//   poolActiveUsers.map((user) => {
//     if(user.status){
//       console.log(user)
//     }
//   })
// }

  return (
    <div>
        <LoginModal 
          loginSignupUser={loginSignupUser} 
          validateEmail={validateEmail}
          loginSignupModalVisibility={loginSignupModalVisibility}
          setLoginSignupModalVisibility={setLoginSignupModalVisibility}/>
        <Header 
        loggedInUser={loggedInUser}
        setLoggedUser={setLoggedUser}
        setLoginSignupModalVisibility={setLoginSignupModalVisibility}
        api={api}
        userMail={userMail}
        changeClass={changeClass}

        />
        {/* {linkedPoolUsers && linkedPoolUsers.map((user) => {
          return(
            <li>{user.pool_email}</li>
          )
        })} */}
        {/* <button onClick={getPoolUsers}>Get Pool Users</button> */}
        <div className= {isActive ? "bgactive": "bginactive"}>
          <div className= {isActive ? "active createClass": "inactive createClass"}>
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
            loggedInUser={loggedInUser}
            fetchUserPool={fetchUserPool}
            userPool={userPool}
            deletePoolUser={deletePoolUser}
            changeClass={changeClass}
        />
        </div>
      </div>
      <div className="row">
          <Listing
          mediaLink={mediaLink}
          deleteLoader={deleteLoader}
          deleteSlot={deleteSlot}
          setMediaModalVisibility={setMediaModalVisibility}
          getPoolUsers={getPoolUsers}
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
