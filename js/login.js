const eyesIcon = document.getElementById('eyes');
const eyesCheck = document.getElementById('eyes-check');

const pwInput = document.getElementById('password');
const pwError = document.querySelector('.password-error');

const emailInput = document.getElementById('email');
const emailError = document.querySelector('.email-error');

const pwInputCheck = document.getElementById('password_check');
const pwCheckError = document.querySelector('.password-check-error');

const loginBtn = document.getElementById('login-btn');
const signinBtn = document.getElementById('singin-btn');

let loginCheck = false;

export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

// type: (x:string, y:string) => void;
export const EyesOnOffHandler = (id, input) => {
  const isActive = id.classList.toggle('active');
  if (isActive) {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
};

eyesIcon.addEventListener('click', () => EyesOnOffHandler(eyesIcon, pwInput));

//type: (x: string) => void;
const inputHandler = (type) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailCheck = emailRegex.test(emailInput.value.trim());
  const passwordCheck = pwInput.value.length >= 8;
  loginCheck = emailCheck && passwordCheck;

  if (type === 'email') {
    emailError.classList.toggle('active', !emailCheck);
    emailInput.classList.toggle('input-out', !emailCheck);
  } else {
    pwError.classList.toggle('active', !passwordCheck);
    pwInput.classList.toggle('active', !passwordCheck);
  }

  if (loginBtn) {
    loginBtn.disabled = !loginCheck;
    loginBtn.classList.toggle('active', loginCheck);
  }
};

emailInput.addEventListener('input', () => inputHandler('email'));
pwInput.addEventListener('input', (e) => inputHandler('password'));

if (loginBtn) {
  //조건1 - 만약 입력한 이메일이 데이터베이스(USER_DATA)에 없거나, 이메일은 일치하지만 비밀번호가 틀린 경우, '비밀번호가 일치하지 않습니다.'라는 메시지를 alert로 표시합니다
  //조건2 - 만약 입력한 이메일이 데이터베이스에 존재하고, 비밀번호도 일치할 경우, “/items”로 이동합니다.

  loginBtn.addEventListener('click', () => {
    const userCheck = USER_DATA.filter((x) => x.email === emailInput.value);
    const pwCheck =
      userCheck.length !== 0 && userCheck[0].password === pwInput.value
        ? true
        : false;

    if (pwCheck) {
      location.href = '/items.html';
    } else {
      Swal.fire({
        text: '비밀번호가 일치하지 않습니다.',
        confirmButtonText: '확인',
      });
    }
  });
}

if (pwInputCheck) {
  eyesCheck.addEventListener('click', () =>
    EyesOnOffHandler(eyesCheck, pwInputCheck),
  );

  pwInputCheck.addEventListener('input', (e) => {
    const isValid = pwInput.value === e.target.value;
    const signInCheck = loginCheck && isValid;
    pwCheckError.classList.toggle('active', !isValid);
    pwInputCheck.classList.toggle('active', !isValid);

    signinBtn.disabled = !signInCheck;
    signinBtn.classList.toggle('active', signInCheck);
  });

  // 조건1, 입력한 이메일이 이미 데이터베이스(USER_DATA)에 존재하는 경우, '사용 중인 이메일입니다'라는 메시지를 alert로 표시합니다.
  // 조건2, 입력한 이메일이 데이터베이스(USER_DATA)에 없는 경우, 회원가입이 성공적으로 처리되었으므로 로그인 페이지(”/login”)로 이동합니다.
  signinBtn.addEventListener('click', () => {
    const userCheck = USER_DATA.filter((x) => x.email === emailInput.value);
    const emailIsValid =
      userCheck.length !== 0 && userCheck[0].email === emailInput.value
        ? true
        : false;

    if (!emailIsValid) {
      location.href = '/login.html';
    } else {
      Swal.fire({
        text: '사용 중인 이메일입니다.',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          emailInput.value = '';
        }
      });
    }
  });
}
