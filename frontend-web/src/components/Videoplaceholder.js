import {useState, useEffect} from 'react';
import axios from 'axios';


const Video = () => {

const [testLink, setTestLink] = useState("9xaKQi9-VTI")
const [iFrame, setIframe] = useState()
const [broadCast, setBroadCast] = useState()

const [mediaLink, setMediaLink] = useState()

useEffect(() => {
    getVideo()
},[])


const getVideo = async () => {
    const data = await fetch('http://localhost:5000/api/media');
    const json = await data.json()
    // setMediaLink
    setMediaLink(json[0])
    console.log(json[0])
}

const postVideo = async (url = 'http://localhost:5000/api/media', data={'text': encodeURIComponent(iFrame)} ) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
}

const putVideo = async (data={'text': encodeURIComponent(iFrame.split('/')[3])}) => {
    const response = await fetch(`http://localhost:5000/api/media/${mediaLink?._id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data)
    })
}

// const deleteSlot = async(url = `http://localhost:5000/api/media/${mediaLink?._id}`) => {
const deleteSlot = async() => {
    console.log(`${mediaLink?._id}`)
    const response = await fetch(`http://localhost:5000/api/media/${mediaLink?._id}`, {
        method: 'DELETE',
    })
}

const getMediaLink = () => {
    alert('hi')
}

 return(
     <div>
        <div>Video URL</div>
        {!mediaLink?.text ? 
            <div>
                <input onInput={e => setIframe(e.target.value)}/> 
                <button onClick = {() => putVideo()}>Broadcast</button>
            </div>
        : null}
        {/* <div dangerouslySetInnerHTML={ {__html:  mediaLink?decodeURIComponent(mediaLink.text):""}} /> */}
        <iframe className="ytplayer" width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${mediaLink?.text}?controls=0`}
        title="YouTube video player123" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen></iframe>

        <div onClick={deleteSlot}>Delete Slot</div>

        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/bV270I2hXpQ?autoplay=1&mute=1&showinfo=0&controls=1&modestbranding=0&autohide=0" 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen></iframe> */}
     </div>
 )   
}
export default Video

// https://youtu.be/9xaKQi9-VTI
// https://www.youtube.com/watch?v=9xaKQi9-VTI&ab_channel=codedamn
// {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/9xaKQi9-VTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/PuWouHWXIV4?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
