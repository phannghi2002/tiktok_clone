import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { ModalContext } from '~/components/ModalProvider';
import MenuModalItem from '~/components/MenuModalItem';
import { LoginContext } from '~/components/LoginProvider';
import LogOutForm from '~/components/AuthForms/LogOutForm';
import { getCurrentUserService } from '~/service/GetCurrentUser';

const cx = classNames.bind(styles);

function DefaultLayout({ children, data }) {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUserService();
            if (result) {
                contextLogin.handleSetData(result);
            }
        };
        if (token) {
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            {contextLogin.isNotify && <span className={cx('notify')}>Login Success</span>}
            <div className={cx('container')}>
                <Sidebar data={data} />
                <div className={cx('content')}>{children}</div>
            </div>
            {contextModal.activeLogOut && <LogOutForm />}
            {contextModal.active && <MenuModalItem />}
        </div>
    );
}

DefaultLayout.propsType = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
