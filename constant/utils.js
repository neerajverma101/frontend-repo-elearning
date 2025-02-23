import { getFormIDConstants } from '@/constant';
import dayjs from "dayjs";
import isObject from "lodash/isObject";
import mapValues from "lodash/mapValues";


export const formatDate = (date, dateFormat = 'DD/MM/YYYY hh:mm') => {
    return date ? dayjs(date).format(dateFormat) : ''
}

export const getRandomNumber = ({ min = 1, max = 100 }) => {
    return Math.floor(Math.random() * max) + min
}

export const isNotEmptyObject = (obj) => {
    return obj && typeof obj === "object" && Object.keys(obj).length && obj.constructor === Object
}

export const safeJsonParse = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
        return data
    }
}

export const flattenObject = (values = {}) => {
    const flattedObj = mapValues(values, (value) => {
        if (isObject(value) && (value.id || value._id)) {
            return value.id || value._id;
        } else if (Array.isArray(value)) {
            return value.map((item) => {
                if (isObject(item) && (item.id || item._id)) {
                    return item.id || item._id;
                }
                return item;
            })
        }
        return value;
    })
    Object.keys(flattedObj).forEach((key) => {
        if (getFormIDConstants[key]) {
            flattedObj[getFormIDConstants[key]] = flattedObj[key];
            delete flattedObj[key];
        }
    })
    return flattedObj;
}

export function getRandomMantineColor() {
    const mantineColors = [
        'blue', 'cyan', 'green', 'grape', 'indigo', 'lime', 'orange',
        'pink', 'red', 'teal', 'violet', 'yellow'
    ];
    const randomIndex = Math.floor(Math.random() * mantineColors.length);
    return mantineColors[randomIndex];
}

export const cleanChatData = (chatData) => {


    return chatData.map((chat) => {
        const chatCopy = { ...chat };
        chatCopy['id'] = undefined;
        return chatCopy;
    })
}


export const getThumbnail = (keyword) => {
    return fetch(`https://api.unsplash.com/photos/random?query=${keyword}&client_id=${process.env.NEXT_PUBLIC_THUMBNAIL_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            return data.urls?.thumb
        });
}