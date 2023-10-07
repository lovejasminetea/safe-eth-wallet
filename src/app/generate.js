import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import checkPasswordStrength from "@/util/check-password-strength";
import { useImmer } from "use-immer";
import createWallet from "@/util/create-wallet";
import WalletCard from "./wallet-card";
import { debounce } from "lodash";
import { encrypt } from "@/util/aes";

export default function Generate() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrengthCheck, setPasswordStrengthCheck] = useImmer({
    isWeak: false,
    suggestion: "Please use a password that is both strong and unique.",
  });
  const [wallet, setWallet] = useImmer({
    address: "",
    mnemonic: "",
    encrypted: "",
  });

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    const strength = checkPasswordStrength(event.target.value);
    if (strength.score < 4) {
      setPasswordStrengthCheck((draft) => {
        draft.isWeak = true;
        draft.suggestion = strength.feedback.suggestions[0]
          ? strength.feedback.suggestions[0]
          : "Enhance the security of your password by using a combination of uppercase and lowercase letters, numbers, and symbols.";
      });
    } else {
      setPasswordStrengthCheck((draft) => {
        draft.isWeak = false;
        draft.suggestion =
          "Your password is already strong, but please ensure it's unique for added security.";
      });
    }
  }

  function generateWallet() {
    const wallet = createWallet();

    setWallet((draft) => {
      draft.address = wallet.address;
      draft.mnemonic = wallet.mnemonic;
      draft.encrypted = encrypt(wallet.mnemonic, password);
    });
    setPassword("");
  }

  function destroyWallet() {
    setWallet((draft) => {
      draft.address = "";
      draft.mnemonic = "";
      draft.encrypted = "";
    });
  }

  return (
    <>
      <TextField
        margin="normal"
        autoFocus
        error={passwordStrengthCheck.isWeak}
        fullWidth
        helperText={passwordStrengthCheck.suggestion}
        label="Password"
        onChange={handlePasswordChange}
        required
        type={showPassword ? "text" : "password"}
        value={password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>

      <Button
        disabled={!password || passwordStrengthCheck.isWeak}
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={debounce(generateWallet, 500)}
      >
        Generate
      </Button>

      <WalletCard wallet={wallet} destroyWallet={destroyWallet}></WalletCard>
    </>
  );
}
