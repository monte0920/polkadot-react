import { useContext, useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { ThemeOptions } from '@mui/material';

// ** Material UI Icons ** //
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import useMediaQuery from '@mui/material/useMediaQuery';

// ** Extra Components ** //
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { web3Accounts, web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';

import { PolkadotContext } from 'contexts/Polkadot';

const Header = () => {
    const [unsubscribe, setUnsubscribe] = useState<any>();
    const [account, setAccount] = useState<any>({});

    const { accounts, setAccounts } = useContext(PolkadotContext);

    const isMobile = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('sm'));

    const onConnect = async () => {
        // this call fires up the authorization popup
        const extensions = await web3Enable('Narraio Dapp');
        if (extensions.length === 0) {
            // no extension installed, or the user did not accept the authorization
            // in this case we should inform the use and give a link to the extension
            window.open('https://polkadot.js.org/extension/', '_blank');
            return;
        }
        // returns an array of { address, meta: { name, source } }
        // meta.source contains the name of the extension that provides this account
        const allAccounts = await web3Accounts();
        setAccounts(allAccounts);
        // we subscribe to any account change and log the new list.
        // note that `web3AccountsSubscribe` returns the function to unsubscribe
        const unsubscribe = await web3AccountsSubscribe((injectedAccounts) => {});

        setUnsubscribe(unsubscribe);
    };

    const onDisconnect = () => {
        if (unsubscribe) unsubscribe();
        setAccounts([]);
    };
    useEffect(() => {
        setAccount(accounts[0]);
        return () => (unsubscribe ? unsubscribe() : null);
    }, [accounts]);

    return (
        <AppBar color="primary">
            <Toolbar
                sx={{
                    height: (theme) => theme.spacing(11)
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1
                    }}
                />
                {account ? (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            bgcolor: 'background.default',
                            padding: (theme) => theme.spacing(0.5),
                            borderRadius: '6px'
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton size="small">
                                <AccountBalanceWalletRoundedIcon />
                            </IconButton>
                            <Typography variant="body2" color="textSecondary">
                                {account.address &&
                                    `${account.address.substring(0, isMobile ? 6 : 8)} ... ${account.address.substring(
                                        account.address.length - (isMobile ? 4 : 8)
                                    )}`}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.25}>
                                <CopyToClipboard text={account.address}>
                                    <IconButton size="small">
                                        <ContentCopyRoundedIcon fontSize="small" />
                                    </IconButton>
                                </CopyToClipboard>
                                <Link underline="none" target="_blank">
                                    <IconButton size="small">
                                        <TravelExploreRoundedIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                            </Stack>
                        </Stack>
                        <IconButton
                            onClick={onDisconnect}
                            sx={{
                                bgcolor: 'background.paper',
                                ml: 1
                            }}
                        >
                            <LogoutRoundedIcon />
                        </IconButton>
                    </Stack>
                ) : (
                    <Button onClick={onConnect} size="large" variant="contained">
                        Connect
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
