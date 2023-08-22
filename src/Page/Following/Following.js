import classNames from 'classnames/bind';
import styles from './Following.module.scss';

const cx = classNames.bind(styles);

function Following() {
    return (
        <div>
            <div className={cx('box1')}>Box1</div>

            <div className={cx('box2')}>Box2</div>
        </div>
    );
}

export default Following;
