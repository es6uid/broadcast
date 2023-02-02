import {useState, useEffect} from 'react';
import { Configuration, OpenAIApi } from 'openai';
// import axios from 'axios';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY
})
const openai = new OpenAIApi(configuration)


const Video = () => {
    const [userImageInput, setUserImageInput] = useState("");
    const [imageUrl, setImageUrl] = useState()

const [testLink, setTestLink] = useState("9xaKQi9-VTI")
const [iFrame, setIframe] = useState()
const [broadCast, setBroadCast] = useState()

const [mediaLink, setMediaLink] = useState()

const generateImage = async() => {

    const imageParameters = {
        prompt: userImageInput,
        n: 1,
        size: '256x256'
    }
    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    setImageUrl(urlData);
}

useEffect(() => {
    getVideo()
},[])


const getVideo = async () => {
    // const data = await fetch('http://localhost:5000/api/media');
    const data = await fetch('https://glorious-worm-poncho.cyclic.app/api/media');

    const json = await data.json()
    // setMediaLink
    setMediaLink(json[0])
    console.log(json[0])
}

// const postVideo = async (url = 'http://localhost:5000/api/media', data={'text': encodeURIComponent(iFrame)} ) => {
const postVideo = async (data={'text': encodeURIComponent(iFrame.split('/')[3])} ) => {
    console.log({'text': encodeURIComponent(iFrame.split('/')[3])})
    const response = await fetch('https://glorious-worm-poncho.cyclic.app/api/media', {
        // const response = await fetch('http://localhost:5000/api/media', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({'text': encodeURIComponent(iFrame.split('/')[3])})
    })
}

const putVideo = async (data={'text': encodeURIComponent(iFrame.split('/')[3])}) => {
    const response = await fetch(`http://localhost:5000/api/media/${mediaLink?._id}`, {
    // const response = await fetch(`https://glorious-worm-poncho.cyclic.app/api/media/${mediaLink?._id}`, {
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
    // const response = await fetch(`http://localhost:5000/api/media/${mediaLink?._id}`, {
    const response = await fetch(`https://glorious-worm-poncho.cyclic.app/api/media/${mediaLink?._id}`, {
            method: 'DELETE',
    })
    setMediaLink([])
}

const getMediaLink = () => {
    alert('hi')
}

const testEnv = () => {
    console.log(process.env.REACT_APP_API_KEY)

}
 return(
     <div>
        <button onClick={testEnv}>Test Env</button>
        <div>
            {imageUrl && <img src={imageUrl} className='aiimage' alt='aiImage' />}
            <label>Search</label>
            <input onChange={(e) => setUserImageInput(e.target.value)}/ >
                <button onClick = {generateImage}>Generate</button>
        </div>
        <div>Video URL</div>
        {!mediaLink?.text ? 
            <div>
                <input onInput={e => setIframe(e.target.value)}/> 
                <button onClick = {postVideo}>Broadcast</button>
            </div>
        : null}
        {/* <div dangerouslySetInnerHTML={ {__html:  mediaLink?decodeURIComponent(mediaLink.text):""}} /> */}
        {mediaLink?.text?
        <iframe className="ytplayer" width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${mediaLink?.text}?controls=0`}
        title="YouTube video player123" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen></iframe>
        :null}

        <button onClick={deleteSlot}>Delete Slot</button>
        {!mediaLink?.text ?
            <button onClick={getVideo}>New session</button>
            :null
        }

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
