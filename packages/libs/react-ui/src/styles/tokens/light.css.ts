/* This file is generated automatically by Design Sync. Do not edit this file directly. */

import { tokens } from './contract.css';

export const lightThemeValues = {
  kda: {
    foundation: {
      border: {
        width: {
          hairline: '1px',
          normal: '2px',
          thick: '4px',
        },
        hairline: `${tokens.kda.foundation.border.width.hairline} solid ${tokens.kda.foundation.color.border.base.default}`,
        normal: `${tokens.kda.foundation.border.width.normal} solid ${tokens.kda.foundation.color.border.base.bold}`,
        thick: `${tokens.kda.foundation.border.width.thick} solid ${tokens.kda.foundation.color.border.base.bold}`,
      },
      breakpoint: {
        xs: '0rem',
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        xxl: '96rem',
      },
      radius: {
        no: '0px',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '16px',
        xxl: '24px',
        round: '999rem',
      },
      size: {
        n0: '0px',
        n1: '0.25rem',
        n2: '0.5rem',
        n3: '0.75rem',
        n4: '1rem',
        n5: '1.25rem',
        n6: '1.5rem',
        n7: '1.75rem',
        n8: '2rem',
        n9: '2.25rem',
        n10: '2.5rem',
        n11: '2.75rem',
        n12: '3rem',
        n13: '3.25rem',
        n14: '3.5rem',
        n15: '3.75rem',
        n16: '4rem',
        n17: '4.25rem',
        n18: '4.5rem',
        n19: '4.75rem',
        n20: '5rem',
        n24: '6rem',
        n25: '6.25rem',
        n30: '7.5rem',
        n32: '8rem',
        n35: '8.75rem',
        n40: '10rem',
        n48: '12rem',
        n56: '14rem',
        n64: '16rem',
      },
      spacing: {
        no: tokens.kda.foundation.size.n0,
        xxs: '0.125rem',
        xs: tokens.kda.foundation.size.n1,
        sm: tokens.kda.foundation.size.n2,
        md: tokens.kda.foundation.size.n4,
        lg: tokens.kda.foundation.size.n6,
        xl: tokens.kda.foundation.size.n7,
        xxl: tokens.kda.foundation.size.n9,
        xxxl: tokens.kda.foundation.size.n10,
      },
      zIndex: {
        deepdive: '-99999',
        default: '1',
        dialog: '6000',
        surface: '4',
        dropdown: '7000',
        modal: '9000',
        overlay: '8000',
        popup: '5000',
        spinner: '9050',
        sticky: '100',
        toast: '10000',
      },
      color: {
        accent: {
          blue: tokens.kda.foundation.color.palette.blue.n70,
          indigo: tokens.kda.foundation.color.palette.indigo.n70,
          lime: tokens.kda.foundation.color.palette.lime.n70,
          magenta: tokens.kda.foundation.color.palette.magenta.n70,
          purple: tokens.kda.foundation.color.palette.purple.n70,
          red: tokens.kda.foundation.color.palette.red.n70,
          yellow: tokens.kda.foundation.color.palette.yellow.n70,
          brand: {
            primary: tokens.kda.foundation.color.brand.primary.n70,
            secondary: tokens.kda.foundation.color.brand.secondary.n70,
          },
          semantic: {
            info: tokens.kda.foundation.color.semantic.info.n70,
            warning: tokens.kda.foundation.color.semantic.warning.n70,
            positive: tokens.kda.foundation.color.semantic.positive.n70,
            negative: tokens.kda.foundation.color.semantic.negative.n70,
          },
        },
        background: {
          base: {
            default: tokens.kda.foundation.color.neutral.n20,
            '@hover': tokens.kda.foundation.color.neutral.n10,
            '@disabled': tokens.kda.foundation.color.neutral.n20,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n80,
            },
          },
          'layer-1': {
            default: tokens.kda.foundation.color.neutral.n10,
            '@hover': tokens.kda.foundation.color.neutral.n20,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n90,
            },
          },
          'layer-2': {
            default: tokens.kda.foundation.color.neutral.n5,
            '@hover': tokens.kda.foundation.color.neutral.n0,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n95,
            },
          },
          'layer-3': {
            default: tokens.kda.foundation.color.neutral.n0,
            '@hover': tokens.kda.foundation.color.neutral.n1,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n100,
            },
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n5,
              '@hover': tokens.kda.foundation.color.brand.primary.n10,
              '@focus': tokens.kda.foundation.color.brand.primary.n10,
              inverse: {
                default: tokens.kda.foundation.color.brand.primary.n95,
                '@hover': tokens.kda.foundation.color.brand.primary.n80,
                '@focus': tokens.kda.foundation.color.brand.primary.n80,
              },
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n1,
              '@hover': tokens.kda.foundation.color.brand.secondary.n5,
              '@focus': tokens.kda.foundation.color.brand.secondary.n5,
              inverse: {
                default: tokens.kda.foundation.color.brand.secondary.n99,
                '@hover': tokens.kda.foundation.color.brand.secondary.n80,
                '@focus': tokens.kda.foundation.color.brand.secondary.n80,
              },
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n1,
              '@hover': tokens.kda.foundation.color.semantic.positive.n10,
              '@focus': tokens.kda.foundation.color.semantic.positive.n10,
              inverse: {
                default: tokens.kda.foundation.color.semantic.positive.n95,
                '@hover': tokens.kda.foundation.color.semantic.positive.n90,
                '@focus': tokens.kda.foundation.color.semantic.positive.n90,
              },
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n1,
              '@hover': tokens.kda.foundation.color.semantic.negative.n10,
              '@focus': tokens.kda.foundation.color.semantic.negative.n10,
              inverse: {
                default: tokens.kda.foundation.color.semantic.negative.n95,
                '@hover': tokens.kda.foundation.color.semantic.negative.n90,
                '@focus': tokens.kda.foundation.color.semantic.negative.n90,
              },
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n1,
              '@hover': tokens.kda.foundation.color.semantic.warning.n10,
              '@focus': tokens.kda.foundation.color.semantic.warning.n10,
              inverse: {
                default: tokens.kda.foundation.color.semantic.warning.n95,
                '@hover': tokens.kda.foundation.color.semantic.warning.n90,
                '@focus': tokens.kda.foundation.color.semantic.warning.n90,
              },
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n1,
              '@hover': tokens.kda.foundation.color.semantic.info.n10,
              '@focus': tokens.kda.foundation.color.semantic.info.n10,
              inverse: {
                default: tokens.kda.foundation.color.semantic.info.n95,
                '@hover': tokens.kda.foundation.color.semantic.info.n90,
                '@focus': tokens.kda.foundation.color.semantic.info.n90,
              },
            },
          },
        },
        border: {
          base: {
            default: tokens.kda.foundation.color.neutral['n100@alpha5'],
            bold: tokens.kda.foundation.color.neutral['n100@alpha10'],
            boldest: tokens.kda.foundation.color.neutral['n100@alpha20'],
            'high-contrast': tokens.kda.foundation.color.neutral.n100,
            '@disabled': tokens.kda.foundation.color.neutral.n20,
            '@hover': tokens.kda.foundation.color.neutral.n20,
            '@focus': tokens.kda.foundation.color.neutral.n60,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n100,
              '@hover': tokens.kda.foundation.color.neutral.n95,
              '@focus': tokens.kda.foundation.color.neutral.n90,
            },
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n40,
              subtle: tokens.kda.foundation.color.brand.primary.n20,
              '@hover': tokens.kda.foundation.color.brand.primary.n60,
              '@focus': tokens.kda.foundation.color.brand.primary.n70,
              inverse: {
                default: tokens.kda.foundation.color.brand.primary.n80,
                '@hover': tokens.kda.foundation.color.brand.primary.n70,
                '@focus': tokens.kda.foundation.color.brand.primary.n60,
              },
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n40,
              subtle: tokens.kda.foundation.color.brand.secondary.n20,
              '@hover': tokens.kda.foundation.color.brand.secondary.n60,
              '@focus': tokens.kda.foundation.color.brand.secondary.n70,
              inverse: {
                default: tokens.kda.foundation.color.brand.secondary.n80,
                '@hover': tokens.kda.foundation.color.brand.secondary.n70,
                '@focus': tokens.kda.foundation.color.brand.secondary.n60,
              },
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n60,
              subtle: tokens.kda.foundation.color.semantic.positive.n20,
              '@disabled': tokens.kda.foundation.color.semantic.positive.n20,
              '@hover': tokens.kda.foundation.color.semantic.positive.n70,
              '@focus': tokens.kda.foundation.color.semantic.positive.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.positive.n40,
                '@hover': tokens.kda.foundation.color.semantic.positive.n30,
                '@focus': tokens.kda.foundation.color.semantic.positive.n20,
              },
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n60,
              subtle: tokens.kda.foundation.color.semantic.negative.n20,
              '@disabled': tokens.kda.foundation.color.semantic.negative.n20,
              '@hover': tokens.kda.foundation.color.semantic.negative.n70,
              '@focus': tokens.kda.foundation.color.semantic.negative.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.negative.n40,
                '@hover': tokens.kda.foundation.color.semantic.negative.n30,
                '@focus': tokens.kda.foundation.color.semantic.negative.n20,
              },
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n60,
              subtle: tokens.kda.foundation.color.semantic.warning.n20,
              '@disabled': tokens.kda.foundation.color.semantic.warning.n20,
              '@hover': tokens.kda.foundation.color.semantic.warning.n70,
              '@focus': tokens.kda.foundation.color.semantic.warning.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.warning.n40,
                '@hover': tokens.kda.foundation.color.semantic.warning.n30,
                '@focus': tokens.kda.foundation.color.semantic.warning.n20,
              },
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n60,
              subtle: tokens.kda.foundation.color.semantic.info.n20,
              '@disabled': tokens.kda.foundation.color.semantic.info.n20,
              '@hover': tokens.kda.foundation.color.semantic.info.n70,
              '@focus': tokens.kda.foundation.color.semantic.info.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.info.n40,
                '@hover': tokens.kda.foundation.color.semantic.info.n30,
                '@focus': tokens.kda.foundation.color.semantic.info.n20,
              },
            },
          },
        },
        brand: {
          primary: {
            n0: tokens.kda.foundation.color.palette.blue.n0,
            n1: tokens.kda.foundation.color.palette.blue.n1,
            n5: tokens.kda.foundation.color.palette.blue.n5,
            n10: tokens.kda.foundation.color.palette.blue.n10,
            n20: tokens.kda.foundation.color.palette.blue.n20,
            n30: tokens.kda.foundation.color.palette.blue.n30,
            n40: tokens.kda.foundation.color.palette.blue.n40,
            n50: tokens.kda.foundation.color.palette.blue.n50,
            n60: tokens.kda.foundation.color.palette.blue.n60,
            n70: tokens.kda.foundation.color.palette.blue.n70,
            n80: tokens.kda.foundation.color.palette.blue.n80,
            n90: tokens.kda.foundation.color.palette.blue.n90,
            n95: tokens.kda.foundation.color.palette.blue.n95,
            n99: tokens.kda.foundation.color.palette.blue.n99,
            n100: tokens.kda.foundation.color.palette.blue.n100,
          },
          secondary: {
            n0: tokens.kda.foundation.color.palette.purple.n0,
            n1: tokens.kda.foundation.color.palette.purple.n1,
            n5: tokens.kda.foundation.color.palette.purple.n5,
            n10: tokens.kda.foundation.color.palette.purple.n10,
            n20: tokens.kda.foundation.color.palette.purple.n20,
            n30: tokens.kda.foundation.color.palette.purple.n30,
            n40: tokens.kda.foundation.color.palette.purple.n40,
            n50: tokens.kda.foundation.color.palette.purple.n50,
            n60: tokens.kda.foundation.color.palette.purple.n60,
            n70: tokens.kda.foundation.color.palette.purple.n70,
            n80: tokens.kda.foundation.color.palette.purple.n80,
            n90: tokens.kda.foundation.color.palette.purple.n90,
            n95: tokens.kda.foundation.color.palette.purple.n95,
            n99: tokens.kda.foundation.color.palette.purple.n99,
            n100: tokens.kda.foundation.color.palette.purple.n100,
          },
        },
        icon: {
          base: {
            default: tokens.kda.foundation.color.neutral.n80,
            bold: tokens.kda.foundation.color.neutral.n90,
            '@disabled': tokens.kda.foundation.color.neutral.n30,
            '@hover': tokens.kda.foundation.color.neutral.n70,
            '@focus': tokens.kda.foundation.color.neutral.n60,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n20,
              '@hover': tokens.kda.foundation.color.neutral.n10,
              '@focus': tokens.kda.foundation.color.neutral.n5,
            },
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n40,
              bold: tokens.kda.foundation.color.brand.primary.n50,
              '@disabled': tokens.kda.foundation.color.brand.primary.n20,
              '@hover': tokens.kda.foundation.color.brand.primary.n50,
              '@focus': tokens.kda.foundation.color.brand.primary.n60,
              inverse: {
                default: tokens.kda.foundation.color.brand.primary.n10,
                '@hover': tokens.kda.foundation.color.brand.primary.n5,
                '@focus': tokens.kda.foundation.color.brand.primary.n1,
              },
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n40,
              bold: tokens.kda.foundation.color.brand.secondary.n50,
              '@disabled': tokens.kda.foundation.color.brand.secondary.n20,
              '@hover': tokens.kda.foundation.color.brand.secondary.n50,
              '@focus': tokens.kda.foundation.color.brand.secondary.n60,
              inverse: {
                default: tokens.kda.foundation.color.brand.secondary.n10,
                '@hover': tokens.kda.foundation.color.brand.secondary.n5,
                '@focus': tokens.kda.foundation.color.brand.secondary.n1,
              },
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n80,
              '@hover': tokens.kda.foundation.color.semantic.positive.n70,
              '@focus': tokens.kda.foundation.color.semantic.positive.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.positive.n20,
                '@hover': tokens.kda.foundation.color.semantic.positive.n10,
                '@focus': tokens.kda.foundation.color.semantic.positive.n5,
              },
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n80,
              '@hover': tokens.kda.foundation.color.semantic.negative.n70,
              '@focus': tokens.kda.foundation.color.semantic.negative.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.negative.n20,
                '@hover': tokens.kda.foundation.color.semantic.negative.n10,
                '@focus': tokens.kda.foundation.color.semantic.negative.n5,
              },
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n80,
              '@hover': tokens.kda.foundation.color.semantic.warning.n70,
              '@focus': tokens.kda.foundation.color.semantic.warning.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.warning.n20,
                '@hover': tokens.kda.foundation.color.semantic.warning.n10,
                '@focus': tokens.kda.foundation.color.semantic.warning.n5,
              },
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n80,
              '@hover': tokens.kda.foundation.color.semantic.info.n70,
              '@focus': tokens.kda.foundation.color.semantic.info.n60,
              inverse: {
                default: tokens.kda.foundation.color.semantic.info.n20,
                '@hover': tokens.kda.foundation.color.semantic.info.n10,
                '@focus': tokens.kda.foundation.color.semantic.info.n5,
              },
            },
          },
        },
        link: {
          base: {
            default: tokens.kda.foundation.color.palette.blue.n70,
            '@hover': tokens.kda.foundation.color.palette.blue.n80,
            '@focus': tokens.kda.foundation.color.palette.blue.n60,
            '@visited': tokens.kda.foundation.color.palette.purple.n80,
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n70,
              '@hover': tokens.kda.foundation.color.brand.primary.n80,
              '@focus': tokens.kda.foundation.color.brand.primary.n60,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n70,
              '@hover': tokens.kda.foundation.color.brand.secondary.n80,
              '@focus': tokens.kda.foundation.color.brand.secondary.n60,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n90,
              '@hover': tokens.kda.foundation.color.semantic.positive.n95,
              '@focus': tokens.kda.foundation.color.semantic.positive.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n90,
              '@hover': tokens.kda.foundation.color.semantic.negative.n95,
              '@focus': tokens.kda.foundation.color.semantic.negative.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n90,
              '@hover': tokens.kda.foundation.color.semantic.warning.n95,
              '@focus': tokens.kda.foundation.color.semantic.warning.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n90,
              '@hover': tokens.kda.foundation.color.semantic.info.n95,
              '@focus': tokens.kda.foundation.color.semantic.info.n80,
              '@visited': tokens.kda.foundation.color.palette.purple.n80,
            },
          },
        },
        neutral: {
          n0: '#ffffff',
          n1: '#fafafa',
          n5: '#f0f0f0',
          n10: '#e6e6e6',
          n20: '#d5d5d5',
          n30: '#b1b1b1',
          n40: '#909090',
          n50: '#6d6d6d',
          n60: '#464646',
          n70: '#333333',
          n80: '#222222',
          n90: '#1a1a1a',
          n95: '#0f0f0f',
          n99: '#050505',
          n100: '#000000',
          'n100@alpha5': '#0000000d',
          'n100@alpha10': '#0000001a',
          'n100@alpha20': '#00000033',
        },
        text: {
          base: {
            default: tokens.kda.foundation.color.neutral.n95,
            '@disabled': tokens.kda.foundation.color.neutral.n40,
            '@selected': tokens.kda.foundation.color.palette.blue.n70,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n0,
            },
          },
          gray: {
            default: tokens.kda.foundation.color.neutral.n70,
            lighter: tokens.kda.foundation.color.neutral.n60,
            bolder: tokens.kda.foundation.color.neutral.n80,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n30,
            },
          },
          subtle: {
            default: tokens.kda.foundation.color.neutral.n70,
            '@hover': tokens.kda.foundation.color.neutral.n80,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n30,
            },
          },
          subtlest: {
            default: tokens.kda.foundation.color.neutral.n60,
            '@hover': tokens.kda.foundation.color.neutral.n50,
            inverse: {
              default: tokens.kda.foundation.color.neutral.n40,
            },
          },
          brand: {
            primary: {
              default: tokens.kda.foundation.color.brand.primary.n90,
              '@hover': tokens.kda.foundation.color.brand.primary.n95,
              '@focus': tokens.kda.foundation.color.brand.primary.n99,
              inverse: {
                default: tokens.kda.foundation.color.brand.primary.n10,
                '@hover': tokens.kda.foundation.color.brand.primary.n5,
                '@focus': tokens.kda.foundation.color.brand.primary.n1,
              },
            },
            secondary: {
              default: tokens.kda.foundation.color.brand.secondary.n90,
              '@hover': tokens.kda.foundation.color.brand.secondary.n95,
              '@focus': tokens.kda.foundation.color.brand.secondary.n99,
              inverse: {
                default: tokens.kda.foundation.color.brand.secondary.n10,
                '@hover': tokens.kda.foundation.color.brand.secondary.n5,
                '@focus': tokens.kda.foundation.color.brand.secondary.n1,
              },
            },
          },
          semantic: {
            positive: {
              default: tokens.kda.foundation.color.semantic.positive.n90,
              '@hover': tokens.kda.foundation.color.semantic.positive.n95,
              '@focus': tokens.kda.foundation.color.semantic.positive.n99,
              inverse: {
                default: tokens.kda.foundation.color.semantic.positive.n10,
                '@hover': tokens.kda.foundation.color.semantic.positive.n5,
                '@focus': tokens.kda.foundation.color.semantic.positive.n1,
              },
            },
            negative: {
              default: tokens.kda.foundation.color.semantic.negative.n90,
              '@hover': tokens.kda.foundation.color.semantic.negative.n95,
              '@focus': tokens.kda.foundation.color.semantic.negative.n99,
              inverse: {
                default: tokens.kda.foundation.color.semantic.negative.n10,
                '@hover': tokens.kda.foundation.color.semantic.negative.n5,
                '@focus': tokens.kda.foundation.color.semantic.negative.n1,
              },
            },
            warning: {
              default: tokens.kda.foundation.color.semantic.warning.n90,
              '@hover': tokens.kda.foundation.color.semantic.warning.n95,
              '@focus': tokens.kda.foundation.color.semantic.warning.n99,
              inverse: {
                default: tokens.kda.foundation.color.semantic.warning.n10,
                '@hover': tokens.kda.foundation.color.semantic.warning.n5,
                '@focus': tokens.kda.foundation.color.semantic.warning.n1,
              },
            },
            info: {
              default: tokens.kda.foundation.color.semantic.info.n90,
              '@hover': tokens.kda.foundation.color.semantic.info.n95,
              '@focus': tokens.kda.foundation.color.semantic.info.n99,
              inverse: {
                default: tokens.kda.foundation.color.semantic.info.n10,
                '@hover': tokens.kda.foundation.color.semantic.info.n5,
                '@focus': tokens.kda.foundation.color.semantic.info.n1,
              },
            },
          },
        },
        palette: {
          blue: {
            n0: '#fafcff',
            n1: '#e0f2ff',
            n5: '#cae8ff',
            n10: '#b5deff',
            n20: '#96cefd',
            n30: '#78bbfa',
            n40: '#59a7f6',
            n50: '#3892f3',
            n60: '#147af3',
            n70: '#0265dc',
            n80: '#0054b6',
            n90: '#004491',
            n95: '#003571',
            n99: '#002754',
            n100: '#001329',
          },
          indigo: {
            n0: '#f7f7fd',
            n1: '#edeeff',
            n5: '#e0e2ff',
            n10: '#d3d5ff',
            n20: '#c1c4ff',
            n30: '#acafff',
            n40: '#9599ff',
            n50: '#7e84fc',
            n60: '#686df4',
            n70: '#5258e4',
            n80: '#4046ca',
            n90: '#3236a8',
            n95: '#262986',
            n99: '#1b1e64',
            n100: '#0b0c28',
          },
          lime: {
            n0: '#f8fff5',
            n1: '#e6fd9b',
            n5: '#cbf443',
            n10: '#bce92a',
            n20: '#aad816',
            n30: '#98c50a',
            n40: '#87b103',
            n50: '#769c00',
            n60: '#678800',
            n70: '#577400',
            n80: '#486000',
            n90: '#3a4d00',
            n95: '#2c3b00',
            n99: '#212c00',
            n100: '#0a1f00',
          },
          magenta: {
            n0: '#fff5fb',
            n1: '#ffeaf1',
            n5: '#ffdce8',
            n10: '#ffcadd',
            n20: '#ffb2ce',
            n30: '#ff95bd',
            n40: '#fa77aa',
            n50: '#ef5a98',
            n60: '#de3d82',
            n70: '#c82269',
            n80: '#ad0955',
            n90: '#8e0045',
            n95: '#700037',
            n99: '#54032a',
            n100: '#230115',
          },
          purple: {
            n0: '#fdfaff',
            n1: '#f6ebff',
            n5: '#eeddff',
            n10: '#e6d0ff',
            n20: '#dbbbfe',
            n30: '#cca4fd',
            n40: '#bd8bfc',
            n50: '#ae72f9',
            n60: '#9d57f4',
            n70: '#893de7',
            n80: '#7326d3',
            n90: '#5d13b7',
            n95: '#470c94',
            n99: '#33106a',
            n100: '#13001f',
          },
          red: {
            n0: '#fff5f5',
            n1: '#ffebe7',
            n5: '#ffddd6',
            n10: '#ffcdc3',
            n20: '#ffb7a9',
            n30: '#ff9b88',
            n40: '#ff7c65',
            n50: '#f75c46',
            n60: '#ea3829',
            n70: '#d31510',
            n80: '#b40000',
            n90: '#930000',
            n95: '#740000',
            n99: '#590000',
            n100: '#240003',
          },
          yellow: {
            n0: '#fffbf5',
            n1: '#fcf4ac',
            n5: '#f8e750',
            n10: '#f8d904',
            n20: '#e8c600',
            n30: '#d7b300',
            n40: '#c49f00',
            n50: '#b08c00',
            n60: '#9b7800',
            n70: '#856600',
            n80: '#705300',
            n90: '#5b4300',
            n95: '#483300',
            n99: '#362500',
            n100: '#1f1300',
          },
        },
        semantic: {
          info: {
            n0: tokens.kda.foundation.color.palette.blue.n0,
            n1: tokens.kda.foundation.color.palette.blue.n1,
            n5: tokens.kda.foundation.color.palette.blue.n5,
            n10: tokens.kda.foundation.color.palette.blue.n10,
            n20: tokens.kda.foundation.color.palette.blue.n20,
            n30: tokens.kda.foundation.color.palette.blue.n30,
            n40: tokens.kda.foundation.color.palette.blue.n40,
            n50: tokens.kda.foundation.color.palette.blue.n50,
            n60: tokens.kda.foundation.color.palette.blue.n60,
            n70: tokens.kda.foundation.color.palette.blue.n70,
            n80: tokens.kda.foundation.color.palette.blue.n80,
            n90: tokens.kda.foundation.color.palette.blue.n90,
            n95: tokens.kda.foundation.color.palette.blue.n95,
            n99: tokens.kda.foundation.color.palette.blue.n99,
            n100: tokens.kda.foundation.color.palette.blue.n100,
          },
          negative: {
            n0: tokens.kda.foundation.color.palette.red.n0,
            n1: tokens.kda.foundation.color.palette.red.n1,
            n5: tokens.kda.foundation.color.palette.red.n5,
            n10: tokens.kda.foundation.color.palette.red.n10,
            n20: tokens.kda.foundation.color.palette.red.n20,
            n30: tokens.kda.foundation.color.palette.red.n30,
            n40: tokens.kda.foundation.color.palette.red.n40,
            n50: tokens.kda.foundation.color.palette.red.n50,
            n60: tokens.kda.foundation.color.palette.red.n60,
            n70: tokens.kda.foundation.color.palette.red.n70,
            n80: tokens.kda.foundation.color.palette.red.n80,
            n90: tokens.kda.foundation.color.palette.red.n90,
            n95: tokens.kda.foundation.color.palette.red.n95,
            n99: tokens.kda.foundation.color.palette.red.n99,
            n100: tokens.kda.foundation.color.palette.red.n100,
          },
          positive: {
            n0: tokens.kda.foundation.color.palette.lime.n0,
            n1: tokens.kda.foundation.color.palette.lime.n1,
            n5: tokens.kda.foundation.color.palette.lime.n5,
            n10: tokens.kda.foundation.color.palette.lime.n10,
            n20: tokens.kda.foundation.color.palette.lime.n20,
            n30: tokens.kda.foundation.color.palette.lime.n30,
            n40: tokens.kda.foundation.color.palette.lime.n40,
            n50: tokens.kda.foundation.color.palette.lime.n50,
            n60: tokens.kda.foundation.color.palette.lime.n60,
            n70: tokens.kda.foundation.color.palette.lime.n70,
            n80: tokens.kda.foundation.color.palette.lime.n80,
            n90: tokens.kda.foundation.color.palette.lime.n90,
            n95: tokens.kda.foundation.color.palette.lime.n95,
            n99: tokens.kda.foundation.color.palette.lime.n99,
            n100: tokens.kda.foundation.color.palette.lime.n100,
          },
          warning: {
            n0: tokens.kda.foundation.color.palette.yellow.n0,
            n1: tokens.kda.foundation.color.palette.yellow.n1,
            n5: tokens.kda.foundation.color.palette.yellow.n5,
            n10: tokens.kda.foundation.color.palette.yellow.n10,
            n20: tokens.kda.foundation.color.palette.yellow.n20,
            n30: tokens.kda.foundation.color.palette.yellow.n30,
            n40: tokens.kda.foundation.color.palette.yellow.n40,
            n50: tokens.kda.foundation.color.palette.yellow.n50,
            n60: tokens.kda.foundation.color.palette.yellow.n60,
            n70: tokens.kda.foundation.color.palette.yellow.n70,
            n80: tokens.kda.foundation.color.palette.yellow.n80,
            n90: tokens.kda.foundation.color.palette.yellow.n90,
            n95: tokens.kda.foundation.color.palette.yellow.n95,
            n99: tokens.kda.foundation.color.palette.yellow.n99,
            n100: tokens.kda.foundation.color.palette.yellow.n100,
          },
        },
        categorical: {
          category1: {
            default: '#2898bd',
            '@hover': '#227d9b',
          },
          category2: {
            default: '#5e4db2',
            '@hover': '#352c63',
          },
          category3: {
            default: '#e56910',
            '@hover': '#c25100',
          },
          category4: {
            default: '#943d73',
            '@hover': '#50253f',
          },
          category5: {
            default: '#09326c',
            '@hover': '#1c2b41',
          },
          category6: {
            default: '#8f7ee7',
            '@hover': '#8270db',
          },
          category7: {
            default: '#50253f',
            '@hover': '#3d2232',
          },
          category8: {
            default: '#a54800',
            '@hover': '#702e00',
          },
        },
      },
      effect: {
        shadow: {
          level1: `4px 0.5rem ${tokens.kda.foundation.size.n2} 4px #000000`,
          level2: `4rem 4rem ${tokens.kda.foundation.size.n2} 2rem #000000`,
          level3: `0px 0px ${tokens.kda.foundation.size.n2} 24px #000000`,
        },
      },
      icon: {
        size: {
          xxs: tokens.kda.foundation.size.n3,
          xs: tokens.kda.foundation.size.n4,
          sm: tokens.kda.foundation.size.n5,
          base: tokens.kda.foundation.size.n6,
          lg: tokens.kda.foundation.size.n8,
          xl: tokens.kda.foundation.size.n10,
          xxl: tokens.kda.foundation.size.n16,
        },
      },
      layout: {
        content: {
          minWidth: '33.75rem',
          maxWidth: '42.5rem',
        },
      },
      typography: {
        family: {
          primaryFont: 'Haas Grot Disp',
          headingFont: 'Haas Grot Disp',
          codeFont: 'Kode Mono',
          bodyFont: 'Haas Grot Disp',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: tokens.kda.foundation.size.n4,
          md: '1.125rem',
          lg: '1.25rem',
          xl: '1.5rem',
          '2xl': '1.75rem',
          '3xl': '2rem',
          '4xl': '2.25rem',
          '5xl': '2.5rem',
          '6xl': '2.75rem',
          '7xl': '3rem',
          '8xl': '3.25rem',
          '9xl': '3.75rem',
          '10xl': '4.5rem',
          '11xl': '5rem',
          '12xl': '5.25rem',
        },
        lineHeight: {
          base: '1.4',
          lg: '1.9',
        },
        weight: {
          headingFont: {
            regular: '400',
            medium: '500',
            bold: '700',
            black: '700',
          },
          bodyFont: {
            regular: '400',
            medium: '500',
            bold: '600',
            black: '700',
          },
          monoFont: {
            regular: '400',
            medium: '500',
            semiBold: '600',
            bold: '700',
          },
        },
      },
    },
  },
};
