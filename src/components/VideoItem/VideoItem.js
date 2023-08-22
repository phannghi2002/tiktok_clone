import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './VideoItem.module.scss';
import {
    HeartVideoIcon,
    HeartVideoActiveIcon,
    OpenCommentIcon,
    FavoriteVideoIcon,
    FavoriteVideoActiveIcon,
    ShareIcon,
    PLayIcon,
    PauseIcon,
    VolumeIcon,
    MuteIcon,
} from '~/components/Icons';
import { VideoContext } from '~/components/VideoProvider';
import { observe } from 'react-intersection-observer';
import { debounce } from '~/hooks';

const cx = classNames.bind(styles);

function VideoItem({ children }) {
    const videoRef = useRef();
    const myRef = useRef();

    const contextVideo = useContext(VideoContext);

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [minutesLoad, setMinuteLoad] = useState(0);
    const [secondsLoad, setSecondsLoad] = useState(0);
    const [minutesTotal, setMinutesTotal] = useState(0);
    const [secondsTotal, setSecondsTotal] = useState(0);
    const [myElementIsVisible, setMyElementIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setMyElementIsVisible(entry.isIntersecting);
        });
        observer.observe(myRef.current);

        if (myElementIsVisible && videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play();
        } else if (!myElementIsVisible && videoRef.current) {
            setIsPlaying(false);
            videoRef.current.pause();
        }
    }, [myElementIsVisible]);

    useEffect(() => {
        if (videoRef.current) {
            const timeLoad = videoRef.current.currentTime;
            const minutesLoad = Math.floor(timeLoad / 60);
            setMinuteLoad(minutesLoad);
            const secondsLoad = Math.floor(timeLoad % 60);
            setSecondsLoad(secondsLoad);
            const totalTime = videoRef.current.duration;
            const minutesTotal = Math.floor(totalTime / 60);
            setMinutesTotal(minutesTotal);
            const secondsTotal = Math.floor(totalTime % 60);
            setSecondsTotal(secondsTotal);
        }
    });

    useEffect(() => {
        if (contextVideo.isMute) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = contextVideo.volume;
        }
        console.log('fffff');
    }, [contextVideo.isMute]);

    const handleTimeUpdate = (event) => {
        const video = event.target;
        const percent = (video.currentTime / video.duration) * 100;
        setCurrentTime(percent);
    };

    const handleSetTimeVideo = (event) => {
        const percent = parseFloat(event.target.value);
        const time = (videoRef.current.duration / 100) * percent;
        videoRef.current.currentTime = time;
        setCurrentTime(percent);
    };

    const handlePLayVideo = () => {
        videoRef.current.play();
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
    };

    const toggleVideo = () => {
        if (isPlaying) {
            handlePauseVideo();
            setIsPlaying(false);
        } else {
            handlePLayVideo();
            setIsPlaying(true);
        }
    };

    const handleVideoEnded = () => {
        videoRef.current.play();
    };

    const handleVolumeChange = (e) => {
        videoRef.current.volume = e.target.value;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-card')}>
                <video onTimeUpdate={handleTimeUpdate} ref={videoRef} src={children} onEnded={handleVideoEnded}></video>
                <div className={cx('controls')}>
                    <div className={cx('play-pause')} onClick={toggleVideo}>
                        {isPlaying ? <PLayIcon /> : <PauseIcon />}
                    </div>
                    <div className={cx('controls-volume')}>
                        <div className={cx('change-volume')}>
                            <input
                                className={cx('range')}
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={contextVideo.volume}
                                onChange={(e) => {
                                    contextVideo.handleAdjustVolume(e);
                                    handleVolumeChange(e);
                                }}
                            />
                        </div>

                        <div className={cx('sound-mute')} onClick={contextVideo.toggleMuted}>
                            {contextVideo.isMute && (
                                <span className={cx('mute-icon')}>
                                    <MuteIcon />
                                </span>
                            )}

                            {!contextVideo.isMute && (
                                <span className={cx('volume-icon')}>
                                    <VolumeIcon />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx('progress-time')}>
                        <div className={cx('time-video')}>
                            <div className={cx('control-time')}>
                                <input
                                    id="progress"
                                    className={cx('range')}
                                    type="range"
                                    value={currentTime}
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    onChange={handleSetTimeVideo}
                                />
                                <div className={cx('range-progess')}></div>
                            </div>

                            <div className={cx('timeon')}>{`${minutesLoad}:${
                                secondsLoad < 10 ? '0' : ''
                            }${secondsLoad}/${minutesTotal}:${secondsTotal < 10 ? '0' : ''}${secondsTotal}`}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('icons-video')}>
                <div ref={myRef} className={cx('autoplay-video-ref')} />
                <button>
                    <span className={cx('cover-icon')}>
                        <HeartVideoIcon />
                    </span>
                    <strong className={cx('count-icon')}>9999</strong>
                </button>

                <button>
                    <span className={cx('cover-icon')}>
                        <OpenCommentIcon />
                    </span>
                    <strong className={cx('count-icon')}>999</strong>
                </button>

                <button>
                    <span className={cx('cover-icon')}>
                        <FavoriteVideoIcon />
                    </span>
                    <strong className={cx('count-icon')}>99</strong>
                </button>

                <button>
                    <span className={cx('cover-icon')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('count-icon')}>9</strong>
                </button>
            </div>
        </div>
    );
}

export default VideoItem;
