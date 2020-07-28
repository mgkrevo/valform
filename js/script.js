const form = document.querySelector('#signUpForm');
const userNameInput = form.querySelector('#userName'),
  userEmailInput = form.querySelector('#userEmail'),
  userPasswordInput = form.querySelector('#userPassword'),
  userConfirmPasswordInput = form.querySelector('#userConfirmPassword');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    !isInputsValid(
      userNameInput,
      userEmailInput,
      userPasswordInput,
      userConfirmPasswordInput
    )
  )
    return;
});

function isInputsValid(...inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === '' || input.value == null) {
      showErrorMessage(input, `Fill ${getInputName(input)} input correctly!`);
      return;
    }

    switch (input.id) {
      case 'userName':
        checkLength(input, 6, 14);
        break;
      case 'userEmail':
        checkEmail(input);
        break;
      case 'userPassword':
        checkLength(input, 8, 20);
        break;
      case 'userConfirmPassword':
        checkMatch(input);
        break;
    }
  });

  if (inputs.some((input) => input.parentElement.className.includes('error')))
    return false;

  return true;
}

function checkMatch(reinput) {
  const input = document.querySelector('#userPassword');

  if (input.value !== reinput.value) {
    showErrorMessage(reinput, `Password doesn't match!`);
  } else {
    showSuccessMessage(reinput);
  }
}

function showErrorMessage(input, message) {
  const control = input.parentElement;
  const small = control.querySelector('small');

  if (control.className.includes('success'))
    control.classList.remove('form__control_success');

  small.textContent = message;
  control.classList.add('form__control_error');
}

function showSuccessMessage(input) {
  const control = input.parentElement;
  const small = control.querySelector('small');

  if (control.className.includes('error'))
    control.classList.remove('form__control_error');

  small.textContent = 'Correct!';
  control.classList.add('form__control_success');
}

function checkLength(input, min, max) {
  let value = input.value.trim();

  if (value.length < min) {
    showErrorMessage(
      input,
      `${getInputName(input)} must be at least ${min} characters!`
    );
  } else if (value.length > max) {
    showErrorMessage(
      input,
      `${getInputName(input)} must be less than ${max} characters!`
    );
  } else {
    showSuccessMessage(input);
  }
}

function getInputName(input) {
  let name = input.id.split('user').slice(1).join('');

  return name.charAt(0).toUpperCase() + name.slice(1);
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = re.test(String(input.value).toLowerCase());

  if (!isValid) {
    showErrorMessage(input, `${getInputName(input)} is incorrect!`);
  } else {
    showSuccessMessage(input);
  }
}
