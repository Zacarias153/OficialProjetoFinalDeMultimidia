import { createContext, MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import videos from '../dados/videos';


type Music = {
    nome: string,
    audio: string,
    capa: string
}

type HomeContextData = {
    videoUrl: string;
    isPlaying: boolean;
    videoRef: MutableRefObject<HTMLVideoElement>;
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    currentTime: number;
    totalTime: number;
    volume: number;
    playPause: ()=> void;
   configTime: (time: number)=>void;
   configVideo: (videoIndex: number)=> void;
   configVolume:(vomue:number) => void;
    
    
}

type HomeContextProviderProps = {
    children: ReactNode;
}
export const HomeContext = createContext({} as HomeContextData);

const HomeContextProvider = ({children}: HomeContextProviderProps) =>{
    const [videoUrl, setVideoUrl] = useState("");
    const [isPlaying, setPlaying] = useState(false);
    const [volume, setVolume]= useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [videoIndex, setVideoIndex] = useState(1);
    

    
        useEffect(()=>{
              
            configVideo(videoIndex);
           // initialAudio.play();
        });

        useEffect(()=>{
            if(videoUrl &&videoUrl.length >0){
                const video = videoRef.current;

                video.onloadedmetadata = () =>{
                    setTotalTime(video.duration);

                    if(isPlaying){
                        video.play();

                        draw();
                    }
                }

                video.ontimeupdate = () =>{
                    setCurrentTime(video.currentTime);
                }
                video.onended = () =>{
                    
                    configVideo(videoIndex + 1);
                }
            }
        }, [videoUrl, currentTime]);


        const configVideo = (index: number) =>{
           const nextIndex = index %videos.length;
           const  nextVideoUrl = videos[nextIndex].video;
           setVideoIndex(nextIndex); 
           setVideoUrl(nextVideoUrl);
            
        }

        useEffect(() =>{
            if(videoUrl){
                if(isPlaying){
                    
                }
                
            }
        }, [videoUrl,])
        

        const configTime = (time: number) =>{
            const video = videoRef.current;
            
            setCurrentTime(time);
            video.currentTime = time;

        }

        const configVolume = (volume: number) =>{
            const video = videoRef.current;
            setVolume(volume);
            video.volume = volume; 
        }
        

        const draw = ()=> {
            const video = videoRef.current;

            if(video.paused || video.ended) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            context.drawImage(video, 0, 0, 850, 490);
            requestAnimationFrame(draw);
        }
    
        const playPause = ()=>{
        const video = videoRef.current;

        if(isPlaying){
            video.pause();
        }else{
            video.play();
            draw();
        }
        setPlaying(!isPlaying);
    }
      
        
        
    return(
        <HomeContext.Provider value ={ 
           {
               videoUrl,
               videoRef,
               canvasRef,
               isPlaying,
               playPause,
               currentTime,
               totalTime,
               configTime,
               configVideo,
               volume,
               configVolume,
           }
         } >
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;