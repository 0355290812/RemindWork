const formatDate = (date) => {
    if (!date) return '';

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Nếu bạn muốn 24 giờ
    };

    return new Intl.DateTimeFormat('vi-VN', options).format(new Date(date));
};

export default formatDate;
