

export const APP_URL = "https://getirbiindirim.herokuapp.com"
// export const APP_URL = "http://127.0.0.1:5000"



export const SingleImageConfig_1 = {
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
        verticalFit: true
    }
};

export const SingleImageConfig_2 = {
    type: 'image',
    closeOnContentClick: true,
    image: {
        verticalFit: false
    }
};

export const SingleImageConfig_3 = {
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
        verticalFit: true
    },
    zoom: {
        enabled: true,
        duration: 300
    }
}