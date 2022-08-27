import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeConfig = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D83A8F'
        },
        background: {
            paper: '#222228',
            default: '#1A1A1F'
        },
        text: {
            secondary: '#7F8596'
        }
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h3: {
            fontSize: 50
        },
        h4: {
            fontSize: 32
        },
        h5: {
            fontSize: 26
        },
        h6: {
            fontSize: 18
        }
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(49, 52, 63, 0.5)',
                    borderRadius: 8,
                    fontSize: 16,
                    '&:before': {
                        content: 'none'
                    },
                    '&:after': {
                        content: 'none'
                    },
                    '& input': {
                        paddingTop: 16,
                        paddingBottom: 16,
                        paddingLeft: 24,
                        paddingRight: 24
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    paddingLeft: 16,
                    paddingRight: 16
                },
                sizeMedium: {
                    minHeight: 36
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 400
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 50,
                    height: 50
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 24
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: 'none'
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    '&:before': {
                        content: "' '",
                        width: '100%',
                        height: 1,
                        position: 'absolute',
                        bottom: 0,
                        background: 'white',
                        backgroundColor: '#D9D9D9',
                        opacity: 0.2
                    }
                },
                indicator: {
                    height: 1,
                    borderRadius: 6
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    paddingLeft: 4,
                    marginRight: 24,
                    alignItems: 'flex-start'
                }
            }
        }
    }
} as ThemeOptions);

export default themeConfig;
