import classNames from 'classnames/bind';

import styles from './AccoutPreviewOverlay.module.scss';
import Image from '~/components/Images';
import Button from '~/components/Button';
import { BlueTickIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AccoutPreviewOverlay({ item }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={item.user.avatar} alt="" />
                <Button outline className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('name-header')}>
                    <p className={cx('nickname')}>
                        <strong>{item.user.nickname}</strong>
                        {item.user.tick && <BlueTickIcon className={cx('check')} />}
                    </p>
                    <p className={cx('name')}>{`${item.user.last_name} ${item.user.first_name}`}</p>
                </div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{item.user.followers_count}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{item.user.likes_count}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
            <div className={cx('bio')}>{item.user.bio}</div>
        </div>
    );
}

export default AccoutPreviewOverlay;
