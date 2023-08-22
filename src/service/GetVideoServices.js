import * as httpRequest from '~/ultils';

export const getListVideo = async (type = 'for-you', page) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log('errorGetVideo: ', error);
    }
};
