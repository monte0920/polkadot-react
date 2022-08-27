import { hexToU8a } from '@polkadot/util';
import base58 from 'bs58';

export const getAddressFromHash = (hash: any) => {
    // console.log(hexToU8a('0x0155a0e40220' + listOfProtosObj[key]['json_description']))
    const encodeHash = hexToU8a(`0x0155a0e40220${hash}`);
    const bytes = Uint8Array.from(encodeHash);
    const address = base58.encode(bytes);
    return address;
};

export const getPreview = async (address: string, type?: string) => {
    const link = 'https://ipfs.fragnova.network';
    const previewURL = `${link}/ipfs/z${address}?filename=_.txt`;
    try {
        const response = await fetch(previewURL);
        const data = await response.json();
        return data;
    } catch (e) {
        return {};
    }
};

export const getPreviewImage = async (address: string, type?: string) => {
    const link = 'https://ipfs.fragnova.network';
    const previewURL = `${link}/ipfs/z${address}`;
    return previewURL;
};

export const getSigner = async (address: string) => {
    if (typeof window === 'undefined') return;
    const { web3FromAddress } = await import('@polkadot/extension-dapp');
    const injector = await web3FromAddress(address);
    return injector.signer;
};

export const readFile = (file: any) => {
    return new Promise((resolve, reject) => {
        // Create file reader
        let reader = new FileReader();

        // Register event listeners
        reader.addEventListener('loadend', (e) => resolve(e.target.result));
        reader.addEventListener('error', reject);

        // Read file
        reader.readAsArrayBuffer(file);
    });
};
