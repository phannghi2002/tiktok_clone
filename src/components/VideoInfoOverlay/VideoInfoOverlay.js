import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { BlueTickIcon } from '../Icons';
import Image from '../Images';
import styles from './VideoInfoOverlay.module.scss';
import Button from '../Button';
import { MusicIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccoutPreviewOverlay from './AccoutPreviewOverlay';

const cx = classNames.bind(styles);

function VideoInfoOverlay({ item }) {
    const renderPreview = (props) => (
        <div tabIndex="-1" {...props}>
            <PopperWrapper className={cx('menu-popper')}>
                <AccoutPreviewOverlay item={item} />
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-info')}>
                <div>
                    <Tippy delay={[800, 500]} offset={[0, 0]} interactive placement="bottom" render={renderPreview}>
                        <div>
                            <Image className={cx('avatar')} src={item.user.avatar} alt="" />
                            <p className={cx('name-header')}>
                                <Link
                                    className={cx('nickname')}
                                    to={`@${item.user.nickname}`}
                                >{`${item.user.nickname}`}</Link>
                                <span className={cx('fullname')}>
                                    {item.user.tick && <BlueTickIcon className={cx('check')} />}
                                    {`${item.user.last_name} ${item.user.first_name}`}
                                </span>
                            </p>
                        </div>
                    </Tippy>
                </div>
                <p className={cx('description')}>{item.description}</p>
                <Link to="/music">
                    <span className={cx('music-icon')}>
                        <MusicIcon />
                    </span>
                    <span className={cx('music-name')}> {item.music || 'Sound in video!'}</span>
                </Link>
            </div>
            <Button className={cx('button-follow')} outline small>
                Follow
            </Button>
        </div>
    );
}

export default VideoInfoOverlay;
