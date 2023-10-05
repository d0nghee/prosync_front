const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const koreanNameRegex = /^[가-힣]{1,7}$/;
const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,15}$/;
const introRegex = /^.{20,500}$/;


const emailValidate = (email) => {
    return emailRegex.test(email);
}

const nameValidate = (name) => {
    return koreanNameRegex.test(name);
}

const passwordValidate = (password) => {
    return passwordRegex.test(password);
}

const introValidate = (intro) => {
    return introRegex.test(intro)
}

export {emailValidate, nameValidate, passwordValidate, introValidate}