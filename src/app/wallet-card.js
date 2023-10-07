import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import download from "@/util/download";
import { debounce } from "lodash";
import DestroyDialog from "@/app/destroy-dialog";

export default function walletCard({ wallet, destroyWallet }) {
  function downloadBackup() {
    download(
      `address:${wallet.address}\nencrypted:${wallet.encrypted}`,
      `wallet-backup-${new Date().toLocaleString()}.txt`,
    );
  }

  return (
    <>
      {wallet.address ? (
        <>
          <Card className="mt-10" sx={{ width: "500px", maxWidth: "100%" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Generated wallet
              </Typography>
              <Typography variant="div" color="text.secondary">
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Wallet Address"
                      secondary={wallet.address}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Mnemonic"
                      secondary={wallet.mnemonic}
                    />
                  </ListItem>
                </List>
              </Typography>
            </CardContent>
            <CardActions className="justify-end">
              <DestroyDialog destroyWallet={destroyWallet}></DestroyDialog>
              <Button size="small" onClick={debounce(downloadBackup, 500)}>
                Download
              </Button>
            </CardActions>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
