import zxcvbn from "zxcvbn";

export default function checkPasswordStrength(password) {
  return zxcvbn(password);
}
