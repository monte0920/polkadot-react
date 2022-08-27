import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const PolkadotContext = createContext<any>(undefined);

export const PolkadotProvider = ({ children }) => {
    const [api, setAPI] = useState<any>({});
    const [accounts, setAccounts] = useState<any>([]);
    const wsProvider = useMemo(() => {
        try {
            const provider = new WsProvider('wss://rpc.fragnova.network');
            return provider;
        } catch (e) {
            console.log(e.toString());
        }
    }, []);

    useEffect(() => {
        if (api.isReady) return;
        try {
            ApiPromise.create({
                provider: wsProvider,
                rpc: {
                    protos: {
                        getProtos: {
                            description: 'this is the description',
                            type: 'String',
                            params: [
                                { name: 'params', type: 'GetProtosParams' },
                                { name: 'at', type: 'BlockHash', isOptional: true }
                            ]
                        }
                    }
                },
                types: {
                    ShardsFormat: {
                        _enum: ['edn', 'binary']
                    },
                    AudioCategories: {
                        _enum: ['oggFile', 'mp3File']
                    },
                    ModelCategories: {
                        _enum: ['gltfFile', 'sdf', 'physicsCollider']
                    },
                    TextureCategories: {
                        _enum: ['pngFile', 'jpgFile']
                    },
                    VectorCategories: {
                        _enum: ['svgFile', 'ttfFile']
                    },
                    VideoCategories: {
                        _enum: ['mkvFile', 'mp4File']
                    },
                    TextCategories: {
                        _enum: ['plain', 'json']
                    },
                    BinaryCategories: {
                        _enum: ['wasmProgram', 'wasmReactor', 'blendFile']
                    },
                    ShardsTrait: 'Compact<u32>',
                    Categories: {
                        _enum: {
                            text: 'TextCategories',
                            trait: '(Vec<u32>, Vec<u32>, ShardsTrait)',
                            shards: '(ShardsFormat, Vec<ShardsTrait>)',
                            audio: 'AudioCategories',
                            texture: 'TextureCategories',
                            vector: 'VectorCategories',
                            video: 'VideoCategories',
                            model: 'ModelCategories',
                            binary: 'BinaryCategories'
                        }
                    },
                    BlockHash: 'Hash',
                    GetProtosParams: {
                        desc: 'bool',
                        from: 'u32',
                        limit: 'u32',
                        metadata_keys: 'Vec<String>',
                        owner: 'Option<AccountId>',
                        return_owners: 'bool',
                        categories: 'Vec<Categories>',
                        tags: 'Vec<String>',
                        available: 'Option<bool>'
                    }
                }
            }).then(async (ins) => {
                await ins.isReady;
                setAPI(ins);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return <PolkadotContext.Provider value={{ api, accounts, setAccounts }}>{children}</PolkadotContext.Provider>;
};
