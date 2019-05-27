

const min_width = 1440;

export const getMobileWidth = () => {

    let H = document.documentElement;

    if (typeof document.height !== 'undefined') {
        let height = document.height;
        let width = document.width;// For webkit browsers
        return height * min_width / width;
    } else {
        let height = H.clientHeight;
        let width = H.clientWidth;

        return height * min_width / width;

    }

};