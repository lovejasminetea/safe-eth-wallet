import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { debounce } from "lodash";
import { decrypt as aesDecrypt, encrypt } from "@/util/aes";
import WalletCard from "./wallet-card";
import { useImmer } from "use-immer";
import { ethers } from "ethers";

export default function Decrypt() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [encryptedMnemonic, setEncryptedMnemonic] = useState("");
  const [wallet, setWallet] = useImmer({
    address: "",
    mnemonic: "",
    encrypted: "",
  });

  function decrypt() {
    try {
      const decrypted = aesDecrypt(encryptedMnemonic, password);
      const wallet = ethers.Wallet.fromPhrase(decrypted);
      setWallet((draft) => {
        draft.address = wallet.address;
        draft.mnemonic = decrypted;
        draft.encrypted = encryptedMnemonic;
      });
    } catch {
      alert("Password or encrypted mnemonic error");
    }
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
        fullWidth
        label="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
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

      <TextField
        margin="normal"
        fullWidth
        label="Encrypted Mnemonic"
        multiline
        onChange={(event) => {
          setEncryptedMnemonic(event.target.value);
        }}
        required
        rows={4}
        type={showPassword ? "text" : "password"}
        value={encryptedMnemonic}
      ></TextField>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={debounce(decrypt, 500)}
      >
        Decrypt
      </Button>

      <WalletCard wallet={wallet} destroyWallet={destroyWallet}></WalletCard>
    </>
  );
}
