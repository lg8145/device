export function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp';
    if (!isJpgOrPng) {
      message.error('图片支持jpg、jpeg、png或bmp格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不超过2M!');
    }
    return isJpgOrPng && isLt2M;
}
export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}