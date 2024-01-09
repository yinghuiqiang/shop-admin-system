import moment from 'moment';

const formatTime = {
    getTime: (data) => {
        return moment(data).format('YYYY/MM/DD');
    }
}

export default formatTime;