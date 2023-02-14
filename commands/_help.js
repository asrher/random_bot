 const os = require('os')
 const moment = require("moment-timezone")
 const fs = require("fs")
 const Config = require('../config')
 let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
 const long = String.fromCharCode(8206)
 const readmore = long.repeat(4001)
 const Secktor = require('../lib/commands')
     //---------------------------------------------------------------------------
 
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 Secktor.cmd({
         pattern: "المطور",
         desc: "",
         category: "",
         react: "💙",
         filename: __filename
     },
     async(Void, citel) => {
         const Config = require('../config')
         const vcard = 'BEGIN:VCARD\n' +
             'VERSION:3.0\n' +
             'FN:' + Config.ownername + '\n' +
             'ORG:;\n' +
             'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
             'END:VCARD'
         let buttonMessaged = {
             contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
             contextInfo: {
                 externalAdReply: {
                     title: Config.ownername,
                     body: 'Touch here.',
                     renderLargerThumbnail: true,
                     thumbnailUrl: ``,
                     thumbnail: log0,
                     mediaType: 2,
                     mediaUrl: '',
                     sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hi' + citel.pushName,
                 },
             },
         };
         return await Void.sendMessage(citel.chat, buttonMessaged, {
             quoted: citel,
         });
 
     }
 )