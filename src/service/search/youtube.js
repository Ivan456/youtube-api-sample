import searchYoutube from 'youtube-api-v3-search';

const API_KEY = process.env.REACT_APP_API_KEY;
const regexpUrl = new RegExp('^(https?:\\/\\/)?' + // protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
'(\\:\\d+)?' + // port
'(\\/[-a-z\\d%@_.~+&:]*)*' + // path
'(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
const defaultParams = {
    part: 'snippet',
    type: 'video',
    safeSearch: 'strict',
    maxResults: 10
};

export default async ({ q, pageToken }) => {
    if (isUrl(q)) {
        q = youTubeGetID(q);
    }

    const result = await searchYoutube(API_KEY, {
        q,
        pageToken,
        ...defaultParams
    });

    return {
        totalResults: result.pageInfo.totalResults,
        list: result.items.map(transformItem),
        original: result
    };
};

const transformItem = ({
    snippet: {
        title,
        description,
        publishedAt,
        thumbnails: { high: { url } }
    }
}) => ({
    title,
    description,
    publishedAt: new Date(publishedAt).toLocaleString(),
    img: url
});

const youTubeGetID = (url) => {
    let ID = '';

    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
};

const isUrl = (str) => {
    if (regexpUrl.test(str)) {
        return true;
    } else {
        return false;
    }
};
