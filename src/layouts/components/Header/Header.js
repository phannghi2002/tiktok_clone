import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import {
    InboxIcon,
    MessageIcon,
    ProfileIcon,
    FavoriteIcon,
    CoinsIcon,
    SettingIcon,
    LanguageIcon,
    FeedBackIcon,
    KeyBoardIcon,
    DarkModeIcon,
    LogoutIcon,
    ThreeDotIcon,
    LogoIcon,
    LogoWhiteIcon,
} from '~/components/Icons';
import Image from '~/components/Images';
import Search from '~/layouts/Search';
import config from '~/config';
import { useContext } from 'react';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';
import { ThemeContext } from '~/components/ThemeProvider';

const cx = classNames.bind(styles);

function Header() {
    const MENU_ITEMS = [
        {
            icon: <LanguageIcon />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                ],
            },
        },
        {
            icon: <FeedBackIcon />,
            title: 'Feedback and help',
            to: 'feedback',
        },
        {
            icon: <KeyBoardIcon />,
            title: 'Keyboard shortcuts',
        },
        {
            icon: <DarkModeIcon />,
            title: 'Dark mode',
            button_mode: 'Dark',
        },
    ];

    const userMenu = [
        {
            icon: <ProfileIcon />,
            title: 'View profile',
            to: '/@tuan_it87',
        },
        {
            icon: <FavoriteIcon />,
            title: 'Favorites',
            to: '/favorites',
        },
        {
            icon: <CoinsIcon />,
            title: 'Get Coins',
            to: '/coin',
        },
        {
            icon: <SettingIcon />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    // Handle Logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //Handle Change Language
                break;
            default:
        }
    };

    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const contextTheme = useContext(ThemeContext);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        {!contextTheme.isDark && <img src={images.tiktokLogo} alt="Tiktok" />}
                        {contextTheme.isDark && <LogoWhiteIcon />}
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    {contextLogin.data ? (
                        <>
                            <Button className={cx('upload-btn')} white leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Tippy content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button
                                className={cx('space')}
                                white
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={contextModal.handleShowModal}
                            >
                                Upload
                            </Button>
                            <Button primary onClick={contextModal.handleShowModal}>
                                Log in
                            </Button>
                        </>
                    )}
                    {contextLogin.data && (
                        <Menu items={userMenu} onChange={handleMenuChange}>
                            <Image
                                className={cx('user-avatar')}
                                src={contextLogin.data.avatar}
                                alt={contextLogin.data.nickname}
                                fallback="https://i.pinimg.com/originals/ae/4a/9f/ae4a9f1a8d3e23463c2b8afc5f89eaf2.jpg"
                            />
                        </Menu>
                    )}
                    {!contextLogin.data && (
                        <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                            <button className={cx('more-btn')}>
                                <ThreeDotIcon />
                            </button>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
