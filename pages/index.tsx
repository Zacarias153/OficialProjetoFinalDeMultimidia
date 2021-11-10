
import Image from 'next/image'
import { useContext } from 'react'
import { HomeContext } from '../context/HomeContext'
import { PauseCircleFilled, PlayArrow, Subtitles, VolumeOff, MicNone, Search } from '@material-ui/icons'
import styles from '../styles/Home.module.css'
import {videos} from '../dados/videos'
import { Divider } from '@material-ui/core'

export default function Home() {
  const{
    videoUrl,
    videoRef,
      canvasRef,
      isPlaying,
      currentTime,
      totalTime,
      volume,
      playPause,
      configTime,
      configVideo,
      configVolume,

  }= useContext(HomeContext);
   
  return (
    <div>
       <div className={styles.busca}>
           
          <div>
          <MicNone className={styles.microfone}/>
          </div>
          <div>
            <h3 className={styles.pesquisar}>Pesquisar</h3>
          </div>
          
          <div>
           <Search className={styles.pesquisa}/>
           
           </div>
         
       </div>
    <div className={styles.main}>
     
        <div className={styles.video}>
          <video src={`videos/${videoUrl}`} controls ref={videoRef} hidden></video>
          <canvas 
            className={styles.canvas} 
            ref={canvasRef}
            width="850" 
            height="480">

          </canvas>
          <div className={styles.controls}>
            
            <div className={styles.time}>
              <input
              type="range"
              min="0"
              max={totalTime}
              value={currentTime}
              onChange ={(e) => configTime(Number(e.target.value))}
              ></input>

            </div>
            <div className={styles.controlPainel}>
             <button className={styles.playButton} onClick={playPause}> 
             {isPlaying?
                  (<PauseCircleFilled className={styles.playIcon}/>):
                  (<PlayArrow  className={styles.playIcon}/>)
             }
             
             </button>
             <input 
             type="range"
             min="0"
             max="1"
             step="0.01"
             value={volume}
             onChange={(e) => configVolume(Number(e.target.value))}
             />
          </div>
          </div>
        </div> 
    
    
        <div className={styles.listavideo}>
            {
              videos.map((video, index) =>{
                 return(
               
                // eslint-disable-next-line react/jsx-key
                <div className={styles.videoItem}
                onClick={(e) => configVideo(index)}
                >
                      <img src={`capas/${video.capa}` }  alt={video.title}/>
                      <div>
                      <h2>{video.title}</h2>
                      <h5>{video.canal}</h5>
                      <h5>{video.view}</h5>
                      </div>
                </div>
                 )
              })}
            
        </div>
    </div>
    </div>
  )
}
