
const moment = require('moment-timezone')
const {fetchJson,cmd, tlang } = require('../lib')
let gis = require("g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')

    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "صورة",
            filename: __filename,
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply("اكتب اسم")
            if (!text) return reply("اكتب اسم");
            let name1 = text.split("|")[0]
            let name2 = text.split("|")[1] || `1`
            let nn = name2
            for (let i = 0; i < nn; i++) {

                gis(name1, async(error, result) => {
                    n = result;
                    images = n[Math.floor(Math.random() * n.length)].url;
                    let buttonMessage = {
                        image: {
                            url: images,
                        },
                        caption: ` `,
                        headerType: 4,
                    };
                    Void.sendMessage(citel.chat, buttonMessage, {
                        quoted: citel,
                    });
                })
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "تطقيم",
            filename: __filename,
        },
        async(Void, citel, text) => {
            let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
            let random = anu[Math.floor(Math.random() * anu.length)]
            Void.sendMessage(citel.chat, { image: { url: random.male }, caption: `للولد` }, { quoted: citel })
            Void.sendMessage(citel.chat, { image: { url: random.female }, caption: `للبنت` }, { quoted: citel })
        }
    )
    //---------------------------------------------------------------------------