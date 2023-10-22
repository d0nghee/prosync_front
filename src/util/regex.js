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
    console.log(intro);
    const processedIntro = intro.replace(/\n/g, '');
    console.log(processedIntro);
    return introRegex.test(processedIntro)
}

export {emailValidate, nameValidate, passwordValidate, introValidate}